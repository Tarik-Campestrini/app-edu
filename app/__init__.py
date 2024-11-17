from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object("config.ProductionConfig")
db = SQLAlchemy(app)

app.app_context().push()
db.create_all()

#Importar Vistas
from app.views.auth import auth
app.register_blueprint(auth)

from app.views.public import public
app.register_blueprint(public)

from app.views.private import private
app.register_blueprint(private)

from app.views.jogos import jogos
app.register_blueprint(jogos)
