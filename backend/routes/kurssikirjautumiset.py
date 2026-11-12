from sqlalchemy import text
from database import engine
from pydantic import BaseModel
from datetime import datetime
from fastapi import APIRouter

app = APIRouter()

class kurssikirjautumiset(BaseModel):
    opiskelija_id: int
    kurssi_id: int
    kirjautumisaika: datetime

@app.get("/kurssikirjautumiset") 
def opiskelijaTiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM kurssikirjautumiset"))
        kurssikirjautumiset = [dict(row._mapping) for row in result] 
    return kurssikirjautumiset

@app.get("/kurssikirjautumiset/{id}")
async def tiedot(id: int):
    with engine.connect() as connect:
        result = connect.execute(text("SELECT * FROM kurssikirjautumiset WHERE tunnus = :id"), {"id": id})
        kurssikirjautumiset = [dict(row._mapping) for row in result]
    return kurssikirjautumiset

@app.post("/kurssikirjautumiset")
async def luo(kurssikirjautumiset: kurssikirjautumiset):
    with engine.connect() as connect:
        connect.execute(text("INSERT INTO kurssikirjautumiset (opiskelija_id, kurssi_id, kirjautumisaika) VALUES (:opiskelija_id, :kurssi_id, :kirjautumisaika)"), kurssikirjautumiset.model_dump())
        connect.commit()

@app.put("/kurssikirjautumiset/{id}")
async def paivita(id: int, kurssikirjautumiset: kurssikirjautumiset):
    with engine.connect() as connect:
        data = kurssikirjautumiset.model_dump()
        data["id"] = id
        connect.execute(text("UPDATE kurssikirjautumiset SET opiskelija_id = :opiskelija_id, kurssi_id = :kurssi_id, kirjautumisaika = :kirjautumisaika Where tunnus = :id"), data)
        connect.commit()

@app.delete("/kurssikirjautumiset/{id}")
async def poista(id: int):
    with engine.connect() as connect:
        connect.execute(text("DELETE FROM kurssikirjautumiset WHERE tunnus = :id"), {"id": id})
        connect.commit()