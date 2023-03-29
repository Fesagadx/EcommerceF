import { HashRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';

import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Purchases from './pages/Purchases';

import NavBar from './components/NavBar';
import Loader from './components/Loader';
import Footer from './components/Footer';

import './assets/css/styles.css';

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      {isLoading && <Loader />}
      <NavBar />

      <Container className='my-5'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products/:id' element={<ProductDetail />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/purchase' element={<Purchases />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Container>

      <Footer />
    </HashRouter>
  )
}
export default App;