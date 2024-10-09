from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)


app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "root@2023"
app.config["MYSQL_DB"] = "app-edu"


mysql = MySQL(app)
