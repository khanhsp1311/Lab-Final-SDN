import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const CreateProduct = () => {
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const formData = new FormData();
    // const [addImage, setAddImage] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams();

    const [images, setImages] = useState([{ url: '', caption: '' }]);

    const handleAddImage = () => {
        setImages([...images, { url: '', caption: '' }]);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedImages = [...images];
        updatedImages[index][name] = value;
        setImages(updatedImages);
    };

    useEffect(() => {
        if (id) {

            axios.get(`http://localhost:9999/products/${id}`).then((response) => {
                console.log(response);
                setProduct(response.data.data);
            });
        }
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get the values of the input elements.
        formData.append('title', document.querySelector('.titleRef').value);
        formData.append('description', document.querySelector('.descriptionRef').value);
        formData.append('price', document.querySelector('.priceRef').value);
        formData.append('discountPercentage', document.querySelector('.discountPercentageRef').value);
        formData.append('brand', document.querySelector('.brandRef').value);
        formData.append('stock', document.querySelector('.stockRef').value);

        // Nếu thumbnail là một trường input kiểu file
        const thumbnailFile = document.querySelector('.thumbnailRef').files[0];
        formData.append('thumbnail', thumbnailFile);

        // Nếu thumbnail là một URL
        formData.append('thumbnail', document.querySelector('.thumbnailRef').value);

        // const image = document.querySelector('.imageRef').value

        // Submit the form data.
        // ...

        console.log(431);
        console.log(images);
        // const body = {
        //     name: title, description: description, price: price, discountPercentage: discountPercentage, brand: brand,
        //     stock: stock, thumbnail: thumbnail, images: images
        // }
        // console.log(body);
        axios.post('http://localhost:9999/products', formData)
            .then((response) => {
                // Handle success, e.g., redirect or show a success message
                console.log('Product created successfully.');
                navigate('/product');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Add product successfully',
                    showConfirmButton: false,
                    timer: 1500
                })

            })
            .catch((error) => {
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

    };
    return (
        // cách trước 3 phân, nội dung 6 phân: đoạn sau kệ thôi
        <Form className="col-md-6 offset-md-3">
            <h1 className="d-flex justify-content-center">Create New Product</h1>
            <div className="row">

                <Form.Group className="col-md-6" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control disabled />
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" required placeholder="Title" className='titleRef' />
                </Form.Group>
            </div>

            <div className="row">

                <Form.Group className="col-md-6" controlId="formBasicEmail" >
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" required placeholder="0" className='priceRef' />
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="number" required placeholder="0" className='discountPercentageRef' />
                </Form.Group>
            </div>

            <div className="row">

                <Form.Group className="col-md-6" controlId="formBasicEmail">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control placeholder="Brand" type="text" className='brandRef' />
                </Form.Group>

                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" placeholder="0" className='stockRef' />
                </Form.Group>
            </div>

            <div className="row">

                <Form.Group className="col-md-6" controlId="formBasicEmail">
                    <Form.Label>thumbnail</Form.Label>
                    <Form.Control type="file" placeholder="thumbnail" className='thumbnailRef' />
                </Form.Group>


                {
                    images.map((image, index) => (
                        <Form.Group className="col-md-6" controlId={`image${index}`} key={index}>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="image"
                                className='image'
                                name="url"
                                value={image.url}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                            <Form.Label>Caption</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Caption for image"
                                className='image'
                                name="caption"
                                value={image.caption}
                                onChange={(e) => handleInputChange(index, e)}
                            />


                        </Form.Group>

                    ))
                }



                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Button variant="primary" type="button" onClick={handleAddImage}>
                        Thêm
                    </Button>
                </Form.Group>
            </div>

            <div className="row">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} className='descriptionRef' />
                </Form.Group>
            </div>

            {/* <Form.Group className="col-md-6" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Add
            </Button>
        </Form>
    );
};

export default CreateProduct;
