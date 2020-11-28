import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  //Setting up states 
  const [thing, setThing] = useState('');

 const speakText = () => {
Speech.speak(thing)
 }
  return (
    <View style={styles.container}>
           <View style={styles.col}>

      <TextInput style ={styles.input}
                placeholder='Item'
         
            onChangeText={thing => setThing(thing)}
            value = {thing}

            ></TextInput>

        <Button
         onPress={speakText}

          title=" Press to hear text"
          color="#0E9594"

/>

        
</View>

    </View>
  );
}
//Creating styles for container, input field and buttons
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    marginTop: 40,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: {
    flexDirection: 'column',
    marginTop: 5,
    justifyContent: 'space-between'
  },
  txt: {
    justifyContent: 'center',
    padding: 5,
    width:100
  },
  res: {    
    fontWeight: 'bold',
    color: 'coral'
  },
  input: {
    justifyContent: 'center',
    borderWidth: 1,
      borderColor:  '#777',
      padding: 5,
      width: 200,
      height: 120,
      marginBottom: 20
  }, 
  button: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    justifyContent: 'space-between',
    width: 185  
  }
});
