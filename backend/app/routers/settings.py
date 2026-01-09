from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import Session, select

from db import get_session
from models import SettingsDB
from schemas import SettingsResponse, SettingsUpdate


router = APIRouter()


@router.get("", response_model=SettingsResponse, status_code=status.HTTP_200_OK)
def get_settings(session: Session = Depends(get_session)):
    """Get store settings"""
    statement = select(SettingsDB)
    settings = session.exec(statement).first()
    if not settings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Settings not found")
    return settings


@router.put("", response_model=SettingsResponse, status_code=status.HTTP_200_OK)
def update_settings(settings_data: SettingsUpdate, session: Session = Depends(get_session)):
    """Update store settings"""
    statement = select(SettingsDB)
    settings = session.exec(statement).first()
    if not settings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Settings not found")
    
    settings.sqlmodel_update(settings_data.model_dump(exclude_unset=True))
    
    session.commit()
    session.refresh(settings)
    
    return settings
