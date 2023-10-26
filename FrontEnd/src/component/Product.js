import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import './product.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ModalProduct from './ModalProduct';
const Product = () => {
    const [products, setProducts] = useState([]);
    const [productComment, setProductComment] = useState([]);
    const [cart, setCart] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalShow, setModalShow] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm
        axios.get('http://localhost:9999/products').then((response) => {
            setProducts(response.data.data);
        });
    }, [products]);
    const btnClickAdd = () => {
        navigate('/product/add')
    }
    const btnClickCart = () => {
        navigate('/product/cart')
    }
    const btnClickListCart = () => {
        navigate('/cart/list')
    }
    // Filter products based on the selected brand
    const filteredProducts = selectedBrand
        ? products.filter(product => product?.brand[0]?.name === selectedBrand)
        : products;
    const btnClickDelete = async (id) => {
        console.log("id = " + id);
        await axios.delete(`http://localhost:9999/products/${id}`).then((response) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Delete product successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((error) => {
            // Handle error
            console.error('Error creating product:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network error',
                showConfirmButton: false,
                timer: 1500
            })
        });

    }
    const btnClickUpdate = async (id) => {
        console.log("id = " + id);
        navigate(`/product/update/${id}`)
        // await axios.put(`http://localhost:9999/products/${id}`);

    }
    const viewComment = async (id) => {
        console.log(id);
        setModalShow(true);
        axios.get(`http://localhost:9999/products/${id}/comment`).then((response) => {
            console.log(response);
            setProductComment(response.data.data);
        });
    }
    const addToCart = async (product) => {
        console.log("product");
        console.log(product);
        const cartID = localStorage.getItem('cartID');
        // console.log(id);
        // setModalShow(true);
        setCart(cart + 1);
        axios.put(`http://localhost:9999/carts/add/${cartID}`, { products: product }).then((response) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Add to cart product successfully',
                showConfirmButton: false,
                timer: 1000
            })
        });
    }
    return (
        <div className='container' style={{ marginTop: '15px', display: 'flex' }}>

            <div className="content" >
                <div className="d-flex justify-content-between">

                    <h1>Product List</h1>

                    <span style={{ position: 'relative' }}>

                        <img onClick={btnClickCart} style={{ cursor: 'pointer', width: '100px', height: '100px' }} src="data:image/png;base64,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" alt="Product Thumbnail" />
                        <h1 style={{ position: 'absolute', right: '0', top: '-20px', color: 'red' }}>{cart}</h1>
                    </span>

                </div>

                <div className="d-flex justify-content-between">


                    <Form.Group className="col-md-6" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Search Product" />
                    </Form.Group>

                    <Button variant="primary" onClick={btnClickAdd}>Add new</Button>
                    <Button variant="primary" onClick={btnClickCart}>My Cart</Button>
                    <Button variant="primary" onClick={btnClickListCart}>List Cart</Button>
                </div>
                <Table striped bordered hover style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Stock</th>
                            <th>Brand</th>
                            <th>thumbnail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.discountPercentage}</td>
                                <td>{product.stock}</td>
                                <td>{product.brand}</td>
                                {/* {console.log('1234', product.thumbnail)} */}
                                <td><img src={product.thumbnail} alt="Product Thumbnail" /></td>
                                <td>
                                    {/* <Button variant="primary" onClick={() => btnClickUpdate(product.id)}>Update</Button> */}
                                    <Button variant="primary" onClick={() => btnClickDelete(product._id)}> Delete </Button>
                                    <Button variant="primary" onClick={() => viewComment(product._id)}> View Comment </Button>
                                    <Button variant="primary" onClick={() => addToCart(product)}>Add to cart </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                // khi truyền sang mình lấy product theo id
                <ModalProduct
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    productComment={productComment}
                />
            </div>
        </div >
    );
};

export default Product;
