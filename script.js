

const playX = 'X' // jogador 1
const playO = 'O'// jogador 2


const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('statusText');
const reiniciarButton = document.getElementById('reiniciarButton');
let jogadorAtual = playX;// jogador atual
let jogadorAtivo = true;// jogo em andamento e interrope mais jogadas se ouver cell livre

const cell = document.getElementById("cell");
//cell.style.background = "#E6E6FA";

iniciar();

reiniciarButton.addEventListener('click', iniciar);

function iniciar() { //função para iniciar e reiniciar o jogo.
    jogadorAtivo = true;
    jogadorAtual = playX;
    statusText.innerText = '';
    cells.forEach(cell => {
        cell.classList.remove(playX);
        cell.classList.remove(playO);
        cell.removeEventListener('click', Marcar);
        cell.addEventListener('click', Marcar, { once: true });
    });
}
function marcador(cell, classAtual) { // marcador do jogador
    cell.classList.add(classAtual);
}
function fimPartida(empate) { // informa o ganhador ou o empate
    if (empate) {
        statusText.innerText = 'Empate!';
    } else {
        statusText.innerText = `${jogadorAtual === playX ? "X é o vencedor" : "O é o vencedor"}`; // mensagem exibida
    }
    jogadorAtivo = false; // interroper mais jogadas
}

function empate() { // verificar se todas as células foram preenchidas(empate)
    return [...cells].every(cell => {
        return cell.classList.contains(playX) || cell.classList.contains(playO);
    });
}

function verificar(classAtual) { //verifica se tem um vencedor
    return rowcolumn.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(classAtual);
        });
    });
}

function trocar() { // alterar os marcadores
    jogadorAtual = jogadorAtual === playX ? playO : playX;
}

function Marcar(event) {
    const cell = event.target;
    const classAtual = jogadorAtual === playX ? playX : playO;
    marcador(cell, classAtual);
    cell.innerText = classAtual; // adicionar os símbolos 
    cell.classList.add(classAtual);//
    if (verificar(classAtual)) {
        fimPartida(false);
    } else if (empate()) {
        fimPartida(true);
    } else {
        trocar();
    }
}
// função para colocar um dos marcadores nas células

const rowcolumn = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function verificar(classAtual) { //verifica se tem um vencedor
    return rowcolumn.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(classAtual);
        });
    });
}
