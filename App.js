import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import ShopReducer from './Store.js'
import Tabnavigator from './Navigator.js'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import { useState } from 'react'


const rootreducer = combineReducers({
  ShopReducer
});

const store= createStore(rootreducer);

const fetchFonts=()=>{
  return Font.loadAsync({
    'dancingbold':require('./fonts/DancingScript-Bold.ttf'),
    'dancingmedium':require('./fonts/DancingScript-Medium.ttf'),
    'dancingregular':require('./fonts/DancingScript-Regular.ttf'),
    'dancingsemi':require('./fonts/DancingScript-SemiBold.ttf'),
    'gafata':require('./fonts/Gafata-Regular.ttf'),
    'pompiere':require('./fonts/Pompiere-Regular.ttf'),
  })
}


export default function App() {
   
  const[fontloaded,setfontloaded]=useState(false);

  if(!fontloaded){
    return(<AppLoading 
      startAsync={fetchFonts} 
      onFinish={()=>setfontloaded(true)}/>);
  }

  return (<Provider store={store}>
    <Tabnavigator/>
    </Provider>
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
