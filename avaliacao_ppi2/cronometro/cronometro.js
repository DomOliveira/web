const timerEl = document.getElementById('timer');
const markslist = document.getElementById('marks-list');
let intervalid = 0;

/*o let timer é uma variavel que vai armazenar o 
tempo que vai decorrido*/
let timer = 0;
let marks = [];

/*função que vai transformar o tempo*/

const formatTime = (time) =>{
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const secunds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:` +
           `${minutes.toString().padStart(2, '0')}:` +
           `${secunds.toString().padStart(2, '0')}:` +
           `${hundredths.toString().padStart(2, '0')}`;
}

/*incrementa o tempo / faz ele correr/acontecer*/
const toggleTimer = () =>{
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalid);
/*vai analisar qual é a ação; criar um intervalo de 
tempo de 10 em 10 e vai acrescentar de 1 em 1 e vai setar o timer
pra aparecer na tela*/

    if (action == 'start' || action == 'continue') {

        intervalid = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);

        document.getElementById('power').setAttribute('action', 'pause');
        document.getElementById('power').innerHTML = '<i class="fa-solid fa-pause"></i>';

    } else if (action == 'pause') {

        document.getElementById('power').setAttribute('action', 'continue');
        document.getElementById('power').innerHTML = '<i class="fa-solid fa-play"></i>';

    }

}

/*Antes de aparecer na tela ele vai formatar o tempo*/

function setTimer(timer) {
    timerEl.innerText = formatTime(timer); // ← corrigido
}

/*adicionando o evento de click no botão*/

document.getElementById('power').addEventListener('click', toggleTimer);

const addMarkToList = (markIndex, markTime) => {
    markslist.innerHTML += `<p> Marca ${markIndex}: ${formatTime(markTime)}</p>`
}

/*função para marcar o tempo*/

const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
}

/*adicionando ação ao botão de marcar o tempo*/

document.getElementById('mark').addEventListener('click', markTime);

/*função por botão de resetar o tempo*/
const resetTimer = () => {
    clearInterval(intervalid)
    timer = 0;
    marks = [];
    setTimer(timer);
    markslist.innerHTML = '';
    
    const button = document.getElementById('power');
    button.setAttribute('action', 'start'); // ← corrigido
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

/*ação pro botão de resetar o tempo*/

document.getElementById('reset').addEventListener('click', resetTimer);
