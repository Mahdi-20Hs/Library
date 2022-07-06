const addBtn = document.querySelector('button.add');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.book-form');
const formBtn = document.querySelector('.form-btn');
const main = document.querySelector('.main');
const sideTitle = document.querySelector('.side .title span');
const sideAuthor = document.querySelector('.side .author span');
const sidePages = document.querySelector('.side .pages span');
const sideState = document.querySelector('.side .state span');

let booksObjects = [];
let booksElements = [];

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
  booksObjects.push(book);
}

function createElement(book){
  let div = document.createElement('div');
  div.classList.add('card');
  div.textContent = book.title;
  main.appendChild(div);
  booksElements.push(div);
}

function setSideInfo(index){
  sideTitle.textContent = booksObjects[index].title;
  sideAuthor.textContent = booksObjects[index].author;
  sidePages.textContent = booksObjects[index].pages;

  if(booksObjects[index].state === true){
    sideState.textContent = 'Read';
  }else{
    sideState.textContent = 'Not Read';
  }
}

function renederBooks(){
  main.innerHTML = "";
  booksElements = [];

  for(let i = 0; i < booksObjects.length; i++){
    createElement(booksObjects[i]);
  }
}

function addBook(){
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let state = document.querySelector('#state').checked;

  let item = new book(title, author, pages, state);
  addBookToArr(item);

  renederBooks();

  setSideInfo(booksObjects.length - 1)
  booksElements.forEach((element) => {
    element.addEventListener('click', () => {
      let index = booksElements.indexOf(element);
      setSideInfo(index);
    })
  });
}

function submitInfo(){
  addBook();
  formContainer.setAttribute('style', 'visibility:hidden');
  form.setAttribute('style', 'transform:scale(0)')
}
formBtn.addEventListener('click', submitInfo);

