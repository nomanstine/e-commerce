from sqlmodel import SQLModel, Field
from typing import List, Optional, Dict
from datetime import datetime

# Simplified Product schema for Category responses (to avoid circular references)
class ProductSummary(SQLModel):
    id: int
    name: str
    price: float
    images: List[str] = []
    sku: str
    in_stock: bool = True

# Category Schemas
class CategoryBase(SQLModel):
    name: str
    description: Optional[str] = None
    slug: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    slug: Optional[str] = None


class CategoryResponse(CategoryBase):
    id: int
    parent_id: Optional[int] = None
    # products: List[ProductSummary] = []


# Product Schemas
class ProductBase(SQLModel):
    name: str
    description: str
    price: float = Field(gt=0)
    category_ids: List[int] = []
    stock: int = Field(ge=0)
    sku: str
    brand: Optional[str] = None
    original_price: Optional[float] = None
    in_stock: bool = True


class ProductCreate(ProductBase):
    images: List[str] = []
    tags: List[str] = []
    features: List[str] = []
    specifications: Dict = {}
    shipping: Dict = {}


class ProductUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = Field(default=None, gt=0)
    category_ids: Optional[List[int]] = None
    stock: Optional[int] = Field(default=None, ge=0)
    sku: Optional[str] = None
    brand: Optional[str] = None
    original_price: Optional[float] = None
    in_stock: Optional[bool] = None

    images: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    features: Optional[List[str]] = None
    specifications: Optional[Dict] = None
    shipping: Optional[Dict] = None


class ProductResponse(ProductBase):
    id: int
    images: List[str] = []
    tags: List[str] = []
    features: List[str] = []
    specifications: Dict = {}
    shipping: Dict = {}
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    categories: List[CategoryResponse] = []


# Review Schemas
class ReviewBase(SQLModel):
    author: str
    rating: int = Field(ge=1, le=5)
    comment: str
    verified: bool = False


class ReviewCreate(ReviewBase):
    pass


class ReviewResponse(ReviewBase):
    id: int
    product_id: int
    created_at: datetime


# Settings Schemas
class SettingsBase(SQLModel):
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


class SettingsUpdate(SQLModel):
    store_name: Optional[str] = None
    store_description: Optional[str] = None
    currency: Optional[str] = None
    tax_rate: Optional[float] = None
    shipping_fee: Optional[float] = None
    free_shipping_threshold: Optional[float] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    store_address: Optional[str] = None
    return_policy: Optional[str] = None
    terms_and_conditions: Optional[str] = None


class SettingsResponse(SettingsBase):
    pass


# Dashboard Stats Schema
class DashboardStats(SQLModel):
    total_products: int
    total_revenue: float
    total_orders: int
    low_stock_products: int