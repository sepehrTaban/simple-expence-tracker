const onMobile = window.innerWidth < 500 || window.screen.width < 500;
const onTablet = window.innerWidth < 760 || window.screen.width < 760;

let currentMenu;
const additionForm = document.querySelector('.add-item');
const calculationForm = document.querySelector('.calc-item');
const deletionForm = document.querySelector('.delet-item');
const formContainer = document.querySelector('.forms');
const footer = document.querySelector('.main-footer');

const totalAlert = document.querySelector('.total-result');

const deletionAlert = document.querySelector('.deletMsg');
const notSavedAnyItemAlert = document.querySelector('.notSavedMsg');

const hambergerMenu = document.querySelector('.hamMenu');
const navBar = document.querySelector('.navBar');

const detailTableContainer = document.querySelector('.detail-table-container');
const detailTable = document.querySelector('.detail-table');
const detailTableCloseBtn = document.querySelector('.detail-close');


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

const subBtns = Array.from(document.querySelectorAll('.subBtn'));
subBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        if (!onTablet) return;

        btn.classList.add('hoverd');
        setTimeout(() => {
            btn.classList.remove('hoverd');
        }, 500);
    })
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
    //deletionAlert.classList.remove('active');

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
            //window.scrollTo(0, tableHeigth);
            return;
        }
        let preTranslate = localStorage.getItem('formTranslate');
        setTimeout(() => {
            formContainer.style.transform = preTranslate;
            window.scrollTo(0, tableHeigth);
            footer.classList.remove('down');
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
    if (tableHeigth <= 375) moveForm(tableHeigth);

    mainTableContainer.scrollTop = 0;
    if (onTablet) window.scrollTo(0, 0);
    clearInputs();
})
function clearInputs() {
    itemNameInput.value = "";
    itemCostInput.value = "";
    if (onTablet) return;
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
    //tableHeigth = mainTableContainer.getBoundingClientRect().height;
    if (!todayItems.length)
        tellUserThereIsNoSavedItem();
}


function singleDeletion(index) {
    let removed = todayItems.splice(index, 1)[0];
    localStorage.setItem("todayItems", JSON.stringify(todayItems));
    todayIndex = todayItems.length;

    initilizedTable();

    tableHeigth = mainTableContainer.getBoundingClientRect().height;
    if (tableHeigth < 375) moveForm(tableHeigth);

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
const totalDetail = document.querySelector('.details');
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
let specificDate;
/***********************/
const specificDateInput = document.querySelector('#specificDate');
calculationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    specificDate = specificDateInput.value;
    let total = totOfitems[specificDate];
    crCalcBtn = specificDate;
    if (specificDate === todayDate)
        crCalcBtn = 'Today';
    if (specificDate === getYesterdayDate())
        crCalcBtn = 'Yesterday';
    sendTotalMsg(total)
})

function calcChosenTimeTotal() {
    let total;
    if (crCalcBtn === 'Today') {
        total = totOfitems[todayDate];
    }
    if (crCalcBtn === 'Yesterday') {
        if (!yesterdayDate) yesterdayDate = getYesterdayDate();
        total = totOfitems[yesterdayDate];
    }
    if (crCalcBtn === 'This Week') {
        if (!thisWeekDays) thisWeekDays = getDaysBeforTodayInWeek();
        total = checkEachDateAndAddToTotal(thisWeekDays);
    }
    if (crCalcBtn === 'Last Week') {
        if (!LastWeekDays) LastWeekDays = getDaysOfLastWeek();
        total = checkEachDateAndAddToTotal(LastWeekDays);
    }
    if (crCalcBtn === 'This Month') {
        if (!thisMounthDays) thisMounthDays = getDaysBeforTodayInMounth();
        total = checkEachDateAndAddToTotal(thisMounthDays);
    }
    if (crCalcBtn === 'Last Month') {
        if (!lastMounthDays) lastMounthDays = getDaysOfLastMonth();
        total = checkEachDateAndAddToTotal(lastMounthDays);
    }

    if (!total || crCalcBtn === 'Today')
        hideShowDetainBtn('hide');
    else hideShowDetainBtn('show');
    sendTotalMsg(total);
}
function hideShowDetainBtn(state) {
    if (state === 'hide') {
        totalDetail.classList.add('hide');
        totalDetail.disabled = true;
        return;
    }
    totalDetail.classList.remove('hide');
    totalDetail.disabled = false;

}

