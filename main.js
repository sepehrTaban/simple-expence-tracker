const onMobile = window.innerWidth < 500;
const onTablet = window.innerWidth < 760;

let currentMenu;
const additionForm = document.querySelector('.add-item');
const calculationForm = document.querySelector('.calc-item');
const deletionForm = document.querySelector('.delet-item');
const formContainer = document.querySelector('.forms');

const totalAlert = document.querySelector('.total-result');

const deletionAlert = document.querySelector('.deletMsg');
const notSavedAnyItemAlert = document.querySelector('.notSavedMsg');

const hambergerMenu = document.querySelector('.hamMenu');
const navBar = document.querySelector('.navBar');

/*********/
const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;
const todayDay = new Date().getDate();

/*********/



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
let tableHeigth = mainTableContainer.getBoundingClientRect().height;
localStorage.setItem("formTranslate", `translateY(${tableHeigth - 100}px)`);
if (onTablet) formContainer.style.transform = localStorage.getItem("formTranslate");

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

    totalAlert.classList.remove('active');
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

    if (onTablet) {
        if (!todayItems.length) {
            tellUserThereIsNoSavedItem();
            return;
        }
        let preTranslate = localStorage.getItem('formTranslate');
        setTimeout(() => {
            formContainer.style.transform = preTranslate;
        }, 1000);
    }



}

function tellUserThereIsNoSavedItem() {

    mainTableContainer.classList.remove('active');
    totalAlert.classList.remove('active');
    let alertBoxHeight = notSavedAnyItemAlert.getBoundingClientRect().height;
    setTimeout(() => {
        notSavedAnyItemAlert.classList.add('active');
        formContainer.style.transform = `translateY(${alertBoxHeight - 70}px)`
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
function moveForm(height) {
    if (!onTablet) return;
    formContainer.style.transform = `translateY(${height - 100}px)`;

    localStorage.setItem("formTranslate", `translateY(${height - 100}px)`);

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

    if (!Number(itemCostInput.value)) {
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

    tableHeigth = mainTableContainer.getBoundingClientRect().height;
    if (tableHeigth <= 300) moveForm(tableHeigth);

    clearInputs();
})
function clearInputs() {
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

    tableHeigth = mainTableContainer.getBoundingClientRect().height;
    if (tableHeigth < 300) moveForm(tableHeigth);

    if (totOfitems[removed.date]) {
        totOfitems[removed.date] -= Number(removed.cost);
        localStorage.setItem("totOfitems", JSON.stringify(totOfitems));
    }
}
/*######################## calc total ##########################*/
/*######################## calc total ##########################*/
/*######################## calc total ##########################*/
/*######################## calc total ##########################*/
/*######################## calc total ##########################*/
/*######################## calc total ##########################*/
//const totalAlert = document.querySelector('.total-result');
const totalAlertP = document.querySelector('.total-result p');
const totalClose = document.querySelector('.closeResult');
const totalDetail = document.querySelector('details');
// current calcBtn
let crCalcBtn;
//let totalHeigth;
const calcBtns = Array.from(document.querySelectorAll('.calcExactDate'));
calcBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        crCalcBtn = btn.textContent;
        calcChosenTimeTotal()
    })
})
/***********************/
let yesterdayDate;
let thisWeekDays;
let LastWeekDays;
let thisMounthDays;
let lastMounthDays;
/***********************/

function calcChosenTimeTotal() {
    let total;
    if (crCalcBtn === 'Today') {
        total = totOfitems[todayDate];
    }
    if (crCalcBtn === 'Yesterday') {
        if (!yesterdayDate) yesterdayDate = getYesterdayDate();
        total = totOfitems[yesterdayDate];
    }
    if(crCalcBtn === 'This Week'){
        if (!thisWeekDays) thisWeekDays = getDaysBeforTodayInWeek();
        total = checkEachDateAndAddToTotal(thisWeekDays);
    }

    sendTotalMsg(total);
}

function checkEachDateAndAddToTotal(dates){
    let total = 0;
    for (let day of dates) {
        if (totOfitems[day]) {
            total += totOfitems[day];
        }
    }
    return total;
}

