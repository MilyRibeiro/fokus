const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');

botaoFoco.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
    imagem.setAttribute('src', './imagens/foco.png');
});

botaoDescansoCurto.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
    imagem.setAttribute('src', './imagens/descanso-curto.png');
});

botaoDescansoLongo.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
    imagem.setAttribute('src', './imagens/descanso-longo.png');
});