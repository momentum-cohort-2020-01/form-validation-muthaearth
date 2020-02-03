
//This...
// let allInputs = document.querySelector("input")
// console.log((allInputs)

//should be
let allInputs = document.querySelectorAll("input")
console.log(allInputs)

const parkingForm = document.querySelector("#parking-form")
parkingForm.addEventListener ('submit', function(event) {
    event.preventDefault();
    console.log(parkingForm)//delete post-test console tests
}