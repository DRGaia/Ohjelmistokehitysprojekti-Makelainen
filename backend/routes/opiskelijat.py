from sqlalchemy import text
from database import engine
from pydantic import BaseModel
from fastapi import APIRouter
from datetime import date

app = APIRouter()

class opiskelija(BaseModel): 
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

@app.get("/opiskelijat/{id}")
async def tiedot(id: int):
    with engine.connect() as connect:
        result = connect.execute(text("SELECT * FROM opiskelijat WHERE opiskelijanumero = :id"), {"id": id})
        opiskelija = [dict(row._mapping) for row in result]
    return opiskelija

@app.post("/opiskelijat")
async def luo(opiskelija: opiskelija):
    with engine.connect() as connect:
        connect.execute(text("INSERT INTO opiskelijat (etunimi, sukunimi, syntymapaiva, vuosikurssi) VALUES (:etunimi, :sukunimi, :syntymapaiva, :vuosikurssi)"), opiskelija.model_dump())
        connect.commit()

@app.put("/opiskelijat/{id}")
async def paivita(id: int, opiskelija: opiskelija):
    with engine.connect() as connect:
        data = opiskelija.model_dump()
        data["id"] = id
        connect.execute(text("UPDATE opiskelijat SET etunimi = :etunimi, sukunimi = :sukunimi, syntymapaiva = :syntymapaiva, vuosikurssi = :vuosikurssi WHERE opiskelijanumero = :id"), data)
        connect.commit()

@app.delete("/opiskelijat/{id}")
async def poista(id: int):
    with engine.connect() as connect:
        connect.execute(text("DELETE FROM opiskelijat WHERE opiskelijanumero = :id"), {"id": id})
        connect.commit()