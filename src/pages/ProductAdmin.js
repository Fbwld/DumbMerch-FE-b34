    import React, { useState, useEffect } from 'react';
    import { Container, Row, Col, Table, Button, Navbar,Nav} from 'react-bootstrap';
    import { useNavigate } from 'react-router';
    import { useQuery, useMutation } from 'react-query';
    import logo from "../assets/img/logo.png"
    import noproduct from "../assets/img/noproduct.png"
    import DeleteData from '../components/modal/DeleteData';
    import { API } from '../config/api';
    import { Link } from 'react-router-dom';

    export default function ProductAdmin() {
    let navigate = useNavigate();

    const title = 'Product admin';
    document.title = 'DumbMerch | ' + title;

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data.user.data;
    });
    const addProduct = () => {
        navigate('/add-product');
    };

    const handleUpdate = (id) => {
        navigate('/editproduct/' + id);
    };

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const deleteById = useMutation(async (id) => {
        try {
        await API.delete(`/product/${id}`);
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
        <Container className="py-5" style={{height:"87vh"}}>
            <Row>
            <Col xs="6">
                <div className="text-header-category mb-4 text-white">List Product</div>
            </Col>
            <Col xs="6" className="text-end">
                <Button
                onClick={addProduct}
                className="btn-dark"
                style={{ width: '100px' }}
                >
                Add
                </Button>
            </Col>
            <Col xs="12">
                {products?.length !== 0 ? (
                <Table striped hover size="lg" variant="dark">
                    <thead>
                    <tr>
                        <th width="1%" className="text-center">
                        No
                        </th>
                        <th>Photo</th>
                        <th>Product Name</th>
                        <th>Product Desc</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products?.map((item, index) => (
                        <tr key={index}>
                        <td className="align-middle text-center">{index + 1}</td>
                        <td className="align-middle">
                            <img
                            src={"http://localhost:5000/uploads/"+item.iamge}
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                            }}
                            />
                        </td>
                        <td className="align-middle">
                            {item?.name}
                        </td>
                        <td className="align-middle">
                            {item?.desc}
                        </td>
                        <td className="align-middle">
                            {item?.price}
                        </td>
                        <td className="align-middle">{item?.qty}</td>
                        <td className="align-middle">
                            <Button
                            onClick={() => {
                                handleUpdate(item?.id);
                            }}
                            className="btn-sm btn-success me-2"
                            style={{ width: '135px' }}
                            >
                            Edit
                            </Button>
                            <Button
                            onClick={() => {
                                handleDelete(item?.id);
                            }}
                            className="btn-sm btn-danger"
                            style={{ width: '135px' }}
                            >
                            Delete
                            </Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                ) : (
                <div className="text-center pt-5">
                    <img
                    src={noproduct}
                    className="img-fluid"
                    style={{ width: '40%' }}
                    alt="empty"
                    />
                    <div className="mt-3">No data product</div>
                </div>
                )}
            </Col>
            </Row>
        </Container>
        <DeleteData
            setConfirmDelete={setConfirmDelete}
            show={show}
            handleClose={handleClose}
        />
        </>
    )
    }
