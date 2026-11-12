from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from routes import opiskelijat, opettajat, kurssit, tilat, kurssikirjautumiset
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()

app.include_router(opiskelijat.app)
app.include_router(opettajat.app)
app.include_router(kurssit.app)
app.include_router(tilat.app)
app.include_router(kurssikirjautumiset.app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PROJECT_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = PROJECT_DIR / "frontend"

app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
def home():
    return FileResponse(FRONTEND_DIR / "fetch.html")

@app.get("/edit")
def edit():
    return FileResponse(FRONTEND_DIR / "edit-info.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)