from sqlalchemy import text
from database import engine
from pydantic import BaseModel
from fastapi import APIRouter

app = APIRouter()

class tila(BaseModel):
    nimi: str
    kapasiteetti: int

@app.get("/tilat") 
async def tiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM tilat"))
        tilat = [dict(row._mapping) for row in result] 
    return tilat

@app.get("/tilat/{id}")
async def tiedot(id: int):
    with engine.connect() as connect:
        result = connect.execute(text("SELECT * FROM tilat WHERE tunnus = :id"), {"id": id})
        tila = [dict(row._mapping) for row in result]
    return tila

@app.post("/tilat")
async def luo(tila: tila):
    with engine.connect() as connect:
        connect.execute(text("INSERT INTO tilat (nimi, kapasiteetti) VALUES (:nimi, :kapasiteetti)"), tila.model_dump())
        connect.commit()

@app.put("/tilat/{id}")
async def paivita(id: int, tila: tila):
    with engine.connect() as connect:
        data = tila.model_dump()
        data["id"] = id
        connect.execute(text("UPDATE tilat SET nimi = :nimi, kapasiteetti = :kapasiteetti WHERE tunnus = :id"), data)
        connect.commit()

@app.delete("/tilat/{id}")
async def poista(id: int):
    with engine.connect() as connect:
        connect.execute(text("DELETE FROM tilat WHERE tunnus = :id"), {"id": id})
        connect.commit()