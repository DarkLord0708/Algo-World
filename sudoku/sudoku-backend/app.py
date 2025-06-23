from flask import Flask, jsonify
import requests

app = Flask(__name__)

SUDOKU_API_URL = "https://sudoku-api.vercel.app/api/dosuku"
HEADERS = {
    "X-Api-Key": "WS7vMXBCILJ+BB0gSUMzVA==2ZJi7FTDUMV7dLQn"
}

@app.route('/sudoku')
def get_sudoku():
    try:
        response = requests.get(SUDOKU_API_URL, headers=HEADERS)
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
