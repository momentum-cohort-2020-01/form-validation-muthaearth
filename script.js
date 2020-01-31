console.log('Add validation!');
<script>

let input = document.querySelectorAll('.input-field')
let anyEntry = document.querySelectorAll("#parking-form")
let emptyField = document.createElement("p");
let alert="Error: Field incomplete"

form.addEventListener("submit", function(event){ event.preventDefault(){

//validation fails if any input field is blank
function emptyField (input) {
console.log(alert);

if (input.value === ""){
console.log(alert)
emptyField.innerText=alert
input.parentElement.classList.add("input-invalid")
} else {
 console.log(input)
input.parentElement.classList.add(“input-valid”)
}
}

let nameInput = document.querySelector('#name-field')
let charAlert="Error: Name contains invalid characters!"

function charCheck(nameInput) {
    console.log(charCheck)
}
// regular expression to match only alphanumeric characters and spaces
var re = /^[\w ]+$/;
nameInput.innerText=charAlert
emptyField.innerText=charAlert

// validation fails if the input doesn't match our regular expression
if(!re.test(nameInput.value)) {
  console.log(charAlert)
  nameInput.parentElement.classList.add(“input-valid”)
}
}}


</script>