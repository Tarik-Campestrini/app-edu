from flask import  render_template, redirect, request,  Blueprint, g
from werkzeug.exceptions import abort
from app.models.usuario import Usuario
from app.views.auth import login_required


private = Blueprint("private", __name__, url_prefix="/private")

#Buscar um usuario
def get_user(id):
    user = Usuario.query.get_or_404(id)
    return user

#index
@private.route("/home", methods=["GET"])
@login_required
def home():
  
    return render_template("private/home.html", user = g.user)  

@private.route("/meus_cursos", methods=["GET"])
@login_required
def meus_cursos():
  
    return render_template("private/meus_cursos.html", user = g.user)  