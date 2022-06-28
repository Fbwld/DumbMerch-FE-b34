import React from "react";
import logo from "../assets/img/logo.png"
import {Navbar,Nav,Container} from "react-bootstrap"
import mouse from "../assets/img/mouse.png"

function PageDetail(){
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
                    <Nav.Link href="#" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"
                    }}>Complain</Nav.Link>
                    <Nav.Link href="#" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF",
                                marginRight:"23px"
                    }}>Profile</Nav.Link>
                    <Nav.Link href="#" style={{
                                height: "25px",
                                fontWeight: "900",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "#FFFFFF"
                    }}>Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="d-detail">
                <div className="d-flex">
                    <img variant="left" src={mouse}/>
                    <div class="">
                        <div className="card-body">
                            <h5 className="card-title-det">Mouse</h5>
                            <h6 className="card-subtitle-det">Stock : 600</h6>
                            <p className="card-text-det" style={{marginTop:"35px"}}>- Wireless Mouse</p>
                            <p className="card-text-det">- Konektivitas wireless 2.4 GHz </p>
                            <p className="card-text-det">- Jarak wireless hingga 10 m </p>
                            <p className="card-text-det">- Plug and Play </p>
                            <p className="card-text-det">- Baterai tahan hingga 12 bulan </p>
                            <p className="card-text-det">Mouse Wireless Alytech AL - Y5D, hadir dengan desain 3 tombol mouse yang ringan dan mudah dibawa. Mouse ini menggunakan frekuensi radio 2.4GHz (bekerja hingga jarak 10m) dan fitur sensor canggih optik pelacakan dengan penerima USB yang kecil. Mouse ini didukung oleh 1x baterai AA (hingga 12 bulan hidup baterai). mendukung sistem operasi Windows 7,8, 10 keatas, Mac OS X 10.8 atau yang lebih baru dan sistem operasi Chrome OS.</p>
                            <p className="card-text-h">Rp.300.900</p>
                        </div>
                        <button className="buy">Buy</button>
                    </div>
                </div> 
            </div>
        </div>
        </>
    )
}
export default PageDetail;