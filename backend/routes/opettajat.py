from fastapi import FastAPI
from sqlalchemy import text
from database import engine
import requests, uvicorn
from pydantic import BaseModel
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter

app = APIRouter()

class opettaja(BaseModel):
    etunimi: str
    sukunimi: str
    aine: str

@app.get("/opettajat") 
def opiskelijaTiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM opettajat"))
        opettajat = [dict(row._mapping) for row in result] 
    return opettajat