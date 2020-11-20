import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.items')

export default function App() {
  //Setting up states 

  const [thing, setThing] = useState('');
  const [amount, setAmount] = useState('');

  // const [txt, setTxt] = useState('');
 const [list, setList] = useState([]);
 useEffect(() => {
   db.transaction(tx => {
     tx.executeSql('create table if not exists items (id integer primary key not null, thing text, amount text);')
   })
   updateItems();
 }, [])
 const buttonClicked = () => {
// setList([...list, {key: thing, amount: amount}])

db.transaction(tx => {
  tx.executeSql('insert into items (thing, amount) values (?, ?);', [thing, amount])
}, null, updateItems
)
setThing('')
setAmount('')
 }
 const updateItems = () => {
db.transaction(tx => {
  tx.executeSql('select * from items;', [], (_, {rows}) => 
  setList(rows._array)
  )
})
 }
 const removeItem = (id) => {
   db.transaction(tx => {
     tx.executeSql(`delete from items where id = ?;`, [id]);
   }, null, updateItems)
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
            <View style={styles.row}>
      <Text style={styles.txt}>Count</Text>

      <TextInput style ={styles.input}
                placeholder='Count'
         
            onChangeText={count => setAmount(count)}
            value = {amount}

            ></TextInput>
            </View>

        <Button
         onPress={buttonClicked}

          title=" Save "
          color="#0E9594"

/>


        
        <Text style={{fontWeight: 'bold'}}>Items</Text>
        <FlatList
                keyExtractor={item => item.id.toString()}
        data = {list}
        renderItem={({item}) => 
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{item.thing}, {item.amount}</Text>
        <Text style={styles.res} onPress={() => removeItem(item.id)}>     Bought</Text>

        </View>
        }/>
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
      width: 100,
      marginBottom: 10
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
