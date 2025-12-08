
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';

const MainLayouts = () => {
    return (
        <div className='min-h-screen flex  flex-col justify-between'>
            <Navbar></Navbar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;