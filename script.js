console.log('Add validation!');

//text vars to manage loops
const formPark = document.querySelector("#parking-form");
const entries = document.querySelectorAll("input");
const parkSum = document.querySelector("#total")

//date vars
let dateCurrent = new Date();
let yearCurrent = dateCurrent.getFullYear();

//these functions will be called whenever the listener event
//is delivered to the event target
formPark.addEventListener("input", checkAll);
formPark.addEventListener("submit", function (event) {

    //kill default action if event isn't properly handled
    event.preventDefault();

    //reveal parking price if form validates
    //otherwise, reset cost field
    if (formCheck()) {
        showTotal(computeCost());
    }
    else {
        resetCost();
    }
});

//clear parking price if change to either start date or number of days
let startEntry = getInputByID("#start-date");
let duration = getInputByID("#days");
startEntry.addEventListener("input", resetCost);
duration.addEventListener("input", resetCost);

//this function checks values for valid and invalid input
function checkAll() {
    anyEmpty();
    nameCheck();
    carCheck();
    dateCheck();
    durationCheck();
    cardCheck();
    cvvCheck();
    expiryCheck();
}

//1. this input-valid function first checks if notice has been applied
//2. if not, adds relevant message if required
//3. then updates argument with correct blurb
//4. finally, displays message string
function notification(inputElement, message, blurb) {
    //returns the closest ancestor of input-field div
    let parent = inputElement.closest(".input-field");
    let notice = "message-" + blurb;
    let alert = "data-" + blurb;
    let display = message;

    parent.classList.remove("input-valid");
    parent.classList.add("input-invalid");

    //evals all children of input-field and displays any existing msg
    let msgExists = false;
    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].dataset[blurb] == display) {
            msgExists = true;
        }
    }

    //adds message as inline element
    if (msgExists == false) {
        let p = document.createElement("span");
        p.classList.add("message-", notice);
        p.setAttribute(alert, display);
        p.textContent = message;

        //if "Please try again" blurb already displays on any input-field,
        //existing child node will be removed from current parent and added to new parent
        if (blurb == "alert") {
            parent.insertBefore(p, parent.children[1]);
        }
        else {
            parent.appendChild(p);
        }
    }
}

//this function removes any unnecessary message
//added from previous input action
function removeMsg(inputElement, message, blurb) {
    //returns the closest ancestor of input-field div
    let parent = inputElement.closest(".input-field");
    let alert = "data-" + blurb;
    let display = message;

    for (let child of parent.children) {
        if (child.dataset[blurb] == display) {
            child.remove();
        }
    }
}

//this function adds "input-valid" class to parent div
function validEntry(formEntry) {
    formEntry.classList.remove("input-invalid");
    formEntry.classList.add("input-valid");
}

// this function returns input field containing input element
function getFormEntry(input) {
    return input.closest(".input-field");
}

//this function returns CSS id selectorinput element
function getInputByID(idSelector) {
    return document.querySelector(idSelector);
}

//this function restricts credit card number to
//regular expression of 16 numerical digits
function ccEntry(number) {
    var re = new RegExp("^[0-9]{16}$");
    if (!re.test(number)) {
        return false;
    }
    return ccFormat(number);
}

