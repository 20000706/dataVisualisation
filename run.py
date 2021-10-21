from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

AnimalShelterDB = 'AnimalShelter.db'

@app.route('/')
def index():
    db = sqlite3.connect(AnimalShelterDB)
    db.close()
    return render_template('index.html')