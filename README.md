

# SME Financial Health AI 📊

A full-stack AI-powered dashboard that evaluates the financial health of Small and Medium Enterprises (SMEs). It analyzes uploaded financial documents (Excel/PDF), computes key risk metrics, generates an AI advisory summary, and produces a downloadable PDF report.

*(Replace this link with an actual screenshot of your dashboard if available)*

## 🚀 Features

* **Financial Scoring:** Calculates a 0-100 health score based on liquidity, profitability, and compliance.
* **Risk Assessment:** Categorizes business risk as LOW, MEDIUM, or HIGH.
* **AI Advisory:** Generates bulleted observations and recommendations based on the data.
* **Visual Analytics:** Interactive charts for Profit Margin and Net Cash Flow.
* **PDF Reporting:** Generates a professional PDF report of the analysis.
* **Modern UI:** Dark-mode "Glassmorphism" design using React + Tailwind CSS.

## 🛠 Tech Stack

### Frontend

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Charts:** Recharts
* **HTTP Client:** Axios

### Backend

* **Framework:** FastAPI (Python)
* **Data Processing:** Pandas
* **Server:** Uvicorn

---

## 📂 Project Structure

```bash
Fin_Health_AI/
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/   # UI Components (ScoreCard, Charts, etc.)
│   │   ├── App.jsx       # Main Dashboard Logic
│   │   └── index.css     # Global Styles (Tailwind imports)
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── backend/              # Python API
    ├── main.py           # FastAPI Entry Point
    ├── file_parser.py    # Logic to read Excel/PDF
    ├── scoring.py        # Logic to calculate Score (0-100)
    ├── ai_engine.py      # Mock AI text generation
    └── report_generator.py # PDF generation logic

```

---

## ⚡ Setup Instructions

### Prerequisites

* Node.js (v16+)
* Python (v3.9+)

### 1. Backend Setup

1. Navigate to the directory where you saved your python scripts (e.g., `Downloads/Fin_Health_AI/backend` or root).
2. Install dependencies:
```bash
pip install fastapi uvicorn python-multipart pandas xlsxwriter

```


3. Run the server:
```bash
uvicorn main:app --reload --port 8000

```


*The API will be available at `http://127.0.0.1:8000*`

### 2. Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend

```


2. Install dependencies:
```bash
npm install axios lucide-react recharts

```


3. Run the development server:
```bash
npm run dev

```


4. Open the link provided (usually `http://localhost:5173`).

---

## 🧪 Testing Data Generation

To test the different risk scenarios (Low, Medium, High), use the provided Python script `Excel_Generator.py`.

1. Run the generator:
```bash
python Excel_Generator.py

```


2. This will create 5 distinct Excel files in your **Downloads** folder:
* `Apex_Solutions.xlsx` (Low Risk)
* `GreenWave_Enterprises.xlsx` (Medium Risk)
* `QuantumTech_Pvt_Ltd.xlsx` (Medium Risk - Non-Compliant)
* `Sai_Traders.xlsx` (High Risk)
* `Stellar_Imports.xlsx` (High Risk)



---

## 📖 Usage Guide

1. **Launch** both the Backend and Frontend terminals.
2. **Upload** one of the generated Excel files using the top bar.
3. **View** the real-time analysis:
* **Score Card:** See the circular gauge and risk badge.
* **AI Analysis:** Read the generated insights on the left panel.
* **Charts:** Observe the Profit Margin vs. Cash Flow on the right.


4. **Download** the full report by clicking "Download AI Report (PDF)".

---

## 🎨 Styling Notes

* **Theme:** Deep Navy / Neon Cyberpunk
* **Colors:**
* Background: `#0f111a`
* Card: `#161b2a`
* Success (Low Risk): `#4ade80` (Neon Green)
* Warning (Medium Risk): `#facc15` (Yellow)
* Danger (High Risk): `#f87171` (Red)



## 📄 License

This project is open-source and free to use for educational purposes.
