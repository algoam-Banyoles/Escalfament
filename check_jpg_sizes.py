from PIL import Image
import os

DIR = "images/exercicis"
jpgs = sorted([f for f in os.listdir(DIR) if f.startswith('exercici-') and f.endswith('.jpg')])

print("Dimensions actuals dels exercici-##.jpg:\n")
dimensions = {}
for jpg in jpgs:
    img = Image.open(os.path.join(DIR, jpg))
    size = img.size
    dimensions[jpg] = size
    print(f"{jpg}: {size[0]}x{size[1]} (w x h)")

# Estadístiques
widths = [d[0] for d in dimensions.values()]
heights = [d[1] for d in dimensions.values()]

print(f"\n--- Estadístiques ---")
print(f"Amplades: min={min(widths)}, max={max(widths)}, mitjana={sum(widths)//len(widths)}")
print(f"Alçades: min={min(heights)}, max={max(heights)}, mitjana={sum(heights)//len(heights)}")
print(f"Total imatges: {len(jpgs)}")
