import React, { useState, useEffect,useContext} from 'react';
import { Container, Row, Col, Button,Navbar,Nav,Form} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import logo from "../assets/img/logo.png"
import CheckBox from '../components/form/CheckBox';
import {UserContext}  from '../context/userContext';
import dataProduct from '../fakeData/product';

import { API } from '../config/api';
import { Link } from 'react-router-dom';


function PageEditProduct(){
        const title = 'Product admin';
        document.title = 'DumbMerch | ' + title;
    
        let navigate = useNavigate();
        const { id } = useParams();
    
        const [state, dispatch] = useContext(UserContext);
        const [categories, setCategories] = useState([]); //Store all category data
        const [categoryId, setCategoryId] = useState([]); //Save the selected category id
        const [preview, setPreview] = useState(null); //For image preview
        const [product, setProduct] = useState({}); //Store product data
    
        // Create Variabel for store product data here ...
        const [form, setForm] = useState({
        iamge: '',
        name: '',
        desc: '',
        price: '',
        qty: '',
        });
    
        // Create function get product data by id from database here ...
        let { data: products, refetch } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        console.log(response)
        return response.data?.data?.user?.data;
        
        });
        // Create function get category data by id from database here ...
        let { data: categoriesData, refetch: refetchCategories } = useQuery(
        'categoriesCache',
        async () => {
            const response = await API.get('/categories');
            return response.data.data;
        }
        );
    
        // Call function get product with useEffect didMount here ...
        // Call function get category with useEffect didMount here ...
        useEffect(() => {
        if (products) {
            setPreview("http://localhost:5000/uploads/"+ products.iamge);
            setForm({
            ...form,
            name: products.name,
            desc: products.desc,
            price: products.price,
            qty: products.qty,
            
            });
            setProduct(products);
        }
    
        if (categoriesData) {
            setCategories(categoriesData);
        }
        }, [products]);
    
        // Create function for handle if category selected here ...
        // For handle if category selected
        const handleChangeCategoryId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;
    
        if (checked == true) {
            // Save category id if checked
            setCategoryId([...categoryId, parseInt(id)]);
        } else {
            // Delete category id from variable if unchecked
            let newCategoryId = categoryId.filter((categoryIdItem) => {
            return categoryIdItem != id;
            });
            setCategoryId(newCategoryId);
        }
        };
    
        // Create function for handle change data on form here ...
        const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        });
    
        // Create image url for preview
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
        };
        
        // Create function for handle submit data ...
        const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
    
            // Configuration
            const config = {
            method:"PATCH",
            headers:{
                Authorization:"Basic " + localStorage.token,
                'Content-type':'multipart/form-data'
            },
            };
            
            // Store data with FormData as object
            console.log(form)
            const formData = new FormData();
            if (typeof form.iamge[0]==='object') {
            formData.set('iamge', form?.iamge[0], form?.iamge[0]?.name);
            }else{
                formData.set("iamge",form.iamge)
            }
            formData.set('name', form.name);
            formData.set('desc', form.desc);
            formData.set('price', form.price);
            formData.set('qty', form.qty);
            formData.set('idUser', state.user.id);
            // formData.set('categoryId', categoryId);
            
            // Insert product data
            const response = await API.patch(
            '/product/' + product.id,
            formData,
            config
            );
    
            navigate('/product-admin');
        } catch (error) {
            console.log(error);
        }
        });
    
        // Get category id selected
        useEffect(() => {
        const newCategoryId = product?.categories?.map((item) => {
            return item.id;
        });
    
        setCategoryId(newCategoryId);
        }, [product]);
    console.log(form)
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
                <div className="text-header-category mb-4 text-white">Edit Product</div>
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
                value={form?.name}
                style={{background:" rgba(210, 210, 210, 0.25)",color: "#ffffff"}} 
                />
                <Form.Control 
                className="text-area-product" 
                as="textarea" 
                placeholder="Product Desc"
                name="desc"
                value={form?.desc}
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <Form.Control 
                type="number"  
                placeholder="Price (Rp.)"
                name="price"
                value={form?.price}
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <Form.Control 
                type="text"  
                placeholder="Stock"
                name="qty"
                value={form?.qty}
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px",color: "#ffffff"}} 
                />
                <Form.Control 
                type="text"  
                placeholder="Categories"
                name="category"
                onChange={handleChange}
                style={{background:" rgba(210, 210, 210, 0.25)",marginTop:"20px"}} 
                />
                <div className="d-grid gap-2 mt-4">
                    <Button type="submit" variant="success" size="md" style={{background: "#56C05A",border:"none"}}>
                    Edit Product
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
export default PageEditProduct;