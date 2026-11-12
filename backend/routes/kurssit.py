from sqlalchemy import text
from database import engine
from pydantic import BaseModel
from datetime import date
from fastapi import APIRouter

app = APIRouter()

class kurssi(BaseModel):
    nimi: str
    kuvaus: str
    alkupaiva: date
    loppupaiva: date
    opettaja_id: int
    tila_id: int

@app.get("/kurssit") 
def opiskelijaTiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM kurssit"))
        kurssit = [dict(row._mapping) for row in result] 
    return kurssit

@app.get("/kurssit/{id}")
async def tiedot(id: int):
    with engine.connect() as connect:
        result = connect.execute(text("SELECT * FROM kurssit WHERE tunnus = :id"), {"id": id})
        kurssi = [dict(row._mapping) for row in result]
    return kurssi

@app.post("/kurssit")
async def luo(kurssi: kurssi):
    with engine.connect() as connect:
        connect.execute(text("INSERT INTO kurssit (nimi, kuvaus, alkupaiva, loppupaiva, opettaja_id, tila_id) VALUES (:nimi, :kuvaus, :alkupaiva, :loppupaiva, :opettaja_id, :tila_id)"), kurssi.model_dump())
        connect.commit()

@app.put("/kurssit/{id}")
async def paivita(id: int, kurssi: kurssi):
    with engine.connect() as connect:
        data = kurssi.model_dump()
        data["id"] = id
        connect.execute(text("UPDATE kurssit SET nimi = :nimi, kuvaus = :kuvaus, alkupaiva = :alkupaiva, loppupaiva = :loppupaiva, opettaja_id = :opettaja_id, tila_id = :tila_id WHERE tunnus = :id"), data)
        connect.commit()

@app.delete("/kurssit/{id}")
async def poista(id: int):
    with engine.connect() as connect:
        connect.execute(text("DELETE FROM kurssit WHERE tunnus = :id"), {"id": id})
        connect.commit()