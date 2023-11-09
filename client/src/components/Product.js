import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store/cartSlice'
import { getProducts } from '../store/productSlice'
import StatusCode from '../utils/StatusCode'
import SlideImages from './SlideImages'


const Product = () => {
  const dispatch = useDispatch()
  const { data: products, status } = useSelector(state => state.products)

  useEffect(() => {
    //dispatch an action for fetchProducts
    dispatch(getProducts())

  }, [dispatch])

  if (status === StatusCode.LOADING) {
    return <p>Loading...</p>
  }

  if (status === StatusCode.ERROR) {
    return <p>Something Went Wrong...</p>
  }


  const addToCart = (product) => {
    dispatch(add(product))
  }


  const cards = products.map(eachProduct => (
    <div className="col-md-3 mb-[20px]" key={eachProduct.id}  >
      <div className='flex flex-col justify-center items-center'>
        <img className=' m-2 w-[125px] h-[125px]' src={eachProduct.image} alt="product-item" />

        <h5 className="card-title">{eachProduct.title.substring(0, 15)}...</h5>
        <p className="font-semibold text-blue-700 text-2xl"> $ {eachProduct.price} </p>
        <button onClick={() => addToCart(eachProduct)} className="p-2 rounded-xl text-white  bg-gray-600 hover:bg-gray-800">Add To Cart</button>
      </div>

    </div>

  ))


  return (
    <>
      <div className='row p-5'>
        <SlideImages />
        <h2 className='mt-5 text-green-900 font-mono text-[32px] md:text-[42px] text-center font-bold'>Our Products</h2>

        {cards}
      </div>
    </>
  )
}

export default Product