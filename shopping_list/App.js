import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  //Setting up states 
  const [thing, setThing] = useState('');

  // const [txt, setTxt] = useState('');
 const [list, setList] = useState([]);
 const buttonClicked = () => {
setList([...list, {key: thing}])
setThing('')
 }
  return (
    <View style={styles.container}>
      <Text style={styles.res}>Shopping list</Text>
           <View style={styles.row}>
      <Text style={styles.txt}>Item</Text>

      <TextInput style ={styles.input}
                placeholder='Item'
         
            onChangeText={thing => setThing(thing)}
            value = {thing}

            ></TextInput>
            </View>
            <View style={styles.button}>

        <Button
         onPress={buttonClicked}

          title=" Add "
          color="#0E9594"

/>

<Button
         onPress={() => setList([])}

          title=" Clear "
          color="#0E9594"

/>
        
        </View>
        <Text style={styles.res}>Items</Text>
        <FlatList data = {list}
        renderItem={({item}) => <Text>{item.key}</Text>}/>
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
    color: 'coral'
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
    marginLeft: 20,
    justifyContent: 'space-between',
    width: 185  
  }
});
