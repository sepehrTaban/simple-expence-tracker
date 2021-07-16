const onMobile = window.innerWidth < 500;
const onTablet = window.innerWidth < 760;

let currentMenu;
const additionForm = document.querySelector('.add-item');
const calculationForm = document.querySelector('.calc-item');
const deletionForm = document.querySelector('.delet-item');
const formContainer = document.querySelector('.forms');

const tottalResultAlert = document.querySelector('.total-result');
const deletionAlert = document.querySelector('.deletMsg');
const notSavedAnyItemAlert = document.querySelector('.notSavedMsg');

const hambergerMenu = document.querySelector('.hamMenu');
const navBar = document.querySelector('.navBar');



const mainTableContainer = document.querySelector('.table-container');
const mainTable = document.querySelector('.mainTable');
/*########################### stting for local storage ###############################*/
/*########################### stting for local storage ###############################*/
/*########################### stting for local storage ###############################*/
/*########################### stting for local storage ###############################*/
/*########################### stting for local storage ###############################*/
let todayItems;
let todayIndex;

let totStorage = JSON.parse(localStorage.getItem("totOfitems"));
let pastStorage = JSON.parse(localStorage.getItem("itemsOfPast"));
let todayStorage = JSON.parse(localStorage.getItem("todayItems"));

let todayDate = getCurrentDate();

let itemsOfPast = (!pastStorage) ? {} : pastStorage;
let totOfitems = (!totStorage) ? {} : totStorage;
checkTodayStorage();

initilizedTable();

function checkTodayStorage() {
    if (!todayStorage || !todayStorage.length) {
        todayItems = [];
        todayIndex = 0;
        return;
    }
    // if today storage is not empty, check if we 're on the same day:
    // last = last item that was added to the storage: 
    let last = todayStorage[todayStorage.length - 1];
    // if we 're on the same day:
    if (last.date === todayDate) {
        todayItems = todayStorage;
        todayIndex = todayItems.length;
        return;
    }
    // if lastItem was added yesterday:
    itemsOfPast[last.date] = [...todayStorage];
    todayItems = [];
    todayIndex = 0;

    localStorage.setItem("itemsOfPast", JSON.stringify(itemsOfPast));
    localStorage.setItem("todayItems", JSON.stringify(todayItems));
}
/*############################# manipulating DOM ##################################*/
/*############################# manipulating DOM ##################################*/
/*############################# manipulating DOM ##################################*/
/*############################# manipulating DOM ##################################*/
/*############################# manipulating DOM ##################################*/
if(onTablet) formContainer.style.transform = localStorage.getItem("formTranslate");
(!todayItems.length) ? tellUserThereIsNoSavedItem() : showTheTableToUser();

hambergerMenu.addEventListener('click', () => {
    toggleNaberMenu()
})

const menuBtns = Array.from(document.querySelectorAll('.menu-btn'));
menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentMenu = btn.textContent;
        menuBtns.forEach(btn => {
            btn.classList.remove('active')
            btn.disabled = true;
        });
        btn.classList.add('active');

        changeTheForm();

        setTimeout(() => {
            menuBtns.forEach(btn => btn.disabled = false);
        }, 300);

    })
})



function changeTheForm() {

    if (onMobile) toggleNaberMenu();

    tottalResultAlert.classList.remove('active');
    deletionAlert.classList.remove('active');

    if (currentMenu === 'Calc Total') {
        additionForm.classList.remove('active');
        deletionForm.classList.remove('active');
        setTimeout(() => {
            calculationForm.classList.add('active');
        }, 500);
    }
    if (currentMenu === 'Add Item') {
        calculationForm.classList.remove('active');
        deletionForm.classList.remove('active');
        setTimeout(() => {
            additionForm.classList.add('active');
        }, 500);

    }
    if (currentMenu === 'Delete Items') {
        additionForm.classList.remove('active');
        calculationForm.classList.remove('active');
        setTimeout(() => {
            deletionForm.classList.add('active');
        }, 500);

    }

    
}

