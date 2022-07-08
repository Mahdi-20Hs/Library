const addBtn = document.querySelector('button.add');
const removeBtn = document.querySelector('button.remove');
const changeBtn = document.querySelector('button.change');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.book-form');
const formBtn = document.querySelector('.form-btn');
const main = document.querySelector('.main');
const sideTitle = document.querySelector('.side .title span');
const sideAuthor = document.querySelector('.side .author span');
const sidePages = document.querySelector('.side .pages span');
const sideStatus = document.querySelector('.side .status span');

let booksObjects = [];
let booksElements = [];
let bookIndex;

function displayForm(visibility, scale){
  formContainer.setAttribute('style', `visibility:${visibility}`);
  form.setAttribute('style', `transform:scale(${scale})`)
}

function createElement(){
  main.innerHTML = '';
  booksElements = [];

  for(let i = 0; i < booksObjects.length; i++){

    let div = document.createElement('div');
    div.classList.add('card');
    div.textContent = booksObjects[i].title;
    if(i === booksObjects.length - 1){
      div.setAttribute('style', 'border: 3px solid #a3282c');
    }
    
    main.appendChild(div);
    booksElements.push(div);
  }
}

function setSideInfo(book){
  if(book){
    sideTitle.textContent = book.title;
    sideAuthor.textContent = book.author;
    sidePages.textContent = book.pages;
    sideStatus.textContent = book.status;
  }else{
    sideTitle.textContent = '';
    sideAuthor.textContent = '';
    sidePages.textContent = '';
    sideStatus.textContent = '';
  }
}

function selectBook(){
  booksElements.forEach((element) => {
    element.addEventListener('click', () => {
      
      for(let i = 0; i < booksElements.length; i++){
        booksElements[i].setAttribute('style', 'border:none');
      }
      element.setAttribute('style', 'border:3px solid #a3282c');
  
      bookIndex = booksElements.indexOf(element);
      sideTitle.textContent = booksObjects[bookIndex].title;
      sideAuthor.textContent = booksObjects[bookIndex].author;
      sidePages.textContent = booksObjects[bookIndex].pages;
      sideStatus.textContent = booksObjects[bookIndex].status;

    })
  })
}


formBtn.addEventListener('click', () => {

  function newBook(){
    this.title = document.querySelector('#title').value;
    this.author = document.querySelector('#author').value;
    this.pages = document.querySelector('#pages').value;
    this.status = (document.querySelector('#status').checked)?'Read': 'Not read';
  }
  
  let book = new newBook();
  booksObjects.push(book);
  bookIndex = booksObjects.length - 1;

  createElement();
  setSideInfo(book);
  displayForm('hidden', 0);
  selectBook();
  
})

addBtn.addEventListener('click', () => {
  displayForm('visible', 1)
})

removeBtn.addEventListener('click', () => {
  booksObjects.splice(bookIndex, 1);
  createElement();
  setSideInfo();
  selectBook();
})

changeBtn.addEventListener('click', () => {
  if(bookIndex !== undefined){
    if(booksObjects[bookIndex].status === 'Read'){
      booksObjects[bookIndex].status = 'Not read';
      setSideInfo(booksObjects[bookIndex])
    }else{
      booksObjects[bookIndex].status = 'Read';
      setSideInfo(booksObjects[bookIndex])
    }
  }
})