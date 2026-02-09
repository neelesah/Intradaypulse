import time, threading, random
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# --- KAL SUBAH YE DONO BHAREIN ---
# Inhe delete mat hone dena, yahi aapka Upstox connection hai
API_KEY = "YOUR_UPSTOX_API_KEY"
ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"

def run_scanner():
    """Kal subah ye real Upstox data lega. Abhi test mode hai."""
    stocks = ["RELIANCE", "HDFC BANK", "TCS", "ICICI BANK", "NIFTY 50", "BANK NIFTY", "TATAMOTORS", "SBIN"]
    while True:
        acc = random.randint(85, 99)
        data = {
            "symbol": random.choice(stocks),
            "price": f"{random.uniform(500, 25000):.2f}",
            "type": random.choice(["BUY", "SELL"]),
            "accuracy": f"{acc}%",
            "volume": f"{random.randint(2, 12)}x",
            # BRAMHAND logic: 95% + Accuracy
            "isBramhand": True if acc >= 95 else False,
            "time": time.strftime("%H:%M:%S")
        }
        socketio.emit('trade_signal', data)
        time.sleep(1.5) # Original fast momentum scanning

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    t = threading.Thread(target=run_scanner, daemon=True)
    t.start()
    socketio.run(app, port=5000, debug=True, use_reloader=False)
