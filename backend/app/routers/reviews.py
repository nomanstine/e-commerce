from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import Session, select
from typing import List
from datetime import datetime

from db import get_session
from models import Product, Review
from schemas import ReviewResponse, ReviewCreate


router = APIRouter()


@router.get("/api/products/{product_id}/reviews", response_model=List[ReviewResponse], status_code=status.HTTP_200_OK)
def get_product_reviews(product_id: int, session: Session = Depends(get_session)):
    """Get all reviews for a product"""
    # Check if product exists
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    statement = select(Review).where(Review.product_id == product_id)
    reviews = session.exec(statement).all()
    return reviews

@router.post("/api/products/{product_id}/reviews", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(product_id: int, review_data: ReviewCreate, session: Session = Depends(get_session)):
    """Create a new review for a product"""
    # Check if product exists
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    review_dict = review_data.model_dump(exclude_unset=True)
    review_dict["product_id"] = product_id
    
    reviews = Review.model_validate(review_dict)

    session.add(reviews)
    session.commit()
    session.refresh(reviews)
    return reviews

@router.delete("/api/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(review_id: int, session: Session = Depends(get_session)):
    """Delete a review"""
    review = session.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")
    
    session.delete(review)
    session.commit()
    return
