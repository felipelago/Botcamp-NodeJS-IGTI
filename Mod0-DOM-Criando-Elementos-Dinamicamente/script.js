
let fsList = document.querySelectorAll(".multiple-field");
for (let i = 0; i < fsList.length; i++) {//???
    multipleField(fsList[i])
}
function multipleField(fs) {
    let addButton = document.createElement("button")
    addButton.innerText = "Adicionar"
    addButton.type = "button" //o botão por padrão é do tipo submit, trocando para tipo button não terá problemas para adicionar um novo input
    fs.appendChild(addButton)
    let firstInput = fs.querySelector("input")

    addButton.addEventListener("click", function () {
        let newInput = document.createElement("input")
        let div = document.createElement("div")
        newInput.name = firstInput.name;//Essa função serve para copiar o nome e o tipo do primeiro input, aplicando em todos os outros
        newInput.type = firstInput.type;

        let deleteButton = createElement("button")
        deleteButton.innerText = "Excluir"
        deleteButton.type = "button"
        deleteButton.addEventListener("click", function () {
            div.remove()
        })

        div.appendChild(newInput)
        div.appendChild(deleteButton)
        fs.insertBefore(div, addButton)//No primeiro parametro é o elemento que você quer adicionar e o segundo é a referência onde o elemento vai ser adicionado antes dele
    })
}