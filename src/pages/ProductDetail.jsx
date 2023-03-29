import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import { setIsLoading } from '../store/slices/isLoading.slice';
import { getProductsThunk } from '../store/slices/products.slice';
import { thunkCartPost } from '../store/slices/cart.slice';

import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import { Row, Col, Button, Card } from 'react-bootstrap';

const ProductDetail = () => {


  const [input, setInput] = useState(1);
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatchPostCart = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productRelated = useSelector((state) => state.product);
  const similarItems = productRelated?.filter((element) =>  element?.categoryId ===detail?.categoryId && detail?.id !== element?.id);

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch]);

  const handleSubmit = () => {
    if (localStorage.getItem('token')) {
      const data = {
        id: detail.id,
        quantity: input,
        product:detail,
        productId:detail.id
      }
      console.log("la data",data)
      dispatchPostCart(thunkCartPost(data));
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    dispatch(setIsLoading(true));
    axios.get(`https://backendfesagadxecommerceapi.onrender.com/api/v1/products/${id}`)
    //axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
      .then(resp => {
        console.log(resp.data);
        setDetail(resp.data);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false))
        }, 1500);
      });
  }, [id]);

  return (

    <Container>
      <div className="product-details mb-5">
        <Link  to={"/"}> 
          <div>Home</div>
        </Link>
        <div className="product-datails-point"></div>
        <div>
          {detail.title}
        </div>
      </div>
      
      <Row className="product-detail-images">
        <Col className="product-img" xs={12} lg={5}>
          <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
            {
              
              detail?.productImgs?.map((element, index) => (
                <Carousel.Item key={index} >
                  <img className="product-centered-img" src={`${element.url}`} alt={`img ${index}`}/>
                </Carousel.Item>
              ))
              
            }
          </Carousel>

          <div className="product-miniature-container">
            {
              
              detail?.productImgs?.map((element, index) => (
                <img key={index} src={`${element.url}`} alt={`img ${index}`} className={`product-miniature ${activeIndex === index ? 'active' : ''}`} onClick={() => setActiveIndex(index)}/>
              ))
              
            }
          </div>
        </Col>

        <Col xs={12} lg={6} >
        <Card className="product-description">
            <Card.Body>
              {
              /*
              <Card.Text className="product-description-category">
                  {detail.category}
              </Card.Text>
              */
              }
              <Card.Title className="product-description-title">
                {detail.title}
              </Card.Title>
              <Card.Text className="product-description-text">
                {detail.description}
              </Card.Text>
              <Container className='mt-4 col-12'>
                <Row>
                  <Col className='col-6'>
                    <h6 className="product-price">Price</h6>
                    <h4>${detail.price}</h4>
                  </Col>

                  <Col className="col-6">
                    <h6 className="product-quantity">Quantity</h6>
                    <div className="product-quantity-box">
                      <div className="flex">
                        <button className='product-button-cart' > 
                          <i className='bx bx-minus' onClick={() => setInput(input <= 1 ? 1 : input - 1)} ></i>
                        </button>
                        <div className="value">
                          {input}
                        </div>
                        <button className='product-button-cart' variant="primary" onClick={() => setInput(input + 1)}>
                          <i className='bx bx-plus'></i>
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Button onClick={() => handleSubmit()} variant="primary" className='product-button-add-cart w-100' >Add to cart <i className='bx bx-cart bx-tada bx-sm'></i></Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Container className="product-equal col-12">
        {
          
          similarItems.map((element, index) =>
            <Card as={Link} to={`/products/${element.id}`} key={index} className='product-equal-card mx-3 mb-3'>

              <Card.Header >
                <Card.Img className='similar-items-img similar-items-imgOne' variant="top" src={`${element.productImgs[0].url}`} />
                <Card.Img className='similar-items-img similar-items-imgTwo' variant="top" src={`${element.productImgs[1].url}`} />
              </Card.Header>

              <Card.Body className='product-details-des'>
                <Card.Title className='mb-3' >
                  {element.title}
                </Card.Title>

                <Card.Text className='mb-1'>
                  Price
                </Card.Text>

                <Card.Title >
                  {element.price}
                </Card.Title>

                <Button className='prod-button-detail'>
                  <i className='icon bx bx-cart bx-tada bx-sm'></i>
                </Button>

              </Card.Body>
            </Card>
          )
          
        }
      </Container>

    </Container >
  )
}

export default ProductDetail;