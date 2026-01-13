from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import select, Session
from sqlalchemy.orm import selectinload
from typing import List
from db import get_session
from models import Category
from schemas import CategoryResponse, CategoryCreate, CategoryUpdate


router = APIRouter()

# /api/categories
@router.get("", response_model=List[CategoryResponse], status_code=status.HTTP_200_OK)
def get_categories(session: Session = Depends(get_session)):
    """Get all categories"""
    statement = select(Category).options(selectinload(Category.products))
    categories = session.exec(statement).all()
    return categories


@router.get("/{category_id}", response_model=CategoryResponse, status_code=status.HTTP_200_OK)
def get_category(category_id: int, session: Session = Depends(get_session)):
    """Get a single category by ID"""
    statement = select(Category).where(Category.id == category_id).options(selectinload(Category.products))
    category = session.exec(statement).first()
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return category


@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(category_data: CategoryCreate, session: Session = Depends(get_session)):
    """Create a new category"""
    # Check if name already exists
    statement = select(Category).where(Category.name == category_data.name)
    existing = session.exec(statement).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category name already exists")
    
    category_dict = category_data.model_dump()
    category = Category.model_validate(category_dict)
    
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


@router.put("/{category_id}", response_model=CategoryResponse, status_code=status.HTTP_200_OK)
def update_category(category_id: int, category_data: CategoryUpdate, session: Session = Depends(get_session)):
    """Update an existing category"""
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    
    update_data = category_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(category, key, value)
    
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, session: Session = Depends(get_session)):
    """Delete a category"""
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    
    session.delete(category)
    session.commit()
    return