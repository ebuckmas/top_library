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
    
//function to take in user's input to create a new book and add to myLibrary array
    
function addBookToLibrary(userTitle, userAuthor, userPages, userRead) {
    let userBook = new Book(userTitle, userAuthor, userPages, userRead);
    myLibrary.push(userBook);
}
    
//initializing a few books to start the array
    
addBookToLibrary('Game of Thrones', 'George R.R. Martin', 1000, 'read');
    
addBookToLibrary('1984', 'George Orwell', 250, 'read');

//function to create new cards and append to DOM
const library = document.querySelector('.library');

function createCard(title, author, pages, read, arrayIndex) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', arrayIndex);
    
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
    
    const closeButton = document.createElement('button');
    closeButton.setAttribute('class', 'remove');
    closeButton.textContent = 'Remove';
    card.appendChild(closeButton);
    
    const index = document.createElement('p');
    index.textContent = arrayIndex;
    card.appendChild(index);
    
    library.appendChild(card);
}

//function to reset library

function resetLibrary(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//function to loop through array and create cards for each book

let removeButton;

function createLibrary(array) {
        
    resetLibrary(library);
    
    array.forEach((obj, index) => {
        //console.log(index);
        createCard(obj.title, obj.author, obj.pages, obj.read, index);
    })

    initializeRemoveButton();
}

//initialize remove button

function initializeRemoveButton() {
    
    removeButton = document.querySelectorAll('.remove');
    //console.log(removeButton);
    removeButton.forEach(button => {
        button.addEventListener('click', (event) => {
            //console.log(event.originalTarget.parentElement.id);
            removeBook(event.originalTarget.parentElement.id);
        })
    })
}

//function to remove item from library

function removeBook(index) {
    myLibrary.splice(index, 1);
    createLibrary(myLibrary);
}


//logic for modal window

const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger');
const closeButton = document.querySelector('.close-button');
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', handleUserInput);
trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

function toggleModal() {
    modal.classList.toggle('show-modal');
}

function windowOnClick(e) {
    if (e.target === modal) {
        toggleModal();
    }
} 


//function to retrieve user data once 'submit' button is pressed

function handleUserInput() {
    const titleValue = document.getElementById('title').value;
    const authorValue = document.getElementById('author').value;
    const pagesValue = document.getElementById('pages').value;
    const readValue = document.getElementById('read').value;

    addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
    createLibrary(myLibrary);
    toggleModal();
}



createLibrary(myLibrary);