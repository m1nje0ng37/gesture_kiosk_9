# app/model/gesture_model.py

import tensorflow as tf
import numpy as np

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
