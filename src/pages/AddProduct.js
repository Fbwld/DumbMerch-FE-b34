    import React, { useState, useEffect, useContext } from 'react';
    import { Container, Row, Col, Button,Form,Navbar,Nav} from 'react-bootstrap';
    import {useNavigate } from 'react-router';
    import { useMutation } from 'react-query';
    import logo from "../assets/img/logo.png"
    import CheckBox from '../components/form/CheckBox';
    import { API } from '../config/api';
    import { Link } from 'react-router-dom';
    import { UserContext } from '../context/userContext';

    export default function AddProductAdmin() {
    const title = 'Product admin';
    document.title = 'DumbMerch | ' + title;

    const [state, dispatch] = useContext(UserContext);

    let navigate = useNavigate();

    const [categories, setCategories] = useState([]); //Store all category data
    const [categoryId, setCategoryId] = useState([]); //Save the selected category id
    const [preview, setPreview] = useState(null); //For image preview
    const [form, setForm] = useState({
        iamge: '',
        name: '',
        desc: '',
        price: '',
        qty: '',
    }); 

    const getCategories = async () => {
        try {
        const response = await API.get('/categories');
        setCategories(response.data.data);
        } catch (error) {
        console.log(error);
        }
    };

    const handleChangeCategoryId = (e) => {
        const id = e.target.value;

        const checked = e.target.checked;

        if (checked) {
        setCategoryId([...categoryId, parseInt(id)]);
        } else {
        // Delete category id from variable if unchecked
        let newCategoryId = categoryId.filter((categoryIdItem) => {
            return categoryIdItem != id;
        });
        setCategoryId(newCategoryId);
        }
    };

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        });

        if (e.target.type === 'file') {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
        e.preventDefault();

        const config = {
            headers: {
            'Content-type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.set('iamge', form.iamge[0], form.iamge[0]?.name);
        formData.set('name', form.name);
        formData.set('desc', form.desc);
        formData.set('price', form.price);
        formData.set('qty', form.qty);
        formData.set('idUser', state.user?.user?.id);
        formData.set('categoryId', categoryId);

        const response = await API.post('/product', formData, config);
        console.log(response.data?.data?.user);

        navigate('/product-admin');
        } catch (error) {
        console.log(error);
        }
    });

    useEffect(() => {
        getCategories();
    }, []);

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
                <div className="text-header-category mb-4 text-white">Add Product</div>
            </Col>
            <Col xs="12">
                <form onSubmit={(e) => handleSubmit.mutate(e)}>
                {preview && (
                    <div>
                    <img
                        src={preview}
                        style={{
                        maxWidth: '150px',
                        maxHeight: '150px',
                        objectFit: 'cover',
                        }}
                        alt={preview}
                    />
                    </div>
                )}
                <input
                    type="file"
                    id="upload"
                    name="iamge"
                    hidden
                    onChange={handleChange}
                />
                <label for="upload" className="label-file-add-product text-white">
                Upload file
                </label>
            <Form.Group className="input-editC text-white" controlId="formGroupName">
                <Form.Control 
                type="text"  
                placeholder="Product Name"
                name="name"
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} 
                
                />
                <Form.Control 
                className="text-area-product" 
                as="textarea" 
                placeholder="Product Desc"
                name="desc"
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <Form.Control 
                type="number"  
                placeholder="Price (Rp.)"
                name="price"
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <Form.Control 
                type="text"  
                placeholder="Stock"
                name="qty"
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <Form.Control 
                type="text"  
                placeholder="Categories"
                name="category"
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <div className="d-grid gap-2 mt-4">
                    <Button type="submit" variant="success" size="md" style={{background: "#56C05A",border:"none"}}>
                    Add Product
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
