from fastapi import APIRouter, HTTPException, Depends, status, Query
from sqlmodel import select, Session
from sqlalchemy.orm import selectinload
from typing import List, Optional
from db import get_session
from models import Product, Category, ProductCategoryLink
from schemas import ProductResponse, ProductCreate, ProductUpdate


router = APIRouter()

# /api/products

@router.get("", response_model=List[ProductResponse], status_code=status.HTTP_200_OK)
def get_products(
    category_id: Optional[int] = Query(None, description="Filter products by category ID"),
    session: Session = Depends(get_session)
):
    """Get all products, optionally filtered by category"""
    if category_id:
        # Filter products by category
        statement = (
            select(Product)
            .join(ProductCategoryLink)
            .where(ProductCategoryLink.category_id == category_id)
            .options(selectinload(Product.categories))
        )
    else:
        statement = select(Product).options(selectinload(Product.categories))
    
    products = session.exec(statement).all()
    return products


@router.get("/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK)
def get_product(product_id: int, session: Session = Depends(get_session)):
    """Get a single product by ID"""
    statement = select(Product).where(Product.id == product_id).options(selectinload(Product.categories))
    product = session.exec(statement).first()
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
    
    product_dict = product_data.model_dump(exclude={"category_ids"})
    product = Product.model_validate(product_dict)
    
    # Add categories
    if product_data.category_ids:
        categories = session.exec(select(Category).where(Category.id.in_(product_data.category_ids))).all()
        product.categories = categories
    
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
    
    product_dict = product_data.model_dump(exclude_unset=True, exclude={"category_ids"})
    product.sqlmodel_update(product_dict)
    
    # Update categories if provided
    if product_data.category_ids is not None:
        categories = session.exec(select(Category).where(Category.id.in_(product_data.category_ids))).all()
        product.categories = categories
    
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
