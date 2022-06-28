import React, { useState, useEffect, useContext } from 'react';
import logo from "../assets/img/logo.png"
import "bootstrap/dist/css/bootstrap.min.css"
import { API } from '../config/api';
import ProductCard from '../components/card/ProductCard';
import {Navbar, Container, Row, Col, Nav, Card,Button} from "react-bootstrap"
import { useQuery , useMutation} from 'react-query';
import { Link } from "react-router-dom";
import mouse from "../assets/img/mouse.png"
import noproduct from "../assets/img/noproduct.png"
import { useParams, useNavigate } from 'react-router';
import convertRupiah from "rupiah-format";
import imgwish from "../assets/img/wishlist.png";
import DeleteData from '../components/modal/DeleteData';
import { UserContext } from '../context/userContext';


function PageWishList(){
    const title = 'Wish List';
    document.title = 'DumbMerch | ' + title;

    const { id } = useParams();

    
        let { data: whislists, refetch} = useQuery('whislistsCache', async () => {
        const response = await API.get('/wishlists');
        console.log(response.data?.data?.user?.data)
        return response.data.data.user.data;
        });
;
const [idDelete, setIdDelete] = useState(null);
const [confirmDelete, setConfirmDelete] = useState(null);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
};

const deleteById = useMutation(async (id) => {
    try {
    await API.delete(`/wishlist/${id}`);
    refetch();
    } catch (error) {
    console.log(error);
    }
});
useEffect(() => {
    if (confirmDelete) {
    handleClose();
    deleteById.mutate(idDelete);
    setConfirmDelete(null);
    }
}, [confirmDelete]);

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
                                color: "#F74D4D",
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
                                color: "#FFFFFF",
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
            <Row className="mb-3">
            <Col>
                <div className="text-header-product text-white">Whislist</div>
            </Col>
            </Row>
            <form>
            <div className="">
                <Row>
                {whislists?.length !== 0 ? (
                        <>                        
                        {whislists?.map((item, index) =>{
                            return(
                                <Col  className="col-md-3 pb-4">
                                    <Card  style={{ background: "#212121", width : "241px", borderRadius : "5px 5px 0px 0px"}}>
                                        <Card.Img 
                                        variant="bottom" src={"http://localhost:5000/uploads/"+item?.products?.iamge} style={{
                                                    objectFit: "cover",
                                                height : "312px",
                                                cursor : "pointer",
                                        }}/>
                                    <Card.Body>
                                        <Link to={"/detail-product/"+ item?.products?.id} className='text-decoration-none'><Card.Title style={{color: "#F74D4D"}}>{item?.products?.name}</Card.Title></Link>
                                        <Card.Text>{convertRupiah.convert(item?.products?.price)}</Card.Text>
                                        <div className="d-flex justify-content-between">
                                        <Button
                                            onClick={() => {
                                                handleDelete(item?.id);
                                            }}
                                            className="btn-sm btn-danger"
                                            style={{ width: '230px' }}
                                            ><img src={imgwish} style={{width:"25px"}}></img>
                                            Delete
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
        <DeleteData
            setConfirmDelete={setConfirmDelete}
            show={show}
            handleClose={handleClose}
        />
        </div>
            </>

    )
}
export default PageWishList;