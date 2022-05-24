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
  while (minesPlanted < minesAmount) {
    // linha selecionada
    const rowSel = parseInt(Math.random() * rows, 10);
    const columnSel = parseInt(Math.random() * columns, 10);

    if (!board[rowSel][columnSel].mined) {
      board[rowSel][columnSel].mined = true;
      minesPlanted++;
    }
  }
};

const createMinedBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};

const cloneBoard = board => {
  return board.map(rows => {
    return rows.map(field => {
      return {...field};
    });
  });
};

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  //excluir o campo selecionado e os campos que estão fora da matriz
  rows.forEach(r => {
    columns.forEach(c => {
      const different = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      //board[0] porque pela primeira linha dá para ver a quantidade de colunas
      const validColumn = c >= 0 && c < board[0].length;
      if (different && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
};

const safeNeighborhood = (board, row, column) => {
  // se o vizinho tiver minado, a função não executa, pois a vizinhança não está segura
  const safes = (result, neighbor) => result && !neighbor.mined;
  return getNeighbors(board, row, column).reduce(safes, true);
};

const openField = (board, row, column) => {
  const field = board[row][column];
  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column).forEach(n =>
        openField(board, n.row, n.column),
      );
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMines = neighbors.filter(n => n.mined).length;
    }
  }
};

//método para percorrer todos os campos como se fosse um array
const fields = board => [].concat(...board); //vai juntar todos os campos em um array de forma linear

//saber se o jogo terminou ou não de acordo com que se houve ou não explosão
const hadExplosion = board =>
  fields(board).filter(field => field.exploded).length > 0;

// o usuário só ganha o jogo se não tiver nenhum campo pendente = não tem mina e está fechado (usuário ainda não abriu) ou um campo que está minado mas não foi marcado com a flag

const pendding = field =>
  (field.mined && field.flagged) || (!field.mined && !field.opened);

const wonGame = board => fields(board).filter(pendding).length === 0;

//logo após o usuário clicar em uma mina e perder o jogo, todas as minas serão mostradas
const showMines = board =>
  fields(board)
    .filter(field => field.mined)
    .forEach(field => (field.opened = true));

//marcar ou desmarcar um campo com bandeira
const invertFlag = (board, row, column) => {
  const field = board[row][column];
  field.flagged = !field.flagged;
};

export {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
};
