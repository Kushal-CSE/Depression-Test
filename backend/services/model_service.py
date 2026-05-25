import joblib
import pandas as pd

model = joblib.load("model/depression_svm_x3_model.pkl")
feature_order = joblib.load("data/svm_feature_order.pkl")

def predict_from_json(data):
    input_features = [data[f] for f in feature_order]
    df = pd.DataFrame([input_features], columns=feature_order)

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df).max()

    return prediction, probability