import { NextResponse } from "next/server";
import { convertToBackendFormat } from "@/lib/assessment-data";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

interface PredictRequest {
  name: string;
  submitted_at: string;
  responses: Record<string, number | string>;
}

export async function POST(request: Request) {
  let data: PredictRequest;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  // Convert frontend responses to backend format
  const backendResponses = convertToBackendFormat(data.responses);

  const flaskRequestBody = {
    name: data.name,
    submitted_at: data.submitted_at,
    ...backendResponses,
  };

  const apiUrl = "http://127.0.0.1:5000/predict";

  try {
    // -------------------------
    // CALL FLASK MODEL
    // -------------------------
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flaskRequestBody),
    });

    if (!response.ok) {
      throw new Error(`Flask API error: ${response.statusText}`);
    }

    const result = await response.json();

    console.log("Flask prediction:", result);



    const finalResponse = {
      // prediction: result.prediction,
      prediction: result.prediction,
      confidence: result.confidence_score,
      // evaluation: aiOutput.evaluation,
      recommendations: [result.mental_health_tip],
      name: data.name,
      submitted_at: data.submitted_at,
    };

    console.log("Final API response:", finalResponse);

    return NextResponse.json(finalResponse);
  } catch (error) {
    console.error("Prediction error:", error);
    return generateMockResponse(data);
  }
}

function generateMockResponse(data: PredictRequest) {
  return NextResponse.json({
    prediction: 0,
    confidence: 0.7,
    evaluation: "Unable to fetch AI analysis.",
    recommendations: [
      "Maintain a healthy routine",
      "Stay connected with friends and family",
      "Exercise regularly",
      "Practice relaxation techniques",
      "Seek professional help if needed",
    ],
    name: data.name,
    submitted_at: data.submitted_at,
    mock: true,
  });
}
