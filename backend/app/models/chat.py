from sqlalchemy import Column , Integer,Text
from app.db.database import Base

class Chat(Base):
    __tablename__ = "chat"
    id = Column(Integer,primary_key=True,index=True)
    question = Column(Text)
    answer = Column(Text)


