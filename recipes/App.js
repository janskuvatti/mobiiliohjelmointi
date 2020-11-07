import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image} from 'react-native';

export default function App() {
  //Setting up states 
  const [keyword, setKeyword] = useState('');
 
  const [recipes, setRecipes] = useState([{title: '', thumbnail: '' }]);

const fetchRecipes = () => {
  fetch(`http://www.recipepuppy.com/api/?q=${keyword}`)
  .then(response=> response.json  ())
  .then(data=> { setRecipes(data.results);
  })
  .catch((error) => { Alert.alert('Error', error); 
}); 
}

const listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
};
  return (
    <View style={styles.container}>
            <Text style={styles.res}>Recipe finder</Text>

          <View style={styles.search}>


      <TextInput style ={styles.input}
                placeholder='Keyword'
         
            onChangeText={keyword=> setKeyword(keyword)}
            value = {keyword}

            ></TextInput>
            <View style={styles.button}>

        <Button
         onPress={fetchRecipes}

          title=" Search "
          color="#0E9594"

/>

  </View>     
        </View>

        <FlatList data = {recipes}
        ItemSeparatorComponent={listSeparator}
        keyExtractor={item=>  item.href}
        renderItem={({item}) =>
    (<View>
  <Text>{item.title}</Text>
  {/* //      {this.state.start ? `Tutka päällä` : `Tutka pois päältä`}{" "} */}
  <Image
  style={styles.img}
  source={{
    uri:
`${item.thumbnail}`
}} />   
    </View> )}
   />
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
    justifyContent: 'center',
    width: 185  
  },
  search: {
    width: '100%',
    backgroundColor: 'bisque',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0, 
    flexDirection: 'row'
  }, img: {
    
      width: 75,
      height: 75,
      resizeMode: 'contain'
    
  }
});
