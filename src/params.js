import {Dimensions} from 'react-native';

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15, // 15% da tela será cabeçalho
  difficultLevel: 0.1, // 10% dos campos estarão com minas (fácil - 10%, médio - 20%, difícil - 30%)
  // quantidade de colunas disponíveis baseada no blockSize usando Dimensions
  getColumnsAmount() {
    const width = Dimensions.get('window').width;
    return Math.floor(width / this.blockSize);
  },
  // quantidade de linhas...
  getRowsAmount() {
    const totalHeight = Dimensions.get('window').height;
    const boardHeight = totalHeight * (1 - this.headerRatio);
    return Math.floor(boardHeight / this.blockSize);
  },
};

export default params;
