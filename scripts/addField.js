//Procurar o botão
document.querySelector("#add-time")
//Quando clicar o botão
.addEventListener('click', cloneField)

//Executar a função
function cloneField(){
    //Duplicar os campos
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)//Node=tags html o true ele pega todos as tags filhas 

    //limpar os campos
    const fields = newFieldContainer.querySelectorAll('input')

    fields.forEach(function(field) {
        //pegar o field do momento
        field.value = ""
        
    });

    //Colocar na pagina
    document.querySelector("#schedule.items").appendChild(newFieldContainer)


}