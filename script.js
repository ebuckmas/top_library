//initialize library array

let myLibrary = [];

//book constructor function and method prototyping

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    // this.info = function() {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    // }
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

//function to take in user's input to create a new book

function addBookToLibrary(userTitle, userAuthor, userPages, userRead) {
    let userBook = new Book(userTitle, userAuthor, userPages, userRead);
    myLibrary.push(userBook);
}

//initializing a few books to start the array

addBookToLibrary('Game of Thrones', 'George R.R. Martin', 1000, 'read');

addBookToLibrary('1984', 'George Orwell', 250, 'read');

//function to loop through array and create cards for each book

function loopLibrary(array) {
    array.forEach(obj => {
        createCard(obj.title, obj.author, obj.pages, obj.read);
    })
}


//function to create new cards and append to DOM

function createCard(title, author, pages, read) {
    const library = document.querySelector('.library');
    const card = document.createElement('div');
    card.classList.add('card');
    
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = title;
    card.appendChild(bookTitle);
    
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = 'by ' + author;
    card.appendChild(bookAuthor);
    
    const bookPages = document.createElement('p');
    bookPages.textContent = pages + ' pages';
    card.appendChild(bookPages);
    
    const bookRead = document.createElement('p');
    bookRead.textContent = read;
    card.appendChild(bookRead);
    
    library.appendChild(card);
}

//listen for page load and load cards from array

window.addEventListener('load', (e) => {
    loopLibrary(myLibrary);
    console.log('loaded');
});

const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger');
const closeButton = document.querySelector('.close-button');
const submitButton = document.getElementById('submitButton');


function toggleModal() {
    modal.classList.toggle('show-modal');
}

function windowOnClick(e) {
    if (e.target === modal) {
        toggleModal();
    }
}

submitButton.addEventListener('click', retrieveUserInput);
trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

function retrieveUserInput() {
    let titleValue = document.getElementById('title').value;
    let authorValue = document.getElementById('author').value;
    let pagesValue = document.getElementById('pages').value;
    let readValue = document.getElementById('read').value;

    addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
    loopLibrary(myLibrary);
    toggleModal();
}
