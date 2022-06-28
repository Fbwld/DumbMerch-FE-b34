import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap'
import Contact from '../components/complain/Contact'
import Chat from '../components/complain/Chat'
import { UserContext } from '../context/userContext'
import {io} from 'socket.io-client'
import { Link } from 'react-router-dom';
import logo from "../assets/img/logo.png"
import imgwish from "../assets/img/wishlist.png";

// initial variable outside socket
let socket
export default function PageComplain() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // create messages state
    const [messages, setMessages] = useState([])

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    // consume user context
    const [state] = useContext(UserContext)

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token")
            },
            query: {
                id: state.user.id
            }
        })

        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })
        
        // listen error sent from server
        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
        });
        loadContact()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContact = () => {

        socket.emit("load admin contact")
        socket.on("admin contact", async (data) => {
            const dataContact = {
                ...data, 
                message: messages.length > 0 ? messages[messages.length -1].message : "Click here to start message"
            }
            setContacts([dataContact])
        })
    }

    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages", data.id)
    }

    const loadMessages = (value) => {
        // define listener on event "messages"
        socket.on("messages", async (data) => {
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message,
                }))
                console.log(dataMessages)
                setMessages(dataMessages)

            }
            const chatMessagesElm = document.getElementById("chat-messages")
            chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight
        })
    }
    const onSendMessage = (e) => {
        // listen only enter key event press
        if(e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            //emit event send message
            socket.emit("send message", data)
            e.target.value = ""
        }
    }

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
                                color: "#F74D4D",
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
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts}  clickContact={onClickContact} contact={contact} />
                    </Col>
                    <Col md={9} style={{maxHeight: '89.5vh'}} className="px-0">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
