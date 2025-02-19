/**
 * DO NOT EDIT THIS FILE
 */

import { Game } from "./Game";

const game = new Game();

const info = document.getElementById("info");
const button = document.getElementById("play-button");
const board = document.getElementById("board");

button?.addEventListener("click", () => {
  game.restart();
  if (board) {
    draw(game, board);
  }
});

const draw = (game: Game, board: HTMLElement) => {
  board.innerHTML = "";

  game.getCells().forEach((cell, i) => {
    const div = document.createElement("div");
    div.className = "box";
    if (cell !== "-") {
      div.innerText = cell;
    }
    div.addEventListener("click", () => {
      game.onClick(i);
      draw(game, board);
    });
    board.appendChild(div);
  });

  if (game.isTie()) {
    if (info) {
      info.innerText = `It's a tie!`;
    }
    button?.removeAttribute("disabled");
    button?.classList.add("button", "button-hoverable");
  } else if (game.getWinner() !== "-") {
    if (info) {
      info.innerText = `Nice, ${game.getWinner()} won`;
    }
    button?.removeAttribute("disabled");
    button?.classList.add("button", "button-hoverable");
  } else {
    if (info) {
      info.innerText = `It's ${game.getTurn()} turn`;
    }
    button?.setAttribute("disabled", "true");
    button?.classList.remove("button-hoverable");
    button?.classList.add("button");
  }
};

if (board) {
  draw(game, board);
}