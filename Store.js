const initialState={
    products:[['Flower Pot Mixed',require('./images/4.jpg'),'50'],
    ['Orange Flowers',require('./images/5.jpg'),'50'],
    ['Red Flower Pot',require('./images/6.jpg'),'50'],
    ['june',require('./images/7.jpg'),'50'],
    ['Photo Frame Pink',require('./images/10.jpg'),'50'],
    ['Pink Roses',require('./images/9.jpg'),'50'],
    ['Red Roses',require('./images/1.jpg'),'50'],
    ['hymn',require('./images/2.jpg'),'50'],
    ['Garden Flowers',require('./images/3.jpg'),'50'],
    ['Magenda Flowers',require('./images/11.jpg'),'50'],
  ],
    cart:[]
}


const ShopReducer=(state=initialState,action)=>{
    switch (action.type){
        case "setname":
        state={
            ...state,
            name:action.payload,
        }
        case "setcart":
        state={
            ...state,
            cart:action.payload,
        }
        case "addquantity":
            state={
                ...state,
                cart:[...state.cart,[action.payload]],
            }
            case "delete":
            state={
                ...state,
            }
    }
    
    return state;

}

export default ShopReducer;