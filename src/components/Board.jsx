import { useState } from "react";

function Cell({ index, myValues, myOnClick, myFlag, isWin, isDraw }) {
  return (
    <>
      <div>
        <button
          type="button"
          className="h-20 w-20 m-1 p-5 border border-blue-600 bg-gray-200 color-white font-bold text-4xl"
          onClick={() => {
            const newValues = [...myValues];
            if (newValues[index] == null && !isWin && !isDraw) {
              newValues[index] = myFlag ? "X" : "O";
              myOnClick(index, newValues);
            }
          }}
        >
          {myValues[index]}
        </button>
      </div>
    </>
  );
}

function WinnerCard({ winner }) {
  return (
    <div className="flex justify-center align-center">
      <div
        className="flex items-center max-w-md  p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
        role="alert"
      >
        <svg
          className="shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div className="text-3xl">
          <span className="font-bold">Winner!</span> Winner is{" "}
          <span className="font-bold text-blue-800 ">{winner}</span>
        </div>
      </div>
    </div>
  );
}

function DrawCard() {
  return (
    <div className="flex justify-center align-center">
      <div
        className="flex items-center max-w-md  p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
        role="alert"
      >
        <svg
          className="shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div className="text-3xl">
          <span className="font-bold">Draw!</span> This match is{" "}
          <span className="font-bold  text-blue-800 ">Draw</span>
        </div>
      </div>
    </div>
  );
}

function checkIsWin(data) {
  let winner;

  winner = "X";
  if (
    (data[0] == winner && data[1] == winner && data[2] == winner) ||
    (data[3] == winner && data[4] == winner && data[5] == winner) ||
    (data[6] == winner && data[7] == winner && data[8] == winner) ||
    (data[0] == winner && data[3] == winner && data[6] == winner) ||
    (data[1] == winner && data[4] == winner && data[7] == winner) ||
    (data[2] == winner && data[5] == winner && data[8] == winner) ||
    (data[0] == winner && data[4] == winner && data[8] == winner) ||
    (data[2] == winner && data[4] == winner && data[6] == winner)
  )
    return winner;

  winner = "O";
  if (
    (data[0] == winner && data[1] == winner && data[2] == winner) ||
    (data[3] == winner && data[4] == winner && data[5] == winner) ||
    (data[6] == winner && data[7] == winner && data[8] == winner) ||
    (data[0] == winner && data[3] == winner && data[6] == winner) ||
    (data[1] == winner && data[4] == winner && data[7] == winner) ||
    (data[2] == winner && data[5] == winner && data[8] == winner) ||
    (data[0] == winner && data[4] == winner && data[8] == winner) ||
    (data[2] == winner && data[4] == winner && data[6] == winner)
  )
    return winner;

  return null;
}

function checkIsDraw(data) {
  if (checkIsWin(data)) return false;

  let flag = true;

  data.forEach((element) => {
    if (element == null) flag = false;
  });

  return flag;
}

function ListElement({ index, player, cell, onMyClick }) {
  return (
    <>
      <div
        className="flex items-center m-2 p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
        role="alert"
        onClick={() => {
          onMyClick(index);
        }}
      >
        <div>
          <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-2">
            {index + 1}#
          </span>
          {player} is added at {cell + 1}th cell
        </div>
      </div>
    </>
  );
}

function Board() {
  const [values, setValues] = useState(Array(9).fill(null));
  const [flag, setFlag] = useState(true);
  const [isWin, setIsWin] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [history, setHistory] = useState([]);
  const [logger, setLogger] = useState([]);

  function handleOnClick(index, data) {
    setFlag(!flag);

    setValues(data);
    setLogger([
      ...logger,
      {
        values,
        flag,
        isWin,
        isDraw,
        history,
      },
    ]);
    setHistory([...history, { player: flag ? "X" : "O", cell: index }]);

    if (checkIsWin(data)) {
      setIsWin(true);
    }

    if (checkIsDraw(data)) {
      setIsDraw(true);
    }
  }

  function getHistory(index) {
    setValues(logger[index].values);
    setFlag(logger[index].flag);
    setIsWin(logger[index].isWin);
    setIsDraw(logger[index].isDraw);
    setHistory(logger[index].history);
    setLogger(logger.slice(0, index));

    console.log(logger.slice(0, index));
  }

  return (
    <div className="mt-5">
      <div>{isWin && <WinnerCard winner={checkIsWin(values)} />}</div>
      <div>{isDraw && <DrawCard />}</div>

      <div className="flex flex-row justify-center gap-60 flex-wrap">
        {/* Board */}
        <div>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Board
          </h1>
          <div className="flex flex-row justify-center">
            <Cell
              index={0}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
            <Cell
              index={1}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
            <Cell
              index={2}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
          </div>

          <div className="flex flex-row justify-center">
            <Cell
              index={3}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
            <Cell
              index={4}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
            <Cell
              index={5}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
          </div>

          <div className="flex flex-row justify-center">
            <Cell
              index={6}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
            <Cell
              index={7}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
            <Cell
              index={8}
              myValues={values}
              myOnClick={handleOnClick}
              myFlag={flag}
              isDraw={isDraw}
              isWin={isWin}
            />
          </div>

          <div className="flex flex-row justify-center mt-10">
            {!isWin && !isDraw && (
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-bold "
                onClick={() => {
                  setValues(Array(9).fill(null));
                  setFlag(true);
                  setIsDraw(false);
                  setIsWin(false);
                  setHistory([]);
                }}
              >
                RESET
              </button>
            )}

            {(isWin || isDraw) && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-bold "
                onClick={() => {
                  setValues(Array(9).fill(null));
                  setFlag(true);
                  setIsDraw(false);
                  setIsWin(false);
                  setHistory([]);
                }}
              >
                Play Again
              </button>
            )}
          </div>
        </div>

        {/* History */}
        <div>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            History
          </h1>
          <ul>
            {history.map((element, index) => {
              return (
                <ListElement
                  key={element.cell}
                  index={index}
                  player={element.player}
                  cell={element.cell}
                  onMyClick={getHistory}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Board;
