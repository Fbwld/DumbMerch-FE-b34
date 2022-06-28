import React, { useState, useEffect,useContext} from 'react';
import { Container, Row, Col, Button,Navbar,Nav,Form} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import logo from "../assets/img/logo.png"
import CheckBox from '../components/form/CheckBox';
import {UserContext}  from '../context/userContext';
import { API } from '../config/api';
import { Link } from 'react-router-dom';

function PageEditCategory(){
        const title = "Category admin";
        document.title = "DumbMerch | " + title;
    
        let navigate = useNavigate();
        const { id } = useParams();
    
        const [form, setForm] = useState({
            name: '',
        });

        const { name } = form
    
        let { refetch } = useQuery("categoryCache", async () => {
        const response = await API.get("/category/" + id);
        setForm({ name: response.data?.data?.user?.data?.name});
        });
        const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        };
    
        const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
     // Configuration
        const config = {
        method:"PATCH",
        headers:{
            Authorization:"Basic " + localStorage.token,
            'Content-type':'application/json'
        },
        };
    
        const response = await API.patch("/category/" + id, form, config);
    
        navigate("/listcategory");
        } catch (error) {
            console.log(error);
        }
        });
    
    return(
        <>
        <div className="container-product">
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
                    <Link to="listcategory" className="text-decoration-none" style={{
                                
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"
                    }}>Category</Link>
                    <Link to="/product-admin" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#F74D4D",
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
                <div className="text-header-category mb-4 text-white">Edit Category</div>
            </Col>
            <Col xs="12">
                <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="input-editC text-white" controlId="formGroupName">
                <Form.Control 
                type="text"  
                placeholder="Category Name"
                name="name"
                onChange={handleChange}
                value={form?.name}
                style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} 
                />
                <div className="d-grid gap-2 mt-4">
                    <Button 
                    type="submit" 
                    variant="success" 
                    size="md" 
                    style={{background: "#56C05A",border:"none"}}>
                    Edit Category
                    </Button>
                </div>
            </Form.Group>
                </form>
            </Col>
            </Row>
        </Container>
            
        </div>
        </>
    )
}
export default PageEditCategory;