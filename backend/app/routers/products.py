from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import select, Session
from typing import List
from db import get_session
from models import Product
from schemas import ProductResponse, ProductCreate, ProductUpdate


router = APIRouter()

# /api/products

@router.get("", response_model=List[ProductResponse], status_code=status.HTTP_200_OK)
def get_products(session: Session = Depends(get_session)):
    """Get all products"""
    statement = select(Product)
    products = session.exec(statement).all()
    return products


@router.get("/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK)
def get_product(product_id: int, session: Session = Depends(get_session)):
    """Get a single product by ID"""
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(product_data: ProductCreate, session: Session = Depends(get_session)):
    """Create a new product"""
    # Check if SKU already exists
    statement = select(Product).where(Product.sku == product_data.sku)
    existing = session.exec(statement).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="SKU already exists")
    
    product = Product.model_validate(product_data.model_dump())
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

@router.put("/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK)
def update_product(product_id: int, product_data: ProductUpdate, session: Session = Depends(get_session)):
    """Update an existing product"""
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    product.sqlmodel_update(product_data.model_dump(exclude_unset=True))
    
    session.commit()
    session.refresh(product)
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, session: Session = Depends(get_session)):
    """Delete a product"""
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    session.delete(product)
    session.commit()
    return
