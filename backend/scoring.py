def calculate_financial_score(data: dict) -> dict:
    revenue = data["revenue"]
    expenses = data["expenses"]
    cash_inflow = data["cash_inflow"]
    cash_outflow = data["cash_outflow"]
    loans = data["loans"]
    receivables = data["receivables"]
    payables = data["payables"]
    compliance_issues = data["compliance_issues"]

    # =========================
    # Key Metrics
    # =========================
    profit = revenue - expenses
    profit_margin = (profit / revenue) * 100 if revenue > 0 else 0

    net_cash_flow = cash_inflow - cash_outflow
    cash_flow_ratio = (cash_inflow / cash_outflow) if cash_outflow > 0 else 0

    debt_ratio = (loans / revenue) if revenue > 0 else 0

    working_capital = receivables - payables

    # =========================
    # Scoring Logic (0–100)
    # =========================
    score = 0

    # Profitability (30 points)
    if profit_margin > 20:
        score += 30
    elif profit_margin > 10:
        score += 20
    elif profit_margin > 0:
        score += 10

    # Cash Flow Health (25 points)
    if net_cash_flow > 0:
        score += 25
    elif cash_flow_ratio > 1:
        score += 15
    else:
        score += 5

    # Debt Burden (20 points)
    if debt_ratio < 0.3:
        score += 20
    elif debt_ratio < 0.6:
        score += 10
    else:
        score += 5

    # Working Capital (15 points)
    if working_capital > 0:
        score += 15
    else:
        score += 5

    # Compliance (10 points)
    if compliance_issues == 0:
        score += 10
    else:
        score += max(0, 10 - compliance_issues * 2)

    # =========================
    # Risk Level
    # =========================
    if score >= 75:
        risk_level = "Low"
    elif score >= 50:
        risk_level = "Medium"
    else:
        risk_level = "High"

    return {
    "score": int(score),
    "risk_level": str(risk_level),
    "metrics": {
        "profit_margin_percent": float(round(profit_margin, 2)),
        "net_cash_flow": float(net_cash_flow),
        "debt_ratio": float(round(debt_ratio, 2)),
        "working_capital": float(working_capital),
        "compliance_issues": int(compliance_issues)
    }
}

