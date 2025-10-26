#!/bin/bash
# Script alternatiu amb ImageMagick (si el tens instal·lat)

echo "🎱 Processant imatges amb ImageMagick..."
echo "----------------------------------------"

cd images/exercicis

for file in Imagen*.png; do
    if [ -f "$file" ]; then
        # Extreure número
        num=$(echo "$file" | sed 's/Imagen//;s/.png//')

        # Format amb 2 dígits
        num_formatted=$(printf "%02d" $num)

        output="exercici-${num_formatted}.jpg"

        echo "📸 $file → $output"

        # Rotar 90° dreta, redimensionar i convertir a JPG
        convert "$file" -rotate 90 -resize 800x400^ -gravity center -extent 800x400 -quality 85 "$output"

        if [ $? -eq 0 ]; then
            echo "   ✅ Processat correctament"
        else
            echo "   ❌ Error processant"
        fi
        echo
    fi
done

echo "----------------------------------------"
echo "🎉 Fet! Les imatges estan llestes."
