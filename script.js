// tesk a fazer 


 // Criar evento de edição
// criar uma funão que joga as informações em memôria local e depois exibe em tela; --- Em andamento......
// Criar o sistema de concluido e pendentes -- Em andamento....
// gerar o sistema de filtro
// adicionar a api para traduzir o idioma 
// Ageitar o ressponsivo







window.onload = atualizarData;

var cardConcluidos = [];






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

// Evita o comportamento dos formulários

const formAddCard = document.querySelector(".formAddCard");
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  formAddCard.reset()
});

// Função que cria novos cards 

var criarCard = (inputValue) => {
    const inputAddCard = document.querySelector(inputValue).value;

    if (inputAddCard == ''){

    } else {
      

    const container = document.querySelector('.listItems')

    const form = document.createElement('form');
    form.classList.add('itemCard');

    form.addEventListener('submit' , (event) => {event.preventDefault()});

    const input = document.createElement('input');
    input.setAttribute('id','itemName')
    input.placeholder = inputAddCard;

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

    // Joga o card criado para lista de pendentes no local storage

      storegeLocal('pending' , inputAddCard)
    
    // evento de edição de informações do input

    input.addEventListener('change', (event) => {
      console.log(event)

    })

    // Evento de remoção de card 

    buttonRemove.addEventListener('click', () =>{ 

      form.remove();

    })

    // Evento de conclução de card e adição na lista de concluidos ;

    buttonDone.addEventListener('click', () => {
      
      storegeLocal('Concluidos', inputAddCard)    
      console.log(cardConcluidos)
      form.remove()
    
    })

    }
};


// Mandar o array com as tesks prontas para memoria local

var storegeLocal = (chave , valor) => {
  var memoriaLocal = JSON.parse(localStorage.getItem(chave));

  if (memoriaLocal == null){
    memoriaLocal = [];
  }

  memoriaLocal.push(valor);

  localStorage.setItem(chave, JSON.stringify(memoriaLocal));
}

// Exibir em tela os elementos em memoria local

const buttonPending = document.querySelector('.peding');

buttonPending.addEventListener('click', () => {

})
