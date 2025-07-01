const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

botaoFoco.addEventListener('click', () => {
    // html.setAttribute('data-contexto', 'foco');
    // imagem.setAttribute('src', './imagens/foco.png');
    alterarContexto('foco')
});

botaoDescansoCurto.addEventListener('click', () => {
    // html.setAttribute('data-contexto', 'descanso-curto');
    // imagem.setAttribute('src', './imagens/descanso-curto.png');
    alterarContexto('descanso-curto');
});

botaoDescansoLongo.addEventListener('click', () => {
    // html.setAttribute('data-contexto', 'descanso-longo');
    // imagem.setAttribute('src', './imagens/descanso-longo.png');
    alterarContexto('descanso-longo');
});

function alterarContexto(contexto) {
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
    }
};