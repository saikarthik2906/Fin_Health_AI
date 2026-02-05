from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import tempfile
import os

from file_parser import parse_financial_file
from scoring import calculate_financial_score
from ai_engine import generate_ai_analysis
from report_generator import generate_pdf_report

# ------------------------
# App initialization
# ------------------------
app = FastAPI(title="SME Financial Health AI")

# Allow frontend access (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # OK for hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Health check
# ------------------------
@app.get("/")
def health_check():
    return {"status": "Backend running successfully"}

# ------------------------
# Analyze financials
# ------------------------
@app.post("/analyze")
async def analyze_financials(file: UploadFile = File(...)):
    temp_path = None
    try:
        suffix = os.path.splitext(file.filename)[1]

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            temp_path = tmp.name

        parsed_data = parse_financial_file(temp_path)
        score_data = calculate_financial_score(parsed_data)
        ai_result = generate_ai_analysis(score_data)

        return {
            "business_name": parsed_data["business_name"],
            "financial_score": int(score_data["score"]),
            "risk_level": score_data["risk_level"],
            "metrics": {
                k: float(v) if isinstance(v, (int, float)) else v
                for k, v in score_data["metrics"].items()
            },
            "ai_analysis": ai_result
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)

# ------------------------
# Download AI report
# ------------------------
@app.post("/report")
async def download_report(file: UploadFile = File(...)):
    temp_path = None
    try:
        suffix = os.path.splitext(file.filename)[1]

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            temp_path = tmp.name

        parsed_data = parse_financial_file(temp_path)
        score_data = calculate_financial_score(parsed_data)
        ai_text = generate_ai_analysis(score_data)

        pdf_path = generate_pdf_report(
            parsed_data["business_name"],
            score_data,
            ai_text
        )

        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename=f"{parsed_data['business_name']}_Financial_Report.pdf"
        )

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)

# ------------------------
# Run server
# ------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
