import functools
from flask import  render_template, redirect, request,  Blueprint, flash, g, session, url_for 
from werkzeug.security import check_password_hash, generate_password_hash
from app.models.usuario import Usuario
from app import db

auth = Blueprint("auth", __name__, url_prefix="/auth")

#Cadastrar Usuario
@auth.route("/cadastrar", methods=["GET", "POST"])
def cadatrar():

    if request.method == "POST":
      nome = request.form.get("nome")
      email = request.form.get("email")
      password = request.form.get("password")
      
      usuario = Usuario(nome, email, generate_password_hash(password))
      
      error = None
      if not nome:
        error = "Digite um nome!"
        db.session.close()
      elif not email:
        error = 'Digite um nome e-mail!'
        db.session.close()
      elif not password:
        error = "Digite um nome e-mail!"
        db.session.closed()
      
      try:
        e_mail = usuario.query.filter_by(email = email).first()
      except Exception:   
        return render_template("auth/cadastrar.html")
      print(f"esse e o erro  {e_mail} {error}")
      if e_mail == None:
        
        db.session.add(usuario) 
        db.session.commit() 
        return render_template("auth/login.html")
      else:
        error = f"O e-mail {email} ja esta cadastrado!" 
        db.session.close() 
      flash(error)  
      
    return render_template("auth/cadastrar.html")
  
  #Logar Usuario
@auth.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":     
      email = request.form.get("email")
      password = request.form.get("password") 
      
      error = None      
      try:        
        usuario = Usuario.query.filter_by(email = email).first()  
      except Exception:   
        return render_template("auth/login.html")  
     
      if usuario == None:
        error = "Usuário não cadastrado"    
        db.session.close   
      elif not check_password_hash(usuario.password, password):
        error = "Senha Incorreta"  
        db.session.close 
      if error is None:
        session.clear()
        session['user_id'] = usuario.id  
        db.session.close()      
        return redirect(url_for("private.home"))
        
      flash(error)  
    return render_template("auth/login.html")
  
  
@auth.before_app_request  
def load_logged_in_user():
  user_id = session.get('user_id') 
  
  if user_id is None:
    g.user = None 
  else:
    g.user = Usuario.query.get_or_404(user_id)  
 
@auth.route("/logout")    
def logout():
  session.clear()
  return redirect(url_for("public.index"))     

def login_required(view):
  @functools.wraps(view)
  def wrapped_view(**kwargs):
    if g.user is None:
      return redirect(url_for("auth.login"))
    return view(**kwargs)
  return wrapped_view