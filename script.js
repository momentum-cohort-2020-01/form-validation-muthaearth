console.log('Add validation!');
<script>

let nameInput = document.querySelector("'#name-field')
let nameEntry = document.querySelector("#parking-form")
let emptyField = document.createElement("p");
let nameWarn="Error: Name is incomplete"
emptyField.innerText=nameWarn

form.addEventListener("submit", function(event){ event.preventDefault(){

//validation fails if nameInput is blank
function nameInput(nameCheck) {
console.log(nameCheck);

if (nameCheck.value === ""){
console.log(nameMsg)
nameCheck.parentElement.classList.add("input-invalid")
} else {
 console.log(nameInput)
nameCheck.parentElement.classList.add(“input-valid”)
}
}

function nameInput(charCheck) {
    console.log(charCheck);
// regular expression to match only alphanumeric characters and spaces
var re = /^[\w ]+$/;
let charWarn="Error: Name contains invalid characters!"
charField.innerText=charWarn

// validation fails if the input doesn't match our regular expression
if(!re.test(nameCheck.value)) {
  console.log(charWarn);
  nameCheck.parentElement.classList.add(“input-valid”)
}
}}


</script>