console.log('Add validation!');

//let or const = a var
let inputs = document.querySelectorAll('.entry')

//any id element is unique - must use .querySelector
let form = document.querySelector("#parking-form")
console.log(inputs)

//validation fails if any input field is blank
//emptyField takes argument inputs
form.addEventListener("submit", function (event) {
  event.preventDefault()
  for (let input of inputs) {
    if (input.value === "") {
      console.log("Empty")
      input.parentElement.classList.add("input-invalid")
      let text = document.createTextNode("Entry required")
      input.parentElement.appendChild(text)
    } else {
      console.log("Valid")
      input.parentElement.classList.add("input-valid")
    }
  }
})

//Check valid characters in name field
let nameInput = document.querySelector('#name')
console.log(nameInput)

form.addEventListener("input", function (event) {

  // regular expression to match only alphanumeric characters and spaces
  if (nameInput.value != "") {

    var re = /^[A-z ]+$/;
    // /[!@#$%^&*(),.?":{}|<>]/;
    // /^[\w ]+$/;
    if (!re.test(nameInput.value)) {
      console.log("Bad characters")
      nameInput.parentElement.classList.remove("input-valid")
      nameInput.parentElement.classList.add("input-invalid")

      let alert = false
      for (let child of nameInput.parentElement.childNodes) {
        if (child.textContent == "Check spelling")
          alert = true
      }
      if (alert === false) {
        let text = document.createElement("p")
        text.innerText = "Check spelling"
        nameInput.parentElement.appendChild(text)
      }
    } else {
      console.log("Valid")
      nameInput.parentElement.classList.add("input-valid")

      let alert = false
      for (let child of nameInput.parentElement.childNodes) {
        if (child.textContent == "Check spelling")
          alert = child
      }
      if (alert) {
        alert.remove()
      }
    }
  }
})

//Enter car year
let yearInput = document.querySelector('#car-year')
console.log(yearInput)

form.addEventListener("input", function (event) {

  // regular expression to match only numeric characters and spaces
  if (yearInput.value != "") {

    var re = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;

    //get date > 1900 and == current year
    let dateInput = document.querySelector("#car-year")
    let dateInputValue = new Date(dateInput.value)
    yrInput = dateInputValue.getFullYear()
    yrCurrent = new Date().getFullYear()

    if (!re.test(yearInput.value) || !(Number(yrInput) > 1900 && Number(yrInput) <= Number(yrCurrent))) {
      console.log("Bad characters")
      yearInput.parentElement.classList.remove("input-valid")
      yearInput.parentElement.classList.add("input-invalid")

      let alert = false
      for (let child of yearInput.parentElement.childNodes) {
        if (child.textContent == "Check year")
          alert = true
      }
      if (alert === false) {
        let text = document.createElement("p")
        text.innerText = "Check year"
        yearInput.parentElement.appendChild(text)
      }
    } else {
      console.log("Valid")
      yearInput.parentElement.classList.add("input-valid")

      let alert = false
      for (let child of yearInput.parentElement.childNodes) {
        if (child.textContent == "Check year")
          alert = child
      }
      if (alert) {
        alert.remove()
      }
    }
  }
})