import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { storage } from '../firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from "uuid"

const CreateProduct = () => {
    const [product, setProduct] = useState([]);
    const formData = new FormData();
    const [image, setImage] = useState('');
    const [imageList, setImageList] = useState([])
    const [imageListMulti, setImageListMulti] = useState([])

    // const [addImage, setAddImage] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams();
    const imageListRef = ref(storage, 'images/')
    const [images, setImages] = useState([{ url: '', caption: '' }]);
    const [check, setCheck] = useState(false);

    const handleAddImage = () => {
        setImages([...images, { url: '', caption: '' }]);
    };
    function handleImage(e) {
        console.log(e.target.files);
        setImage(e.target.files[0]);

    }
    function handleImageMulti(e) {
        console.log(e.target.files);
        setImageListMulti(e.target.files);

    }

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedImages = [...images];
        updatedImages[index][name] = value;
        setImages(updatedImages);
        setCheck(true);



    };
    // useEffect(() => {
    //     listAll(imageListRef).then((response) => {
    //         console.log(response);
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 // lấy url của hình ảnh
    //                 setImageList((prev) => [...prev, url])
    //             })
    //         })
    //     })
    // }, [check])

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


        const imageRef = ref(storage, `images/${image.name + v4()}`);
        // const imageRefMulti = ref(storage, imagesDescription/${imageListMulti.name + v4()});
        let thumbnail = '';
        let imageDes = [];
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
                console.log(1);
                thumbnail = url;
                console.log(imageListMulti);
                if (imageListMulti.length == 0) return;
                // path
                let sum = 0;
                for (let i = 0; i < imageListMulti.length; i++) {

                    const imageRef2 = ref(storage, `imagesDes/ ${imageListMulti[i].name + v4()}`)
                    uploadBytes(imageRef2, imageListMulti[i]).then((snapshot) => {
                        // refresh trang
                        getDownloadURL(snapshot.ref).then((url) => {
                            imageDes.push({
                                url: url,
                                path: imageRef2['_location']['path_'],
                            })
                            sum += 1;
                            setImageList((prev) => [...prev, url])
                            console.log(1 + 1 + 1);
                            // chạy đến lần thứ cuối
                            if (imageListMulti.length === sum) {
                                console.log(2);

                                let body = {
                                    name: document.querySelector('.titleRef').value,
                                    description: document.querySelector('.descriptionRef').value,
                                    price: document.querySelector('.priceRef').value,
                                    discountPercentage: document.querySelector('.discountPercentageRef').value,
                                    brand: document.querySelector('.brandRef').value,
                                    stock: document.querySelector('.stockRef').value,
                                    images: imageDes,
                                    thumbnail: thumbnail, // Thêm URL vào body
                                }
                                axios.post('http://localhost:9999/products', body)
                                    .then((response) => {
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
                        })
                    })
                }

                console.log(3);

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
                    <Form.Control type="file" placeholder="thumbnail" className='thumbnailRef' onChange={handleImage} />
                    {
                        imageList.map(url => {
                            return <img style={{ width: '100px', height: '100px' }} src={url} />
                        })
                    }
                </Form.Group>






                <Form.Group className="col-md-6" controlId="formBasicPassword">
                    <Form.Label>thumbnail</Form.Label>
                    <Form.Control type="file" placeholder="thumbnail" className='thumbnailRef' multiple onChange={handleImageMulti} />

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
