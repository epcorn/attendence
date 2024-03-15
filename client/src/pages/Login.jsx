import { useSelector, useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { login } from "../redux/user/userSlice";
import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { loading } = useSelector(
        (store) => store.user
    );
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginData));
    };
    const [loginData, setLoginData] = useState({});


    function handleChange(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                pauseOnFocusLoss={false}
            />
            <form onSubmit={handleSubmit}>
                <div className="row d-flex flex-column page mx-2 justify-content-center align-items-center">
                    <div className="col-lg-4">
                        <input
                            label="Email:"
                            type="email"
                            name="email"
                            value={loginData?.email}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-lg-4">
                        <input
                            label="Password:"
                            type="password"
                            name="password"
                            value={loginData?.password}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <Button
                            className="btn btn-primary"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Login;
