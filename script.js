const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

document.addEventListener('DOMContentLoaded', loadBooks);

let selectedRating = 0; 

const formStars = document.querySelectorAll('#book-form .star');
formStars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = star.dataset.value;
        highlightStars(formStars, selectedRating);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const status = document.getElementById('status').value;

    if (title && author) {
        const book = { title, author, status, rating: selectedRating };
        addBook(book);
        saveBook(book);
        form.reset();
        selectedRating = 0;
        highlightStars(formStars, 0);
    }
});

function addBook(book) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span><strong>${book.title}</strong> by ${book.author} (${book.status})</span>
        <div class="rating-display">${generateStars(book.rating)}</div>
        <button class="delete">❌</button>
    `;

    li.querySelector('.delete').addEventListener('click', () => {
        li.remove();
        removeBook(book.title);
    });

    const ratingDiv = li.querySelector('.rating');
    setupEditableStars(ratingDiv, book)

    bookList.appendChild(li);
}

function generateStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="star-display" style="color: ${i <= rating ? 'gold' : 'gray'};">★</span>`;
    }
    return html;
}

function saveBook(book) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function updateBookRating(book){
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const index = books.findIndex(b => b.title === book.title);
    if (index !== -1) {
        books[index].rating = book.rating;
        localStorage.setItem('books', JSON.stringify(books));
    }
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

function highlightStars(stars, rating) {
    stars.forEach(star => {
        star.classList.toggle('selected', star.dataset.value <= rating);
    });
}

function generateStarsEditable(rating){
    let html = '';
    for(let i = 1; i <= 5; i++){
        html += `<button class="star" type="button" data-value="${i}" style="color: ${i <= rating ? 'gold' : 'gray'};">★</button>`;
        return html
    }
}


function setupEditableStars(ratingDiv, book){
    const stars = ratingDiv.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('mousover', () => {
            stars.forEach(s => s.style.color = s.dataset.value <=star.dataset.value ? 'gold' : 'gray');
        });

        star.addEventListener('mouseout', () => {
            stars.forEach(s => s.style.color = s.dataset.value <= book.rating ? 'gold' : 'gray');
        });

        star.addEventListener('click', () => {
            book.rating = parseInt(star.dataset.value);
            stars.forEach(s => s.style.color = s.dataset.value <= book.rating ? 'gold' : 'gray');
            updateBookRating(book);
        });
    });
} 