function tellUserThereIsNoSavedItem() {

    mainTableContainer.classList.remove('active');

    setTimeout(() => {
        notSavedAnyItemAlert.classList.add('active');
        formContainer.style.transform = `translateY(${10}px)`
    }, 500);

}
function showTheTableToUser() {
    
    notSavedAnyItemAlert.classList.remove('active');
    setTimeout(() => {
        mainTableContainer.classList.add('active');
    }, 500);
}

function toggleNaberMenu() {
    hambergerMenu.classList.toggle('active');
    navBar.classList.toggle('active');
}
function moveForm(height){
    if(!onTablet) return;
    formContainer.style.transform = `translateY(${height-20}px)`;
    localStorage.setItem("formTranslate", `translateY(${height-20}px)`)   
    
}

/*################### adding new Items #########################*/
/*################### adding new Items #########################*/
/*################### adding new Items #########################*/
/*################### adding new Items #########################*/
/*################### adding new Items #########################*/
/*################### adding new Items #########################*/
const itemNameInput = document.querySelector('#addName');
const itemCostInput = document.querySelector('#addCost');
const validationP = document.querySelector('.add-item p');




additionForm.addEventListener('submit', (e) => {
    e.preventDefault();
     
    if(!Number(itemCostInput.value)){
        validationP.textContent = "Please enter a valid number!";
        clearInputs();
        setTimeout(() => {
            validationP.textContent = "";
        }, 2000);
        return;
    }
    
    const name = itemNameInput.value;
    const date = todayDate;
    const cost = itemCostInput.value;
    let newItem = { name, date, cost };

    if (!totOfitems[date]) totOfitems[date] = Number(cost);
    else totOfitems[date] += Number(cost);

    localStorage.setItem("totOfitems", JSON.stringify(totOfitems));

    todayItems.push(newItem);
    todayIndex++;
    localStorage.setItem("todayItems", JSON.stringify(todayItems));
    updateTable(name, date, cost, todayIndex);
    if (todayItems.length === 1)
        showTheTableToUser();

    let tableHeigth = mainTableContainer.getBoundingClientRect().height;
    if(tableHeigth < 300) moveForm(tableHeigth);

    clearInputs();   
})
function clearInputs(){
    itemNameInput.value = "";
    itemCostInput.value = "";
    itemNameInput.focus();
}

function updateTable(name, date, cost, index) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    td1.textContent = name;
    td3.textContent = cost;

    const delBtn = document.createElement('button');
    delBtn.textContent = "delete";
    delBtn.setAttribute("class", "subBtn");


    delBtn.addEventListener('click', () => {
        singleDeletion(index - 1);
    })

    const td2Span = document.createElement('span');
    td2Span.textContent = date;

    td2.appendChild(td2Span);
    td2.appendChild(delBtn);


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    mainTable.insertBefore(tr, mainTable.firstChild);

}

function initilizedTable() {
    while (mainTable.firstChild) mainTable.removeChild(mainTable.firstChild);
    let count = 0;
    while (count < todayIndex) {
        let item = todayItems[count++];
        updateTable(item.name, item.date, item.cost, count);
    }
    if (!todayItems.length)
        tellUserThereIsNoSavedItem();     
}


function singleDeletion(index) {
    let removed = todayItems.splice(index, 1)[0];
    localStorage.setItem("todayItems", JSON.stringify(todayItems));
    todayIndex = todayItems.length;

    initilizedTable();

    let tableHeigth = mainTableContainer.getBoundingClientRect().height;
    if(tableHeigth < 300) moveForm(tableHeigth);

    if (totOfitems[removed.date]) {
        totOfitems[removed.date] -= Number(removed.cost);
        localStorage.setItem("totOfitems", JSON.stringify(totOfitems));
    }
}



/*######################## getting Dates ##########################*/
/*######################## getting Dates ##########################*/
/*######################## getting Dates ##########################*/
/*######################## getting Dates ##########################*/
/*######################## getting Dates ##########################*/
function getCurrentDate() {
    let todayYear = new Date().getFullYear();
    let todayMounth = new Date().getMonth() + 1;
    let todayDay = new Date().getDate();

    todayMounth = (todayMounth < 10) ? `0${todayMounth}` : todayMounth;
    todayDay = (todayDay < 10) ? `0${todayDay}` : todayDay;
    return [todayYear, todayMounth, todayDay].join("-");
}