function sendTotalMsg(total) {
    let msg;
    if (!total) {
        if (crCalcBtn === 'Today') {
            tellUserThereIsNoSavedItem();
            notSavedAnyItemAlert.classList.add('scale');
            setTimeout(() => {
                notSavedAnyItemAlert.classList.remove('scale');;
            }, 500);
            return;
        }
        msg = `${crCalcBtn} you did not saved any item.`;
        if (crCalcBtn === 'This Week' || crCalcBtn === 'This Month')
            msg = `${crCalcBtn} you have not saved any item so far.`;

        totalAlertP.textContent = msg;
        if (onTablet)
            notSavedAnyItemAlert.classList.remove('active');
        showTotalMessage();
        return;
    }
    msg = `${crCalcBtn} total amount of your expences till now is ${total}.`;
    if (crCalcBtn === 'Yesterday' || crCalcBtn === 'Last Week' || crCalcBtn === 'Last Month')
        msg = `${crCalcBtn} total amount of your expences was ${total}.`;
    totalAlertP.textContent = msg;
    if (onTablet)
        notSavedAnyItemAlert.classList.remove('active');
    showTotalMessage();
}

totalClose.addEventListener('click', () => {
    totalAlert.classList.remove('active');
    if (!todayItems.length) {
        tellUserThereIsNoSavedItem();
        return;
    }

    if (onTablet) {
        let preTranslate = localStorage.getItem('formTranslate');
        formContainer.style.transform = preTranslate;
    }

})

function showTotalMessage() {
    if (onTablet) {
        let totalHeigth = totalAlert.getBoundingClientRect().height + tableHeigth;
        
        
        formContainer.style.transform = `translateY(${totalHeigth - 50}px)`;
        totalAlert.classList.add('active');
        return;
    }
    totalAlert.classList.add('down');
    setTimeout(() => {
        totalAlert.classList.add('active');
    }, 500);
}



/*######################## getting Dates ##########################*/
/*######################## getting Dates ##########################*/
/*######################## getting Dates ##########################*/
/*######################## getting Dates ##########################*/
/*######################## getting Dates ##########################*/

function getCurrentDate() {
    let year = todayYear;
    let month = todayMonth;
    let day = todayDay;

    month = (month < 10) ? `0${month}` : month;
    day = (day < 10) ? `0${day}` : day;
    return [year, month, day].join("-");
}
function getYesterdayDate() {
    let day = todayDay - 1;
    let finalDate;
    let lastMonth = (todayMonth === 1) ? 12 : todayMonth - 1;
    if (todayDay === 1) {
        switch (lastMonth) {
            case 11:
            case 9:
            case 6:
            case 4:
                day = 30;
                break;
            case 2:
                day = 28;
                break;
            default:
                day = 31;
        }
        finalDate = (lastMonth < 10) ? `-0${lastMonth}-${day}` : `-${lastMonth}-${day}`;
        finalDate = (lastMonth === 12) ? todayYear - 1 + finalDate : todayYear + finalDate;
        return finalDate;
    }
    finalDate = (day < 10) ? `-0${day}` : `-${day}`;
    finalDate = (todayMonth < 10) ? `${todayYear}-0${todayMonth}${finalDate}` : todayYear + todayMonth + finalDate;
    return finalDate;
}

function getDaysBeforTodayInWeek() {
    let count = new Date().getDay();
    let date = new Date().getDate();
    let array = [];
    
    let lastMonth = (todayMonth === 1) ? 12 : todayMonth - 1;   
    let lastyear = todayYear - 1;

    while (count > -1) {
        let item;
        let day;
        if(date < 1){
            switch (lastMonth) {
                case 11:
                case 9:
                case 6:
                case 4:
                    day = 30 + date;
                    break;
                case 2:
                    day = 28 + date;
                    break;
                default:
                    day = 31 + date;
            }
            item = (lastMonth < 10) ? `-0${lastMonth}-${day}` : `-${lastMonth}-${day}`;
            item = (lastMonth === 12) ? lastyear + item : todayYear + item;
            array.push(item);
            date--;
            count--;
            continue;
        } 
        day = (date < 10) ? `0${date}` : date;
        item = (todayMonth < 10) ? `${todayYear}-0${todayMonth}-${day}` : `${todayYear}-${todayMonth}-${day}`;
        array.push(item);
        count--;
        date--;
    }
    return array;
}


