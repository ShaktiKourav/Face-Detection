from deepface import DeepFace
import traceback
import os


def detect_emotion(image_path):
    try:
        print("Image Path:", image_path)
        print("Exists:", os.path.exists(image_path))

        result = DeepFace.analyze(
            img_path=image_path,
            actions=["emotion"],
            detector_backend="opencv",
            enforce_detection=False
        )

        if isinstance(result, list):
            result = result[0]

        return {
            "success": True,
            "emotion": str(result["dominant_emotion"]),
            "confidence": float(
                round(
                    float(
                        result["emotion"][
                            result["dominant_emotion"]
                        ]
                    ),
                    2,
                )
            ),
            "all_emotions": {
                key: float(value)
                for key, value in result["emotion"].items()
            },
        }

    except Exception as e:
        traceback.print_exc()

        return {
            "success": False,
            "message": str(e),
        }