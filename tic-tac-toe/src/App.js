import logo from "./logo.svg";
import "./App.css";
import TableTTT from "./components/TableTTT";
import { useState } from "react";

function App() {
  //  create matrix
  const [ROW, setROW] = useState(3);
  const [COLUMN, setCOLUMN] = useState(3);
  const [lineVictory, setLineVictory] = useState(3);
 const [ktSetup, setKtSetup] = useState(false);
//  setup 
  function handleSetup() {
    let formSetup = document.forms["setup"];
    console.log("formSetup: ", formSetup);
    setROW(parseInt(formSetup.ROW.value));
    setCOLUMN(parseInt(formSetup.COLUMN.value));
    setLineVictory(parseInt(formSetup.lineVictory.value));
    setKtSetup(true);
  }
// reset 
function handleReset() {
  setKtSetup(false);
}
  return (
    <section>
      <div className="description">
        <div className="des__time">
          <label htmlFor="realtime">
            <input type="time" name="realtime" id="realtime" />
          </label>
        </div>
        <div className="des_players">
          <p className="player1">
            <span>Người chơi X: </span>
            <span>Nguyễn Văn Anh</span>
          </p>
          <p className="player2">
            <span>Người chơi O: </span>
            <span>Lê Văn Đạt</span>
          </p>
          <div className="des_nextPlayer" data-currentplayer="player1">
            Đến lượt người chơi <span>X</span>
          </div>
        </div>
        <form
          className="setup"
          name="setup"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="ROW">Chọn số hàng: </label>
            <input name="ROW" type="number" id="ROW" />
          </div>
          <div>
            <label htmlFor="ROW">Chọn số cột: </label>
            <input name="COLUMN" type="number" id="COLUMN" />
          </div>
          <div>
            <label htmlFor="ROW">Chọn số hàng để chiến thắng: </label>
            <input name="lineVictory" type="number" id="lineVictory" />
          </div>
          <button onClick={()=>handleSetup()}>OK</button>
          <button onClick={()=>handleReset()}>Reset</button>
        </form>
      </div>
      <div className="tik-tac-toe">
        {console.log("ROW, COLUMN,lineVictory: ", ROW, COLUMN, lineVictory)}
        {ktSetup && <TableTTT ROW={ROW} COLUMN={COLUMN} lineVictory={lineVictory} />}
        {/* {ktSetup && <TableTTT ROW={10} COLUMN={10} lineVictory={5} />} */}
      </div>

    </section>
  );
}
export default App;
