from fastapi import FastAPI, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image, ImageOps, ImageFilter, ImageEnhance
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Preload all models
models = {
    "cnn": tf.keras.models.load_model("model/quickdraw_cnn_batchnorm_model.keras"),
    "vit": tf.keras.models.load_model("model/quickdraw_vit_sgd.keras"),
    "hybrid": tf.keras.models.load_model("model/quickdraw_hybrid_v2_cnn.keras")
}

# Consistent label map
label_map = [
    'alarm clock', 'apple', 'arm', 'axe', 'banana', 'baseball bat', 'bed', 'bench', 'book', 'broom',
    'bucket', 'bus', 'butterfly', 'cactus', 'campfire', 'candle', 'cannon', 'car', 'carrot', 'circle',
    'clock', 'cloud', 'compass', 'cookie', 'crayon', 'crown', 'diamond', 'donut', 'dumbbell', 'envelope',
    'fan', 'flashlight', 'foot', 'fork', 'hammer', 'hand', 'hourglass', 'knife', 'ladder', 'leaf',
    'light bulb', 'lollipop', 'moon', 'mountain', 'mushroom', 'nail', 'pencil', 'pizza', 'smiley face',
    'square', 'star', 'stethoscope', 'sun', 'toothbrush', 'tree', 'triangle', 'umbrella', 'wheel',
    'windmill', 'wine bottle'
]

@app.post("/predict")
async def predict(file: UploadFile = File(...), model: str = Query("cnn")):
    try:
        if model not in models:
            return {"error": f"Invalid model type: {model}"}

        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("L")

        # Preprocess: invert, upscale, filter, contrast, downscale
        image = ImageOps.invert(image)
        image = image.resize((128, 128), Image.LANCZOS)
        image = image.filter(ImageFilter.MaxFilter(3))
        image = ImageEnhance.Contrast(image).enhance(2.0)
        image = image.resize((28, 28), Image.LANCZOS)
        image.save("received_debug.png")

        # Format for prediction
        image_array = np.array(image).astype("float32") / 255.0
        image_array = image_array.reshape(1, 28, 28, 1)

        # Predict with chosen model
        prediction = models[model].predict(image_array)[0]
        predicted_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction))

        # Debug: Print top 3
        top_indices = prediction.argsort()[-3:][::-1]
        print(f"🔍 Top 3 Predictions ({model.upper()}):")
        for i in top_indices:
            print(f"  - {label_map[i]}: {round(float(prediction[i]), 3)}")

        predicted_label = (
            label_map[predicted_index]
            if predicted_index < len(label_map)
            else f"Unknown ({predicted_index})"
        )

        return {
            "label": predicted_label,
            "confidence": round(confidence, 3)
        }

    except Exception as e:
        return {"error": str(e)}