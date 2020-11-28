import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const {person, setPerson} = useState({})
  const [contact, setContact] = useState({id: '', name:'', number:''});
  const [people, setPeople] = useState([]);
  const [n, setN] = useState([]);

  const search = async() => {
  
      const { status } = await Contacts.requestPermissionsAsync();
    
      if (status === 'granted') {
        const  data = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        //setPeople(data.data)
        setPeople({name: data.data.name, number: data.phoneNumbers[0].number})

      //  console.log(data.data.phoneNumbers[0].number)
    }
  }

console.log(people)

return(
    <View style={styles.container}>
<Button   
onPress={search}

title=" Show contacts"
color="#0E9594"
/>
<FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <Text>{item.name}</Text>
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
