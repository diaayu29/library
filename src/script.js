const add = document.getElementById('donne');
const titleData = document.getElementById('title');
const yearData = document.getElementsByClassName('year')[0];
const authorData = document.getElementsByClassName('author')[0];
const completed = document.getElementsByTagName('table');
const content = document.getElementById('content');
const popupDetail = document.querySelector('.popup');
const statusData = document.getElementsByName('status');
let storageLibrary = [];



function newLibrary(id, title, author, year, isComplete) {
  let library = {};
  library.id = id;
  library.title = title;
  library.author = author;
  library.year = year;
  library.isComplete = isComplete;
  return library;
}

const storage = function() {
  if(typeof (Storage) !== undefined) {
    console.log("Local Storage available"); 
  } else {
    console.log("Upss!! Local Storage unavailable, your data will gone after page reload");
  }
};

storage();

function deleteBook (el) {
  if(el.classList.contains('fa-trash')) {
    el.parentElement.parentElement.remove();
  }
}

function changeStatusCompleted(e) {
  if(e.classList.contains('uncomplete')) {
    e.parentElement.parentElement.remove();
  }
}

function ChangeStatusUncompleted(e) {
  if(e.classList.contains('complete')) {
    e.parentElement.parentElement.remove();
  }
}

let getDataLocalStorage = JSON.parse(localStorage.getItem('books'));

let store = {
  getBooksData() {
    let books = [];
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  },
  addBooksData(book) {
    const books = store.getBooksData();
    books.push(book);
    
    localStorage.setItem('books', JSON.stringify(books));
    return books;
  }
};

store.getBooksData();

const checkStatus = {
  addNewBookData : function() {
    let libraryBook = newLibrary(new Date().getTime()+(5*24*60*60*1000), titleData.value, authorData.value, yearData.value, isComplete);
    return libraryBook;
  },
  statusDetail : function Status() {
    const row = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const button = document.createElement('button');
    const trash = document.createElement('i');
    td1.innerText = `${checkStatus.addNewBookData().title}`;
    td2.innerText = `${checkStatus.addNewBookData().author}`;
    td3.innerText = `${checkStatus.addNewBookData().year}`  ;
    trash.className = "fas fa-trash";
    for(let i = 0; i < statusData.length; i++) {
      if(isComplete == false) {
        button.innerText = "uncompleted";
        button.className = "uncomplete";
        button.id = "hallo";
        trash.id = checkStatus.addNewBookData().id;
        completed[1].appendChild(row);
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        td4.appendChild(button);
        row.appendChild(td5);
        td5.appendChild(trash);
      } else if (isComplete == true) {
        button.innerText = "completed";
        button.className = "complete";
        button.id = "hallo";
        trash.id = checkStatus.addNewBookData().id;
        completed[0].appendChild(row);
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        td4.appendChild(button);
        row.appendChild(td5);
        td5.appendChild(trash);
      }
    }
  }
};

function refreshPage(){
  window.location.reload();
} 

add.addEventListener('click', () => {
  for(let i = 0; i < statusData.length; i++) {
    if(statusData[i].checked && titleData.value !== "" && yearData.value !== "" && authorData.value !== "") {
      if(statusData[i].value == "done") {
        isComplete = true
        store.addBooksData(checkStatus.addNewBookData()); 
      } else if(statusData[i].value == "ongoing") {
        isComplete = false
        store.addBooksData(checkStatus.addNewBookData()); 
      }
      checkStatus.statusDetail();
      storageLibrary.push(checkStatus.addNewBookData());
    }
  }
});



document.querySelector('.okeee').addEventListener('click', () => {
  document.querySelector('.layout-bg').classList.remove('active');
  document.querySelector('.delete-success').classList.remove('active');
  refreshPage();
});

document.querySelector('#donne').addEventListener('click', () => {
  if(titleData.value === "" || yearData.value === "" || authorData.value === "") {
    document.querySelector('.failed').classList.add('active');
    document.querySelector('.layout-bg').classList.add('active');
  } else {
    document.querySelector('.popup-done').classList.add('active');
    document.querySelector('.layout-bg').classList.add('active');
  }
  titleData.value = "";
  yearData.value = "";
  authorData.value = "";

});

document.querySelector('#ok').addEventListener('click',() => {
  document.querySelector('.popup-done').classList.remove('active');
  document.querySelector('.layout-bg').classList.remove('active');
  refreshPage();
});

