const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioAdicionarTarefa = document.querySelector('.app__form-add-task');
const campoDeTexto = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const botaoCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const botaoRemoverConcluidas = document.getElementById('btn-remover-concluidas');
// const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

// Função para limpar o conteúdo do textarea e esconder o formulário:
const limparFormulario = () => {
    campoDeTexto.value = '';  // Limpa o conteúdo do textarea
    formularioAdicionarTarefa.classList.add('hidden');  // Adiciona a classe 'hidden' ao formulário para escondê-lo
};

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');
    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        // debugger;
        const novaDescricao = prompt('Qual é o novo nome da tarefa?');
        if(novaDescricao) {
            paragrafo.textContent = novaDescricao;  // atualizamos a camada visual
            tarefa.descricao = novaDescricao;  // atualizamos a referência da tarefa, que é a camada de dados
            atualizarTarefas();   // e fizemos o update na localStorage, então quando atualizar a página, as tarefas permanecerão modificadas
        };  // assim, uma string vazia e um nulo (cancelar) serão considerados como FALSE
    };

    const imagemDoBotao = document.createElement('img');
    imagemDoBotao.setAttribute('src', './imagens/edit.png');

    botao.append(imagemDoBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active');
            });

            if(tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            };

            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add('app__section-task-list-item-active');
        };
    };

    return li;
};

botaoAdicionarTarefa.addEventListener('click', () => {
    formularioAdicionarTarefa.classList.toggle('hidden');
});

formularioAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: campoDeTexto.value
    };
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    // localStorage.setItem('tarefas', JSON.stringify(tarefas));
    atualizarTarefas();
    campoDeTexto.value = '';
    formularioAdicionarTarefa.classList.add('hidden');
});

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

// Associa a função limparFormulario ao evento de clique do botão Cancelar:
botaoCancelar.addEventListener('click', limparFormulario);

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    };
});

botaoRemoverConcluidas.onclick = () => {
    document.querySelectorAll('.app__section-task-list-item-complete').forEach(elemento => {
        elemento.remove();  // camada visual
    });
    tarefas = tarefas.filter(tarefa => !tarefa.completa);
    atualizarTarefas();
}