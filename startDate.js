// Enter startDate
let yearInput = document.querySelector('#car-year')
console.log(yearInput)

form.addEventListener("input", function (event) {

  // regular expression to match only numeric characters and spaces
  if (yearInput.value != "") {

    var re = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;

    //date > 1900 and date !> current year
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