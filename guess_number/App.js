import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  //Setting up states 
  const [result, setResult] = useState('Guess a number between 1 and 100:')
  const [guess, setGuess] = useState(1)
  const [rounds, setRounds] = useState(0)

  const [n, setN] = useState(Math.floor(Math .random() * 100) + 1)
 const checkAnswer = () =>{
   if(n < guess){
     setResult('Your quess   ' + parseInt(guess) + ' is too high')
     setRounds(rounds + 1)
     setGuess(guess)
   }
   else if(n > guess){
    setResult('Your quess ' + parseInt(guess) + ' is too low.')
    setRounds(rounds + 1)
    setGuess(guess)

  }
  else  {
  
      Alert.alert(
        'Right number',
        `You guessed right number in ${rounds} guesses`,
        [
          {
            text: 'OK',
            onPress: () => console.log('Alert closed')
          }
 
        ],
      );
      setResult('Guess a number between 1 and 100:')

  }
 }
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold'}}> {result}</Text>
      <TextInput style ={styles.input}
      placeholder='Guess...'
      keyboardType = 'numeric'
      onChangeText={guess => setGuess(guess)}
      value = {guess}

      ></TextInput>

        <Button
          onPress={checkAnswer}
          title="Make Guess"
          color="#841584"
        />
        
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
      width: 75
  }, 

});
