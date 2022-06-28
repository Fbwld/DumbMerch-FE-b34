import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';
import PagesLogin from "./pages/Login"
import PagesRegister from "./pages/Register"
import PageProduct from "./pages/Product"
import PageProfile from "./pages/Profile"
import PageComplain from "./pages/Complain";
import PageDetail from "./pages/Detail";
import PagesListCategory from "./pages/CategoryAdmin";
import PageEditCategory from "./pages/EditCategory";
import "./style/style.css"
import PageEditProduct from "./pages/EditProduct";
import PageComplainAdmin from "./pages/ComplainAdmin";
import ProductAdmin from "./pages/ProductAdmin";
import AddProductAdmin from './pages/AddProduct';
import AddCategoryAdmin from './pages/AddCategory';
import PageEditProfile from './pages/EditProfil';
import DetailProduct from './pages/DetailProduct';
import PageWishList from './pages/WishList';

import { API, setAuthToken } from './config/api';

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  function App() {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    useEffect(() => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
  
      // Redirect Auth
      if (state.isLogin === false) {
        navigate('/');
      } else {
        if (state.user.status === 'admin') {
          navigate('/home-admin');
        } else if (state.user.status === 'customer') {
          navigate('/');
        }
      }
    }, [state]);
  
    const checkUser = async () => {
      try {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          },
        };
        const response = await API.get('/check-auth',config);
  
        // If the token incorrect
        if (response.status === 404) {
          return dispatch({
            type: 'AUTH_ERROR',
          });
        }
  
        // Get user data
        let payload = response.data?.data?.user;
        // Get token from local storage
        payload.token = localStorage.token;
  
        // Send data to useContext
        dispatch({
          type: 'USER_SUCCESS',
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (localStorage.token) {
        checkUser();
      }
    }, []);
  
  return (
    <>
      <div className="App">
        <Routes>
            <Route exact path="/" element={<PagesLogin/>}/>
            <Route path="register" element={<PagesRegister/>}/>
            <Route exact path="/product" element={<PageProduct/>}/>
            <Route exact path="/profile" element={<PageProfile/>}/>
            <Route exact path="/complain" element={<PageComplain/>}/>
            <Route exact path="/detail" element={<PageDetail/>}/>
            <Route exact path="/listcategory" element={<PagesListCategory/>}/>
            <Route exact path="/editcategory/:id" element={<PageEditCategory/>}/>
            <Route exact path="/editproduct/:id" element={<PageEditProduct/>}/>
            <Route exact path="/complain-admin" element={<PageComplainAdmin/>}/>
            <Route exact path="/product-admin" element={<ProductAdmin/>}/>
            <Route exact path="/add-product" element={<AddProductAdmin/>}/>
            <Route exact path="/add-category" element={<AddCategoryAdmin/>}/>
            <Route exact path="/edit-profile/:id" element={<PageEditProfile/>}/>
            <Route exact path="/detail-product/:id" element={<DetailProduct/>}/>
            <Route exact path="/wishlist" element={<PageWishList/>}/>
        </Routes>
      </div>
    </>

  );
}

export default App;
