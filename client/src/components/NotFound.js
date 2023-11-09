import React from 'react'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center mt-10'>
            <img src='/assests/404error.png' alt='error' className='w-[500px] h-[400px]' />
            <p className='font-serif text-xl font-semibold'> We are sorry, the page you requested could not be found...</p>
        </div>
    )
}

export default NotFound