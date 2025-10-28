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
        # Target: generar imatges verticals de 600x900px (dimensions fixes per totes)
        target_width = 600
        target_height = 900
        aspect_ratio = h / w
        temp_height = int(target_width * aspect_ratio)
        
        # Primer redimensionem mantenint l'aspect ratio
        img = img.resize((target_width, temp_height), Image.Resampling.LANCZOS)
        
        # Després apliquem crop o padding per ajustar a 600x900px exactes
        if temp_height > target_height:
            # Crop centrat (tallem per dalt i baix)
            top = (temp_height - target_height) // 2
            img = img.crop((0, top, target_width, top + target_height))
        elif temp_height < target_height:
            # Padding centrat (afegim espai blanc per dalt i baix)
            new_img = Image.new('RGB', (target_width, target_height), (255, 255, 255))
            top = (target_height - temp_height) // 2
            new_img.paste(img, (0, top))
            img = new_img
        
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
