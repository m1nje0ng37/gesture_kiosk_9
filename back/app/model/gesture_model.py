import tensorflow as tf
import os

class GestureModel:
    def __init__(self):
        model_path = os.path.join(os.path.dirname(__file__), 'model.keras')
        if not os.path.exists(model_path):
            raise ValueError(f"File not found: {model_path}. Please ensure the file is an accessible `.keras` zip file.")
        self.model = tf.keras.models.load_model(model_path)

    def predict(self, image_array):
        predictions = self.model.predict(image_array)
        predicted_class = predictions.argmax(axis=-1)
        return predicted_class[0]
