import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button , Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  
  const [rate, setRate] = useState('')
  const [rates, setRates] = useState([])
  const  [number, setNumber] = useState('')
  const  [res, setRes] = useState('')
  const  [result, setResult] = useState('')


const getRates = (rate, res) => {
  const n = Number(number)

  console.log(res)
  fetch('https://api.exchangeratesapi.io/latest')
.then(response=> response.json())
 //.then(responseData=> {setRates(Object.keys(responseData.rates))})
.then(responseData=> {setResult(n * Object.values(responseData.rates)[res])})

.catch(err=> console.error(err))
console.log(result)
}
useEffect(() =>{
fetch('https://api.exchangeratesapi.io/latest')
.then(response=> response.json())
 //.then(responseData=> {setRates(Object.keys(responseData.rates))})
.then(responseData=> {setRates(responseData.rates)})

.catch(err=> console.error(err))
}, []);

const pickerItems = Object.keys(rates).map(item => (
  <Picker.Item  key={item} label={item} value={item}  />
));


  return (
    <View style={styles.container}>
          <Image
        source={require('./money.jpg')}
        style={{marginTop: 5}}
      />
      <Text style={{fontWeight: 'bold'}}>{result }</Text>
      <View style={styles.row}>
   <TextInput style ={styles.input}
                placeholder='number'
         keyboardType='number-pad'
            onChangeText={thing => setNumber(thing)}
            value = {number}

            ></TextInput>


           
      <Picker 
  selectedValue={rate}
  style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>{
    setRate(itemValue)
setRes(itemIndex)
  }


   }>
  {pickerItems}

</Picker>
</View>
<Button
        onPress={() => getRates(rate, res)}

          title=" Convert"
          color="#0E9594"

/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'bisque',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    justifyContent: 'center',
    borderWidth: 1,
      borderColor:  '#777',
      padding: 5,
      width: 100
  }, 
  row: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
});
