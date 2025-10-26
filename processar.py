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
        img = img.rotate(-90, expand=True)
        
        w, h = img.size
        if w/h > 2:
            new_h = 400
            new_w = int(400 * w/h)
        else:
            new_w = 800
            new_h = int(800 * h/w)
        
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        left = (new_w - 800) // 2
        top = (new_h - 400) // 2
        img = img.crop((left, top, left+800, top+400))
        
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
