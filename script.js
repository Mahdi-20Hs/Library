const addBtn = document.querySelector('button.add');
const removeBtn = document.querySelector('button.remove');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.book-form');
const formBtn = document.querySelector('.form-btn');
const main = document.querySelector('.main');
const sideTitle = document.querySelector('.side .title span');
const sideAuthor = document.querySelector('.side .author span');
const sidePages = document.querySelector('.side .pages span');
const sideState = document.querySelector('.side .state span');



function showForm(){
  formContainer.setAttribute('style', 'visibility:visible');
  form.setAttribute('style', 'transform:scale(1)')
}

addBtn.addEventListener('click', showForm)
let booksObjects = [];
let booksElements = [];
let index;

function createElement(){
  main.innerHTML = '';
  booksElements = [];
  for(let i = 0; i < booksObjects.length; i++){
    let div = document.createElement('div');
    div.classList.add('card');
    div.textContent = booksObjects[i].title;
    if(i === booksObjects.length - 1){
      div.setAttribute('style', 'border: 2px solid black')
    }
    main.appendChild(div);
    booksElements.push(div)
  }
}
function setSideInfo(book){
  if(book){
    sideTitle.textContent = book.title;
    sideAuthor.textContent = book.author;
    sidePages.textContent = book.pages;
    sideState.textContent = book.state;
  }else{
    sideTitle.textContent = '';
    sideAuthor.textContent = '';
    sidePages.textContent = '';
    sideState.textContent = '';
  }
}
formBtn.addEventListener('click', () => {

  function newBook(){
    this.title = document.querySelector('#title').value;
    this.author = document.querySelector('#author').value;
    this.pages = document.querySelector('#pages').value;
    this.state = (document.querySelector('#state').checked)?'Read': 'Not read';
  }

  let book = new newBook();

  
  booksObjects.push(book);

  index = booksObjects.length - 1;


  
  createElement()

  setSideInfo(book);

  formContainer.setAttribute('style', 'visibility:hidden');
  form.setAttribute('style', 'transform:scale(0)')

  selectBook();
  
})

function selectBook(){
  booksElements.forEach((element) => {
    element.addEventListener('click', () => {
      
      for(let i = 0; i < booksElements.length; i++){
        booksElements[i].setAttribute('style', 'border:none');
      }
      element.setAttribute('style', 'border:2px solid black');

      index = booksElements.indexOf(element);

      sideTitle.textContent = booksObjects[index].title;
      sideAuthor.textContent = booksObjects[index].author;
      sidePages.textContent = booksObjects[index].pages;
      sideState.textContent = booksObjects[index].state;


    })
  })
}



removeBtn.addEventListener('click', () => {
  booksObjects.splice(index, 1);
  createElement();
  setSideInfo();
  selectBook()
})

