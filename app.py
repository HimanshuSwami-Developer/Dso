from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# ✅ Proper CORS setup (important)
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"]
)

# ==========================
# EMAIL CONFIG
# ==========================
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
# EMAIL_ADDRESS = "desilentorder@gmail.com"
# EMAIL_PASSWORD = "brtq flgq ewfi jeuu"  # Gmail App Password

EMAIL_ADDRESS = "himanshuswami2810@gmail.com"
EMAIL_PASSWORD = "nhxl bqsl iefi iypd"  # Gmail App Password

# ==========================
# ROUTE
# ==========================
@app.route("/send-email", methods=["POST", "OPTIONS"])
def send_email():

    # ✅ Handle preflight request
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    data = request.get_json(silent=True)

    if not data:
        return jsonify({"success": False, "error": "Invalid JSON"}), 400

    name = data.get("name")
    phone = data.get("phone")
    email = data.get("email")
    service = data.get("service")
    message = data.get("message")

    if not all([name, phone, email, service, message]):
        return jsonify({"success": False, "error": "Missing fields"}), 400

    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = EMAIL_ADDRESS
        msg["Subject"] = f"New Service Request — {service}"

        body = f"""
New Service Request Received

Name   : {name}
Email  : {email}
Phone  : {phone}
Service: {service}

Message:
{message}
"""
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)

        return jsonify({"success": True}), 200

    except Exception as e:
        print("EMAIL ERROR:", e)
        return jsonify({"success": False, "error": "Email sending failed"}), 500


# ==========================
# RUN SERVER
# ==========================
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",   # ✅ IMPORTANT for LAN access
        port=5000,
        debug=True
    )
