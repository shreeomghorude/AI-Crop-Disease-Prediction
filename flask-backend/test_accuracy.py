import os
import torch
import numpy as np
from PIL import Image
from torchvision import transforms
from utils.model import ResNet9
from utils.disease import disease_dic
import random

# -------- CLASS LABELS --------
disease_classes = list(disease_dic.keys())
num_classes = len(disease_classes)

# -------- LOAD MODEL --------
model_path = "models/plant_disease_model.pth"
model = ResNet9(3, num_classes)
model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
model.eval()

# -------- TRANSFORM --------
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.ToTensor(),
])

# -------- DATASET PATH --------
dataset_path = "./dataset/PlantVillage/"

true_labels = []
pred_labels = []

print("\n⚡ Running FAST Accuracy Test (5 random images per class)...\n")

# -------- TEST LOOP --------
for cls in disease_classes:
    class_dir = os.path.join(dataset_path, cls)

    if not os.path.isdir(class_dir):
        print(f"❌ Missing: {cls}")
        continue

    images = [f for f in os.listdir(class_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

    # Select 5 random images
    sample_images = random.sample(images, min(5, len(images)))

    print(f"Testing {cls} ({len(sample_images)} images)")

    for img_file in sample_images:
        img_path = os.path.join(class_dir, img_file)

        try:
            img = Image.open(img_path).convert("RGB")
            img_t = transform(img)
            img_u = torch.unsqueeze(img_t, 0)

            with torch.no_grad():
                pred = model(img_u)
                _, idx = torch.max(pred, 1)

            predicted_class = disease_classes[idx.item()]

            true_labels.append(cls)
            pred_labels.append(predicted_class)

        except Exception as e:
            print(f"Error reading: {img_path}", e)

# -------- FINAL RESULT --------
correct = sum([1 for t, p in zip(true_labels, pred_labels) if t == p])
accuracy = (correct / len(true_labels)) * 100

print("\n================ FAST TEST RESULTS ================")
print(f"Images Tested: {len(true_labels)}")
print(f"Correct Predictions: {correct}")
print(f"Accuracy: {accuracy:.2f}%")
print("===================================================\n")
