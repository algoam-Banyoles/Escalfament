from PIL import Image
import os

DIR = "images/exercicis"
imgs = [f for f in os.listdir(DIR) if f.startswith('Imagen') and f.endswith('.png')][:5]

for img in imgs:
    size = Image.open(os.path.join(DIR, img)).size
    print(f"{img}: {size[0]}x{size[1]} (w x h)")
