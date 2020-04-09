import React, { Component } from 'react'
import { View,Text,Image, Button, Alert ,ImageBackground, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import {Ionicons, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons} from '@expo/vector-icons'
import ImageView from 'react-native-image-view'

class Shop extends Component {
  state={
    quantity:null,
    name:null,
    image:null,
    unitprice:null,
    quantity:null,
    totalprice:null,
    positive:true,
    show:"Add to cart",
    activeTab: 0,
    imageIndex: 0,
    isImageViewVisible: false,
    image:null,
  }


  async quantity (name,image,unitprice,val){
    
    if(val==='+'){
    //  this.props.addquantity(name,image,unitprice,val)

          await this.setState({name:name})
          await this.setState({image:image})
          await this.setState({unitprice:unitprice})
          await this.setState({quantity:1})
          await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          


    for (let i = 0; i < this.props.ShopReducer.cart.length; i++){
    //  console.log(this.props.ShopReducer.cart[i][0][0])
      
      if( this.props.ShopReducer.cart[i][0][0]=== name){
          await this.setState({name:this.props.ShopReducer.cart[i][0][0]})
          await this.setState({image:this.props.ShopReducer.cart[i][0][1]})
          await this.setState({unitprice:this.props.ShopReducer.cart[i][0][2]})
          await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]+1})
          await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          this.props.ShopReducer.cart.splice(i,1)
        
      }
      
  }

   this.props.addquantity(this.state.name,this.state.image,this.state.unitprice,this.state.quantity,this.state.totalprice)
  }  

  else{
    //  this.props.addquantity(name,image,unitprice,val)

          await this.setState({name:name})
          await this.setState({image:image})
          await this.setState({unitprice:unitprice})
          await this.setState({quantity:0})
          await this.setState({totalprice:this.state.unitprice*this.state.quantity})
          


    for (let i = 0; i < this.props.ShopReducer.cart.length; i++){
    //  console.log(this.props.ShopReducer.cart[i][0][0])
      
      if( this.props.ShopReducer.cart[i][0][0]=== name){
          await this.setState({name:this.props.ShopReducer.cart[i][0][0]})
          await this.setState({image:this.props.ShopReducer.cart[i][0][1]})
          await this.setState({unitprice:this.props.ShopReducer.cart[i][0][2]})

        if(this.props.ShopReducer.cart[i][0][3]>1){
          await this.setState({quantity:this.props.ShopReducer.cart[i][0][3]-1})
        }
        else{
      Alert.alert(
        'Delete',
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
        
      }
      
  }

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
         Alert.alert(
          'Delete',
          'Are you sure to delete this item from the cart??',
          [
            {text: 'Delete from cart', onPress: () => this.props.delete()},
            {text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel'},  
          ],
          { cancelable: true }
  
        )
         
        // await this.props.delete();
        }}

      
        
    
  }
    render() {
      /*
      const images = [
        {
            source:require('./images/2.jpg'),
            title: 'Paris',
            width: 806,
            height: 720,
        },
    ];
*/

const images = [
  {
      source:this.state.image,
      title: 'Paris',
      width: 806,
      height: 720,
  },
];
        return (
            <ScrollView>
              <ImageBackground source={require('./images/new.jpg')} style={{flex: 1,resizeMode: "contain",justifyContent: "center"}}>
            <View>
                
              <View style={{ display:'flex',flexDirection:'row',flexWrap:'wrap',margin:10}}>
               {this.props.ShopReducer.products.map((product,index)=>
                <View key={index}>
                    <View style={{ display:'flex',justifyContent:'center', alignItems:'center',marginBottom:15,marginTop:20}}>

                  <Text style={{fontFamily:'pompiere',fontSize:30,fontWeight: 'bold',color:'green'}}> {product[0]}</Text>   


                  <TouchableOpacity  onPress={() => {
                                this.setState({
                                    imageIndex: index,
                                    isImageViewVisible: true,
                                    image:product[1]
                                });
                            }}>
                  <Image source={product[1]} style={{width: 185, height: 185, borderRadius:25,margin:5}} />
                  </TouchableOpacity>

                 
                            
                  <ImageView
                    glideAlways
                    images={images}
                    
                    imageIndex={0}
                    animationType="fade"
                    isVisible={this.state.isImageViewVisible}
                    
                    onClose={() => this.setState({isImageViewVisible: false})}
                    onImageChange={index => {
                        console.log(index);
                    }}
                />
              
                  <Text style={{fontFamily:'pompiere',fontSize:25,fontWeight: 'bold'}}>Price     :   {product[2]}  RS</Text>
                 
                 <TouchableOpacity onPress={()=>{this.quantity(product[0],product[1],product[2],'+')}}>
                   <View style={{backgroundColor:'green',borderRadius:10,width:130}}>
                 <Text style={{color:'white',fontFamily:'pompiere',fontSize:28,fontWeight: 'bold',textAlign:'center'}}>
                   Add to cart <Feather name='shopping-cart' size={22} color='white' />
                   </Text> 
                   </View>             
                   </TouchableOpacity>

                  {this.props.ShopReducer.cart.map((cartitems,index)=>
                  cartitems[0][0]===product[0]  ? 

                 <View key={index} style={{marginTop:5,marginBottom:5}}>
                    <Text style={{fontFamily:'pompiere',fontSize:25,fontWeight: 'bold'}}>Quantity : {cartitems[0][3]}</Text>
                    <Text style={{fontFamily:'pompiere',fontSize:25,fontWeight: 'bold'}}>Total Price : {cartitems[0][4]}  RS </Text> 
                  </View>
                  :null
                  )}
                  
                  

                {this.props.ShopReducer.cart.map((cartitems,index)=>
                  
                  cartitems[0][0]===product[0] && cartitems[0][3] !== 0 ? 
                  <View key={index} style={{ display:'flex',flexDirection:'row'}}>
                   
                  
                  <TouchableOpacity onPress={()=>this.quantity(product[0],product[1],product[2],'+')} style={{marginRight:7}}>
                  <Ionicons name="md-add-circle" size={35} color='green'/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.quantity(product[0],product[1],product[2],'-')} style={{marginRight:7}} >
                  <MaterialCommunityIcons name="minus-circle" size={35} color='green'/>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>this.delete(product[0])} >
                  <MaterialCommunityIcons name='delete' size={35} color='green' />
                  </TouchableOpacity>
                  </View>


                  : null
                  )}
 
                  </View>
                  </View>
               )}
               </View> 

               


            </View>
            </ImageBackground>
            </ScrollView>
        )
    }
}
//await this.props.setcart(this.state.cart)
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
    setcart:(name,calculation)=>{
      dispatch({
        type:"setcart",
        payload:[name,calculation]
      })
    },
    addquantity:(name,image,unitprice,quantity,totalprice)=>{
        dispatch({
          type:"addquantity",
          payload:[name,image,unitprice,quantity,totalprice]
        })
      },
      subquantity:(name,calculation)=>{
        dispatch({
          type:"subquantity",
          payload:[name,calculation]
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

Shop.navigationOptions={
  headerTitle:()=>( <Text style={{textAlign:'center',fontFamily:'dancingbold',fontSize:50,color:'white'}}>Hanfeb Artism</Text>),
  headerStyle:{
    backgroundColor:'green',
    height:110,
   
  },
  headerTintColor:'white',

};

export default connect(mapStateToProps,mapDispatchToProps)(Shop);