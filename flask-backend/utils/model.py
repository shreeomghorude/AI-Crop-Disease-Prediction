import timm
import torch.nn as nn

def create_effnet_model(num_classes):
    # EXACT architecture used during training
    model = timm.create_model(
        "efficientnet_b0",
        pretrained=False,
        num_classes=num_classes
    )
    return model
