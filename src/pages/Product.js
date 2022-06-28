import React, { useContext, useRef, useState } from "react";
import logo from "../assets/img/logo.png"
import "bootstrap/dist/css/bootstrap.min.css"
import { API } from '../config/api';
import ProductCard from '../components/card/ProductCard';
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import {Navbar, Container, Row, Col, Nav, Card,Button} from "react-bootstrap"
import { useMutation, useQuery } from 'react-query';
import { Link } from "react-router-dom";
import mouse from "../assets/img/mouse.png"
import noproduct from "../assets/img/noproduct.png"
import { useParams, useNavigate } from 'react-router';
import convertRupiah from "rupiah-format";
import imgwish from "../assets/img/wishlist.png";
import { UserContext } from "../context/userContext";


function PageProduct(){
    const title = 'Shop';
    document.title = 'DumbMerch | ' + title;

    const [state, dispatch] = useContext(UserContext);

    const Buttonref = useRef(null)


    let navigate = useNavigate();

    const { id } = useParams();
    
        let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data.user.data;
        });
    
        const [form, setForm] = useState({
            idUser: '',
            idProduct: '',
        }); 
    
        const handleAdd = useMutation(async (e) => {
            try {
                console.log(e)
        
            const config = {
                headers: {
                'Content-type': 'application/json',
                },
            };

            const response = await API.post('/whislist',{idUser:state.user?.user?.id, idProduct:e}, config);

            navigate('/product');
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
                    <Link to="/wishlist" className="text-decoration-none" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"}}><img src={imgwish} style={{width:"30px"}}></img>Wish List</Link>
                    <Link to="/complain" className="text-decoration-none"  style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"
                    }}>Complain</Link>
                    <Link to="/product" className="text-decoration-none"  style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color:  "#F74D4D",
                                marginRight:"23px"
                    }}>Product</Link>
                    <Link to="/profile" className="text-decoration-none"  style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
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
            <Container className="mt-5">
            <Row>
            <Col>
                <div className="text-header-product text-white">Product</div>
            </Col>
            </Row>
            <form>
            <div className="">
                <Row>
                {products?.length !== 0 ? (
                    <>
                        {products?.map((item, index) => {
                            return(
                                <Col className="col-md-3 pb-4">
                                    <Card style={{ background: "#212121", width : "241px", borderRadius : "5px 5px 0px 0px"}}>
                                    <Card.Img variant="top" src={"http://localhost:5000/uploads/"+item.iamge}
                                    style={{
                                    objectFit: "cover",
                                    height : "300px",
                                    cursor : "pointer",
                                    }}/>
                                    <Card.Body>
                                        <Link to={"/detail-product/"+ item?.id} className='text-decoration-none'><Card.Title style={{color: "#F74D4D"}}>{item?.name}</Card.Title></Link>
                                        <Card.Text>{convertRupiah.convert(item?.price)}</Card.Text>
                                        <div>
                                        <Card.Text>{item?.qty}</Card.Text>
                                        <Button
                                            ref={Buttonref}
                                            name="datawhis"
                                            value={item?.id}
                                            onClick={(e) => handleAdd.mutate(item?.id)}
                                            type="button"
                                            className="btn-sm btn-danger"
                                            style={{ width: '210px' }}
                                            ><img src={imgwish} style={{width:"25px"}}></img>
                                            Add to Whislist
                                        </Button>
                                        </div>
                                    </Card.Body>
                                    </Card>
                                </Col>
                            )
                            })}
                    </>
                ) : (
                    <Col>
                    <div className="text-center pt-5">
                        <img
                        src={noproduct}
                        className="img-fluid"
                        style={{ width: '40%' }}
                        alt="empty"
                        />
                        <div className="mt-3">No data product</div>
                    </div>
                    </Col>
                )}
                </Row>
            </div>
            </form>
        </Container>
        </div>
            </>

    )
}
export default PageProduct;