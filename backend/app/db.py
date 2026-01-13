import os
from sqlmodel import SQLModel, create_engine, Session, select
from dotenv import load_dotenv
from models import SettingsDB, Product, Review, Category, ProductCategoryLink
from datetime import datetime

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///:memory:")

engine = create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session

def init_db():
    """Initialize database tables"""
    SQLModel.metadata.create_all(engine)
    
    # Initialize default settings
    with Session(engine) as session:
        settings = session.exec(select(SettingsDB)).first()
        if not settings:
            default_settings = SettingsDB(
                store_name="karukotha",
                store_description="Timeless Elegance from Bangladesh",
                currency="BDT",
                tax_rate=0.0,
                shipping_fee=100.0,
                free_shipping_threshold=5000.0,
                contact_email="contact@karukotha.com"
            )
            session.add(default_settings)
            session.commit()
        
        # Initialize default categories
        existing_categories = session.exec(select(Category)).first()
        if not existing_categories:
            initial_categories = [
                Category(
                    name="Lighting",
                    description="Traditional and modern lighting solutions",
                    slug="lighting"
                ),
                Category(
                    name="Furniture",
                    description="Antique and contemporary furniture pieces",
                    slug="furniture"
                ),
                Category(
                    name="Decor",
                    description="Home decor and decorative items",
                    slug="decor"
                )
            ]
            for category in initial_categories:
                session.add(category)
            session.commit()
            print(f"✅ Added {len(initial_categories)} initial categories to database")
        
        # Add initial products if database is empty
        existing_products = session.exec(select(Product)).first()
        if not existing_products:
            initial_products = [
                Product(
                    name="Vintage Brass Lamp",
                    description="Exquisite vintage brass lamp with intricate engravings and traditional design. Perfect centerpiece for any heritage home, featuring handcrafted details and warm ambient lighting.",
                    price=8500,
                    stock=15,
                    images=[
                        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500",
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
                    ],
                    sku="LIT-BRL-001",
                    brand="Heritage Crafts",
                    tags=["brass", "lamp", "vintage", "lighting", "bestseller"],
                    original_price=9500,
                    in_stock=True,
                    features=["Handcrafted brass", "Traditional design", "Warm ambient lighting", "Intricate engravings"],
                    specifications={"material": "brass", "height": "18 inches", "weight": "2.5 kg", "warranty": "1 year"},
                    shipping={"weight": "3 kg", "dimensions": "20x20x25 cm"},
                    created_at=datetime.now().isoformat(),
                    updated_at=datetime.now().isoformat()
                ),
                Product(
                    name="Antique Wooden Cabinet",
                    description="Stunning antique wooden cabinet with hand-carved details and traditional Bengali motifs. Features multiple compartments and brass hardware. A true statement piece for collectors.",
                    price=45000,
                    stock=5,
                    images=[
                        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500",
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
                    ],
                    sku="FUR-CAB-002",
                    brand="Antique Collection",
                    tags=["furniture", "cabinet", "antique", "wood", "new arrival"],
                    original_price=50000,
                    in_stock=True,
                    features=["Hand-carved details", "Multiple compartments", "Brass hardware", "Traditional Bengali motifs"],
                    specifications={"material": "solid wood", "dimensions": "120x45x180 cm", "weight": "45 kg", "warranty": "2 years"},
                    shipping={"weight": "50 kg", "dimensions": "130x55x190 cm"},
                    created_at=datetime.now().isoformat(),
                    updated_at=datetime.now().isoformat()
                ),
                Product(
                    name="Traditional Brass Pottery",
                    description="Authentic traditional brass pottery with intricate designs. Handcrafted by skilled artisans using centuries-old techniques. Perfect for displaying flowers or as standalone decor.",
                    price=3200,
                    stock=25,
                    images=[
                        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500",
                        "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500"
                    ],
                    sku="DEC-POT-003",
                    brand="Brass Artisans",
                    tags=["brass", "pottery", "decor", "handcrafted", "traditional"],
                    original_price=3500,
                    in_stock=True,
                    features=["Handcrafted brass", "Intricate designs", "Traditional techniques", "Multi-purpose use"],
                    specifications={"material": "brass", "height": "12 inches", "diameter": "8 inches", "weight": "1.2 kg"},
                    shipping={"weight": "1.5 kg", "dimensions": "15x15x20 cm"},
                    created_at=datetime.now().isoformat(),
                    updated_at=datetime.now().isoformat()
                ),
                Product(
                    name="Vintage Photo Frame",
                    description="Elegant vintage photo frame with ornate brass detailing and glass protection. Holds standard photo sizes and adds a touch of nostalgia to any space.",
                    price=2800,
                    stock=35,
                    images=[
                        "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500",
                        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500"
                    ],
                    sku="DEC-FRM-004",
                    brand="Heritage Frames",
                    tags=["frame", "vintage", "photo", "decor", "brass"],
                    original_price=3200,
                    in_stock=True,
                    features=["Ornate brass detailing", "Glass protection", "Standard photo sizes", "Vintage design"],
                    specifications={"material": "wood and brass", "dimensions": "8x10 inches", "weight": "0.8 kg", "warranty": "6 months"},
                    shipping={"weight": "1 kg", "dimensions": "12x12x5 cm"},
                    created_at=datetime.now().isoformat(),
                    updated_at=datetime.now().isoformat()
                ),
                Product(
                    name="Antique Mirror",
                    description="Magnificent antique mirror with hand-carved wooden frame featuring traditional Bengali patterns. Large size perfect for entryways or bedrooms. Limited edition piece.",
                    price=15000,
                    stock=8,
                    images=[
                        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500",
                        "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500"
                    ],
                    sku="DEC-MIR-005",
                    brand="Antique Collection",
                    tags=["mirror", "antique", "decor", "wood", "limited"],
                    original_price=18000,
                    in_stock=True,
                    features=["Hand-carved frame", "Traditional Bengali patterns", "Large size", "Limited edition"],
                    specifications={"material": "wood and glass", "dimensions": "80x60 cm", "weight": "8 kg", "warranty": "1 year"},
                    shipping={"weight": "10 kg", "dimensions": "90x70x10 cm"},
                    created_at=datetime.now().isoformat(),
                    updated_at=datetime.now().isoformat()
                ),
                Product(
                    name="Classic Wall Clock",
                    description="Classic wall clock with brass frame and Roman numerals. Features silent quartz movement and vintage design. Perfect blend of functionality and heritage aesthetics.",
                    price=6500,
                    stock=20,
                    images=[
                        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500",
                        "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500"
                    ],
                    sku="DEC-CLK-006",
                    brand="Time Heritage",
                    tags=["clock", "wall clock", "brass", "classic", "decor"],
                    original_price=7500,
                    in_stock=True,
                    features=["Brass frame", "Roman numerals", "Silent quartz movement", "Vintage design"],
                    specifications={"material": "brass and wood", "diameter": "30 cm", "weight": "2 kg", "warranty": "1 year"},
                    shipping={"weight": "2.5 kg", "dimensions": "35x35x8 cm"},
                    created_at=datetime.now().isoformat(),
                    updated_at=datetime.now().isoformat()
                )
            ]
            
            for product in initial_products:
                session.add(product)
            session.commit()
            print(f"✅ Added {len(initial_products)} initial products to database")
            
            # Create product-category associations
            product_category_links = [
                ProductCategoryLink(product_id=1, category_id=1),  # Vintage Brass Lamp -> Lighting
                ProductCategoryLink(product_id=2, category_id=2),  # Antique Wooden Cabinet -> Furniture
                ProductCategoryLink(product_id=3, category_id=3),  # Traditional Brass Pottery -> Decor
                ProductCategoryLink(product_id=4, category_id=3),  # Vintage Photo Frame -> Decor
                ProductCategoryLink(product_id=5, category_id=3),  # Antique Mirror -> Decor
                ProductCategoryLink(product_id=6, category_id=3),  # Classic Wall Clock -> Decor
            ]
            
            for link in product_category_links:
                session.add(link)
            session.commit()
            print(f"✅ Created {len(product_category_links)} product-category associations")
            
            # Add sample reviews for the first product (Vintage Brass Lamp)
            sample_reviews = [
                Review(
                    product_id=1,
                    author="Ahmed Hassan",
                    rating=5,
                    comment="Absolutely stunning piece! The craftsmanship is incredible. Perfect addition to my living room.",
                    verified=True,
                    created_at=datetime(2025, 12, 28, 10, 30, 0)
                ),
                Review(
                    product_id=1,
                    author="Nadia Rahman",
                    rating=5,
                    comment="Beautiful antique lamp with authentic Bengali design. Fast delivery and well-packaged.",
                    verified=True,
                    created_at=datetime(2025, 12, 15, 14, 20, 0)
                )
            ]
            
            for review in sample_reviews:
                session.add(review)
            session.commit()
            print(f"✅ Added {len(sample_reviews)} sample reviews to database")

