import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button,Form,Navbar,Nav} from 'react-bootstrap';
import {useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import logo from "../assets/img/logo.png"

import { API } from '../config/api';
import { Link } from 'react-router-dom';

export default function AddCategoryAdmin() {
const title = 'Category admin';
document.title = 'DumbMerch | ' + title;

let navigate = useNavigate();

const [form, setForm] = useState({
    name: '',
});

const { name } = form

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
}

const handleSubmit = useMutation(async (e) => {
    try {
    e.preventDefault();

    const config = {
        headers:{
            'Content-type':'application/json'
        },
    };

    // Insert product data
    const response = await API.post('/category', form, config);
    console.log(response?.data?.data);

    navigate('/listcategory');
    } catch (error) {
    console.log(error);
    }
});
return (
    <>
        <Navbar collapseOnSelect expand="lg">
            <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <img src={logo}/>
            </Nav>
            <Nav className="nav">
                <Link to="/complain-admin" className="text-decoration-none" style={{
                            height: "25px",
                            fontWeight: "900",
                            fontSize: "18px",
                            lineHeight: "25px",
                            color: "#FFFFFF",
                            marginRight:"23px"
                }}>Complain</Link>
                <Link to="/listcategory" className="text-decoration-none" style={{
                            
                            height: "25px",
                            fontWeight: "900",
                            fontSize: "18px",
                            lineHeight: "25px",
                            color:  "#F74D4D",
                            marginRight:"23px"
                }}>Category</Link>
                <Link to="/product-admin" className="text-decoration-none" style={{
                            height: "25px",
                            fontWeight: "900",
                            fontSize: "18px",
                            lineHeight: "25px",
                            color: "#FFFFFF",
                            marginRight:"23px"
                }}>Product</Link>
                <Link to="/" className="text-decoration-none" style={{
                            height: "25px",
                            fontWeight: "900",
                            fontSize: "18px",
                            lineHeight: "25px",
                            color: "#FFFFFF"
                }}>Logout</Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    <Container className="py-5" style={{height:"88vh"}}>
        <Row>
        <Col xs="12">
            <div className="text-header-category mb-4 text-white">Add Category</div>
        </Col>
        <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="input-editC text-white" controlId="formGroupName">
            <Form.Control 
            type="text"  
            placeholder="Category Name"
            name="name"
            value={name}
            onChange={handleChange}
            style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} 
            />
            <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md" style={{background: "#56C05A",border:"none"}}>
                Add Category
                </Button>
            </div>
        </Form.Group>
            </form>
        </Col>
        </Row>
    </Container>
    </>
);
}
