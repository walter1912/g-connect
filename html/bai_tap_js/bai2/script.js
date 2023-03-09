"use strict";
//  create matrix
const ROW = 5;
const COLUMN = 7;
const lineVictory = 4;

// function create button ROW*COLUMN
function createTableTTT(row, col) {
  let $Tictactoe = document.querySelector(".tik-tac-toe");

  for (let i = 1; i <= row; i++) {
    let $row = document.createElement("div");
    let cols = [];
    for (let j = 1; j <= col; j++) {
      let c1 = i - j;
      let c2 = i + j;
      cols.push({ i, j, c1, c2 });
    }
    $row.innerHTML = `
        <div class="row row${i}">
        ${cols.map(
          (data) => (`
        <div class="col col${data.i}">
          <button
            class="btn__ttt"
            data-row="${data.i}"
            data-column="${data.j}"
            data-cheo1="${data.c1}"
            data-cheo2="${data.c2}"
            onclick="handlePlay(this)"
          ></button>
        </div>
          `)
        ).join('')}
        </div>`;
    $Tictactoe.appendChild($row);
  }
}
createTableTTT(ROW, COLUMN);
const $des_nextPlayer = document.querySelector(".des_nextPlayer");

// hàm xử lý click
function handlePlay(element) {
  if (element.innerText !== "") {
    console.log("o nay da duoc chon", e);
  }
  const currentPlayer = $des_nextPlayer.getAttribute("data-currentPlayer");
  console.log("currentPlayer: ", currentPlayer);
  if (currentPlayer == "player1") {
    element.innerText = "x";
    element.setAttribute("data-text", "x");
    $des_nextPlayer.setAttribute("data-currentPlayer", "player2");
    $des_nextPlayer.querySelector("span").innerText = "O";
    checkAllCase(currentPlayer);
  } else {
    element.innerText = "o";
    element.setAttribute("data-text", "o");
    $des_nextPlayer.setAttribute("data-currentPlayer", "player1");
    $des_nextPlayer.querySelector("span").innerText = "X";
    checkAllCase(currentPlayer);
  }
}
function checkAllCase(currentPlayer) {
  if (
    checkWin("row", lineVictory, 1, ROW) ||
    checkWin("column", lineVictory, 1, ROW) ||
    checkWin("cheo1", lineVictory, -ROW + 1, ROW - 1) ||
    checkWin("cheo2", lineVictory, 2, ROW * 2)
  ) {
    alert("player victory: " + "người chơi "+currentPlayer);
  } else {
    // trường hợp hòa
    if (checkEmpty() == false) {
      alert("Không có người chơi nào thắng cuộc");
      return;
    }
  }
}
// tạo 1 hàm để kiểm tra xem còn ô trống nữa không
function checkEmpty() {
  let buttons = document.querySelectorAll("button.btn__ttt");
  let kt = false;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].getAttribute("data-text") == null) {
      kt = true;
      return;
    }
  }
  return kt;
}
// TAO HAM KIEM TRA CHIEN THANG
// Ý TƯỞNG LÀ DÙNG DATA-ROW VÀ DATA-COLUMN ĐỂ CHECK
// SẼ KIỂM TRA THEO HÀNG NGANG(DATA-ROW), HÀNG DỌC(DATA-COLUMN), HÀNG CHÉO 1(ROW - COLUMN), HÀNG CHÉO 2(COLUMN - ROW)

function checkWin(type, line, start, end) {
  let victory = false;

  for (let i = start; i <= end; i++) {
    const buttons = document.querySelectorAll(
      `button.btn__ttt[data-${type}="${i}"]`
    );
    let realLine = 1;
    let buttonVictorys = [];
    buttonVictorys.push(0);
    for (let j = 1; j < buttons.length; j++) {
      if (
        buttons[j].getAttribute("data-text") ===
          buttons[j - 1].getAttribute("data-text") &&
        buttons[j].innerText !== ""
      ) {
        buttonVictorys.push(j);
        realLine += 1;
      } else {
        buttonVictorys = [j];
        realLine = 1;
      }
      if (realLine === line) {
        for (let key = 0; key < buttonVictorys.length; key++) {
          buttons[buttonVictorys[key]].style.backgroundColor = "tomato";
        }
        victory = true;
        return true;
      }
    }
    if (victory) return true;
  }
  return victory;
}
