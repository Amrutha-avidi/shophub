import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {add, remove ,decreaseItemQuantity,clearCart, getTotal} from '../store/cartSlice'
import { logoutUser } from '../store/authSlice';
import { toast } from 'react-toastify';



const Cart = () => {
    const cart = useSelector(state => state.cart)
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getTotal())
    },[cart,dispatch])

    const removeFromCart = (cartItem) => {
        dispatch(remove(cartItem))

    }

    const handelDecreaseQuantity = (cartItem)=>{
        dispatch(decreaseItemQuantity(cartItem))
    }

    const handelIncreaseQuantity = (cartItem)=>{
        dispatch(add(cartItem))
    }
    const handelClearCart = ()=>{
        dispatch(clearCart())
    }



    return (
        <div>
            <h1 className='text-3xl justify-center mt-5 flex font-mono  items-center gap-3 underline text-red-700'>Shopping Cart
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                    <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd" />
                </svg>
            </h1>
            {cart.cartItems.length === 0 ? (
                <div className='flex flex-col justify-center items-center text-center mt-5'>
                    <img src='/assests/empty.png' alt='empty-cart' className='w-[500px] h-[400px]' />
                    <h4>Looks like you haven't made your choices yet</h4>
                    <Link to='/' className='flex justify-center gap-2 text-xl items-center' style={{ textDecoration: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>

                        Start Shopping</Link>
                </div>
            ) : (
                <div className='mb-10'>
                    <div>
                        {cart.cartItems?.map(eachProduct => (
                            <div key={eachProduct.id} >
                                <div className='grid grid-cols-2 md:grid-cols-3 items-center justify-between shadow-md my-4  p-3 md:px-5 md:mx-20 md:my-5' >
                                    <div className='grid grid-cols-2 items-center'>
                                        <img src={eachProduct.image} alt={''} className='w-[90px], h-[90px] md:w-[130px], md:h-[130px]' />
                                        <h2 className='hidden w-[200px]  md:block md:text-xl' >{eachProduct.title}</h2>
                                    </div>
                                    <div className='hidden md:flex md:items-center md:justify-center md:gap-2 '>
                                        <button onClick={()=>handelDecreaseQuantity(eachProduct)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                            </svg>
                                        </button>
                                        <div className='bg-gray-400 px-2 py-1 font-semibold'>{eachProduct.cartQuantity}</div>

                                        <button onClick={()=>handelIncreaseQuantity(eachProduct)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className='flex flex-col md:grid md:grid-cols-2 items-center'>
                                        <h2 className='block text-[18px]  font-semibold md:hidden' >{eachProduct.title}</h2>
                                        <div className='flex items-center gap-2 md:hidden'>
                                        <button onClick={()=>handelDecreaseQuantity(eachProduct)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                            </svg>
                                        </button>
                                        <div className='bg-gray-400 px-2 py-1 font-semibold'>{eachProduct.cartQuantity}</div>

                                        <button onClick={()=>handelIncreaseQuantity(eachProduct)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                        </div>
                                        <p className='font-semibold text-xl text-blue-700'>
                                            $ {eachProduct.price * eachProduct.cartQuantity} 
                                        </p>
                                        <button className='bg-red-500 cursor-pointer
                             text-white rounded-xl font-semibold p-2 md:p-3 md:w-[150px]'
                                            onClick={() => removeFromCart(eachProduct)}
                                        >Remove Item</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between items-center md:px-20  '>
                        <div>
                            <button className='p-3 font-normal cursor-pointer text-md border bg-slate-600 hover:bg-slate-700 rounded-2xl text-white border-gray-400' onClick={()=>handelClearCart()}>Clear Cart</button>
                        </div>
                        <div className='flex-col text-center items-center border p-3 md:p-4 w-[200px] md:w-[250px]'>
                            <h3 className='text-xl md:text-2xl text-gray-700 font-serif font-thin'>Sub Total</h3>
                            <h4 className='text-xl md:text-2xl'>$ {cart.cartAmount.toFixed(2)}</h4>
                            {auth._id ? (
                                <button onClick={() => {
                                    dispatch(logoutUser(null))
                                    toast.info("Check Out", { position: 'bottom-left' })
                                  }} className='p-3 w-[120px] cursor-pointer  md:w-[200px] mb-3 font-normal text-md border bg-blue-600 hover:bg-blue-700 rounded-2xl text-white border-gray-400'>
                                Check Out
                            </button>

                            ):(
                                <button onClick={()=>navigate('/login')} className='p-3 w-[120px] cursor-pointer  md:w-[200px] mb-3 font-normal text-md border bg-yellow-500 hover:bg-yellow-600 rounded-2xl text-white border-gray-400'>
                                Login to Check Out
                            </button>

                            )}
                            
                            <Link to={'/'} style={{ textDecoration: 'none' }} className='text-center cursor-pointer'>
                                <div className='flex md:gap-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    <div> Continue Shopping</div>
                                </div>

                            </Link>
                        </div>

                    </div>
                </div>
            )

            }



        </div>

    )
}

export default Cart