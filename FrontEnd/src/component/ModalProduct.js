import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Table, } from 'react-bootstrap';


const ModalProduct = (props) => {
    const [pcomment, setPcomment] = useState([]);

    useEffect(() => {
        console.log(2134);
        console.log(props);
        setPcomment(props.productComment);
    }, [props.productComment]);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcomment.map((comment) => (
                            <tr key={comment._id}>
                                <td>{comment.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalProduct;
