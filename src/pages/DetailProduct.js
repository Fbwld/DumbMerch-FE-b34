    import { useContext, useEffect, useState } from "react";
    import { useParams} from "react-router-dom";
    import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
    import convertRupiah from "rupiah-format";
    import dataProduct from "../fakeData/product";
    import { useQuery, useMutation } from "react-query";
    import { API } from "../config/api";
    import logo from "../assets/img/logo.png"
    import { Link } from 'react-router-dom';
    import {useNavigate } from 'react-router';
    import { UserContext } from '../context/userContext';

    export default function DetailProduct() {
    let { id } = useParams();
        
    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    let { data: product, refetch } = useQuery("Cache", async () => {
        const config = {
        method: "GET",
        headers: {
            Authorization: "Basic " + localStorage.token,
        },
        };
        const response = await API.get("/product/" + id, config);
        return response.data?.data?.user?.data;

    });

    useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "Client key here ...";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
        document.body.removeChild(scriptTag);
    };
    }, []);

    const handleBuy = useMutation(async () => {
        try {
        const data = {
            idProduct: product.id,
            idSeller: state.user?.user?.id,
            price: product.price,
        };

        const body = JSON.stringify(data);

        const config = {
            method: "POST",
            headers: {
            Authorization: "Basic " + localStorage.token,
            "Content-type": "application/json",
            },
            body,
        };

        const response = await API.post("/transaction", config);
        console.log(response.data?.payment?.token)

        const token = response.data?.payment?.token;

        window.snap.pay(token, {
            onSuccess: function (result) {
            console.log(result);
            navigate("/profile");
            },
            onPending: function (result) {
            console.log(result);
            navigate("/profile");
            },
            onError: function (result) {
            console.log(result);
            },
            onClose: function () {
            alert("you closed the popup without finishing the payment");
            },
        });

        } catch (error) {
        console.log(error);
        }
    });

    return (
        <div>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <img src={logo}/>
                </Nav>
                <Nav className="nav">
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
        <Container className="py-5">
            <Row>
            <Col md="2"></Col>
            <Col md="3">
                <img src={"http://localhost:5000/uploads/"+product?.iamge} className="img-fluid" />
            </Col>
            <Col md="5">
                <div className="text-header-product-detail">{product?.name}</div>
                <div className="text-content-product-detail">
                Stock : {product?.qty}
                </div>
                <p className="text-content-product-detail mt-4">{product?.desc}</p>
                <div className="text-price-product-detail text-end mt-4">
                {convertRupiah.convert(product?.price)}
                </div>
                <div className="d-grid gap-2 mt-5">
                <button
                    onClick={() => handleBuy.mutate()}
                    className="btn btn-buy"
                >
                    Buy
                </button>
                </div>
            </Col>
            </Row>
        </Container>
        </div>
    );
    }
