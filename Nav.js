import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();//usenavigate automatically logout change krra , refrsh nahi krna padhra
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }

    return (
        <div>
<img alt="logo" src="./Group 48095569.png" />
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Home Page</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">LogOut ({JSON.parse(auth).name})</Link></li></ul>// auth jab nikalenge toh vo string format m hoga thus we will convert into JSON format
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signUp">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>

            }


        </div>
    )
}
export default Nav;


//navigation bar where we can navigate from one page to another