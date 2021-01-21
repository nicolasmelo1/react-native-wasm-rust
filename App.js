import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'text-encoding-polyfill'
import {run} from './wasm2js/pkg/wasm2js.js';


export default function App() {

  React.useEffect(() => {
    run()
      //const teste = Asset.fromModule(require('./assets/wasm_bg.wasm')).uri
      ///const wasm = await fetch(`${FileSystem.documentDirectory}/wasm_bg.wasm`)
      //console.log(wasm)
  }, [])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
