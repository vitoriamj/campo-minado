const createBoard = (rows, columns) => {
  // criar uma matriz para o tabuleiro
  return Array(rows) // row e column são os índices que estão sendo percorridos dentro da função map
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            // valores default, no início do jogo
            row,
            column,
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0,
          };
        });
    });
};

// função para espalhar a minas pelo tabuleiro, recebendo o tabuleiro e a quantidade de minas que quero espalhar como parâmetros
const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;
  while(minesPlanted < minesAmount) {
    // linha selecionada
    const rowSel: parseInt(Math.random() * rows, 10)
    const columnSel: parseInt(Math.random() * columns, 10)

    if(!board[rowSel][columnSel].mined) {
      board[rowSel][columnSel].mined = true
      minesPlanted++
    }
  }
};

const createMinedBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns)
  spreadMines(board, minesAmount)
  return board
}

export {createMinedBoard}
