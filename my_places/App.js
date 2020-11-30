import React, {useState, useEffect} from 'react';
import MapView, { Marker} from'react-native-maps';
import { StyleSheet, Text, View, FlatList, TextInput, Alert} from 'react-native';
import {key} from './key'
import {Input, Button, ListItem} from 'react-native-elements'
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.item')

import { NavigationContainer} from'@react-navigation/native'
import { createStackNavigator} from'@react-navigation/stack'
const Stack = createStackNavigator();
function HomeScreen({navigation}) {
  const [address, setAddress] = useState('')
const [searches, setSearches] = useState([])
useEffect(() => {
  db.transaction(tx => {
    tx.executeSql('create table if not exists item (id integer primary key not null, address text);')
  })
  updateItems();
}, [])
const updateItems = () => {
  db.transaction(tx => {
    tx.executeSql('select * from item;', [], (_, {rows}) => 
    setSearches(rows._array)
    )
  })
  console.log(searches)
   }
   const removeItem = (id) => {
    db.transaction(tx => {
      tx.executeSql(`delete from item where id = ?;`, [id]);
    }, null, updateItems)
  }
 const save = () => {
  db.transaction(tx => {
    tx.executeSql('insert into item (address) values (?);', [address])
  }, null, updateItems
  )
 }
  return(
    <View>
    

    <Input
    label = 'road,number,city'
            placeholder='road,number,city'
            onChangeText={address=> setAddress(address)}
            value = {address}

            />
             <Button         raised icon  ={{name  : 'save', color: '#fff'}}
 title ='Save' onPress={save}/>    
    {/* <Button         raised icon  ={{name  : 'save', color: '#fff'}}
 title ='Search' onPress={
      () => navigation.navigate("Map", {address: address})}/>     */}

       
        
         <FlatList style={{marginTop: 10}}
                keyExtractor={item => item.id.toString()}
        data = {searches}
       
        renderItem={({item}) => 
     <ListItem bottomDivider onLongPress={() => removeItem(item.id)}>
         <ListItem.Title>{item.address}</ListItem.Title>
         <ListItem.Subtitle  onPress={  () => navigation.navigate("Map", {address: item.address})}>Show on Map -</ListItem.Subtitle>
     </ListItem>
        }
       
        />
  </View>

  )
}
function MapScreen({route, navigation}) {
  const {address} = route.params
  const [place, setPlace] = useState({})
  const [reg, setReg] = useState({latitude: 60.200692,longitude:24.934302,latitudeDelta: 0.0322, longitudeDelta:0.0221})

  const searchPlace = () => {
    const url=`http://mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}`
    console.log(url)
    fetch(url)
    .then(response=>
      response.json()
  
    )
    .then(data=> { 
      const lat = data.results[0].locations[0].latLng.lat
      const lng = data.results[0].locations[0].latLng.lng  
      setReg({latitude: lat, longitude:lng,latitudeDelta: 0.0322, longitudeDelta:0.0221})

    })
  
    .catch((error) => { console.log('Error', error); 
  }); 
  }
  return(
    <View>
    <MapView style={{ height: 600,
    marginTop:20 }}
  region={reg}>
  <Marker 
  coordinate =
  {{latitude: reg.latitude, longitude: reg.longitude}}
  title={address} />
  </MapView>
  <View>
  <Button raised title ='Show' onPress={  searchPlace}/>    


  </View>
  </View>
  )
} 
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "My places" component={HomeScreen}/>
        <Stack.Screen name = "Map" component={MapScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    height: 50,
    marginTop: 40

  },
  input: {
    borderWidth: 1,
    borderColor:  '#777',
    width: '100%',

  },
  search: {
    height: '10%',
    marginTop: 25,
    justifyContent: 'space-between',
    bottom: 0, 
    flexDirection: 'column'
  }, 
  
});
