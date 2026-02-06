SME Financial Health AI 📊

An AI-driven financial diagnostics platform designed for Small and Medium Enterprises (SMEs). This tool ingests financial statements, computes critical health metrics using a proprietary scoring engine, and provides automated advisory insights via a modern, glassmorphic dashboard.

🌟 Key Features

Intelligent File Parsing: Supports both multi-sheet Excel (.xlsx) workbooks and text-based PDF financial statements.

Dynamic Health Scoring: A deterministic engine that evaluates businesses on a 0–100 scale across five pillars:

Profitability: Margin analysis.

Cash Flow: Inflow vs. Outflow ratios.

Debt Burden: Total loans relative to revenue.

Working Capital: Receivables vs. Payables.

Compliance: Automated check for regulatory red flags.

Automated AI Advisory: Generates executive summaries and actionable recommendations based on computed risk levels (LOW, MEDIUM, HIGH).

Professional PDF Reporting: Export the entire analysis into a clean, brandable PDF report for stakeholders.

Cyberpunk UI: High-performance React dashboard built with a "Deep Navy & Neon" theme using Tailwind CSS and Recharts.

🛠 Tech Stack

Frontend

Framework: React (Vite)

State Management: React Hooks

Styling: Tailwind CSS (Glassmorphism)

Visualization: Recharts & Lucide React

API Client: Axios

Backend

Framework: FastAPI (Python)

Data Science: Pandas & OpenPyXL

PDF Engine: ReportLab

Security: Cryptography (Fernet) for PII encryption

Database: PostgreSQL (with Docker support)

📂 Project Architecture

Bash



Fin_Health_AI/

├── frontend/             # React + Vite application

│   ├── src/

│   │   ├── components/   # Modular UI (ScoreCard, AIAnalysis, BarChart)

│   │   └── App.jsx       # Main dashboard orchestration

├── backend/              # FastAPI Server

│   ├── main.py           # API Endpoints (/analyze, /report)

│   ├── scoring.py        # Logic for health metrics

│   ├── file_parser.py    # Excel & PDF extraction logic

│   ├── report_generator.py # ReportLab PDF generation

│   └── security.py       # Data encryption layer

└── Data/                 # Sample datasets for testing

🚀 Getting Started

Option 1: Docker (Recommended)

Launch the entire stack (including the Database) with one command:

Bash



docker-compose up --build

Option 2: Manual Setup

1. Backend Setup

Bash



cd backend

pip install -r requirements.txt

uvicorn main:app --reload

Ensure you have an .env file with DATABASE_URL and ENCRYPTION_KEY.

2. Frontend Setup

Bash



cd frontend

npm install

npm run dev

📊 Scoring Logic Explained

The system uses a weighted algorithm to determine the final Health Score:

MetricWeightCriteriaProfitability30 ptsScore increases with Profit Margin %Cash Flow25 ptsPositive net cash flow adds max pointsDebt Ratio20 ptsLower debt-to-revenue ratios score higherWorking Capital15 ptsBased on Receivables vs. PayablesCompliance10 ptsDeductions for every non-compliant issue🔒 Security

PII Protection: Business names are encrypted using AES-256 (Fernet) before being stored in the database.

Temporary Processing: Uploaded files are processed in-memory or via temporary files and purged immediately after analysis to ensure data privacy.

📝 License

Distributed under the MIT License. See LICENSE for more information.

