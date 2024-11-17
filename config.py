class Config():
  DEBUG =True
  TESTING = True
  
  
  
#Configuração DataBase
  
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_DATABASE_URI = "mysql+pymysql://u725745694_trk:MgT+i8#0Xt@srv1196.hstgr.io:3306/u725745694_app_edu"
  #SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@localhost:3306/app-edu"
class ProductionConfig(Config):
  DEBUG = False
  
class DevelopmentConfig(Config):
  SECRET_KEY = "SECRET_KEY"  
  DEBUG =True
  TESTING = True  