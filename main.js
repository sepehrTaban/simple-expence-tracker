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

