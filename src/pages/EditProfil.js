import React, { useState, useEffect,useContext} from 'react';
import { Container, Row, Col, Button,Navbar,Nav,Form} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import logo from "../assets/img/logo.png"
import CheckBox from '../components/form/CheckBox';
import {UserContext}  from '../context/userContext';
import { API } from '../config/api';
import { Link } from 'react-router-dom';
import imgwish from "../assets/img/wishlist.png";

function PageEditProfile(){
        const title = "Profile";
        document.title = "DumbMerch | " + title;
    
        let navigate = useNavigate();
    
        const [form, setForm] = useState({
            phone: '',
            gender: '',
            address: '',
        });
    
        const getProfile = async () => {
        const response = await API.get("/profile");
        setForm({
            phone:response.data?.data?.user?.data?.phone,
            gender:response.data?.data?.user?.data?.gender,
            address:response.data?.data?.user?.data?.address,
        })
        };
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
        const data = JSON.stringify(form)
            // Insert product data
        await API.patch(
        '/profile', data,
        config
        );
    
        navigate("/profile");
        } catch (error) {
            console.log(error);
        }
        });
    
        useEffect(()=>{
            getProfile()
        },[])
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
                <Link to="/wishlist" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"}}><img src={imgwish} style={{width:"30px"}}></img>Wish List</Link>
                    <Link to="/complain" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"
                    }}>Complain</Link>
                    <Link to="/product" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"
                    }}>Product</Link>
                    <Link to="/profile" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#F74D4D",
                                marginRight:"23px"
                    }}>Profile</Link>
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
                <div className="text-header-category mb-4 text-white">Edit Profile</div>
            </Col>
            <Col xs="12">
                <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="input-editC text-white" controlId="formGroupName">
                <Form.Control 
                type="text"  
                placeholder="Your Phone"
                name="phone"
                onChange={handleChange}
                value={form?.phone}
                style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} 
                />
                <Form.Control 
                type="text"  
                placeholder="Gender"
                name="gender"
                onChange={handleChange}
                value={form?.gender}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <Form.Control 
                className="text-area-product" 
                as="textarea" 
                placeholder="Address"
                name="address"
                onChange={handleChange}
                value={form?.address}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <div className="d-grid gap-2 mt-4">
                    <Button 
                    type="submit" 
                    variant="success" 
                    size="md" 
                    style={{background: "#56C05A",border:"none"}}>
                    Edit Profile
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
export default PageEditProfile;