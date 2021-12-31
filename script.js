/* query selectors */
const cardContainer = document.querySelector('.card-container');
const inputForm = document.querySelector('.input-form');
const addItemBtn = document.querySelector('.btn-add-item');
const searchBtn = document.querySelector('.btn-search');
const showAllBtn = document.querySelector('.btn-show-all');


/* create elements for populating the DOM */
const inputTitle = document.createElement("input");
const inputAuthorFirst = document.createElement("input");
const inputAuthorLast = document.createElement("input");
const inputPages = document.createElement("input");
const inputRead = document.createElement("input");
const inputSubmit = document.createElement("button");
const searchWindow = document.createElement('INPUT');

const labelTitle = document.createElement("span");
const labelAuthorFirst = document.createElement("span");
const labelAuthorLast = document.createElement("span");
const labelPages = document.createElement("span");
const labelRead = document.createElement("span");


/* add event Listener to add button*/
addItemBtn.addEventListener('click', (e) => createInputForm());
searchBtn.addEventListener('click', (e) => searchItem());
showAllBtn.addEventListener('click', (e) => showAll());


/* functions for the Library database */
class libConstructor {
    constructor(title, first, last, pages, read){
        this.title = title;
        this.authorFirst = first;
        this.authorLast = last;
        this.pages = pages;
        this.read = read; 
    }

    toggleRead(){
        console.log(this.title);
    }
    
    addRecord(){
        Library.push(this);
    }
}


function resetLibrary(){
    Library = [];
    let newRecord = new libConstructor('The Hobbit', 'J.R.R.', 'Tolkien', '295', 'not read');
    newRecord.addRecord();
    newRecord = new libConstructor('Cheese', 'A.', 'Vied', '660', 'read');
    newRecord.addRecord();
    newRecord = new libConstructor('Breakfast at Tiffany\'s', 'Truman', 'Capote', '157', 'read');
    newRecord.addRecord();
    newRecord = new libConstructor('My cat', 'Andi', 'Costa', '17', 'not read');
    newRecord.addRecord();
}

function readToggle(e){

    index = getLibraryIndex(e);
    console.log(index);
    if (e.target.innerText == 'read'){
        e.target.innerText = 'not read';
        
        Library[index].read = 'not read';
       
    } else if (e.target.innerText == 'not read'){
        e.target.innerText = 'read';

        Library[index].read = 'read';
        
        console.log(Library[index]);
    }
}



/* OTHER FUNCTIONS */
function emptyForm(){
    resetForm();

    labelTitle.textContent= 'Title';
    inputTitle.setAttribute("type", "text"); 
    inputTitle.setAttribute("id", "box-title");
    labelTitle.setAttribute("id", "box-label-title");
    labelTitle.appendChild(inputTitle);
    inputForm.appendChild(labelTitle);

    labelAuthorFirst.textContent= 'Author, first name';
    inputAuthorFirst.setAttribute("type", "text"); 
    inputAuthorFirst.setAttribute("id", "box-name-first");
    labelAuthorFirst.setAttribute("id", "box-label-name-first");
    labelAuthorFirst.appendChild(inputAuthorFirst);
    inputForm.appendChild(labelAuthorFirst);

    labelAuthorLast.textContent= 'Author, last name';
    inputAuthorLast.setAttribute("type", "text"); 
    inputAuthorLast.setAttribute("id", "box-name-last");
    labelAuthorLast.setAttribute("id", "box-label-name-last");
    labelAuthorLast.appendChild(inputAuthorLast);
    inputForm.appendChild(labelAuthorLast);

    labelPages.textContent= 'Number of pages';
    inputPages.setAttribute("type", "number"); 
    inputPages.setAttribute("id", "box-pages");
    labelPages.setAttribute("id", "box-label-pages");
    labelPages.appendChild(inputPages);
    inputForm.appendChild(labelPages);

    labelRead.textContent= 'Read?';
    inputRead.setAttribute("type", "checkbox"); 
    inputRead.setAttribute("id", "box-read");
    labelRead.setAttribute("id", "box-label-read");
    labelRead.appendChild(inputRead);
    inputForm.appendChild(labelRead);

    inputSubmit.setAttribute("type", "button"); 
    inputSubmit.setAttribute("id", "box-submit");
    inputSubmit.textContent = "submit";
    inputForm.appendChild(inputSubmit);
}


function createInputForm(){
    emptyForm()
 
    /* add listener to submit button */
    inputSubmit.addEventListener('click', handlerSubmitListener);
}    


function handlerSubmitListener(e){
    itemIsRepeated();

    if (inputTitle.value.length<1){
        alert("You need to input at least a title");     
    }else{
        submitInput(e);
    }    
}


function itemIsRepeated(){
    let repeatedTitle = Library.findIndex(element => element.title == inputTitle.value);

    if (repeatedTitle >= 0){
        alert(`There is already an item with this title in the database\n\nUse the search tool for displaying them`); 
    }    
    return repeatedTitle;
}


