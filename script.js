function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function showGenre(genreID) {
    document.querySelectorAll('.genre').forEach(c => c.classList.add('hidden'));

    const genre = document.getElementById(genreID);
    genre.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: "auto" });
}
