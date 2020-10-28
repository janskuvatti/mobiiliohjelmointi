import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  //Setting up states - numbers and result
  const [result, setResult] = useState(0)
  const [n1, setN1] = useState(0)
  const [n2, setN2] = useState(0)
 
  return (
    <View style={styles.container}>
      <Text>Result  = {result}</Text>
      <TextInput style ={styles.input}
      placeholder='number 1'
      keyboardType = 'numeric'
      onChangeText={n1 => setN1(n1)}
      value = {n1}

      ></TextInput>
      <TextInput style ={styles.input}
                placeholder='number 2'
                numeric value
            keyboardType = 'numeric'
            onChangeText={n2 => setN2(n2)}
            value = {n2}

            ></TextInput>
            <View style={styles.button}>

        <Button
          onPress={() => setResult(parseInt(n1) + parseInt(n2))}
          title="+"
          color="#841584"
        />
        <Button

          onPress={() => setResult(parseInt(n1) - parseInt(n2))}
          title="-"
          color="#841584"
        />
        </View>
    </View>
  );
}
//Creating styles for container, input field and buttons
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
      borderColor:  '#777',
      padding: 8,
      margin: 10,
      width: 200
  }, 
  button: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 100
  
  }
});
