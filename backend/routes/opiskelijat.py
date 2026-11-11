from fastapi import FastAPI
from sqlalchemy import text
from database import engine
import requests, uvicorn
from pydantic import BaseModel
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter

app = APIRouter()

class Opiskelija(BaseModel): 
    etunimi: str
    sukunimi: str
    syntymapaiva: date
    vuosikurssi: int

@app.get("/opiskelijat") # ottaa opiskelijoiden tiedot
async def opiskelijaTiedot():
    with engine.connect() as connect: # yhdistyy databaseen
        result = connect.execute(text("SELECT * FROM opiskelijat")) # Ottaa tiedot
        opiskelijat = [dict(row._mapping) for row in result] # tekee Jsonin
    return opiskelijat # antaa tiedot

@app.post("/opiskelijat")
async def luoOpiskelija(opiskelija: Opiskelija):
    with engine.connect() as connect:
        result = connect.execute(
            text("INSERT INTO opiskelijat (etunimi, sukunimi, syntymapaiva, vuosikurssi) VALUES (:etunimi, :sukunimi, :syntymapaiva, :vuosikurssi)"), opiskelija.model_dump())
        connect.commit()

@app.put("/opiskelijat/{id}")
async def paivitaOpiskelija(id: int, opiskelija: Opiskelija):
    
    with engine.connect() as connect:
        data = opiskelija.model_dump()
        data["id"] = id
        connect.execute(
            text("UPDATE opiskelijat SET etunimi = :etunimi, sukunimi = :sukunimi, syntymapaiva = :syntymapaiva, vuosikurssi = :vuosikurssi WHERE opiskelijanumero = :id"), data)
        connect.commit()

@app.delete("/opiskelijat/{id}")
async def paivitaOpiskelija(id: int):
    with engine.connect() as connect:
        connect.execute(
            text("DELETE FROM opiskelijat WHERE opiskelijanumero = :id"), {"id": id})
        connect.commit()