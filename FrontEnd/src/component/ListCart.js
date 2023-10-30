import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import './product.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ModalProduct from './ModalProduct';
const Product = () => {
    const [productData, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm
        axios.get('http://localhost:9999/carts').then((response) => {

            setProducts(response.data.data);
        });
    }, []);

    return (
        <div className='container' style={{ display: 'flex' }}>
            <div className="sidebar">
                <h3>Filter by Brand</h3>
                {/* Create radio inputs for each brand name */}
            </div>
            <div className="content">
                <h1>Cart List</h1>
                <div className="d-flex justify-content-between">


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
                        {productData.map((e) =>
                            e.products.map(p => (
                                <tr tr key={p._id} >

                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price}</td>
                                    <td>{p.discountPercentage}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.brand}</td>
                                    <td><img src={p.thumbnail} alt="Product Thumbnail" /></td>
                                </tr>
                            ))

                        )}
                    </tbody>
                </Table>
                // khi truyền sang mình lấy product theo id

            </div>
        </div >
    );
};

export default Product;