function checkEachDateAndAddToTotal(dates) {
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
        switch (crCalcBtn) {
            case 'This Week':
            case 'This Month':
                msg = `${crCalcBtn} you have not saved any item so far.`;
        }
        if (/[0-9]/.test(crCalcBtn))
            msg = `You did not save any item on date ${crCalcBtn}`;
        totalAlertP.textContent = msg;

        if (onTablet)
            notSavedAnyItemAlert.classList.remove('active');

        showTotalMessage();
        return;
    }
    total = addComa(total);
    msg = `${crCalcBtn} total amount of your expences till now is ${total}$ .`;
    switch (crCalcBtn) {
        case 'Yesterday':
        case 'Last Week':
        case 'Last Month':
            msg = `${crCalcBtn} total amount of your expences was ${total}$ .`;
    }
    if (/[0-9]/.test(crCalcBtn))
        msg = `On date ${crCalcBtn}, the total amount of your expences was ${total}$ .`;
    totalAlertP.textContent = msg;

    if (onTablet)
        notSavedAnyItemAlert.classList.remove('active');

    showTotalMessage();
}

totalClose.addEventListener('click', () => {
    hideTotalMessage();
})
function hideTotalMessage() {
    totalAlert.classList.remove('active');
    if (!todayItems.length) {
        tellUserThereIsNoSavedItem();
        return;
    }

    if (onTablet) {
        let preTranslate = localStorage.getItem('formTranslate');
        formContainer.style.transform = preTranslate;
        footer.classList.remove('down');
    }
}

function showTotalMessage() {
    if (onTablet) {
        let totalHeigth = totalAlert.getBoundingClientRect().height + tableHeigth;

        window.scrollTo(0, tableHeigth - 300);

        setTimeout(() => {
            formContainer.style.transform = `translateY(${totalHeigth - 50}px)`;
            footer.classList.add('down');
            totalAlert.classList.add('active');
        }, 300);

        return;
    }
    totalAlert.classList.add('down');
    setTimeout(() => {
        totalAlert.classList.add('active');
    }, 500);
}

function addComa(total) {
    let last = total.toString().length - 1;
    return total.toString()
        .split("")
        .reverse()
        .map((item, index) => ((index + 1) % 3 === 0 && index !== last) ? `,${item}` : item)
        .reverse()
        .join("");
}
/*######################## showing details ##########################*/
/*######################## showing details ##########################*/
/*######################## showing details ##########################*/
/*######################## showing details ##########################*/
/*######################## showing details ##########################*/
totalDetail.addEventListener('click', () => {

    if (crCalcBtn === 'Yesterday') {
        checkDates([yesterdayDate]);
    }
    if (crCalcBtn === 'This Week') {
        checkDates(thisWeekDays);
    }
    if (crCalcBtn === 'Last Week') {
        checkDates(LastWeekDays);
    }
    if (crCalcBtn === 'This Month') {
        checkDates(thisMounthDays);
    }
    if (crCalcBtn === 'Last Month') {
        checkDates(lastMounthDays);
    }
    if (/[0-9]/.test(crCalcBtn))
        checkDates([specificDate]);

})

function checkDates(array) {
    let match = false;

    if (crCalcBtn === 'This Week' || crCalcBtn === 'This Month') {
        updateDetailTable(todayItems);
        if (todayItems.length) match = true;
    }

    for (let item of array) {
        if (itemsOfPast[item]) {
            updateDetailTable(itemsOfPast[item])
            match = true;
        }
    }

    if (!match) return;

    setTimeout(() => {
        detailTableContainer.classList.add('active');
    }, 300);
}

function updateDetailTable(array) {
    let count = 0;
    while (count < array.length) {
        let item = array[count];
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.textContent = item.name;
        td2.textContent = item.date;
        td3.textContent = item.cost;

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        detailTable.appendChild(tr);

        count++;
    }

}
detailTableCloseBtn.addEventListener('click', () => {
    detailTableContainer.classList.remove('active');
    while (detailTable.firstChild)
        detailTable.removeChild(detailTable.firstChild);
})
/*###################### deleting items ####################*/
/*###################### deleting items ####################*/
/*###################### deleting items ####################*/
/*###################### deleting items ####################*/
/*###################### deleting items ####################*/
const deletingForm = document.querySelector('.delet-item');
const deletingInput = document.querySelector('#dateToDelete');
let choosenDate;

const deletionMsgP = document.querySelector('.deletMsg p');

