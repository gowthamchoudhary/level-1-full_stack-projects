import requests
from app.core.config import GROQ_API_KEY

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

def ask_groq(prompt:str) -> str:
   
    headers = {
        "Authorization":f"Bearer {GROQ_API_KEY}",
        "content-Type":"application/json"
    }
    payload = {
        "model":"llama-3.1-8b-instant",
        "messages":[
            {
                "role":"user",
                "content":prompt
            }
        ]
    }
    response = requests.post(GROQ_URL,
                             headers=headers,json=payload
                             )
    if response.status_code!=200:
        raise Exception(f"Groq API error :{response.text}")
    data = response.json()
    return data["choices"][0]["message"]["content"]


