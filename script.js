const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

document.addEventListener('DOMContentLoaded', loadBooks);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const status = document.getElementById('status').value;

  if (title && author) {
    const book = { title, author, status };
    addBook(book);
    saveBook(book);
    form.reset();
  }
});

function addBook(book) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span><strong>${book.title}</strong> by ${book.author} (${book.status})</span>
    <button class="delete">❌</button>
  `;
  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
    removeBook(book.title);
  });
  bookList.appendChild(li);
}

function saveBook(book) {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.forEach(addBook);
}

function removeBook(title) {
  let books = JSON.parse(localStorage.getItem('books')) || [];
  books = books.filter(b => b.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
}

function toggleTheme() {
        document.body.classList.toggle('dark-mode');
}