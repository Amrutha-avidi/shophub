import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { getTotal } from "./cartSlice";
import productSlice from "./productSlice";
import authReducer, { loadUser } from "./authSlice";


const store = configureStore({
    reducer:{
        cart:cartSlice,
        products:productSlice,
        auth:authReducer
    }
})

store.dispatch(getTotal())
store.dispatch(loadUser(null))

export default store