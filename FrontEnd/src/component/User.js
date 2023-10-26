import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table, } from 'react-bootstrap';
import './product.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = () => {
    const navigate = useNavigate();
    const RegisterAccount = (event) => {
        event.preventDefault();
        const username = document.querySelector('.username').value;
        const email = document.querySelector('.email').value;
        const password = document.querySelector('.password').value;
        const body = { username: username, email: email, password: password };
        axios.post(`http://localhost:9999/users`, body).then((response) => {
            console.log(response.data.data['_id']);

            navigate('/product');
            const cartBody = { user: response.data.data['_id'] };
            axios.post(`http://localhost:9999/carts`, cartBody).then((response) => {
                console.log(response);
                localStorage.setItem("cartID", response.data.data['_id'])
            }).catch((error) => {
                console.error(error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Can not create cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Welcome to HomePage',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((error) => {
            console.error(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error Network',
                showConfirmButton: false,
                timer: 1500
            })
        });


    }
    return (
        // cách trước 3 phân, nội dung 6 phân: đoạn sau kệ thôi
        <Form className="col-md-6 offset-md-3 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

            <div>

                <h1 className="d-flex justify-content-center align-items-center">Register New Account</h1>
                <div className="row">

                    <Form.Group className="col-md-12" controlId="formBasicEmail" >
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" className="username" />
                    </Form.Group>

                    <Form.Group className="col-md-12" controlId="formBasicPassword" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" className="email" />

                    </Form.Group>

                    <Form.Group className="col-md-12" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" className="password" />
                    </Form.Group>
                </div>
                <Button variant="primary" type="submit" onClick={RegisterAccount}>
                    register
                </Button>
            </div>
        </Form>
    );
};

export default Product;
