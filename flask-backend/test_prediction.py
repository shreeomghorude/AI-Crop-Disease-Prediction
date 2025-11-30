import torch
from PIL import Image
from torchvision import transforms
from utils.disease import disease_dic
from utils.model import ResNet9
import io

# ---------------- Load Model ----------------
disease_classes = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy", "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy", "Potato___Early_blight",
    "Potato___Late_blight", "Potato___healthy", "Raspberry___healthy", "Soybean___healthy",
    "Squash___Powdery_mildew", "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight",
    "Tomato___Leaf_Mold", "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
]

transform = transforms.Compose([
    transforms.Resize(256),
    transforms.ToTensor(),
])

model = ResNet9(3, len(disease_classes))
model.load_state_dict(torch.load("models/plant_disease_model.pth", map_location=torch.device('cpu')))
model.eval()

# ---------------- Test Image Path ----------------
image_path = "./dataset/PlantVillage/Tomato___Early_blight/0a2726e0-3358-4a46-b6dc-563a5a9f2bdf___RS_Erly.B 7860.JPG"



# ---------------- Prediction Logic ----------------
with open(image_path, "rb") as f:
    img_bytes = f.read()

image = Image.open(io.BytesIO(img_bytes))
img_t = transform(image)
img_u = torch.unsqueeze(img_t, 0)

with torch.no_grad():
    yb = model(img_u)
    _, preds = torch.max(yb, dim=1)

predicted_label = disease_classes[preds[0].item()]

# ---------------- Final Output ----------------
print("Predicted Label:", predicted_label)
print("Crop:", disease_dic[predicted_label]["crop"])
print("Disease:", disease_dic[predicted_label]["disease"])
print("Cause:", disease_dic[predicted_label]["cause"])
print("Prevention:", disease_dic[predicted_label]["prevention"])
