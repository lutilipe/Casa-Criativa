function setEvents() {
    const button = document.querySelector("#buttons .fat")
    if(button) button.onclick = e => { onOff() }

    const form = document.querySelector("form")
    form.onsubmit = event => { formValidation(event) }

    const saveElement = document.querySelector("form .save") 
    saveElement.onclick = e => { onOff() }

    const backElement = document.querySelector("form .back") 
    backElement.onclick = e => { onOff() }

    const linkElement = document.getElementById("newIdea")
    if(linkElement) linkElement.onclick = e => { onOff() }

    const excludeButton = document.getElementById("exclude")
    excludeButton.onclick = e => { exclude() }
}

function onOff() {
    document.querySelector("#modal")
        .classList
        .toggle("hide")

    document.querySelector("body")
        .classList
        .toggle("hideScroll")

    document.querySelector("#modal")
        .classList
        .toggle("addScroll");
};

function formValidation(event) {
    
    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link"
    ]

    const isEmpty = valuesToCheck.find(value => {
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if (checkIfIsEmpty && checkIfIsString) {
            return true
        }
            
    })

    if (isEmpty) {
        event.preventDefault()
        alert('Por favor, preencha todos os campos')
    }
}

function exclude() {
    location.reload()
}

setEvents()
