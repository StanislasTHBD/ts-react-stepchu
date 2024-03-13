import React, { useState, ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaInfo,
    FaSignOutAlt,
    // FaQuestion,
    FaShoePrints,
    FaIdBadge
} from "react-icons/fa";
import { logoutUser } from '../services/AuthService';

interface SidebarProps {
    children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/steps",
            name: "Steps",
            icon: <FaShoePrints />
        },
        {
            path: "/utilisateurs",
            name: "Utilisateurs",
            icon: <FaUserAlt />
        },
        {
            path: "/newsletters",
            name: "Newsletters",
            icon: <FaThList />
        },
        {
            path: "/challenges",
            name: "Challenges",
            icon: <FaRegChartBar />
        },
        {
            path: "/evenements",
            name: "Evenements",
            icon: <FaCommentAlt />
        },
        {
            path: "/quizzs",
            name: "Quizzs",
            icon: <FaShoppingBag />
        },
        {
            path: "/badges",
            name: "Badges",
            icon: <FaIdBadge />
        },
        {
            path: "/points",
            name: "Points",
            icon: <FaShoppingBag />
        },
        // {
        //     path: "/questionSecuritys",
        //     name: "Question Sécurité",
        //     icon: <FaQuestion />
        // },
        {
            path: "/about",
            name: "A propos",
            icon: <FaInfo />
        }
    ];

    const handleLogout = async () => {
        await logoutUser();
    };

    const location = useLocation();

    const shouldRenderSidebar = !['/signup', '/login'].includes(location.pathname);

    return (
        <div className="flex">
            {shouldRenderSidebar && (
                <div className={`${isOpen ? 'w-56' : 'w-20'} bg-custom-blue text-white h-screen fixed overflow-y-auto`}>
                    <div className="flex flex-col justify-between h-screen">
                        <div className="bg-custom-blue">
                            <div className="flex items-center p-4 hover:bg-custom-orange">
                            <img src="/logo_stepchu.svg" alt="Logo" className={`${isOpen ? 'block' : 'hidden'}`} style={{ width: '32px', height: '32px' }} />

                                <h1 className={`${isOpen ? 'block' : 'hidden'} m-2 text-2xl font-bold`}>StepCHU</h1>
                                <div className="m-2">
                                    <FaBars className="text-2xl cursor-pointer" onClick={toggle} />
                                </div>
                            </div>
                            {menuItem.map((item, index) => (
                                <NavLink
                                    to={item.path}
                                    key={index}
                                    className="flex items-center text-white p-2 hover:bg-custom-orange"
                                >
                                    <div className="text-xl m-4">{item.icon}</div>
                                    <div className={`${isOpen ? 'block' : 'hidden'} m-2`}>{item.name}</div>
                                </NavLink>
                            ))}
                        </div>
                        <div className="bg-red-500">
                            <NavLink
                                to="/logout"
                                className="flex items-center p-2 hover:bg-custom-orange"
                                onClick={handleLogout}
                            >
                                <div className="text-xl m-4">
                                    <FaSignOutAlt />
                                </div>
                                <div className={`${isOpen ? 'block' : 'hidden'} m-2`}>Déconnexion</div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
            {shouldRenderSidebar ? (
                <main className={`${isOpen ? 'ml-56' : 'ml-20'} flex-grow p-4`}>{children}</main>
            ) : (
                <main>{children}</main>
            )}
        </div>
    );
};

export default Sidebar;