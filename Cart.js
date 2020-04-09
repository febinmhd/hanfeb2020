import React, { Component } from 'react'
import { View,Text,Image, Button, Alert, ImageBackground, TouchableOpacity, TextInput , Linking} from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { Updates } from 'expo'
import update from 'react-addons-update'
import axios from 'axios'
import Config from 'react-native-config'



import {Ionicons, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons,FontAwesome} from '@expo/vector-icons'

class Cart extends Component {



  
  state={
    quantity:null,
    name:null,
    image:null,
    unitprice:null,
    quantity:null,
    totalprice:null,
    grandtotal:null,
  }



  async quantity (itemname,val){
    if(val==='+'){
      for (let i = 0; i < this.props.ShopReducer.cart.length; i++){  
          if (this.props.ShopReducer.cart[i][0][0]=== itemname){
          await this.setState({name:this.props.ShopReducer.cart[i][0][0]})
          await this.setState({image:this.props.ShopReducer.cart[i][0][1]})
          await this.setState({unitprice:this.props.ShopReducer.cart[i][0][2]})
          await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]+1})
          await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          this.props.ShopReducer.cart.splice(i,1)
          }}
          this.props.addquantity(this.state.name,this.state.image,this.state.unitprice,this.state.quantity,this.state.totalprice)
  
    }
    else{
      for (let i = 0; i < this.props.ShopReducer.cart.length; i++){  
          if (this.props.ShopReducer.cart[i][0][0]=== itemname){
          await this.setState({name:this.props.ShopReducer.cart[i][0][0]})
          await this.setState({image:this.props.ShopReducer.cart[i][0][1]})
          await this.setState({unitprice:this.props.ShopReducer.cart[i][0][2]})
          if(this.props.ShopReducer.cart[i][0][3]>1){
            await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]-1})
          }
          else{
        Alert.alert(
          'DELETE',
          'Are you sure to delete this item from the cart??',
          [
            {text: 'Delete from cart', onPress: () => this.delete(this.props.ShopReducer.cart[i][0][0])},
            {text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel'},  
          ],
          { cancelable: true }
  
        )
        await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]})
          }
        await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          this.props.ShopReducer.cart.splice(i,1)
          }}
          this.props.addquantity(this.state.name,this.state.image,this.state.unitprice,this.state.quantity,this.state.totalprice)
  
    }
  }

  async delete (product){
    

    for (let i = 0; i < this.props.ShopReducer.cart.length; i++){
        if( this.props.ShopReducer.cart[i][0][0]=== product){
        //  console.log(product)
        //  console.log(this.props.ShopReducer.cart[i][0][0])
         this.props.ShopReducer.cart.splice(i,1)
         console.log(this.props.ShopReducer.cart)
         await this.props.delete();
        }}  
  }

  
handlename = (text) => {
  this.setState({ name: text })
}

