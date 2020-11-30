//Sovellus hakee ainoastaan nimet, en saanut numeron hakua toimimaan map-funktiolla
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
 
  const [people, setPeople] = useState([]);

  const search = async() => {
  
      const { status } = await Contacts.requestPermissionsAsync();
    
      if (status === 'granted') {
        const  data = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        setPeople(data.data)
        // setPeople({name: data.data.name, number: data.phoneNumbers[0].number})

    }
  }

console.log(people)
// const rows = (people.map (item => (
// <Text>{item.name} {item.phoneNumbers[0].number}</Text>
//   )));
return(
    <View style={styles.container}>
      <View style={{marginTop: 36}}
>
<Button   
onPress={search}
title=" Show contacts"
color="#0E9594"
/>
</View>
<FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <Text>{item.name}</Text>
        // {rows}
        )}
      />
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
