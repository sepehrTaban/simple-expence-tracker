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

function checkTodayStorage(){
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
const onMobile = window.innerWidth < 500;
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

(!todayItems.length) ? tellUserThereIsNoSavedItem() : showTheTableToUser();

hambergerMenu.addEventListener('click', ()=>{
    toggleNaberMenu()
})

const menuBtns = Array.from(document.querySelectorAll('.menu-btn'));
menuBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        currentMenu = btn.textContent;
        menuBtns.forEach(btn =>{
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



function changeTheForm(){

    if(onMobile) toggleNaberMenu();
    
    tottalResultAlert.classList.remove('active');
    deletionAlert.classList.remove('active');

    if(currentMenu === 'Calc Total'){
        additionForm.classList.remove('active');
        deletionForm.classList.remove('active');
        setTimeout(() => {
            calculationForm.classList.add('active');
        }, 500);
    }
    if(currentMenu === 'Add Item'){
        calculationForm.classList.remove('active');
        deletionForm.classList.remove('active');
        setTimeout(() => {
            additionForm.classList.add('active');
        }, 500);

    }
    if(currentMenu === 'Delete Items'){
        additionForm.classList.remove('active');
        calculationForm.classList.remove('active');
        setTimeout(() => {
            deletionForm.classList.add('active');
        }, 500);

    }

    
    setTimeout(() => {
        formContainer.classList.add('moveUp');
    }, 1000);
}

function tellUserThereIsNoSavedItem(){
    notSavedAnyItemAlert.classList.add('active');
    mainTableContainer.classList.remove('active');
    
    formContainer.classList.add('moveUpUp');
}
function showTheTableToUser(){
    notSavedAnyItemAlert.classList.remove('active');
    mainTableContainer.classList.add('active');

    formContainer.classList.add('moveUp');
}
function toggleNaberMenu(){
    hambergerMenu.classList.toggle('active');
    navBar.classList.toggle('active');
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

