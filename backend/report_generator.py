from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import tempfile
import os


def generate_pdf_report(business_name, score_data, ai_text):
    """
    Generates a financial health PDF report
    Returns path to generated PDF
    """

    fd, path = tempfile.mkstemp(suffix=".pdf")
    os.close(fd)

    c = canvas.Canvas(path, pagesize=A4)
    width, height = A4

    y = height - 50

    # Title
    c.setFont("Helvetica-Bold", 20)
    c.drawString(50, y, "SME Financial Health Report")
    y -= 40

    # Business Name
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y, f"Business: {business_name}")
    y -= 30

    # Score & Risk
    c.setFont("Helvetica", 12)
    c.drawString(50, y, f"Financial Score: {score_data['score']} / 100")
    y -= 20
    c.drawString(50, y, f"Risk Level: {score_data['risk_level']}")
    y -= 30

    # Metrics
    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, y, "Key Financial Metrics")
    y -= 20

    c.setFont("Helvetica", 11)
    for k, v in score_data["metrics"].items():
        c.drawString(60, y, f"- {k.replace('_', ' ').title()}: {v}")
        y -= 18

    y -= 20

    # AI Analysis
    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, y, "AI Financial Analysis")
    y -= 20

    c.setFont("Helvetica", 10)
    for line in ai_text.split("\n"):
        if y < 50:
            c.showPage()
            y = height - 50
            c.setFont("Helvetica", 10)
        c.drawString(50, y, line)
        y -= 14

    c.showPage()
    c.save()

    return path
