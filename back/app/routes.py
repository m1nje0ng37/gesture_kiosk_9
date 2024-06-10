from fastapi import APIRouter, File, UploadFile
from app.model.gesture_model import GestureModel
from PIL import Image
import numpy as np

router = APIRouter()

model = GestureModel()

@router.post("/predict-gesture")
async def predict_gesture(file: UploadFile = File(...)):
    # 업로드된 이미지 파일 처리
    image = Image.open(file.file)
    image = image.convert("RGB")
    image = image.resize((224, 224))  # 모델에 맞는 크기로 조정
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    
    # 모델 예측
    prediction = model.predict(image_array)
    return {"prediction": prediction}
