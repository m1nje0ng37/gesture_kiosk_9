from fastapi import APIRouter
import tensorflow as tf
import numpy as np

router = APIRouter()

@router.get("/")
async def read_root():
    return {"message": "Hello World"}

class GestureModel:
    def __init__(self):
        self.model = tf.keras.models.load_model('app/model/model.keras')
    
    def predict(self, image_array):
        predictions = self.model.predict(image_array)
        gesture_index = np.argmax(predictions, axis=1)[0]
        
        gesture_map = {
            0: 'one',
            # Add other gesture mappings here
        }
        
        return gesture_map.get(gesture_index, "unknown")

# 인스턴스 생성
gesture_model_instance = GestureModel()

print("app.routes 모듈이 로드되었습니다")