const clearBtn = document.querySelector('.clearBtn');

clearBtn.addEventListener('click', () => {
    choosenDate = null;
    deleteItemsOfToday();
    deletItemsOfPast();

    sendDeletionMsg();
})

deletingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    choosenDate = deletingInput.value;

    if (choosenDate === todayDate) {
        deleteItemsOfToday();
        sendDeletionMsg();
        return;
    }

    deletItemsOfPast();
    sendDeletionMsg();
})

function sendDeletionMsg() {
    let msg = `All items that were saved on ${choosenDate} are now deleted.`;
    if (!choosenDate) msg = 'History cleared, All items are deleted.';
    totalAlertP.textContent = msg;

    totalClose.classList.add('hide');
    totalDetail.classList.add('hide');
    if (onTablet) notSavedAnyItemAlert.classList.remove('active');

    setTimeout(() => {
        showTotalMessage();
    }, 500);

    setTimeout(() => {
        hideTotalMessage();
        totalClose.classList.remove('hide');
        totalDetail.classList.remove('hide');
    }, 3000);
}

function deleteItemsOfToday() {
    todayItems = [];
    todayIndex = 0;
    localStorage.setItem("todayItems", JSON.stringify(todayItems));
    mainTableContainer.classList.remove('active');
    while (mainTable.firstChild)
        mainTable.removeChild(mainTable.firstChild);
    tableHeigth = mainTableContainer.getBoundingClientRect().height;
    if (onTablet)
        window.scrollTo(0, 0);

    if (totOfitems[choosenDate]) {
        delete totOfitems[choosenDate];
        localStorage.setItem("totOfitems", JSON.stringify(totOfitems));
    }
}
function deletItemsOfPast() {
    if (!choosenDate) {
        totOfitems = {};
        itemsOfPast = {};
        localStorage.setItem("itemsOfPast", JSON.stringify(itemsOfPast));
        localStorage.setItem("totOfitems", JSON.stringify(totOfitems));
        return;
    }

    if (totOfitems[choosenDate]) {
        delete totOfitems[choosenDate];
        localStorage.setItem("totOfitems", JSON.stringify(totOfitems));
    }

    if (itemsOfPast[choosenDate]) {
        delete itemsOfPast[choosenDate];
        localStorage.setItem("itemsOfPast", JSON.stringify(itemsOfPast));
    }
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
        if (date < 1) {
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


function getDaysOfLastWeek() {
    let array = [];
    let today = new Date().getDay();
    let count = today + 7;
    let date = new Date().getDate();



    let lastMonth = (todayMonth === 1) ? 12 : todayMonth - 1;
    let lastyear = todayYear - 1;

    while (count > today) {
        let item;
        let day = date - count;
        //if this condition is true, we have to get the dates of last month
        if (day <= 0) {

            //this switch is used becuse some months are 31 days some are 30 and feburary is 28!;  
            switch (lastMonth) {
                case 11:
                case 9:
                case 6:
                case 4:
                    day = 30 + day;
                    break;
                case 2:
                    day = 28 + day;
                    break;
                default:
                    day = 31 + day;
            }
            item = (lastMonth < 10) ? `-0${lastMonth}-${day}` : `-${lastMonth}-${day}`;
            item = (lastMonth === 12) ? lastyear + item : todayYear + item;

        } else {
            day = (day < 10) ? `0${day}` : day;
            item = (todayMonth < 10) ? `${todayYear}-0${todayMonth}-${day}` : `${todayYear}-${todayMonth}-${day}`;

        }
        array.push(item);
        count--;
    }
    return array;
}

function getDaysBeforTodayInMounth() {

    let date = new Date().getDate();
    let array = [];
    while (date > 0) {
        let item = (date < 10) ? todayDate.slice(0, 8) + `0${date}` : todayDate.slice(0, 8) + date;
        array.push(item);
        date--;
    }
    return array;
}

function getDaysOfLastMonth() {

    let array = [];

    let lastMonth = (todayMonth === 1) ? 12 : todayMonth - 1;
    let lastyear = todayYear - 1;

    for (let i = 1; i < 32; i++) {

        let item = (lastMonth < 10) ? `-0${lastMonth}-` : `-${lastMonth}-`;
        item += (i < 10) ? `0${i}` : i;
        item = (lastMonth === 12) ? lastyear + item : todayYear + item;

        array.push(item);
    }
    return array;


}




