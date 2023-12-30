import React, { useState, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaInfo,
    FaSignOutAlt
} from "react-icons/fa";

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
            path: "/utilisateurs",
            name: "Utilisateurs",
            icon: <FaUserAlt />
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
            path: "/newsletters",
            name: "Newsletters",
            icon: <FaThList />
        },
        {
            path: "/about",
            name: "A propos",
            icon: <FaInfo />
        }
    ];

    const handleLogout = () => {
      // TODO: implement logout logic
    };

    return (
        <div className="flex">
            <div className={`${isOpen ? 'w-48' : 'w-20'} bg-black text-white h-screen fixed overflow-y-auto`}>
                <div className="flex flex-col justify-between h-screen">
                    <div className="bg-blue-500">
                        <div className="flex items-center p-4 hover:text-gray-600">
                            <h1 className={`${isOpen ? 'block' : 'hidden'} m-2 text-2xl font-bold`}>StepCHU</h1>
                            <div className="m-2">
                                <FaBars className="text-2xl cursor-pointer" onClick={toggle} />
                            </div>
                        </div>
                        {menuItem.map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className="flex items-center text-white p-2 hover:text-gray-600"
                            >
                                <div className="text-xl m-4">{item.icon}</div>
                                <div className={`${isOpen ? 'block' : 'hidden'} m-2`}>{item.name}</div>
                            </NavLink>
                        ))}
                    </div>
                    <div className="bg-red-500">
                        <NavLink
                            to="/logout"
                            className="flex items-center p-2 hover:text-gray-600"
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
            <main className={`${isOpen ? 'ml-48' : 'ml-20'} flex-grow p-4`}>{children}</main>
        </div>
    );
};

export default Sidebar;
