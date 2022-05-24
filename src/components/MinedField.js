import React from 'react';
import {View, StyleSheet} from 'react-native';
import Field from './Field';

export default props => {
  //matriz que dentro tem os objetos que mapeiam os atributos de field para uma matriz que tem elementos JSX, elementos componentes do tipo Field
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return (
        <Field
          {...field}
          key={c}
          onOpen={() => props.onOpenField(r, c)}
          onSelect={e => props.onSelectField(r, c)}
        />
      );
    });
    return (
      <View key={r} style={{flexDirection: 'row'}}>
        {columns}
      </View>
    );
  });
  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
  },
});
