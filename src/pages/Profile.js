    import { useContext, useState, useEffect } from 'react';
    import { useHistory } from 'react-router-dom';
    import Masonry from 'react-masonry-css';
    import { Container, Row, Col,Navbar ,Nav} from 'react-bootstrap';
    import { UserContext } from '../context/userContext';
    import { useQuery } from 'react-query';
    import logo from "../assets/img/logo.png"
    import dateFormat from 'dateformat';
    import convertRupiah from 'rupiah-format';
    import imgBlank from '../assets/img/blank-profile.png';
    import { Link } from 'react-router-dom'
    import { API } from '../config/api';
    import editimg from '../assets/img/edit.png'
    import imgwish from "../assets/img/wishlist.png";

    export default function Product() {
        const title = 'Profile';
        document.title = 'DumbMerch | ' + title;

        const [state] = useContext(UserContext);

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

        let { data: transactions, refetch: transactionsRefetch } = useQuery(
            "transactionsCache",
            async () => {
                const config = {
                method: "GET",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
            };
                const response = await API.get("/transactions", config);
                console.log(response.data?.data?.user?.data)
                return response.data?.data?.user?.data;

            }
            );
            useEffect(()=>{
            getProfile()
        },[])
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

            <Container className="my-5">
                <Row>
                <Col md="6" className='text-white'>
                    <div className="text-header-product mb-4">My Profile</div>
                    <Row>
                    <Col md="6">
                        <img
                        src={imgBlank}
                        className="img-fluid rounded"
                        alt="avatar"
                        />
                    </Col>
                    <Col md="6">
                    <Link to={"/edit-profile/"+state.user.id}>
                        <img
                            src={editimg}
                            className="img-edit-profile"
                            alt="avatar"
                        />
                    </Link>
                        <div className="profile-header">Name</div>
                        <div className="profile-content">{state?.user?.user?.name}</div>

                        <div className="profile-header">Email</div>
                        <div className="profile-content">{state?.user?.user?.email}</div>

                        <div className="profile-header">Phone</div>
                        <div className="profile-content">
                        {form?.phone ? form?.phone : '-'}
                        </div>

                        <div className="profile-header">Gender</div>
                        <div className="profile-content">
                        {form?.gender ? form?.gender : '-'}
                        </div>

                        <div className="profile-header">Address</div>
                        <div className="profile-content">
                        {form?.address ? form?.address : '-'}
                        </div>
                    </Col>
                    </Row>
                </Col>
                <Col md="6">
                    <div className="text-header-product mb-4">My Transaction</div>
                    {transactions?.length !== 0 ? (
                        <>
                        {transactions?.map((item, index) => (
                            <div
                            key={index}
                            style={{ background: '#303030' }}
                            className="p-2 mb-1"
                        >
                            <Container fluid className="px-1">
                            <Row>
                                <Col xs="3">
                                <img
                                    src={"http://localhost:5000/uploads/"+item.products.iamge}
                                    alt="img"
                                    className="img-fluid"
                                    style={{
                                    height: '120px',
                                    width: '170px',
                                    objectFit: 'cover',
                                    }}
                                />
                                </Col>
                                <Col xs="6">
                                <div
                                    style={{
                                    fontSize: '18px',
                                    color: '#F74D4D',
                                    fontWeight: '500',
                                    lineHeight: '19px',
                                    }}
                                >
                                    {item.products.name}
                                </div>
                                <div
                                    className="mt-2"
                                    style={{
                                    fontSize: '14px',
                                    color: '#F74D4D',
                                    fontWeight: '300',
                                    lineHeight: '19px',
                                    }}
                                >
                                    {dateFormat(item.createdAt, 'dddd, d mmmm yyyy')}
                                </div>

                                <div
                                    className="mt-3"
                                    style={{
                                    fontSize: '14px',
                                    fontWeight: '300',
                                    }}
                                >
                                    Price : {convertRupiah.convert(item.price)}
                                </div>

                                <div
                                    className="mt-3"
                                    style={{
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    }}
                                >
                                    Sub Total : {convertRupiah.convert(item.price)}
                                </div>
                                </Col>
                                <Col xs="3">
                                <div
                                    className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center`}
                                >
                                    {item.status}
                                </div>
                                </Col>
                            </Row>
                            </Container>
                        </div>
                        ))}
                    </>
                    ) : (
                    <div className="no-data-transaction">No transaction</div>
                    )}
                </Col>
                </Row>
            </Container>
        </div>
    );
    }
