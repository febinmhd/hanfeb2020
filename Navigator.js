import Shop from './Shop.js'
import React, { Component } from 'react'
import Cart from './Cart.js'
import Viewproducts from './Viewproducts'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { View } from 'react-native';

import {Ionicons, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons,Entypo} from '@expo/vector-icons'

const stacknavigator = createStackNavigator({
    
    ONLINESHOP:{screen:Shop},
    Viewproducts:Viewproducts,
    ONLINECART:Cart
})

const tabnavigator = createBottomTabNavigator({
    
        ONLINESHOP:{screen:stacknavigator,navigationOptions:()=>({
            tabBarIcon:({ tintColor })=>{
                return <Entypo name='shop' size={25} color={tintColor} />
             },
             tabBarLabel:'YOUR STORE',
             
        })        
        },

        Cart:{screen:Cart,navigationOptions:()=>({
            tabBarIcon:({ tintColor })=>{
               return <Feather name='shopping-cart' size={25} color={tintColor} />
            },
            tabBarLabel:'YOUR CART',
            
            
        })},       
},{tabBarOptions: {
    activeTintColor: 'green',
    inactiveTintColor: 'gray',
    labelStyle:{
        fontFamily:'pompiere',fontSize:16
    },
    style:{height:53}
  }},

)

export default createAppContainer(tabnavigator);