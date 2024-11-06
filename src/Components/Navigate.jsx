import { Link, Outlet } from 'react-router-dom';
export default function Navigate() {
    return (
        <div className='navigate_box'>
            <header className="bg-gray-800 bg-white text-black p-4">
                <nav className="space-x-4">
                    <Link to="/" className="hover:underline">Homepage</Link>
                    <Link to="/registration" className="hover:underline">Registrieren</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/marktplatz" className="hover:underline">Marktplatz</Link>
                    <Link to="/createproduct" className="hover:underline">Product Create</Link>
                    <Link to="/soldproduct" className="hover:underline">Product Sold</Link>
                    <Link to="/wischlist" className="hover:underline">Wishlist</Link>
                </nav>
            </header>
        </div>
    );
}