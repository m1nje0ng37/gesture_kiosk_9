# app/routes.py

##routes를 main 코드에 합쳤음!!! 이 파일은 안 사용함

# from fastapi import APIRouter, HTTPException
# import numpy as np
# import logging
# import tensorflow as tf  # TensorFlow를 import합니다.

# router = APIRouter()

# class GestureModel:
#     def __init__(self):
#         self.actions = ['one', 'two', 'three', 'four', 'five', 'good', 'bad']
#         self.seq_length = 30

#         try:
#             self.model = tf.keras.models.load_model('app/model/model.keras')
#             logging.info("Model loaded successfully")
#         except Exception as e:
#             logging.error(f"Error loading model: {e}")
#             raise HTTPException(status_code=500, detail="Error loading model")

#     def predict(self, landmarks):
#         try:
#             # landmarks 데이터를 numpy array로 변환
#             landmarks_array = np.array(landmarks).reshape(1, -1)
#             predictions = self.model.predict(landmarks_array)
#             gesture_index = np.argmax(predictions, axis=1)[0]
#             gesture_map = {
#                 0: 'one',
#                 1: 'two',
#                 2: 'three',
#                 3: 'four',
#                 4: 'five',
#                 5: 'good',
#                 6: 'bad'
#             }       
#             return gesture_map.get(gesture_index, "unknown")
#         except Exception as e:
#             logging.error(f"Prediction error: {e}")
#             raise HTTPException(status_code=500, detail="Prediction error")

# gesture_model_instance = GestureModel()

# @router.post("/api/gesture")
# async def predict_gesture(landmarks: list):
#     try:
#         prediction = gesture_model_instance.predict(landmarks)
#         return {"gesture": prediction}
#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         logging.error(f"Prediction error: {e}")
#         raise HTTPException(status_code=500, detail="Prediction error")
