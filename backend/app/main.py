from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing import List, Optional

from datetime import datetime
import json
from models import *

app = FastAPI(title="E-Commerce API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_URL = "sqlite:///./ecommerce.db"
engine = create_engine(DATABASE_URL, echo=True)

# Models
class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    price: float
    category: str
    stock: int
    images: str = Field(default="[]")  # Store as JSON string
    sku: str = Field(unique=True)
    brand: Optional[str] = None
    tags: str = Field(default="[]")  # Store as JSON string
    original_price: Optional[float] = None
    in_stock: bool = Field(default=True)
    features: str = Field(default="[]")  # Store as JSON string
    specifications: str = Field(default="{}")  # Store as JSON string
    shipping: str = Field(default="{}")  # Store as JSON string
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class ProductResponse(SQLModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    stock: int
    images: List[str]
    sku: str
    brand: Optional[str] = None
    tags: List[str] = []
    originalPrice: Optional[float] = None
    inStock: bool = True
    features: List[str] = []
    specifications: dict = {}
    shipping: dict = {}
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

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

class Settings(SQLModel):
    storeName: str
    storeDescription: str
    currency: str
    taxRate: float
    shippingFee: float
    freeShippingThreshold: float
    contactEmail: str
    contactPhone: Optional[str] = None
    storeAddress: Optional[str] = None
    returnPolicy: Optional[str] = None
    termsAndConditions: Optional[str] = None

class Review(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key="product.id")
    author: str
    rating: int = Field(ge=1, le=5)
    comment: str
    verified: bool = Field(default=False)
    created_at: str

class ReviewResponse(SQLModel):
    id: int
    productId: int
    author: str
    rating: int
    comment: str
    verified: bool
    date: str

# Helper functions
def product_to_response(product: Product) -> ProductResponse:
    """Convert Product model to response with parsed JSON fields"""
    return ProductResponse(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        category=product.category,
        stock=product.stock,
        images=json.loads(product.images) if product.images else [],
        sku=product.sku,
        brand=product.brand,
        tags=json.loads(product.tags) if product.tags else [],
        originalPrice=product.original_price,
        inStock=product.in_stock,
        features=json.loads(product.features) if product.features else [],
        specifications=json.loads(product.specifications) if product.specifications else {},
        shipping=json.loads(product.shipping) if product.shipping else {},
        created_at=product.created_at,
        updated_at=product.updated_at
    )

def init_db():
    """Initialize database tables"""
    SQLModel.metadata.create_all(engine)
    
    # Initialize default settings
    with Session(engine) as session:
        settings = session.exec(select(SettingsDB)).first()
        if not settings:
            default_settings = SettingsDB(
                store_name="Heritage Treasures",
                store_description="Timeless Elegance from Bangladesh",
                currency="BDT",
                tax_rate=0.0,
                shipping_fee=100.0,
                free_shipping_threshold=5000.0,
                contact_email="contact@heritagetreasures.com"
            )
            session.add(default_settings)
            session.commit()
        
        # Add initial products if database is empty
        existing_products = session.exec(select(Product)).first()
        if not existing_products:
            initial_products = [
                Product(
                    name="Vintage Brass Lamp",
                    description="Exquisite vintage brass lamp with intricate engravings and traditional design. Perfect centerpiece for any heritage home, featuring handcrafted details and warm ambient lighting.",
                    price=8500,
                    category="Lighting",
                    stock=15,
                    images=json.dumps([
                        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500",
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
                    ]),
                    sku="LIT-BRL-001",
                    brand="Heritage Crafts",
                    tags=json.dumps(["brass", "lamp", "vintage", "lighting", "bestseller"]),
                    created_at=datetime.now().isoformat()
                ),
                Product(
                    name="Antique Wooden Cabinet",
                    description="Stunning antique wooden cabinet with hand-carved details and traditional Bengali motifs. Features multiple compartments and brass hardware. A true statement piece for collectors.",
                    price=45000,
                    category="Furniture",
                    stock=5,
                    images=json.dumps([
                        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500",
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
                    ]),
                    sku="FUR-CAB-002",
                    brand="Antique Collection",
                    tags=json.dumps(["furniture", "cabinet", "antique", "wood", "new arrival"]),
                    created_at=datetime.now().isoformat()
                ),
                Product(
                    name="Traditional Brass Pottery",
                    description="Authentic traditional brass pottery with intricate designs. Handcrafted by skilled artisans using centuries-old techniques. Perfect for displaying flowers or as standalone decor.",
                    price=3200,
                    category="Decor",
                    stock=25,
                    images=json.dumps([
                        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500",
                        "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500"
                    ]),
                    sku="DEC-POT-003",
                    brand="Brass Artisans",
                    tags=json.dumps(["brass", "pottery", "decor", "handcrafted", "traditional"]),
                    created_at=datetime.now().isoformat()
                ),
                Product(
                    name="Vintage Photo Frame",
                    description="Elegant vintage photo frame with ornate brass detailing and glass protection. Holds standard photo sizes and adds a touch of nostalgia to any space.",
                    price=2800,
                    category="Decor",
                    stock=35,
                    images=json.dumps([
                        "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500",
                        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500"
                    ]),
                    sku="DEC-FRM-004",
                    brand="Heritage Frames",
                    tags=json.dumps(["frame", "vintage", "photo", "decor", "brass"]),
                    created_at=datetime.now().isoformat()
                ),
                Product(
                    name="Antique Mirror",
                    description="Magnificent antique mirror with hand-carved wooden frame featuring traditional Bengali patterns. Large size perfect for entryways or bedrooms. Limited edition piece.",
                    price=15000,
                    category="Decor",
                    stock=8,
                    images=json.dumps([
                        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500",
                        "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500"
                    ]),
                    sku="DEC-MIR-005",
                    brand="Antique Collection",
                    tags=json.dumps(["mirror", "antique", "decor", "wood", "limited"]),
                    created_at=datetime.now().isoformat()
                ),
                Product(
                    name="Classic Wall Clock",
                    description="Classic wall clock with brass frame and Roman numerals. Features silent quartz movement and vintage design. Perfect blend of functionality and heritage aesthetics.",
                    price=6500,
                    category="Decor",
                    stock=20,
                    images=json.dumps([
                        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500",
                        "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500"
                    ]),
                    sku="DEC-CLK-006",
                    brand="Time Heritage",
                    tags=json.dumps(["clock", "wall clock", "brass", "classic", "decor"]),
                    created_at=datetime.now().isoformat()
                )
            ]
            
            for product in initial_products:
                session.add(product)
            session.commit()
            print(f"✅ Added {len(initial_products)} initial products to database")
            
            # Add sample reviews for the first product (Vintage Brass Lamp)
            sample_reviews = [
                Review(
                    product_id=1,
                    author="Ahmed Hassan",
                    rating=5,
                    comment="Absolutely stunning piece! The craftsmanship is incredible. Perfect addition to my living room.",
                    verified=True,
                    created_at="2025-12-28T10:30:00"
                ),
                Review(
                    product_id=1,
                    author="Nadia Rahman",
                    rating=5,
                    comment="Beautiful antique lamp with authentic Bengali design. Fast delivery and well-packaged.",
                    verified=True,
                    created_at="2025-12-15T14:20:00"
                )
            ]
            
            for review in sample_reviews:
                session.add(review)
            session.commit()
            print(f"✅ Added {len(sample_reviews)} sample reviews to database")

# Product endpoints
@app.get("/api/products", response_model=List[ProductResponse])
def get_products():
    """Get all products"""
    with Session(engine) as session:
        products = session.exec(select(Product)).all()
        return [product_to_response(p) for p in products]

@app.get("/api/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int):
    """Get a single product by ID"""
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product_to_response(product)

@app.post("/api/products", response_model=ProductResponse, status_code=201)
def create_product(product_data: ProductResponse):
    """Create a new product"""
    with Session(engine) as session:
        # Check if SKU already exists
        existing = session.exec(select(Product).where(Product.sku == product_data.sku)).first()
        if existing:
            raise HTTPException(status_code=400, detail="SKU already exists")
        
        product = Product(
            name=product_data.name,
            description=product_data.description,
            price=product_data.price,
            category=product_data.category,
            stock=product_data.stock,
            images=json.dumps(product_data.images),
            sku=product_data.sku,
            brand=product_data.brand,
            tags=json.dumps(product_data.tags) if product_data.tags else "[]",
            original_price=product_data.originalPrice,
            in_stock=product_data.inStock,
            features=json.dumps(product_data.features) if product_data.features else "[]",
            specifications=json.dumps(product_data.specifications) if product_data.specifications else "{}",
            shipping=json.dumps(product_data.shipping) if product_data.shipping else "{}",
            created_at=datetime.now().isoformat()
        )
        session.add(product)
        session.commit()
        session.refresh(product)
        return product_to_response(product)

@app.put("/api/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product_data: ProductResponse):
    """Update an existing product"""
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        product.name = product_data.name
        product.description = product_data.description
        product.price = product_data.price
        product.category = product_data.category
        product.stock = product_data.stock
        product.images = json.dumps(product_data.images)
        product.sku = product_data.sku
        product.brand = product_data.brand
        product.tags = json.dumps(product_data.tags) if product_data.tags else "[]"
        product.original_price = product_data.originalPrice
        product.in_stock = product_data.inStock
        product.features = json.dumps(product_data.features) if product_data.features else "[]"
        product.specifications = json.dumps(product_data.specifications) if product_data.specifications else "{}"
        product.shipping = json.dumps(product_data.shipping) if product_data.shipping else "{}"
        product.updated_at = datetime.now().isoformat()
        
        session.add(product)
        session.commit()
        session.refresh(product)
        return product_to_response(product)

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int):
    """Delete a product"""
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        session.delete(product)
        session.commit()
        return {"message": "Product deleted successfully"}

# Review endpoints
@app.get("/api/products/{product_id}/reviews", response_model=List[ReviewResponse])
def get_product_reviews(product_id: int):
    """Get all reviews for a product"""
    with Session(engine) as session:
        # Check if product exists
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        reviews = session.exec(select(Review).where(Review.product_id == product_id)).all()
        return [
            ReviewResponse(
                id=r.id,
                productId=r.product_id,
                author=r.author,
                rating=r.rating,
                comment=r.comment,
                verified=r.verified,
                date=r.created_at
            )
            for r in reviews
        ]

@app.post("/api/products/{product_id}/reviews", response_model=ReviewResponse, status_code=201)
def create_review(product_id: int, review_data: dict):
    """Create a new review for a product"""
    with Session(engine) as session:
        # Check if product exists
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        review = Review(
            product_id=product_id,
            author=review_data.get("author", "Anonymous"),
            rating=review_data.get("rating", 5),
            comment=review_data.get("comment", ""),
            verified=review_data.get("verified", False),
            created_at=datetime.now().isoformat()
        )
        session.add(review)
        session.commit()
        session.refresh(review)
        
        return ReviewResponse(
            id=review.id,
            productId=review.product_id,
            author=review.author,
            rating=review.rating,
            comment=review.comment,
            verified=review.verified,
            date=review.created_at
        )

@app.delete("/api/reviews/{review_id}")
def delete_review(review_id: int):
    """Delete a review"""
    with Session(engine) as session:
        review = session.get(Review, review_id)
        if not review:
            raise HTTPException(status_code=404, detail="Review not found")
        
        session.delete(review)
        session.commit()
        return {"message": "Review deleted successfully"}

# Settings endpoints
@app.get("/api/settings", response_model=Settings)
def get_settings():
    """Get store settings"""
    with Session(engine) as session:
        settings = session.exec(select(SettingsDB)).first()
        if not settings:
            raise HTTPException(status_code=404, detail="Settings not found")
        return Settings(
            storeName=settings.store_name,
            storeDescription=settings.store_description,
            currency=settings.currency,
            taxRate=settings.tax_rate,
            shippingFee=settings.shipping_fee,
            freeShippingThreshold=settings.free_shipping_threshold,
            contactEmail=settings.contact_email,
            contactPhone=settings.contact_phone,
            storeAddress=settings.store_address,
            returnPolicy=settings.return_policy,
            termsAndConditions=settings.terms_and_conditions
        )

@app.put("/api/settings", response_model=Settings)
def update_settings(settings_data: Settings):
    """Update store settings"""
    with Session(engine) as session:
        settings = session.exec(select(SettingsDB)).first()
        if not settings:
            raise HTTPException(status_code=404, detail="Settings not found")
        
        settings.store_name = settings_data.storeName
        settings.store_description = settings_data.storeDescription
        settings.currency = settings_data.currency
        settings.tax_rate = settings_data.taxRate
        settings.shipping_fee = settings_data.shippingFee
        settings.free_shipping_threshold = settings_data.freeShippingThreshold
        settings.contact_email = settings_data.contactEmail
        settings.contact_phone = settings_data.contactPhone
        settings.store_address = settings_data.storeAddress
        settings.return_policy = settings_data.returnPolicy
        settings.terms_and_conditions = settings_data.termsAndConditions
        
        session.add(settings)
        session.commit()
        session.refresh(settings)
        
        return Settings(
            storeName=settings.store_name,
            storeDescription=settings.store_description,
            currency=settings.currency,
            taxRate=settings.tax_rate,
            shippingFee=settings.shipping_fee,
            freeShippingThreshold=settings.free_shipping_threshold,
            contactEmail=settings.contact_email,
            contactPhone=settings.contact_phone,
            storeAddress=settings.store_address,
            returnPolicy=settings.return_policy,
            termsAndConditions=settings.terms_and_conditions
        )

# Initialize database on startup
@app.on_event("startup")
def on_startup():
    init_db()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
