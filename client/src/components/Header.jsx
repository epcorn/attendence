import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoFingerPrint } from "react-icons/io5";
import { logout } from '../redux/user/userSlice';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;

    const handleSignout = async () => {
        dispatch(logout());
    };

    return (
        <Navbar fluid rounded className=" border-b-2 ">
            <Navbar.Brand>
                <IoFingerPrint className="mr-3 h-[50px] " alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Attendence
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {currentUser && (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{currentUser?.username}</span>
                            <span className="block truncate text-sm font-medium">
                                {currentUser?.email}
                            </span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=settings">
                            <Dropdown.Item>Settings</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                    </Dropdown>
                )}
                <Navbar.Toggle />
            </div>
            {currentUser?.isAdmin ? (
                <Navbar.Collapse>
                    <NavLink as="div">Welcom to the Dashboard</NavLink>
                </Navbar.Collapse>
            ) : (
                <Navbar.Collapse>
                    <Link to="/">
                        <Navbar.Link active={path === "/"} as="div">
                            Home
                        </Navbar.Link>
                    </Link>
                    <Navbar.Link as={"div"}>Contact</Navbar.Link>
                    <Navbar.Link as={"div"}>About</Navbar.Link>
                </Navbar.Collapse>
            )}
        </Navbar>
    );
}