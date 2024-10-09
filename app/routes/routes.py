from flask import render_template
from app import app


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/cadastrar")
def cadastrar():
    return render_template("cadastrar.html")
