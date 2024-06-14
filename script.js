window.onload = atualizarTasksDiarias , atualizarData()  , atualizarProgresso();

var buttonDone = document.querySelector('.done');
buttonDone.addEventListener('click',  () => {
  buttonDone.classList.add('doneActive')
  buttonPending.classList.remove('pedingActive')
})

var buttonPending = document.querySelector('.peding');
buttonPending.addEventListener('click',  () => {
  buttonPending.classList.add('pedingActive')
  buttonDone.classList.remove('doneActive')
})


// lembrar de estudar mais sobre esse metódo de atualização pelo dom 

const atualizador = new MutationObserver(atualizarProgresso)
const observador = document.querySelector('.items__container');
const config = { childList: true, subtree: true };

if (observador){
  atualizador.observe(observador , config);
}

// Evita o comportamento dos formulários

const formAddCard = document.querySelector(".formAddCard");
formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  formAddCard.reset()
});

const formSearch = document.querySelector('.form_search');
formSearch.addEventListener("submit", (event) => {

  const inputSearch = document.querySelector('#search').value;

  event.preventDefault();
  formSearch.reset()
  removerElementos('listItems')
  search(inputSearch);

});


// Funções criadas para organização de código,


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

//  Função usada para resetar todas as listas de cards assim que atualizar o dia

function atualizarTasksDiarias () {
    
    const date= new Date();
    const diaAtual = date.getDate() ;


    const diaStorage = localStorage.getItem('dataStorage');

    if ( diaAtual != diaStorage){

        localStorage.removeItem('pending');
        localStorage.removeItem('Concluidos');

        localStorage.setItem('dataStorage' , diaAtual);

    }

}

// Função que cria novos cards 

const criarCard = (inputValue) => {
    const inputAddCard = document.querySelector(inputValue).value;

    if (inputAddCard == ''){

    } else {

      
    const itemCard = document.createElement('div');
    itemCard.classList.add('itemCard')

    const container = document.querySelector('.listItems')

    const NameItem = document.createElement('span');
    NameItem.setAttribute('id','itemName')

    const name = document.createElement('p');
    name.classList.add('name')
    name.innerHTML = inputAddCard;

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

    // const requiredEdit = document.createElement('span');
    // requiredEdit.innerHTML = 'Para editar o card escreva o novo texto na barra de criação'
    // requiredEdit.classList.add('escondido' , 'spanRequired')

    divRemove.appendChild(iRemove);
    buttonRemove.appendChild(divRemove);

    divAdd.appendChild(iDone);
    buttonDone.appendChild(divAdd);

    divActions.appendChild(buttonRemove);
    divActions.appendChild(buttonDone);

    NameItem.appendChild(name);
    NameItem.appendChild(requiredEdit);

    itemCard.appendChild(NameItem);
    itemCard.appendChild(divActions);

    container.appendChild(itemCard);
    

    // Ação de apresentar os botões de ação ao clicar

    NameItem.addEventListener('click', () =>{
      
      divActions.classList.toggle('escondido');
      
    })


    // Joga o card criado para lista de pendentes no local storage

      storegeLocal('pending' , inputAddCard)
    
    // evento de edição de informações do input

    // // evento de edição

    // NameItem.addEventListener('click' , () =>{
    //   requiredEdit.classList.toggle('escondido')
    //   const novoText = document.querySelector('')
    // })


    // Evento de remoção de card 

    buttonRemove.addEventListener('click', () =>{ 
      removerDaMemoria( 'pending' , inputAddCard )
      itemCard.remove();

    })

    // Evento de conclução de card e adição na lista de concluidos ;

    buttonDone.addEventListener('click', () => {
      removerDaMemoria( 'pending' , inputAddCard )
      storegeLocal( 'Concluidos', inputAddCard)
      itemCard.remove()
    })

    }
};

// Exibir em tela os elementos em memoria local pendentes

var cardsPendentes = () => {

  const containerAddItem = document.querySelector('.addItems');
  containerAddItem.classList.remove('escondido')
  
  // função para remover todos os elementos em tela 
  
  removerElementos('listItems')
  
  // renderizar os elementos apenas dos pendentes 
  
  MostrarEmTela('pending');
  
}

// Exibir em tela os elementos em memoria local concluidos

var cardsConcluidos = () => {

  const containerAddItem = document.querySelector('.addItems');
  containerAddItem.classList.add('escondido')
  
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

function criarCardsLocaisPendentes  ( value ) {

  const itemCard = document.createElement('div');
  itemCard.classList.add('itemCard')

  const container = document.querySelector('.listItems')

  const NameItem = document.createElement('span');
  NameItem.setAttribute('id','itemName')

  const name = document.createElement('p');
  name.classList.add('name')
  name.innerHTML = value;

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

  buttonRemove.appendChild(divRemove);
  divRemove.appendChild(iRemove);

  divAdd.appendChild(iDone);
  buttonDone.appendChild(divAdd);

  divActions.appendChild(buttonRemove);
  divActions.appendChild(buttonDone);

  NameItem.appendChild(name);

  itemCard.appendChild(NameItem);
  itemCard.appendChild(divActions);

  container.appendChild(itemCard);
    

    // Ação de apresentar os botões de ação ao clicar

  NameItem.addEventListener('click', () =>{
    
    
    divActions.classList.toggle('escondido');
    
  })

  // evento de edição de informações do input


  // Evento de remoção de card 

  buttonRemove.addEventListener('click', () =>{ 

    removerDaMemoria( 'pending' , value )
    itemCard.remove();

  })

  // Evento de conclução de card e adição na lista de concluidos ;

  buttonDone.addEventListener('click', () => {

    removerDaMemoria( 'pending' , value )
    storegeLocal( 'Concluidos',  value )    
    itemCard.remove()
    
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

  if (typeof elementoParaRemover === 'string') {

    values = values.filter(valor => valor !== elementoParaRemover);
    localStorage.setItem( chave , JSON.stringify(values));

  } else {

    console.log('O '+elementoParaRemover+' não é uma string')

  }

}


// ação que calcula a porcentagem da barra de conclução

function atualizarProgresso () {
  let Pendentes = JSON.parse(localStorage.getItem('pending'));
  let concluidas = JSON.parse(localStorage.getItem('Concluidos'));


  if ( Pendentes && Array.isArray(Pendentes) || concluidas && Array.isArray(concluidas)){
    let total = Pendentes.length + concluidas.length;

    let prog = ( concluidas.length / total ) * 100;
    prog = prog.toFixed(2);


    const progresso = document.querySelector('#progresso');

    progresso.style.width = `${prog}%`;
  }
}

// Função que executa a busca pelos cards;

function search (search) {

  console.log(search)

  let valoresPendentes = JSON.parse(localStorage.getItem('pending')) || [];
  let valoresConcluidos = JSON.parse(localStorage.getItem('Concluidos')) || [];
  let itemSemelhantesPendentes;
  let itemSemelhantesConcluidos;
 
  console.log("Valores pendentes:", valoresPendentes);
  console.log("Valores concluídos:", valoresConcluidos);


  itemSemelhantesPendentes = valoresPendentes.filter( (item) => item.includes(search) );
  itemSemelhantesConcluidos = valoresConcluidos.filter( (item) => item.includes(search) );



  itemSemelhantesPendentes.forEach( obj =>{
    criarCardsLocaisPendentes(obj);
  })
  itemSemelhantesConcluidos.forEach( obj =>{
    criarCardsLocaisConcluidos(obj);
  })
}

