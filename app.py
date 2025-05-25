from flask import Flask, render_template, request, redirect, url_for, make_response, jsonify
from flask_cors import CORS
from models.user import db, User
import os

app = Flask(__name__)
CORS(app)

# Configure database
if os.getenv('DATABASE_URL'):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL').replace('postgres://', 'postgresql://')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brush_hose.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/catalogue')
def catalogue():
    return render_template('catalogue.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/contact/submit', methods=['POST'])
def contact_submit():
    name = request.form.get('name')
    email = request.form.get('email')
    category = request.form.get('category')
    message = request.form.get('message')
    print(f"Quotation Request: Name={name}, Email={email}, Category={category}, Message={message}")
    return redirect(url_for('contact'))

@app.route('/store-user', methods=['POST'])
def store_user():
    try:
        data = request.get_json()
        print(f"Received data: {data}")
        if not data:
            print("Error: No data provided")
            return jsonify({'error': 'No data provided'}), 400

        email_address = data.get('email_address')
        location = data.get('location')

        if not email_address or '@' not in email_address:
            print("Error: Invalid email address")
            return jsonify({'error': 'Valid email address required'}), 400

        existing_user = User.query.filter_by(email_address=email_address).first()
        if existing_user:
            print(f"User already exists: {email_address}")
            return jsonify({'message': 'User already exists'}), 200

        user = User(email_address=email_address, location=location)
        db.session.add(user)
        db.session.commit()
        print(f"User stored: {email_address}, {location}")

        return jsonify({'message': 'User stored successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error storing user: {str(e)}")
        return jsonify({'error': 'Failed to store user'}), 500

@app.route('/view_client_detail')
def view_client_detail():
    users = User.query.all()
    admin_password = os.getenv('ADMIN_PASSWORD', 'default_password')
    return render_template('view_client_detail.html', users=users, admin_password=admin_password)

if __name__ == '__main__':
    app.run(debug=True)