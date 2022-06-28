import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Navbar,Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import logo from "../assets/img/logo.png"
import noproduct from "../assets/img/noproduct.png"
import DeleteData from '../components/modal/DeleteData';
import { API } from '../config/api';
import { Link } from 'react-router-dom';

export default function  PagesListCategory() {
let navigate = useNavigate();

const title = 'Category admin';
document.title = 'DumbMerch | ' + title;

const [idDelete, setIdDelete] = useState(null);
const [confirmDelete, setConfirmDelete] = useState(null);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

let { data: categories, refetch } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    return response.data.data.user.data;
});
    const addCategory = () => {
    navigate('/add-category');
};

const handleUpdate = (id) => {
    navigate('/editcategory/' + id);
};

const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
};

const deleteById = useMutation(async (id) => {
    try {
    await API.delete(`/category/${id}`);
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
 console.log(categories)
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
                                color: "#F74D4D",
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
    <Container className="py-5" style={{height:"87vh"}}>
        <Row>
        <Col xs="6">
            <div className="text-header-category mb-4 text-white">List Category</div>
        </Col>
        <Col xs="6" className="text-end">
            <Button
            onClick={addCategory}
            className="btn-dark"
            style={{ width: '100px' }}
            >
            Add
            </Button>
        </Col>
        <Col xs="12">
            {categories?.length !== 0 ? (
            <Table striped hover size="lg" variant="dark">
                <thead>
                <tr>
                    <th width="1%" className="text-center">
                    No
                    </th>
                    <th>Category Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                {categories?.map((item, index) => (
                    <tr>
                    <td width="10%" className="align-middle text-center">{index + 1}</td>
                    <td width="60%" className="align-middle">{item?.name}</td>
                    <td width="30%" className="align-middle">
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
