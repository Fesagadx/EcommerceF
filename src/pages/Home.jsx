import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import axios from 'axios';

import FiltersCanvas from '../components/FiltersCanvas';

import { Row, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import { getProductsThunk, filterCategoriesThunk, getFilterProducts, getFilterPrice } from '../store/slices/products.slice';
import { setIsLoading } from '../store/slices/isLoading.slice';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product);
  const [categories, setCategories] = useState([]);
  const { handleSubmit, register } = useForm();

  const searchProduct = (e) => {
    dispatch(getFilterProducts(e));
  };

  const submit = (data) => {
    dispatch(getFilterPrice(data));
  };
  console.log(products)

  useEffect(() => {
    axios.get(`https://backendfesagadxecommerceapi.onrender.com/api/v1/categories`)
    //axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then(resp => {
        setCategories(resp.data);
        }
        )
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false))
        }, 1500)
      });
    dispatch(getProductsThunk());
  }, []);

  return (
    <div>
      <Col className="home-search">
        <Form className='home-search-form' onSubmit={(e) => searchProduct(e.target[0].value)}>
          <Form.Control type="search" placeholder="What are you looking for?" className="home-search-text me-2" aria-label="Search"/>
          <Button variant="outline-secondary" id="button-addon2" className='home-search-button' type='submit'>
            <i className="home-search-icon bx bx-search bx-md"></i>
          </Button>
        </Form>
      </Col>
      
      <div className='home-hide-button'>
        <FiltersCanvas />
      </div>

      <div className='d-flex'>
        <Row className="mb-3">
          <Col className='d-block p-2' >
            <div className='filters-price'>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className='border-0'>
                  <Accordion.Header variant="success" id="dropdown-basic" >Price</Accordion.Header>
                  <Accordion.Body className='w-auto' show='onToggle'>
                    <Form onSubmit={handleSubmit(submit)} >
                      <Form.Group className="filters-price-group mb-3" controlId="formBasicPriceOne">
                        <Form.Label style={{ width: '60px' }}>From</Form.Label>
                        <Form.Control type="number" {...register("priceOne")}/>
                      </Form.Group>
                      <Form.Group className="filters-price-group mb-3" controlId="formBasicPriceTwo">
                        <Form.Label style={{ width: '60px' }}>To</Form.Label>
                        <Form.Control type="number" {...register("priceTwo")}/>
                      </Form.Group>
                      <Button className="filters-price-button" variant="primary" type="submit">
                        Filter Price
                      </Button>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className='filters-category'>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className='border-0'>
                  <Accordion.Header variant="success" id="dropdown-basic">Category</Accordion.Header>
                  <Accordion.Body className='w-auto' show='onToggle'>
                    {categories.map((category, index) => (
                      <Col key={index}>
                        <Button className="filters-category-button" onClick={() => dispatch(filterCategoriesThunk(category.id))}>
                          {category.name}
                        </Button>
                      </Col>
                    ))}
                    <Button className="filters-category-button" onClick={() => dispatch(getProductsThunk())}>
                      All
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        </Row>

        <Row className="products" xs={1} md={2} lg={3}>
          {
            products.map((product, index) => (
              <Col className='product d-flex' key={index} as={Link} to={`/products/${product.id}`}>
                <Card className='card'>
                  <div className='home-image'>
                    <Card.Img className='detail' variant="top" src={product.productImgs[0]}/>
                    <Card.Img className='details' variant="top" src={product.productImgs[1]}/>
                  </div>
                  <Card.Body>
                    <div className='home-description'>
                      <Card.Text className='category'>{product.category.name}</Card.Text>
                      <Card.Title className='title'>{product.title}</Card.Title>
                      <Card.Text className='price'> <span>Price: </span> </Card.Text>
                      <Card.Text className='amount'>{product.price}</Card.Text>
                      <Button className='prod-button'>
                        <i className='icon bx bx-cart bx-tada bx-sm'></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}
export default Home;