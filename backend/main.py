from fastapi import FastAPI
from sqlalchemy import text
from database import engine
import requests, uvicorn
from pydantic import BaseModel
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from routes import opiskelijat , opettajat #, kurssit


class Opiskelija(BaseModel): 
    etunimi: str
    sukunimi: str
    syntymapaiva: date
    vuosikurssi: int


app = FastAPI()

app.include_router(opiskelijat.app)
app.include_router(opettajat.app)
#app.include_router(kurssit.app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/") # tää on vaa testi
def testi():
    return {"toimii"}





@app.get("/kurssit") 
def opiskelijaTiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM kurssit"))
        kurssit = [dict(row._mapping) for row in result] 
    return kurssit

@app.get("/tilat") 
def opiskelijaTiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM tilat"))
        tilat = [dict(row._mapping) for row in result] 
    return tilat

@app.get("/kurssikirjautumiset") 
def opiskelijaTiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM kurssikirjautumiset"))
        kurssikirjautumiset = [dict(row._mapping) for row in result] 
    return kurssikirjautumiset

""" @app.get("/opiskelijat/{id}")
def opiskelijanTiedot(id: int):
    with engine.connect() as connect:
        result = connect.execute(
            text("SELECT * FROM opiskelijat WHERE opiskelijanumero = :id"), {"id": id})
        opiskelija = [dict(row._mapping) for row in result]
    return opiskelija """

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)