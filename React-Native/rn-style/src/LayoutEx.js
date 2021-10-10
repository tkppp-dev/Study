import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Contents, Footer } from './components/Layout';

export default App = () => {
  return (
    <View style={styles.container}>
        <Header />
        <Contents />
        <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection : 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
