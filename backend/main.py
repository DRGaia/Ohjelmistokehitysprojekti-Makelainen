from fastapi import FastAPI
from sqlalchemy import text
from database import engine
import requests, uvicorn

app = FastAPI()

@app.get("/") # tää on vaa testi
def testi():
    return {"toimii"}

@app.get("/opiskelijat") # ottaa opiskelijoiden tiedot
def opiskelijaTiedot():
    with engine.connect() as connect: # yhdistyy databaseen
        result = connect.execute(text("SELECT * FROM opiskelijat")) # Ottaa tiedot
        opiskelijat = [dict(row._mapping) for row in result] # tekee Jsonin
    return opiskelijat # antaa tiedot

@app.get("/opettajat") 
def opiskelijaTiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM opettajat"))
        opettajat = [dict(row._mapping) for row in result] 
    return opettajat

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

@app.get("/kirjautumiset") 
def opiskelijaTiedot():
    with engine.connect() as connect: 
        result = connect.execute(text("SELECT * FROM kurssikirjautumiset"))
        kurssikirjautumiset = [dict(row._mapping) for row in result] 
    return kurssikirjautumiset

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)