import os
from dotenv import load_dotenv

load_dotenv()

def generate_ai_analysis(score_data: dict) -> str:
    """
    SAFE AI layer.
    Never calls OpenAI if quota/key is missing.
    Never crashes backend.
    """

    # 🚫 HARD DISABLE AI CALL (for quota safety)
    # You can re-enable later when quota is available

    return (
        "AI Advisory Summary:\n\n"
        f"- Financial Score: {score_data['score']} / 100\n"
        f"- Risk Level: {score_data['risk_level']}\n\n"
        "Key Observations:\n"
        "- Financial metrics were computed using deterministic rules.\n"
        "- Current risk level is based on profitability, cash flow, debt, and compliance.\n\n"
        "Recommendations:\n"
        "1. Improve cash flow consistency.\n"
        "2. Reduce debt exposure where possible.\n"
        "3. Maintain strong compliance discipline.\n"
        "4. Monitor margins regularly.\n\n"
        "(Note: Live AI recommendations are disabled due to API quota limits.)"
    )
