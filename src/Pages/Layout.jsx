import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigate from '../Components/Navigate';
import Header from '../Components/Header';
import Footer_1 from '../Components/Footer_1';
import Footer_2 from '../Components/Footer_2';

const Layout = () => {  
    const location = useLocation();
    const isRegistrationPage = location.pathname === '/registration';
    const isLoginPage = location.pathname === '/login';
    const token = localStorage.getItem('token');
    return (
        <div>
            {/* <Navigate /> */}
            <Header />
            <main>
            
                    <Outlet /> 
          
            </main>
            {(isRegistrationPage || isLoginPage || token !== null)? <Footer_2 /> : <Footer_1 />}
        </div>
    );
};

export default Layout;