//this function evals that length of credit card value equals 16 digits
function ccFormat(value) {
    var ccDigits = 0;
    for (var i = 0; i < value.length; i++) {
        var intValue = parseInt(value.substr(i, 1));

        if (i % 2 == 0) {
            intValue *= 2;

            if (intValue > 9) {
                intValue = 1 + (intValue % 10);
            }
        }
        ccDigits += intValue;
        
    // } console.log("ccDigits" + ccDigits)
    return (ccDigits % 10) == 0;
}

//this function calculates parking cost at
//$5/day weekdays and $7/day Sat-Sun
function computeCost() {
    let cost = 0;

    //...Assign a time of noon instead of midnight to the date. 
    //This will be parsed as local time, and is far enough away to avoid any DST conflicts.
    //source: https://stackoverflow.com/questions/29174810/javascript-date-timezone-issue/29185654#29185654
    let startDate = new Date(getInputByID("#start-date").value + "T12:00:00");
    let startDay = Number(startDate.getDay());
    let days = Number(getInputByID("#days").value);

    //this loop evals the start date, number of days/wk, cost/day
    //to arrive at parking cost
    for (let parkAmt = startDay; parkAmt < (startDay + days); parkAmt++) {
        cost += (parkAmt % 7 == 0 || parkAmt % 7 == 6 ? 5 : 7);
    }
    return cost;
}

//pressing "Make Reservation" button will reveal total cost
function showTotal(cost) {
    parkSum.textContent = `Grand Total $${cost}.00`;
    parkSum.classList.add("message-", "total")
}

//this function clears cost field string if something hinkey is entered
function resetCost() {
    parkSum.innerHTML = "";
}

//this function checks all fields for valid data entry
function formCheck() {
    checkAll();

    for (let child of formPark.children) {
        if (child.classList.contains("input-invalid")) {
            return false;
        }
    }
    return true;
}

function anyEmpty() {
    for (let input of entries) {
        if (isEmpty(input)) {
            markEmpty(input);
        }
        else {
            markFull(input);
        }
    }
}

//this function returns boolean true if
//regular expression is empty string or all whitespace
function isEmpty(input) {
    let re = /^\s*$/; 
    return re.test(input.value);
}

function markEmpty(input) {
    notification(input, "Required field", "alert");
}

function markFull(input) {
    validEntry(getFormEntry(input));
    removeMsg(input, "Required field", "alert");
}

//this function restricts regular expression
//of name value to alphabetical digits
function nameCheck() {
    let re = /^[A-z ]+$/;
    let input = getInputByID("#name");

    if (isEmpty(input)) {
        removeMsg(input, "Enter name", "error");
        markEmpty(input);
    }
    else if (re.test(input.value)) {
        removeMsg(input, "Enter name", "error");
        validEntry(getFormEntry(input));
    }
    else {
        notification(input, "Enter name", "error");
    }
}

//this function checks car year, make and model
function carCheck() {
    carYrCheck();
    carMMCheck();
}

function carYrCheck() {
    let input = getInputByID("#car-year");
    let carYear = Number(input.carYear);

    if (isEmpty(input)) {
        removeMsg(input, "Enter a valid year", "error");
        markEmpty(input);
    }

    else if ((1900 < carYear && carYear < yearCurrent)) {
        notification(input, "Enter a valid year", "error");
    }
    else {
        removeMsg(input, "Enter a valid year", "error");
    }
}

function carMMCheck() {
//this function restricts regular expression
//of car make and model value to alphanumeric digits
    let re = /^[\w+\s]*$/;
    let makeInput = getInputByID("#car-make");
    let modelInput = getInputByID("#car-model");
    let carMM = makeInput.carMM + modelInput.carMM;

    if (isEmpty(makeInput) || isEmpty(modelInput)) {
        removeMsg(makeInput, "Enter make and model", "error");
        markEmpty(makeInput);
    }
    else if (re.test(carMM)) {
        removeMsg(makeInput, "Enter make and model", "error");
    }
    else {
        notification(makeInput, "Enter make and model", "error");
    }
}

//this function checks that start date begins day after current date
//...Assign a time of noon instead of midnight to the date. 
//This will be parsed as local time, and is far enough away to avoid any DST conflicts.
//source: https://stackoverflow.com/questions/29174810/javascript-date-timezone-issue/29185654#29185654
function dateCheck() {
    let input = getInputByID("#start-date");
    let value = new Date(input.value + "T12:00:00");

    if (isEmpty(input)) {
        removeMsg(input, "Start date begins tomorrow", "error");
        markEmpty(input);
    }
    else if (value < dateCurrent) {
        notification(input, "Start date begins tomorrow", "error");
    }
    else {
        removeMsg(input, "Start date begins tomorrow", "error");
        validEntry(getFormEntry(input));
    }
}

//this function checks that from 1 and up to 30 days entered
//for parking period
function durationCheck() {
    let input = getInputByID("#days");
    let duration = Number(input.duration);

    if (isEmpty(input)) {
        removeMsg(input, "30 day limit", "error");
        markEmpty(input);
    }
    else if (!(0 < duration && duration < 31)) {
        removeMsg(input, "30 day limit", "error");
        validEntry(getFormEntry(input));
    }
    else {
        notification(input, "30 day limit", "error");
    }
}

//this function checks that credit card number value
//is greater than zero and meets minimum digit requirements
function cardCheck() {

    let input = getInputByID("#credit-card");
    let value = input.value;

    if (isEmpty(input)) {
        removeMsg(input, "Enter valid card", "error");
        markEmpty(input);
    }
    else if (ccEntry(value)) {
        removeMsg(input, "Enter valid card", "error");
        validEntry(getFormEntry(input));
    }
    else {
        if (input.value.length > 0) {
            notification(input, "Enter valid card", "error");
        }
    }
}

//this function checks that cvv code is not empty 
//and is restricted to 3 numerical digits
function cvvCheck() {
    let input = getInputByID("#cvv");
    let value = input.value;
    let re = /^\s*\d{3}\s*$/;

    if (isEmpty(input)) {
        removeMsg(input, "Enter valid code", "error");
        markEmpty(input);
    }
    else if (re.test(value)) {
        removeMsg(input, "Enter valid code", "error");
        validEntry(getFormEntry(input));
    }
    else {
        notification(input, "Enter valid code", "error");
    }
}

//this function checks that credit card expiration date is not empty 
//is restricted to 3 numerical digits
//creates a new string consisting of the mm/yy values
//and evals that value string is greater than current date
function expiryCheck() {
    let input = getInputByID("#expiration");
    let value = input.value;
    let re = /^\d\d\/\d\d$/;

    if (isEmpty(input)) {
        removeMsg(input, "Enter valid expiration date", "error");
        markEmpty(input);
    }
    else if (re.test(value) && (0 < value.slice(0, 2) && value.slice(0, 2) < 13)) {
        value = value.slice(0, 3) + "01/20" + value.slice(3);

        let expDate = new Date(value);

        if (expDate < dateCurrent) {
            notification(input, "Enter valid expiration date", "error");
        }
        else {
            removeMsg(input, "Enter valid expiration date", "error");
            validEntry(getFormEntry(input));
        }
    }
    else {
        notification(input, "Enter valid expiration date", "error");
    }
}