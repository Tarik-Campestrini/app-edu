from app import db

class Usuario(db.Model):
  __tablename__ = "usuarios"
  id = db.Column(db.Integer, primary_key=True,)
  nome = db.Column(db.String(50))
  email = db.Column(db.String(50))
  password = db.Column(db.Text)
  
  
  def __init__(self, nome, email, password) -> None:
    self.nome = nome
    self.email = email
    self.password = password
    
  def __repr__(self) -> str:
    return f'Usuario: {self.nome}' 