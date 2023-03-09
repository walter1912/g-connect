import React from "react";
import PropTypes from "prop-types";

function ColTTT({ key, data, ...defaultProps }) {
  // console.log('defaultProps: ', defaultProps);
  //   createTableTTT(ROW, COLUMN);

  // hàm xử lý click
  function handlePlay(element) {
    // console.log("defaultProps: ", defaultProps);

    const $des_nextPlayer = document.querySelector(".des_nextPlayer");
    // console.log('element: ',element );
    if (element.innerText !== "") {
      console.log("o nay da duoc chon", element);
    } else {
      // hiển thị ra thứ tự các bước đi
      console.log('Bước đi ở ô hàng '+ element.getAttribute('data-row')+' cột '+ element.getAttribute('data-column'));
      // in đậm bước hiện tại
      let buttons = document.querySelectorAll("button.btn__ttt");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "#fafafa";
      }
      element.style.backgroundColor = "#ccc";

      const currentPlayer = $des_nextPlayer.getAttribute("data-currentplayer");
      // console.log("currentPlayer: ", currentPlayer);
      if (currentPlayer == "player1") {
        element.innerText = "x";
        element.setAttribute("data-text", "x");
        $des_nextPlayer.setAttribute("data-currentplayer", "player2");
        $des_nextPlayer.querySelector("span").innerText = "O";
        checkAllCase(currentPlayer);
      } else {
        element.innerText = "o";
        element.setAttribute("data-text", "o");
        $des_nextPlayer.setAttribute("data-currentplayer", "player1");
        $des_nextPlayer.querySelector("span").innerText = "X";
        checkAllCase(currentPlayer);
      }
    }
  }

  function checkAllCase(currentPlayer) {
    const { ROW, COLUMN, lineVictory } = defaultProps;

    // console.log("checkAllCase: ", ROW, COLUMN, lineVictory);
    if (
      checkWin("row", lineVictory, 1, ROW) ||
      checkWin("column", lineVictory, 1, COLUMN) ||
      checkWin("cheo1", lineVictory, -ROW + 1, ROW - 1) ||
      checkWin("cheo2", lineVictory, 2, ROW * 2)
    ) {
      alert("player victory: " + "người chơi " + currentPlayer);
      // console.log("người chơi " + currentPlayer + " chiến thắng");
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
      // console.log('buttons: ', buttons);
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
        // console.log('buttonVictorys: '+`data-${type}="${i}" `, buttonVictorys  );
        if (realLine === line) {
          for (let key = 0; key < buttonVictorys.length; key++) {
            // console.log('buttons[buttonVictorys[key]]', buttons[buttonVictorys[key]]);
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

  return (
    <div key={key} className={`col col${data.r}`}>
      <button
        className="btn__ttt"
        data-row={data.r}
        data-column={data.j}
        data-cheo1={data.c1}
        data-cheo2={data.c2}
        onClick={(e) => handlePlay(e.target)}
      ></button>
    </div>
  );
}

ColTTT.propTypes = {};

export default ColTTT;
