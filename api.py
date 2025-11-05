from flask import Flask, jsonify, request, abort

app = Flask(__name__)

books = [
    {"id": 1, "title" : "The Hobbit", "author": "J.R.R. Tolkien"},
    {"id": 2, "title": "1984", "author": "George Orwell"}
]

next_id = 3

@app.route("/books", methods=["GET"])
def list_books():
    return jsonify(books)


@app.route("/books/<int:book_id>", methods=["GET"])
def get_book(book_id):
    for b in books: 
        if b["id"] == book_id:
            return jsonify(b)
    abort(404, description = "Book not found")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
