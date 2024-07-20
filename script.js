const playX = "X";
const playO = "O";

const cells = document.querySelectorAll("main > div > div");
const statusText = document.querySelector("#statusText");
const botao = document.querySelector("#btn");
const tabuleiro = document.querySelector("#tabuleiro");

const rowcolumn = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let jogadorAtual = playX;
let end = false;

botao.addEventListener("click", iniciar);

function iniciar() {
  tabuleiro.style.display = "grid";
  botao.textContent = "Reiniciar";
  statusText.innerText = "";
  end = false;
  cells.forEach((cell) => {
    cell.classList.remove(playX);
    cell.classList.remove(playO);
    cell.textContent = "";
    cell.removeEventListener("click", Marcar);
    cell.addEventListener("click", Marcar, { once: true });
  });
}

function fimPartida(empate) {
  if (empate) {
    statusText.innerText = "Empate!";
  } else {
    statusText.innerText = `${
      jogadorAtual === playX ? "X é o vencedor" : "O é o vencedor"
    }`;
    end = true;
  }
}

function empate() {
  return [...cells].every((cell) => {
    return cell.classList.contains(playX) || cell.classList.contains(playO);
  });
}

function Marcar(event) {
  if (!end) {
    const cell = event.target;
    cell.innerText = jogadorAtual;
    cell.classList.add(jogadorAtual);
  }
  if (verificar(jogadorAtual)) {
    fimPartida(false);
  } else if (empate()) {
    fimPartida(true);
  } else {
    jogadorAtual = jogadorAtual === playX ? playO : playX;
  }
}

function verificar(jogador) {
  return rowcolumn.some((combo) => {
    return combo.every((index) => {
      return cells[index].classList.contains(jogador);
    });
  });
}
