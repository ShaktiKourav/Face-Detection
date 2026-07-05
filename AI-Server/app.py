from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import shutil
import os
import traceback
UPLOAD_DIR = "uploads"
app = FastAPI()
from services.emotion import detect_emotion
app = FastAPI(
    title="Face Detection AI API",
    description="AI Emotion Detection using DeepFace",
    version="1.0.0"
)

# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Home Route
# =====================================================

@app.get("/")
def home():
    return {
        "success": True,
        "message": "AI Server Running 🚀"
    }

# ================= Upload Folder =================

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


# ==========================================================
# Detect Emotion
# ==========================================================


@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return detect_emotion(file_path)

    except Exception:
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"success": False}
        )