from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlmodel import SQLModel, Session, select
from .db import engine, init_db

from datetime import datetime
import json
import os

from .models import Product, Review, SettingsDB
from .routers import products, reviews, settings

from dotenv import load_dotenv

app = FastAPI(title="karukotha")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(products, prefix="/api/products", tags=["products"])
app.include_router(reviews, tags=["reviews"])
app.include_router(settings, prefix="/api/settings", tags=["settings"])


# Initialize database on startup
@app.on_event("startup")
def on_startup():
    init_db()

# Export the app as handler for Vercel ASGI support
handler = app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
