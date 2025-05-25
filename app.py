from flask import Flask, render_template
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
    return render_template('catalogue.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')  # Placeholder for Contact page

if __name__ == '__main__':
    app.run(debug=True)