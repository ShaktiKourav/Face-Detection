# #from deepface import DeepFace
# import traceback
# import os


# def detect_emotion(image_path):
#     try:
#         print("Image Path:", image_path)
#         print("Exists:", os.path.exists(image_path))

#         result = DeepFace.analyze(
#             img_path=image_path,
#             actions=["emotion"],
#             detector_backend="opencv",
#             enforce_detection=False
#         )

#         if isinstance(result, list):
#             result = result[0]

#         return {
#             "success": True,
#             "emotion": str(result["dominant_emotion"]),
#             "confidence": float(
#                 round(
#                     float(
#                         result["emotion"][
#                             result["dominant_emotion"]
#                         ]
#                     ),
#                     2,
#                 )
#             ),
#             "all_emotions": {
#                 key: float(value)
#                 for key, value in result["emotion"].items()
#             },
#         }

#     except Exception as e:
#         traceback.print_exc()

#         return {
#             "success": False,
#             "message": str(e),
#         }


from deepface import DeepFace
import traceback


def detect_emotion(image_path):

    try:

        print("=================================")
        print("AI DETECTION START")
        print("Image Path:", image_path)

        result = DeepFace.analyze(
            img_path=image_path,
            actions=["emotion"],
            detector_backend="opencv",
            enforce_detection=False
        )

        if isinstance(result, list):
            result = result[0]

        dominant_emotion = result["dominant_emotion"]

        emotion_scores = result.get("emotion", {})

        confidence = float(
            round(
                float(emotion_scores.get(dominant_emotion, 0)),
                2
            )
        )

        response = {
            "success": True,
            "emotion": str(dominant_emotion),
            "confidence": confidence,
            "all_emotions": {
                key: float(value)
                for key, value in emotion_scores.items()
            }
        }

        print("AI RESULT:", response)
        print("=================================")

        return response

    except Exception as e:

        print("=================================")
        print("AI DETECTION FAILED")

        traceback.print_exc()

        print("=================================")

        return {
            "success": False,
            "message": str(e)
        }