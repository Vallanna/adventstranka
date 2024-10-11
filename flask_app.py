from flask import Flask, jsonify, request
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# Path to the users.json file
FILE_PATH = '/home/MatusLibak/mysite/users.json'

# Helper function to load the JSON file
def load_users():
    with open(FILE_PATH, 'r') as file:
        return json.load(file)
            

# Helper function to write to the JSON file
def write_users(users):
    with open(FILE_PATH, 'w') as file:
        json.dump(users, file, indent=4)

def sort_user(user):
    return user["score"]*10**7 - user["wrong_answers"]*10**4 - user["time"]*10**0

# Route to get all users
@app.route('/all_users', methods=['GET'])
def get_users():
    users = load_users()
    return jsonify(users)

# Route to add a new user
@app.route('/add_user', methods=['POST'])
def add_user():
    new_user = request.json
    users = load_users()
    users.append(new_user)
    write_users(users)
    return jsonify(new_user), 201

@app.route('/dashboard', methods=['GET'])
def dashboard():
    users = load_users()
    for user in users:
        for key in ("password", "members"):
            user.pop(key)
    users.sort(key=sort_user)
    return jsonify(users)

@app.route('/login_user', methods=['POST'])
def login_user():
    logging_user = request.json
    for user in load_users():
        if user['name'] == logging_user['name'] and user['password'] == logging_user['password']:
            logging_user = user
            logging_user.pop("password")
            return {
                "status": "success",
                "message": "User logged in successfully.",
                "user": logging_user
            }

    return {
        "status": "error",
        "message": "Invalid username or password."
    }

if __name__ == '__main__':
    app.run(debug=True)
