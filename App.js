import React, { useState } from 'react';
import { Text, TextInput, View, Button, Pressable, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import styled from 'styled-components';


const Expression = styled.TextInput`
  width: 100%
  border-color: green;
  border-width: 2px;
  border-radius: 10px;
  font-size: 15px;
  padding: 5px;
  background-color: white;
`;
const search_text = styled(Text)`
  color: red;
`
const Item_text_expression = styled(Text)`
  font-size: 30px;
  color: yellow;
`
const Item_text_result = styled(Text)`
  font-size: 30px;
  color: white;
`
const Item_view = styled(View)`
  /*border-style: dashed;
  border-width: 2px;
  border-color: orange;*/
  //padding: 30px;
  margin-top: 5px;
`

const PizzaTranslator = () => {
  const [result, set_result] = useState('');
  const [text, set_text] = useState('');
  const [history, set_history] = useState([]);
  const [search_result, set_search_result] = useState([]);


  const rendered_item = 
    (item) => {
      console.log(item);
      return <Item_view>
        <Item_text_expression>{item.item.expression}</Item_text_expression>
        <Item_text_result>{item.item.result}</Item_text_result>
      </Item_view>;
    };
  return (
    <View style={{padding: 10, backgroundColor: 'gray', height: 800 }}>
      <Text style={{ fontSize: 40, color: 'orange', textAlign: 'center', fontWeight:'bold', marginTop:'10%'}}>CALCULATOR</Text>
      <Expression
        style={{height: 40}}
        placeholder="Input an equation"
        onChangeText={newText => { 
          set_text(newText);
        }}
      />

      <Button 
        onPress={() => {
          const new_result = eval(text);
          set_result(new_result);
          set_history([...history, {expression: text, result: new_result}]);
          set_search_result([...history, {expression: text, result: new_result}]);
        }}
        title="Calculate"
        color="orange"

      />
        <Text style={{color: 'white',padding: 10, fontSize: 40}}>
        {
          result
        }
      </Text>
      <Text style={{ fontSize: 20, color: 'orange', fontWeight:'bold'}}>HISTORY</Text> 
      <Button 
        onPress={() => {
          if (search_result.length == 0) {
            set_search_result(history);
          } else {
            set_search_result([]);
          }
        }}x
        title="Show/Hide History"
        color="orange"
      ></Button>
      <Expression 
        style={{height: 40, margin: 10}}
         placeholder="Type here to search!"
         onChangeText={newText => {
           var a = history.filter( (item) => {
             return item.expression.includes(newText) || item.result.toString().includes(newText);
           });
           set_search_result(a);
         }}
     >
      </Expression>
     
      <FlatList
        data={search_result}
        renderItem = {rendered_item}
        keyExtractor = { item => item.id }
      />
       <Button title="Delete all history" color= 'orange' padding= '100px'
        onPress = {
          () => {
            set_history([]);
            set_search_result([]);
          }
        }
        ></Button>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '50%',
    backgroundColor: 'crimson',
  },
  buttonlabel:{
    fontSize: 14,
    fontWeight: "800",
    color: "coral",
  },
  label: {
    fontSize: 20,
    fontWeight: "1000",
    color: "cornsilk",
  },
  button_cal: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "while",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 4,
    minWidth: "48%",
    textAlign: "center",
  }
})

export default PizzaTranslator;