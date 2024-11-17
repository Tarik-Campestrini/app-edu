from flask import  render_template, redirect, request,  Blueprint, g



jogos = Blueprint("jogos", __name__, url_prefix="/jogos")

#index
@jogos.route("/ping_pong", methods=["GET"])
def ping_pong():
  
    return render_template("jogos/ping_pong.html", user = g.user)
  
@jogos.route("/movimento", methods=["GET"])
def movimento():
  
    return render_template("jogos/movimento.html")

@jogos.route("/relogio7s", methods=["GET"])
def relogio7s():
  
    return render_template("jogos/relogio7s.html")