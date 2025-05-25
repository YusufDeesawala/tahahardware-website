from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')  # Placeholder for About page

@app.route('/catalogue')
def catalogue():
    return render_template('catalogue.html')  # Placeholder for Catalogue page

@app.route('/contact')
def contact():
    return render_template('contact.html')  # Placeholder for Contact page

@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email')
    # Add logic to store email (e.g., in a database)
    print(f"Subscribed email: {email}")  # Temporary logging
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)