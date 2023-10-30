// những sản phẩm sẽ bày trên bảng
// có một nút coi như làimport React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table, } from 'react-bootstrap';
import './product.css'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CartProduct = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productBuy, setProductBuy] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm
        const cartID = localStorage.getItem('cartID');
        axios.get(`http://localhost:9999/carts/${cartID}`).then((response) => {
            // console.log(response.data.data);
            setProductBuy(response.data.data)
            setFilteredProducts(response.data.data[0]?.products);
        });
    }, [filteredProducts]);

    const payProduct = () => {
        console.log(productBuy);
        axios.put(`http://localhost:9999/carts/${productBuy[0]['_id']}`, productBuy[0]).then((response) => {
            // console.log(response.data.data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Pay product successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/product')
        }).catch((error) => {
            // Handle error
            console.log('Error creating product:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        });
    }
    return (
        <>
            <Button variant="primary" onClick={payProduct}> Pay Invoice </Button>
            <Table striped bordered hover style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.discountPercentage}</td>
                            <td>{product.quantity}</td>

                            <td>{product.total}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default CartProduct;
