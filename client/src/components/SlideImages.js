import Carousel from 'react-bootstrap/Carousel';

const SlideImages = () => {
  return (
   
    <Carousel>
      <Carousel.Item interval={1000}>
        <img src='/assests/1.png' alt='one' className='w-[800px] h-[200px] md:w-[1500px] md:h-[700px]' />
       
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img src='/assests/2.png' alt='two' className='w-[800px] h-[200px] md:w-[1500px] md:h-[700px]' />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
 
  )
}

export default SlideImages