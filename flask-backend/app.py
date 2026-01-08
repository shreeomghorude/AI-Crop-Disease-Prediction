from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import requests
import pickle
import io
import config
import torch
from torchvision import transforms
from PIL import Image
from utils.disease import disease_dic
from utils.model import create_effnet_model
   # <-- NEW


# ---------------------- Disease Model Setup ----------------------
disease_classes = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]


# ---------------------- Load EfficientNet Model ----------------------
disease_model_path = "models/plant_disease_model.pth"

disease_model = create_effnet_model(len(disease_classes))
disease_model.load_state_dict(torch.load(disease_model_path, map_location="cpu"))
disease_model.eval()



# ---------------------- FIXED TRANSFORMS ----------------------
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor()
])


# ---------------------- Weather Fetch ----------------------
def weather_fetch(city_name):
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    response = requests.get(f"{base_url}appid={api_key}&q={city_name}")
    data = response.json()

    if data.get("cod") != "404":
        main = data["main"]
        temperature = round((main["temp"] - 273.15), 2)
        humidity = main["humidity"]
        return temperature, humidity

    return None


# ---------------------- Predict Disease ----------------------
def predict_image_from_file(file_bytes):

    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")

    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)

    with torch.no_grad():
        output = disease_model(img_u)
        _, preds = torch.max(output, dim=1)

    predicted_class = disease_classes[preds[0].item()]
    return disease_dic[predicted_class]


# ---------------------- Flask App ----------------------
app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Flask backend is running!"


# ---------------------- DISEASE PREDICTION API ----------------------
@app.route('/disease-predict', methods=['POST'])
def disease_predict():
    try:
        # CASE 1: File Upload
        if "file" in request.files:
            file = request.files["file"]
            if file.filename == "":
                return jsonify({"error": "Empty file"}), 400

            file_bytes = file.read()
            result = predict_image_from_file(file_bytes)
            return jsonify(result)

        # CASE 2: Cloudinary URL
        data = request.get_json()

        if not data or "imageUrl" not in data:
            return jsonify({"error": "No image URL provided"}), 400

        image_url = data["imageUrl"]
        print("Processing Image URL:", image_url)

        response = requests.get(image_url)
        if response.status_code != 200:
            return jsonify({"error": "Failed to download image"}), 400

        img_bytes = response.content
        result = predict_image_from_file(img_bytes)

        return jsonify(result)

    except Exception as e:
        print("Error in disease prediction:", str(e))
        return jsonify({"error": "Prediction failed"}), 500


# ---------------------- RUN APP ----------------------
if __name__ == "__main__":
    app.run(port=7000)
