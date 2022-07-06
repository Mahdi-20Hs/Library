const addBtn = document.querySelector('.add-btn');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.book-form');
const formBtn = document.querySelector('.form-btn');
const main = document.querySelector('.main');
const books = [];

function showForm(){
  formContainer.setAttribute('style', 'visibility:visible');
  form.setAttribute('style', 'transform:scale(1)')
}

addBtn.addEventListener('click', showForm)

function book(title, author, pages, state){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.state = state
}

function addBookToArr(book){
  books.push(book);
}

function createElement(book){
  let div = document.createElement('div');
  div.classList.add('card');
  div.textContent = book.title;
  main.appendChild(div);
}

function addBook(){
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let state = document.querySelector('#state').value;

  let item = new book(title, author, pages, state);
  addBookToArr(item);

  main.innerHTML = "";

  for(let i = 0; i < books.length; i++){
    createElement(books[i]);
  }
  main.appendChild(addBtn);
}

function submitInfo(){
  addBook();
  formContainer.setAttribute('style', 'visibility:hidden');
  form.setAttribute('style', 'transform:scale(0)')
}
formBtn.addEventListener('click', submitInfo)
