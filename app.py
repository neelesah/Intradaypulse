from flask import Flask, render_template, jsonify
import random
import time

app = Flask(__name__)

# Dummy list of NSE stocks for scanning
STOCKS = ["RELIANCE", "TCS", "HDFCBANK", "INFY", "SBIN", "TATAMOTORS", "ADANIENT", "ITC", "AXISBANK"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scan')
def scan():
    # Asli logic: Yahan API se data aayega. 
    # Abhi hum "Volume Spike" simulate kar rahe hain jo 100% sahi signal jaisa dikhe
    stock = random.choice(STOCKS)
    signal_type = "BUY" if random.random() > 0.5 else "SELL"
    price = round(random.uniform(500, 4000), 2)
    strength = random.randint(85, 99) # 100% ke kareeb accuracy dikhane ke liye
    
    return jsonify({
        "stock": stock,
        "type": signal_type,
        "price": price,
        "strength": strength,
        "timestamp": time.strftime('%H:%M:%S')
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
  
