const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.getElementById('alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const botaoStartPause = document.getElementById('start-pause');
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado= new Audio('./sons/beep.mp3');
let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    };
});

botaoFoco.addEventListener('click', () => {
    // html.setAttribute('data-contexto', 'foco');
    // imagem.setAttribute('src', './imagens/foco.png');
    alterarContexto('foco');
    botaoFoco.classList.add('active');
});

botaoDescansoCurto.addEventListener('click', () => {
    // html.setAttribute('data-contexto', 'descanso-curto');
    // imagem.setAttribute('src', './imagens/descanso-curto.png');
    alterarContexto('descanso-curto');
    botaoDescansoCurto.classList.add('active');
});

botaoDescansoLongo.addEventListener('click', () => {
    // html.setAttribute('data-contexto', 'descanso-longo');
    // imagem.setAttribute('src', './imagens/descanso-longo.png');
    alterarContexto('descanso-longo');
    botaoDescansoLongo.classList.add('active');
});

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;
    
        default:
            break;
    };
};

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        zerarContagem();
        alert('Tempo finalizado!');
        return;
    };

    tempoDecorridoEmSegundos -= 1;
    console.log('Temporizador: ' + tempoDecorridoEmSegundos);
    console.log('Id: ' + intervaloId);
};

botaoStartPause.addEventListener('click', iniciarOuPausarContagem);

function iniciarOuPausarContagem() {
    if(intervaloId) {
        audioPausa.play();
        zerarContagem();
        return;   // early return -- circuit breaker
    };

    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
};

function zerarContagem() {
    clearInterval(intervaloId);
    intervaloId = null;
};