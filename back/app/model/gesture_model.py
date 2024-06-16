# app/model/gesture_model.py

import tensorflow as tf
import numpy as np
from PIL import Image
import io
import logging
from fastapi import APIRouter, HTTPException, UploadFile, File, FastAPI
from fastapi.middleware.cors import CORSMiddleware

router = APIRouter()

class GestureModel:
    def __init__(self):
        self.actions = ['one', 'two', 'three', 'four', 'five', 'good', 'bad']  # 인식할 손동작 클래스들을 정의
        self.seq_length = 30  # 시퀀스 길이 정의

        try:
            self.model = tf.keras.models.load_model('app/model/model.keras')
            logging.info("Model loaded successfully")
            print("Model input shape:", self.model.input_shape)
        except Exception as e:
            logging.error(f"Error loading model: {e}")
            raise HTTPException(status_code=500, detail="Error loading model")

    # 예측 함수
    def predict(self, image_array):
        try:
            predictions = self.model.predict(image_array)
            logging.info(f"Predictions: {predictions}")

            gesture_index = np.argmax(predictions, axis=1)[0]
            logging.info(f"Gesture index: {gesture_index}")

            gesture_map = {
                0: 'one',
                1: 'two',
                2: 'three',
                3: 'four',
                4: 'five',
                5: 'good',
                6: 'bad'
            }       
            
            return gesture_map.get(gesture_index, "unknown")
        except Exception as e:
            logging.error(f"Prediction error: {e}")
            raise HTTPException(status_code=500, detail="Prediction error")

gesture_model_instance = GestureModel()

@router.post("/predict-gesture")
async def predict_gesture(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        try:
            image = Image.open(io.BytesIO(contents))
            logging.info(f"Image format: {image.format}, size: {image.size}, mode: {image.mode}")
        except Exception as e:
            logging.error(f"Error opening image: {e}")
            raise HTTPException(status_code=400, detail="Invalid image file")

        # 모델이 예상하는 입력 형태로 변환 (예: 99x30 크기)
        model_input_size = (99, 30)  # 모델 입력 크기 확인
        image = image.resize(model_input_size)  # 모델 입력 크기에 맞게 조정
        image = image.convert('L')  # 흑백 이미지로 변환 (필요할 경우)
        image_array = np.array(image) / 255.0  # 정규화
        logging.info(f"Image array shape: {image_array.shape}")

        image_array = np.expand_dims(image_array, axis=0)  # 배치 차원 추가
        image_array = np.expand_dims(image_array, axis=-1)  # 채널 차원 추가 (필요할 경우)
        logging.info(f"Expanded image array shape: {image_array.shape}")

        prediction = gesture_model_instance.predict(image_array)
        return {"prediction": prediction}
    except HTTPException as e:
        raise e
    except Exception as e:
        logging.error(f"File processing error: {e}")
        raise HTTPException(status_code=500, detail="File processing error")

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 필요한 경우 특정 도메인으로 제한할 수 있습니다.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.model.gesture_model:app", host="0.0.0.0", port=8000, reload=True)
