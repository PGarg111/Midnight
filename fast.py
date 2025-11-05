from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Book(BaseModel):
    id: int | None = None
    title: str
    author: str = ""

books: List[Book] = [
    Book(id = 1, title="The Hobbit", author="J.R.R Tolkien"),
    Book(id = 2, title="1984", author="George Orwell"),
]

next_id = 3

@app.get("/books", response_model=List[Book])
def list_books():
    return books

@app.get("/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    for b in books:
        if b.id == book_id:
            return b
    raise HTTPException(status_code=404, detail="Book not found")

