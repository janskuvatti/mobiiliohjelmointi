import React, {useState, useEffect} from 'react';
import MapView, { Marker} from'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import {key} from './key'
export default function App() {
  const [reg, setReg] = useState({latitude: 60.200692,longitude:24.934302,latitudeDelta: 0.0322, longitudeDelta:0.0221})
  const [address, setAddress] = useState('')
const locate = async () => {
  let {status} = await Location.requestPermissionsAsync();
  if(status !== "granted"){
    Alert.alert('No permissions for location granted');
  }
  else {
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

    console.log(location)
    setReg({latitude: location.coords.latitude, longitude:location.coords.longitude,latitudeDelta: 0.0322, longitudeDelta:0.0221})
console.log(reg.latitude, reg.longitude)
  }
}
useEffect(() => {
  locate();

}, [])
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
  return (
    <View>
    <View style={styles.search}>
    

    <TextInput style ={styles.input}
            placeholder='road,number,city'
            onChangeText={address=> setAddress(address)}
            value = {address}

            ></TextInput>
    <Button style={{width: '100%'}} title ='Search' onPress={
      searchPlace}/>    

  </View>
    <MapView style={{ height: 600,
      marginTop:20 }}
    region={reg}>
    <Marker 
    coordinate =
    {{latitude: reg.latitude, longitude: reg.longitude}}
    title={address} />
    </MapView>
    
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
