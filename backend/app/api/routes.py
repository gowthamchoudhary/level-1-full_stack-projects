from app.services.groq_services import ask_groq
from app.models.chat import Chat
from app.db.database import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/ask")
def ask_anything(question:str,db:Session=Depends(get_db)):
    try:
        answer = ask_groq(question)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    data = Chat(question=question,answer=answer)
    db.add(data)
    db.commit()
    db.refresh(data)

    return {"answer":answer}

@router.get("/history")
def view_history(db:Session=Depends(get_db)):
    user_db = db.query(Chat).all()
    if not user_db:
        raise HTTPException(status_code=404,detail="user doesnt exits")
    return user_db


