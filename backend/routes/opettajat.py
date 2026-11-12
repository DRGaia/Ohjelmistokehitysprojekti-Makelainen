from sqlalchemy import text
from database import engine
from pydantic import BaseModel
from fastapi import APIRouter

app = APIRouter()

class opettaja(BaseModel):
    etunimi: str
    sukunimi: str
    aine: str

@app.get("/opettajat") 
async def tiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM opettajat"))
        opettajat = [dict(row._mapping) for row in result] 
    return opettajat

@app.get("/opettajat/{id}")
async def tiedot(id: int):
    with engine.connect() as connect:
        result = connect.execute(text("SELECT * FROM opettajat WHERE tunnusnumero = :id"), {"id": id})
        opettaja = [dict(row._mapping) for row in result]
    return opettaja

@app.post("/opettajat")
async def luo(opettaja: opettaja):
    with engine.connect() as connect:
        connect.execute(text("INSERT INTO opettajat (etunimi, sukunimi, aine) VALUES (:etunimi, :sukunimi, :aine)"), opettaja.model_dump())
        connect.commit()

@app.put("/opettajat/{id}")
async def paivita(id: int, opettaja: opettaja):
    with engine.connect() as connect:
        data = opettaja.model_dump()
        data["id"] = id
        connect.execute(text("UPDATE opettajat SET etunimi = :etunimi, sukunimi = :sukunimi, aine = :aine WHERE tunnusnumero = :id"), data)
        connect.commit()

@app.delete("/opettajat/{id}")
async def poista(id: int):
    with engine.connect() as connect:
        connect.execute(text("DELETE FROM opettajat WHERE tunnusnumero = :id"), {"id": id})
        connect.commit()