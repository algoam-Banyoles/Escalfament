import os
from PIL import Image

DIR = "images/exercicis"
processats = 0

for f in os.listdir(DIR):
    if f.startswith("Imagen") and f.endswith(".png"):
        num = int(f.replace("Imagen", "").replace(".png", ""))
        out = f"exercici-{num:02d}.jpg"
        
        print(f"{f} -> {out}")
        
        img = Image.open(os.path.join(DIR, f))
        # Mantenim format vertical (sense rotar)
        # Les imatges originals són ~464-504px d'amplada x 720px d'alçada
        
        w, h = img.size
        # Target: generar imatges verticals de 600px d'amplada amb la mateixa relació d'aspecte
        target_width = 600
        aspect_ratio = h / w
        target_height = int(target_width * aspect_ratio)
        
        img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        if img.mode != 'RGB':
            rgb = Image.new('RGB', img.size, (255,255,255))
            if img.mode == 'RGBA':
                rgb.paste(img, mask=img.split()[-1])
            else:
                rgb.paste(img)
            img = rgb
        
        img.save(os.path.join(DIR, out), 'JPEG', quality=85, optimize=True)
        processats += 1

print(f"\nProcessats: {processats}")
