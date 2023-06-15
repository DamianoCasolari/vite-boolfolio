// Ottenere la parola dall'elemento h1
const word = document.getElementById('word-effect-heading').textContent;

// Dividere la parola in lettere
const letters = word.split('');

// Creare elementi span per ogni lettera
const letterSpans = letters.map(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    return span;
});

// Rimuovere il contenuto dell'elemento h1
document.getElementById('word-effect-heading').textContent = '';

// Aggiungere le lettere sparpagliate al contenitore
const container = document.getElementById('word-effect-container');
letterSpans.forEach(span => {
    container.appendChild(span);
});

// Animazione per sistemare le lettere nella posizione corretta
letterSpans.forEach((span, index) => {
    span.style.position = 'absolute';
    span.style.top = `${getRandomNumber(0, container.clientHeight - span.offsetHeight)}px`;
    span.style.left = `${getRandomNumber(0, container.clientWidth - span.offsetWidth)}px`;

    // Utilizzare setTimeout per aggiungere un ritardo tra la comparsa delle lettere
    setTimeout(() => {
        span.style.transition = 'all 0.5s ease-in-out';
        span.style.opacity = '1';
        span.style.top = '50%';
        span.style.left = `${(index * 1.5) - (letterSpans.length / 3)}em`;
    }, 1000 + index * 100);
});

// Funzione di utilità per ottenere un numero casuale all'interno di un intervallo
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
