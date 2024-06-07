// tesk a fazer 


// editar os card 
// remover e concluir 
// esconder os cards quando passar do limite de tela
// parar a duplicação dos cards
// gerar o sistema de filtro
// adicionar a api para traduzir o idioma 







window.onload = atualizarData;

// Atualizar a data em tempo real

function atualizarData () {
    const date = new Date();
    const meses = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "SeptemberOctober",
      "November",
      "December",
    ];
    const week = [
      "Monday ",
      "Tuesday",
      "Wednesday",
      "Thursday ",
      "Friday ",
      "Saturday",
      "Sunday",
    ];
    
    const numberDay = document.querySelector(".dayNumber__js");
    numberDay.textContent = date.getUTCDate();
    
    const monther = document.querySelector(".monther__js");
    monther.textContent = meses[date.getMonth()];
    
    const year = document.querySelector(".year__js");
    year.textContent = date.getFullYear();
    
    const dayWeek = document.querySelector(".day__js");
    dayWeek.textContent = week[date.getUTCDay() - 1];
}    

// Adicionar um novo card

const formAddCard = document.querySelector(".formAddCard");
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputAddCard = document.querySelector("#addItem__input").value;
  const buttonAddCard = document.querySelector(".buttonAddCard");

  buttonAddCard.addEventListener("click", () => {
    // chama a função de jogar o elemento em tela
    criarCard(inputAddCard);
    
  });

});

// criar um novo card

var criarCard = (inputValue) => {
    const container = document.querySelector('.listItems')

    const form = document.createElement('form');
    form.classList.add('itemCard');

    form.addEventListener('submit' , (event) => {event.preventDefault()});

    const input = document.createElement('input');
    input.setAttribute('id','itemName')
    input.placeholder = inputValue;

    const divActions = document.createElement('div');
    divActions.classList.add('buttonsAction')

    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('buttonRemove');

    const divRemove = document.createElement('div');
    const iRemove = document.createElement('i');
    iRemove.classList.add("fa-solid","fa-minus")


    const buttonDone = document.createElement('button');
    buttonDone.classList.add('buttonDone');


    const divAdd = document.createElement('div');
    const iDone = document.createElement('i');
    iDone.classList.add("fa-solid" , "fa-check")

    divRemove.appendChild(iRemove);
    buttonRemove.appendChild(divRemove);

    divAdd.appendChild(iDone);
    buttonDone.appendChild(divAdd);

    divActions.appendChild(buttonRemove);
    divActions.appendChild(buttonDone);

    form.appendChild(input);
    form.appendChild(divActions);

    container.appendChild(form);

    // Criar os eventos de edição e eventos de remover e de conclusão 




};




