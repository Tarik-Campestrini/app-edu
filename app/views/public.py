from flask import  render_template, redirect, request,  Blueprint



public = Blueprint("public", __name__, url_prefix="/")

#index
@public.route("/", methods=["GET"])
def index():
  
    return render_template("auth/login.html")