import pandas as pd
import pdfplumber
import os

def parse_financial_file(file_path: str) -> dict:
    """
    Detect file type and route to correct parser
    """
    if file_path.endswith(".xlsx"):
        return parse_excel(file_path)
    elif file_path.endswith(".pdf"):
        return parse_pdf(file_path)
    else:
        raise ValueError("Unsupported file format")


# =========================
# 📊 EXCEL PARSER
# =========================
def parse_excel(file_path: str) -> dict:
    xl = pd.ExcelFile(file_path)

    required_sheets = [
        "Business_Info",
        "Revenue",
        "Expenses",
        "Cash_Flow",
        "Loans",
        "Working_Capital",
        "Compliance"
    ]

    for sheet in required_sheets:
        if sheet not in xl.sheet_names:
            raise ValueError(f"Missing required sheet: {sheet}")

    # Business Info
    business_df = xl.parse("Business_Info")
    business_name = business_df.loc[0, "Business_Name"]

    # Revenue
    revenue_df = xl.parse("Revenue")
    total_revenue = revenue_df["Amount"].sum()

    # Expenses
    expenses_df = xl.parse("Expenses")
    total_expenses = expenses_df["Amount"].sum()

    # Cash Flow
    cash_df = xl.parse("Cash_Flow")
    cash_inflow = cash_df[cash_df["Type"] == "Inflow"]["Amount"].sum()
    cash_outflow = cash_df[cash_df["Type"] == "Outflow"]["Amount"].sum()

    # Loans
    loans_df = xl.parse("Loans")
    total_loans = loans_df["Outstanding_Amount"].sum()

    # Working Capital
    wc_df = xl.parse("Working_Capital")
    receivables = wc_df["Receivables"].sum()
    payables = wc_df["Payables"].sum()

    # Compliance
    compliance_df = xl.parse("Compliance")
    compliance_issues = compliance_df[compliance_df["Status"] == "Non-Compliant"].shape[0]

    return {
        "business_name": business_name,
        "revenue": total_revenue,
        "expenses": total_expenses,
        "cash_inflow": cash_inflow,
        "cash_outflow": cash_outflow,
        "loans": total_loans,
        "receivables": receivables,
        "payables": payables,
        "compliance_issues": compliance_issues
    }


# =========================
# 📄 PDF PARSER (TEXT-BASED)
# =========================
def parse_pdf(file_path: str) -> dict:
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"

    lines = text.split("\n")

    def find_value(label):
        for line in lines:
            if label in line:
                return float(line.split(":")[-1].strip())
        return 0.0

    def find_text(label):
        for line in lines:
            if label in line:
                return line.split(":")[-1].strip()
        return ""

    return {
        "business_name": find_text("Business Name"),
        "revenue": find_value("Total Revenue"),
        "expenses": find_value("Total Expenses"),
        "cash_inflow": find_value("Cash Inflow"),
        "cash_outflow": find_value("Cash Outflow"),
        "loans": find_value("Total Loans"),
        "receivables": find_value("Receivables"),
        "payables": find_value("Payables"),
        "compliance_issues": int(find_value("Compliance Issues"))
    }