handlenumber = (text) => {
  this.setState({ number: text })
}
handleaddress = (text) => {
  this.setState({ address: text })
}

  submit= async event=>{
    let total1= null;
for (let i = 0; i < await this.props.ShopReducer.cart.length; i++){
  const price = this.props.ShopReducer.cart[i][0][4];
 
   total1 += price;
}
   // console.log(process.env.API)

    axios({
      method: 'post',
      url:NODE_ENV.API,
    
      headers: { 'Content-Type':'application/json' },
      data: {
          "name": this.state.name,
          "number":this.state.number,
          "address":this.state.address,
          "cart":this.props.ShopReducer.cart,
          "total":total1
          }

      })
      .then(async response=> {
        await console.log(response)
       })


  //  console.log(this.state.name,this.state.number,this.state.address,this.props.ShopReducer.cart,total1)

  }; 


    render() {
      let total= null;
      for (let i = 0; i < this.props.ShopReducer.cart.length; i++){
        const price = this.props.ShopReducer.cart[i][0][4];
         total += price;
    
      }
 
        return (
            <ScrollView>
              <ImageBackground source={require('./images/new.jpg')} style={{flex: 1,resizeMode: "cover",justifyContent: "center"}}>
                <Text style={{textAlign:'center', margin:50, fontFamily:'dancingbold',fontSize:50}}>Your Awesome Cart</Text>
                {this.props.ShopReducer.cart.map((cartitems,index)=>
                <View key={index} style={{alignItems:'center',margin:10}}>  
                <Text style={{fontFamily:'pompiere',fontSize:30,fontWeight: 'bold',color:'green'}}>{cartitems[0][0]}</Text>
                <Image source={cartitems[0][1]} style={{width: 185, height: 185, borderRadius:25,margin:5}} />
                <Text  style={{fontFamily:'pompiere',fontSize:25,fontWeight: 'bold'}}>Unit Price : {cartitems[0][2]} RS</Text>
                <Text  style={{fontFamily:'pompiere',fontSize:25,fontWeight: 'bold'}}>Quantity: {cartitems[0][3]}</Text>
                <Text  style={{fontFamily:'pompiere',fontSize:25,fontWeight: 'bold'}}>Total Price : {cartitems[0][4]} RS</Text>
                <View style={{display:"flex",flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>this.quantity(cartitems[0][0],'+')} style={{marginRight:7}}>
                  <Ionicons name="md-add-circle" size={35} color='green'/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.quantity(cartitems[0][0],'-')} style={{marginRight:7}} >
                  <MaterialCommunityIcons name="minus-circle" size={35} color='green'/>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>this.delete(cartitems[0][0])} >
                  <MaterialCommunityIcons name='delete' size={35} color='green' />
                  </TouchableOpacity>
                </View>
                </View>
                
                )}
                
                <View style={{alignItems:"center", margin:50}}>
                <Text style={{fontFamily:'pompiere',fontSize:30,fontWeight: 'bold',color:'green'}}>Your Total :{total}RS</Text>
                </View>

                <View style={{margin:20}}>
                    <Text style={{textAlign:'center',fontFamily:'pompiere',fontSize:35,margin:5,color:'green'}}>Delivery Details</Text>
                     <Text style={{textAlign:'center',fontFamily:'pompiere',fontSize:30,margin:5}}> Name : </Text>
                     <View style={{alignItems:'center'}}>
                     <TextInput onChangeText = {this.handlename} style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1 , borderColor:'green'}}/>
                     </View>
                      <Text style={{textAlign:'center',fontFamily:'pompiere',fontSize:30,margin:5}}>Contact Number :  </Text>
                      <View style={{alignItems:'center'}}>
                      <TextInput onChangeText = {this.handlenumber} style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1, borderColor:'green' }}/>
                      </View>
                      <Text style={{textAlign:'center',fontFamily:'pompiere',fontSize:30,margin:5}}> Delivery Address : </Text>
                      <View style={{alignItems:'center'}}>
                      <TextInput onChangeText = {this.handleaddress} style={{height: 150,width:300, borderColor: 'gray', borderWidth: 1 , borderColor:'green',textAlign:'left'}}/>
                      </View>
                      <TouchableOpacity onPress={this.submit} style={{alignItems:'center',marginBottom:30,marginTop:15}}>
                      <View style={{width:90,height:45,backgroundColor:'green',borderRadius:100,justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontFamily:'pompiere',fontSize:17,color:'white'}}>Submit</Text>
                      </View>
                      </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{textAlign:'center', margin:5, fontFamily:'dancingbold',fontSize:50}}>Contact Us</Text>
                  </View>
                  <View style={{margin:20,display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity onPress={() => { Linking.openURL("https://www.instagram.com/hanfeb__artism/?hl=en"); }}>
                  <AntDesign name="instagram" size={35} color='green'/>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={() => { Linking.openURL("https://web.facebook.com/Hanaanfebin/"); }}>
                  <AntDesign name="facebook-square" size={35} color='green'/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { Linking.openURL("https://api.whatsapp.com/send?phone=+91 73069 71226"); }}>
                  <FontAwesome name="whatsapp" size={35} color='green'/>
                  </TouchableOpacity>
                  </View>

                  </ImageBackground>

            </ScrollView>
           
        )
    }
}

const mapStateToProps= (state)=>{
    return{
        ShopReducer: state.ShopReducer
    }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    setname:(name)=>{
      dispatch({
        type:"setname",
        payload:name
      })
    },
    setcart:(cart)=>{
      dispatch({
        type:"setcart",
        payload:cart
      })
    },
    addquantity:(name,image,unitprice,quantity,totalprice)=>{
      dispatch({
        type:"addquantity",
        payload:[name,image,unitprice,quantity,totalprice]
      })
    },
    delete:()=>{
      dispatch({
        type:"delete",
        payload:null
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);