import { useNavigate } from 'react-router-dom';
import './Footer_1.css';
import twitter from '../assets/img/icons/twitter.svg'; 
import facebook from '../assets/img/icons/facebook.svg';
import wifi from '../assets/img/icons/wifi.svg';
import instagram from '../assets/img/icons/instagram.svg';
export default function Footer_1() { 
    const navigate = useNavigate(); 
    const NavigatetoRegisterPage = async ()=>{
        navigate('/registration'); 
    }
    return (
        <>
        <footer className='footer_1'>
            <div className='footer_form_1'>
            <h1 className='title_footer'>nothingtotrash - eine online Plattform um Müll zu vermeiden.</h1>
                <button onClick={NavigatetoRegisterPage} className='button_footer'>Registriere Dich</button>
            </div>
        </footer>
        <footer className='footer_2'>
            <div className='footer_form_2'>
                <div className='icons_footer'>
                    <img src={twitter} alt="twitter" className='footer_icon' />
                    <img src={facebook} alt="facebook" className='footer_icon' />
                    <img src={wifi} alt="wifi" className='footer_icon' />
                    <img src={instagram} alt="instagram" className='footer_icon' />
                </div>
                <p className='copyright_footer'>COPYRIGHT nothingtotrash 2024 - TERMS & CONDITIONS  PRIVACY POLICY</p>
            </div>
            </footer>
            </>
        )
}