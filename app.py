from flask import Flask, render_template, request, redirect, url_for, make_response, jsonify
from flask_cors import CORS
from models.user import db, User
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'brush_hose.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')
app.config['DEBUG'] = True
db.init_app(app)

instance_path = os.path.join(basedir, 'instance')
if not os.path.exists(instance_path):
    os.makedirs(instance_path)

with app.app_context():
    try:
        db.create_all()
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")

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
        name = data.get('name')
        email_address = data.get('email_address')
        location = data.get('location')

        if not all([name, email_address, location]):
            return jsonify({'error': 'Missing required fields'}), 400

        new_user = User(name=name, email_address=email_address, location=location)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User stored successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/view_client_detail', methods=['GET', 'POST'])
def view_client_detail():
    if request.method == 'POST':
        password = request.form.get('password', '').strip()
        expected_password = os.getenv('ADMIN_PASSWORD', 'admin').strip()
        print(f"Received password: '{password}', Expected: '{expected_password}'")
        if password == expected_password:
            try:
                users = User.query.all() or []
                print(f"Queried users: {len(users)} found")
                return render_template('view_client_detail.html', users=users, error=None)
            except Exception as e:
                print(f"Error querying users: {e}")
                return render_template('view_client_detail.html', users=[], error="Database error. Please try again.")
        else:
            print("Password incorrect")
            return render_template('view_client_detail.html', users=None, error='Incorrect password. Please try again.')
    return render_template('view_client_detail.html', users=None, error=None)

if __name__ == '__main__':
    app.run(debug=True)