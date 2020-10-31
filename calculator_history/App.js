import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  //Setting up states - numbers and result
  const [result, setResult] = useState('');
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
 const [txt, setTxt] = useState('');
 const [list, setList] = useState([]);

 const count = operator => {
const num1 = Number(n1)
const num2 = Number(n2)
setTxt(`${num1} ${operator} ${num2}  = ${result}`)

  if(operator === "-"){
         setResult((num1) - (num2))
         setList([...list, {key: txt}])


  }
          else{
            setResult((num1) + (num2))
  
            setList([...list, {key: txt}])

 } 
setN1('')
setN2('')
  
   }
  // setTxt(`${n1} - ${n2}  = ${result}`)
  // 

  return (
    <View style={styles.container}>
      <Text style={styles.res}>Result  = {result}</Text>
      <View style={styles.row}>
      <Text style={styles.txt}>Number 1</Text>
      <TextInput style ={styles.input}
      placeholder='number 1'
      keyboardType = 'number-pad'
      onChangeText={n1 => setN1(n1)}
      value = {n1}

      >
      </TextInput>
      </View>
      <View style={styles.row}>
      <Text style={styles.txt}>Number 2</Text>

      <TextInput style ={styles.input}
                placeholder='number 2'
              //  numeric value
            keyboardType = 'number-pad'
            onChangeText={n2 => setN2(n2)}
            value = {n2}

            ></TextInput>
            </View>
            <View style={styles.button}>

        <Button
          onPress={() => count("+")}

          title=" + "
          color="#0E9594"

/>
        <Button

          onPress={() => count("-")}

          title="  -  "
          color="#0E9594"
        />
        </View>
        <Text style={styles.res}>History</Text>
        <FlatList data = {list}
        renderItem={({item}) => <Text>{item.key}</Text>}/>
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
  row: {
    flexDirection: 'row',
    marginTop: 5
  },
  txt: {
    justifyContent: 'center',
    padding: 5,
    width:100
  },
  res: {    
    fontWeight: 'bold',
},
  input: {
    justifyContent: 'center',
    borderWidth: 1,
      borderColor:  '#777',
      padding: 5,
      width: 100
  }, 
  button: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 185  
  }
});
