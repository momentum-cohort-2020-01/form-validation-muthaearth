function alert(nameInput, text) {
    let alert = false
    for (let child of nameInput.parentElement.childNodes) {
        if (child.textContent == text)
            alert = true
    }
    if (alert === false) {
        let text = document.createElement("p")
        text.innerText = text
        nameInput.parentElement.appendChild(text)
    }
    else {
        console.log("Valid")
        nameInput.parentElement.classList.add("input-valid")

        let alert = false
        for (let child of nameInput.parentElement.childNodes) {
            if (child.textContent == text)
                alert = child
        }
        if (alert) {
            alert.remove()
        }
    }
}