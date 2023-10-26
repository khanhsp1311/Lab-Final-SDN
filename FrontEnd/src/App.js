import Product from './component/Product';
import AddProduct from './component/AddProduct';
import CartProduct from './component/CartProduct';
import ListCart from './component/ListCart';
import User from './component/User'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<User />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/product/add' element={<AddProduct />}></Route>
          <Route path='/product/cart' element={<CartProduct />}></Route>
          <Route path='/cart/list' element={<ListCart />}></Route>
          <Route path='/product/update/:id' element={<AddProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </div>



  );
}

export default App;