function getFormData(){
    let itemRead = inputRead.checked? "read": "not read"; 
    let itemPages = inputPages.value.length>0? inputPages.value: " ??"; 
    
    let record = [inputTitle.value, inputAuthorFirst.value, inputAuthorLast.value,
    itemPages, itemRead];       

    return record;
}


function submitInput(e){

    let newItem = new libConstructor(...getFormData());
    newItem.addRecord();
    
    resetCardContainer();
    resetForm();

    displayLibrary(Library);
}


function resetForm(){
    inputForm.innerHTML = '';
    inputTitle.value = '';
    inputAuthorFirst.value = '';
    inputAuthorLast.value = '';
    inputPages.value = '';
    inputRead.checked = false; 
    
    inputSubmit.removeEventListener('click', handlerSubmitListener);  
}


function resetCardContainer(){
    cardContainer.innerHTML = '';
}


function getFullName(item){
    let tmp = '';
    if ((item.authorFirst.length == 0) & (item.authorLast.length == 0)){
        tmp = 'by ??';
    } else if((item.authorFirst.length == 0) & (item.authorLast.length > 0)){
        tmp = 'by ' + item.authorLast;
    } else if ((item.authorFirst.length > 0) & (item.authorLast.length == 0)){
        tmp = 'by ' + item.authorFIrst;
    } else {
        tmp = 'by ' + item.authorFirst + ' ' + item.authorLast;
    }

    return tmp;
}


function displayLibrary(Library){

    Library.forEach(item => {

        let card = document.createElement('div');
        card.classList.add('card');

        let cardTitle = document.createElement('div');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = item.title;

        let cardAuthor = document.createElement('div');
        cardAuthor.classList.add('card-author');
        cardAuthor.innerText = getFullName(item);

        let cardPages = document.createElement('div');
        cardPages.classList.add('card-pages');
        cardPages.innerText= item.pages + ' pages';
        
        let readBtn = document.createElement('button');
        if (item.read == 'read'){
            readBtn.classList.add('btn-read');
            readBtn.innerText = 'read';
            readBtn.addEventListener('click', (e) => {readToggle(e)});
        } else if (item.read == 'not read'){
            readBtn.classList.add('btn-not-read');
            readBtn.innerText = 'not read';
            readBtn.addEventListener('click', (e) => {readToggle(e)});
        }
        
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn-delete');
        deleteBtn.innerText= "remove";
        deleteBtn.addEventListener('click', handlerDeleteListener) 

        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(readBtn);
        card.appendChild(deleteBtn);

        cardContainer.appendChild(card);
    });
}


function handlerDeleteListener(e){
    resetCardContainer();
    
    deleteIndex = getLibraryIndex(e);
    Library.splice(deleteIndex, 1);
    
    displayLibrary(Library);
}


function getLibraryIndex(e){
    let getTitle = e.target.parentElement.childNodes[0].innerText;
    let getAuthor = e.target.parentElement.childNodes[1].innerText;
    let getPages = e.target.parentElement.childNodes[2].innerText;
    let getRead  = e.target.parentElement.childNodes[3].innerText;

    const index= Library.findIndex(element => 
        (element.title == getTitle) && (getFullName(element) == getAuthor) 
        && ( (element.pages + ' pages' == getPages) || ('?? pages' == getPages)) && (element.read == getRead));

        return index;    
}


function searchItem(){
    resetForm();
    searchWindow.setAttribute('type', 'text');
    searchWindow.setAttribute('id', 'box-search');
    searchWindow.placeholder = 'Press Enter when done';
    inputForm.appendChild(searchWindow);
    
    searchWindow.addEventListener('keyup', superfunction);  
}

 function superfunction(e){
    if (e.key === 'Enter') {
        let newSearchWindow =  searchWindow.cloneNode(true);
        searchWindow.parentNode.replaceChild(newSearchWindow, searchWindow);
        selectedRecords = Library.filter(item => item.title.toLowerCase() == searchWindow.value.toLowerCase());
        
        if (selectedRecords.length == 0){
            alert('There are no items with that title')    
            resetCardContainer();
            resetForm();
            searchWindow.value = '';
            displayLibrary(Library);
        } else{
            resetCardContainer();
            resetForm();
            searchWindow.value = '';
            displayLibrary(selectedRecords);
        }
    }
 }


function findRecord(e){
    if (e.key === 'Enter') {
        resetLibrary();
        
        selectedRecords = Library.filter(item => item.title.toLowerCase() == searchWindow.value.toLowerCase());
        
        if (selectedRecords.length == 0){
            alert('There are no items with that title')    
            resetCardContainer();
            resetForm();
            searchWindow.value = '';
            displayLibrary(Library);
        } else{
            resetCardContainer();
            resetForm();
            searchWindow.innerHTML = '';
            displayLibrary(selectedRecords);
        }
    }
}


function showAll(){
    resetCardContainer();
    resetForm();
    resetLibrary();
    displayLibrary(Library);
}

resetLibrary();
displayLibrary(Library);