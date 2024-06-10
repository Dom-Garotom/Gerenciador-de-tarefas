// tesk a fazer 


 // Criar evento de edição

 
// gerar o sistema de filtro
// adicionar a api para traduzir o idioma 
// Ageitar o ressponsivo


var tamanho = localStorage.getItem('pending');





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


atualizarProgresso()


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
    divActions.classList.add("escondido")

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
    

    // Ação de apresentar os botões de ação ao clicar

    input.addEventListener('click', () =>{
      divActions.classList.remove('escondido')
      input.classList.remove('inputEscondido')
    })


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

      removerDaMemoria( 'pending' , inputAddCard )
      storegeLocal( 'Concluidos', inputAddCard)    
      console.log(cardConcluidos)
      form.remove()
    
    })

    }
};



// Exibir em tela os elementos em memoria local pendentes

var cardsPendentes = () => {
  const buttonPending = document.querySelector('.peding');
  
  // função para remover todos os elementos em tela 
  
  removerElementos('listItems')
  
  // renderizar os elementos apenas dos pendentes 
  
  MostrarEmTela('pending');
  
}

// Exibir em tela os elementos em memoria local concluidos

var cardsConcluidos = () => {
  const buttonPending = document.querySelector('.peding');
  
  // função para remover todos os elementos em tela 
  
  removerElementos('listItems')
  
  // renderizar os elementos apenas dos pendentes 
  
  MostrarEmTela('Concluidos');
  
}

  
  
  
  
// função que renderiza elementos em local storage em tela  
  
var MostrarEmTela = ( chave ) => {
  var value = JSON.parse(localStorage.getItem(`${chave}`));
  

  if (chave == 'pending'){
    value.forEach( input => {
      criarCardsLocaisPendentes(input);
    })
    


  } else {
    value.forEach( input => {
      criarCardsLocaisConcluidos(input);
    })
  }

}  
  
  
  
// Função que remove todos elementos de uma div  
  
var removerElementos = (container) => {
  const containerArray = document.querySelector(`.${container}`);
  containerArray.innerHTML = "";  
}



// Mandar o array com as tesks prontas para memoria local

var storegeLocal = (chave , valor) => {
  var memoriaLocal = JSON.parse(localStorage.getItem(chave));

  if (memoriaLocal == null){
    memoriaLocal = [];
  }

  memoriaLocal.push(valor);

  localStorage.setItem(chave, JSON.stringify(memoriaLocal));
}

// Função para criar elementos dos cards salvos localmente

var criarCardsLocaisPendentes = ( value ) => {

  const container = document.querySelector('.listItems')

  const form = document.createElement('form');
  form.classList.add('itemCard');

  form.addEventListener('submit' , (event) => {event.preventDefault()});

  const input = document.createElement('input');
  input.setAttribute('id','itemName')
  input.placeholder = value;

  const divActions = document.createElement('div');
  divActions.classList.add('buttonsAction')
  divActions.classList.add('escondido')

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

  
  // Ação de apresentar os botões de ação ao clicar

  input.addEventListener('click', () =>{
    divActions.classList.remove('escondido')
  })
  

  // Evento de remoção de card 

  buttonRemove.addEventListener('click', () =>{ 

    form.remove();

  })

  // Evento de conclução de card e adição na lista de concluidos ;

  buttonDone.addEventListener('click', () => {
    
    removerDaMemoria( 'pending' , value )
    storegeLocal( 'Concluidos', value )    
    console.log(cardConcluidos)
    form.remove()
  
  })

  
}


var criarCardsLocaisConcluidos = (value) => {
  const container = document.querySelector('.listItems')

  const div = document.createElement('div');
  div.classList.add('CardConcluido');

  const span = document.createElement('span');
  span.classList.add('spanText');
  span.innerText = value;


  div.appendChild(span);
  container.appendChild(div)
}

// remove os elementos da memoria local

var removerDaMemoria = (  chave , elementoParaRemover ) => {
  var values  = JSON.parse(localStorage.getItem(`${chave}`));

  if (  values ==  '' ){
    values = [];
  }

  var RemoveValues  = values.filter( (  valor ) => { valor !== elementoParaRemover })

  localStorage.setItem(`${chave}` , JSON.stringify(RemoveValues));

}


// ação que calcula a porcentagem da barra de conclução

function atualizarProgresso () {

  const progresso = document.querySelector('#progresso');
  
  
  
  var array =  JSON.parse(localStorage.getItem('pending'));
  var array2 =  JSON.parse(localStorage.getItem('Concluidos'))


  var total = array.length + array2.length;

  var prog = ((array2 / 100) * total) / 100;
  
  teste = Math.round(prog);
  
  progresso.style.width = `${teste}%`
  console.log(teste) 
}


