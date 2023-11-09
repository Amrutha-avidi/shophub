import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const items = localStorage.getItem('cartItems') !== null ? JSON.parse
    (localStorage.getItem('cartItems')) : []

const initialState = {
    cartItems: items,
    cartQuantity: 0,
    cartAmount: 0

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info('Increased product quantity', {
                    position: 'bottom-left'
                })
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success('added a new product to the cart', {
                    position: 'bottom-left'
                })

            }
            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems.map((item) => item))
            )

        },
        remove(state, action) {
            const updatedCart = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )
            state.cartItems = updatedCart
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.error('Product removed from the cart', {
                position: 'bottom-left'
            })
        },

        decreaseItemQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1

                toast.info('Decreased the item quantity', {
                    position: 'bottom-left'
                })
            }
            else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const updatedCart = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
                state.cartItems = updatedCart
                toast.error('Product removed from the cart', {
                    position: 'bottom-left'
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        clearCart(state,action){
            state.cartItems=[]
            toast.success('Cart cleared', {
                position: 'bottom-left'
            })
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },

        getTotal(state,action){
            let {total,quantity} = state.cartItems.reduce((cartTotalAmount,cartItem)=>{
                const{price,cartQuantity} = cartItem;
                const itemTotal = price* cartQuantity;
                cartTotalAmount.total += itemTotal
                cartTotalAmount.quantity+=cartQuantity

                return cartTotalAmount
            }, {
                total:0,
                quantity:0

            })
            state.cartQuantity = quantity
            state.cartAmount = total
        }

    }
})
export const { add, remove, decreaseItemQuantity,clearCart ,getTotal} = cartSlice.actions
export default cartSlice.reducer