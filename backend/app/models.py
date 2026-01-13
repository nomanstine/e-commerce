from sqlmodel import SQLModel, Field, Column, Relationship
from sqlalchemy import JSON
from typing import List, Optional, Dict
from datetime import datetime

class ProductCategoryLink(SQLModel, table=True):
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    category_id: int = Field(foreign_key="category.id", primary_key=True)

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    price: float
    stock: int
    images: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    sku: str = Field(unique=True)
    brand: Optional[str] = None
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    original_price: Optional[float] = None
    in_stock: bool = Field(default=True)
    features: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    specifications: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    shipping: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    
    # Many-to-many relationship with Category
    categories: List["Category"] = Relationship(
        back_populates="products", 
        link_model=ProductCategoryLink
    )

class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    slug: Optional[str] = None
    parent_id: Optional[int] = Field(default=None, foreign_key="category.id")
    
    # Many-to-many relationship with Product
    products: List[Product] = Relationship(
        back_populates="categories", 
        link_model=ProductCategoryLink
    )

class SettingsDB(SQLModel, table=True):
    __tablename__ = "settings"
    id: Optional[int] = Field(default=None, primary_key=True)
    store_name: str
    store_description: str
    currency: str
    tax_rate: float
    shipping_fee: float
    free_shipping_threshold: float
    contact_email: str
    contact_phone: Optional[str] = None
    store_address: Optional[str] = None
    return_policy: Optional[str] = None
    terms_and_conditions: Optional[str] = None

class Review(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key="product.id")
    author: str
    rating: int = Field(ge=1, le=5)
    comment: str
    verified: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)