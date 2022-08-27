const library = [];
const booksElements = [];

function showError(input){
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const pagesInput = document.querySelector('#pages');
  
  if(input.validity.valueMissing){
    input.nextElementSibling.textContent = 'this field is required';
  }else if(input.validity.patternMismatch){
    if(input === pagesInput){
      input.nextElementSibling.textContent = 'this field should contain only numbers';
    }else{
      input.nextElementSibling.textContent = 'this field should contain only 5-20 letters'
    }
  }

  if(input === pagesInput){
    if(input.validity.rangeOverflow){
      input.nextElementSibling.textContent = 'pages number can\'t be greater than 1000';
    }else if(input.validity.rangeUnderflow){
      input.nextElementSibling.textContent = 'pages number can\'t be lower than 10';
    }
  }
  input.nextElementSibling.classList.add = 'active';
}

const bindEvents = (function(){
  const addBtn = document.querySelector('.add');
  const removeBtn = document.querySelector('.remove');
  const formBtn = document.querySelector('.form-btn');
  const changeStatusBtn = document.querySelector('.changeStatus');
  const inputs = document.querySelectorAll('.inputs');
  
  addBtn.addEventListener('click', () => {
    form.showForm();
  });

  formBtn.addEventListener('click', () => {
    let holder = true;
    inputs.forEach((input) => {
      if(!input.validity.valid){
        holder = false;
        showError(input);
      }
    })
    if(holder === true){
      form.hideForm();
      add();
    }
  });

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if(input.validity.valid){
        input.nextElementSibling.textContent = '';
        input.nextElementSibling.classList.remove = 'active';
      }
    })
  })

  removeBtn.addEventListener('click', () => {
    side.clearSide();
    remove()
  })

  changeStatusBtn.addEventListener('click', () => {
    changeStatus();
    side.renderSide(library[findSelectedBook()]);
  })
})()

const form = (function(){
  const formContainer = document.querySelector('.form-container');
  const bookForm = document.querySelector('.book-form');

  function showForm(){
    formContainer.style.visibility = 'visible';
    bookForm.style.transform = 'scale(1)'
  }

  function hideForm(){
    formContainer.style.visibility = 'hidden';
    bookForm.setAttribute('style', 'transform:scale(0)');
  }

  return {
    showForm: showForm,
    hideForm: hideForm,
  }
})()

const side = (function(){
  let sideTitle = document.querySelector('.title span');
  let sideAuthor = document.querySelector('.author span');
  let sidePages = document.querySelector('.pages span');
  let sideStatus = document.querySelector('.status span');

  function clearSide(){
    sideTitle.textContent = '';
    sideAuthor.textContent = '';
    sidePages.textContent = '';
    sideStatus.textContent = '';
  }

  function renderSide(book){
    sideTitle.textContent = book.title;
    sideAuthor.textContent = book.author;
    sidePages.textContent = book.pages;
    if(book.status === true){
      sideStatus.textContent = 'Read';
    }else{
      sideStatus.textContent = 'Not Read';
    }
  }

  return{clearSide, renderSide};
})()

function add(){
  const book = BookFactory();

  library.push(book);
  side.renderSide(book);
  renderBooks();
}

function BookFactory(){
  const book = {};
  book.title = document.querySelector('#title').value;;
  book.author = document.querySelector('#author').value;
  book.pages = document.querySelector('#pages').value;
  book.status = document.querySelector('#status').checked;
  return book;
}

function renderBooks(){
  const bookContainer = document.querySelector('.main');
  bookContainer.innerHTML = ''

  for(let book of library){
    const bookEle = createBookElement();
    bookEle.textContent = book.title;
    bookContainer.appendChild(bookEle);
  }
  select()
}

function createBookElement(){
  const bookEle = document.createElement('div');
  styleBookElement(bookEle);
  booksElements.push(bookEle);
  return bookEle;
}

function styleBookElement(element){
  for(let book of booksElements){
    book.classList.remove('selected');
  }
  element.classList.add('book', 'selected')
}

//created a function so books get updated when an new book is added//
function select(){
  const books = document.querySelectorAll('.book');
  books.forEach(element => {
    element.addEventListener('click', () => {
      let index = Array.from(books).indexOf(element);
      side.renderSide(library[index]);
      styleBookElement(element);
    })
  })
}

function remove(){
  let index = findSelectedBook();
  library.splice(index,1);
  renderBooks();
}

function changeStatus(){
  let index = findSelectedBook();
  if(library[index].status === true){
    library[index].status = false;
  }else if(library[index].status === false){
    library[index].status = true;
  }
}

function findSelectedBook(){
  const books = document.querySelectorAll('.book');
  let index;
  for(let i of books){
    if(i.classList.contains('selected')){
      index = Array.from(books).indexOf(i)
    }
  }
  return index
};