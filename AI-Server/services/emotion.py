from deepface import DeepFace

# ==========================================================
# Emotion Detection Function
# ==========================================================

def detect_emotion(image_path):
    try:

        result = DeepFace.analyze(
            img_path=image_path,
            actions=["emotion", "age", "gender"],
            detector_backend="skip",
            enforce_detection=False
        )

        if isinstance(result, list):
            result = result[0]

        return {
            "success": True,

            "emotion": str(result["dominant_emotion"]),

            "confidence": float(
                round(
                    float(result["emotion"][result["dominant_emotion"]]),
                    2
                )
            ),

            "age": int(result["age"]),

            "gender": str(result["dominant_gender"]),

            "all_emotions": {
                key: float(value)
                for key, value in result["emotion"].items()
            }
        }

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }