from sqlalchemy import create_engine

URL = "mysql+pymysql://root@localhost:3306/kurssienhallintajarjestelma"

engine = create_engine(URL)