document.querySelector('.okee').addEventListener('click', () => {
  document.querySelector('.failed').classList.remove('active');
  document.querySelector('.layout-bg').classList.remove('active');
});

function displayData() {
  if(getDataLocalStorage == null) {
    console.log('halo')
  } else if(getDataLocalStorage != null) {
    getDataLocalStorage.forEach((book) => {
      const row = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const td3 = document.createElement('td');
      const td4 = document.createElement('td');
      const td5 = document.createElement('td');
      const button = document.createElement('button');
      const trash = document.createElement('i');
      td1.innerText = `${book.title}`
      td2.innerText = `${book.author}`
      td3.innerText = `${book.year}`
      trash.className = "fas fa-trash"
      if (book.isComplete == false) {
        button.innerHTML = "uncompleted"
        button.className = "uncomplete"
        button.id = book.id
        trash.id = book.id
        completed[1].appendChild(row)
        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        row.appendChild(td4)
        td4.appendChild(button);
        row.appendChild(td5)
        td5.appendChild(trash);
      } else if (book.isComplete == true) {
        button.innerHTML = "completed"
        button.className = "complete"
        button.id = book.id
        trash.id = book.id
        completed[0].appendChild(row)
        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        row.appendChild(td4)
        td4.appendChild(button);
        row.appendChild(td5)
        td5.appendChild(trash);
      }
    });
  }
}

displayData();

function deleteBook() {
const sampah = document.querySelectorAll('.fa-trash')
  for(let j = 0; j < getDataLocalStorage.length; j++) {
    document.addEventListener('click',() => {
      [].forEach.call(sampah, function(ele) {
        ele.addEventListener('click', function(e) {
          document.getElementById('deleteAlert').classList.add('active')
          document.querySelector('.layout-bg').classList.add('active');
          document.getElementById('yes').addEventListener('click', () => {
            console.log(e.target.id)
            if(getDataLocalStorage[j].id == e.target.id) {
              console.log(e.target.id)
              console.log(getDataLocalStorage[j].id)
              getDataLocalStorage.splice(j, 1)
              console.log('terhapus')
              localStorage.setItem('books', JSON.stringify(getDataLocalStorage))
            } else {
              console.log('tidak')
            }
            document.querySelector('.layout-bg').classList.add('active');
            document.querySelector('.delete-success').classList.add('active');
            deleteBook(e.target);
          })
          document.getElementById('no').addEventListener('click', () => {
            document.getElementById('deleteAlert').classList.remove('active');
            document.querySelector('.layout-bg').classList.remove('active');
          });
        });
      });
    });
  }
}

deleteBook()

document.body.getElementsByClassName('library')[0].addEventListener('click', () => {
  getDataLocalStorage.forEach(() => {
    let element = document.querySelectorAll('.complete');
    let element2 = document.querySelectorAll('.uncomplete');
    for(let x = 0; x < getDataLocalStorage.length; x++) {
      if(getDataLocalStorage[x].isComplete == false) {
        [].forEach.call(element2, function(elem) {
          elem.addEventListener('click', function(e) {
            if(getDataLocalStorage[x].id == e.target.id) {
              let elementtt = (e.target.parentElement.parentElement);
              completed[0].appendChild(elementtt);
              e.target.innerHTML = 'completed';
              e.target.className = 'complete';
              getDataLocalStorage[x].isComplete = true;         
              let json = JSON.stringify(getDataLocalStorage);
              window.localStorage.setItem("books", json);
            }
          });
        });
      }
    }
    for(let z = 0; z < getDataLocalStorage.length; z++) {
      if(getDataLocalStorage[z].isComplete == true) {
        [].forEach.call(element, function(elem) {
          elem.addEventListener('click', function(e) {
            if(getDataLocalStorage[z].id == e.target.id) {
              getDataLocalStorage[z].isComplete = false
              let elementtt = (e.target.parentElement.parentElement);
              completed[1].appendChild(elementtt);
              e.target.innerHTML = 'uncompleted';
              e.target.className = 'uncomplete';
              getDataLocalStorage[z].isComplete = false;
              let json = JSON.stringify(getDataLocalStorage);
              window.localStorage.setItem("books", json);
            }
          });
        });
      }
    }
  });
});

function myFunction() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("library");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}















