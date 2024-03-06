import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../hooks/useAuth";

export default function Header(){
    const { logout } = useAuth();
    const navigate = useNavigate()

    function logoutSession(){
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
            navigate("/");
        }
    }

    return (
        <HeaderContainer>
            <Logo>
                <Link to="/folders">MyFolders</Link>
            </Logo>
            <IoIosLogOut className="logout" onClick={logoutSession}/>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    height: 64px;
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .logout {
        position: absolute;
        right: 20px;
        font-size: 25px;
        color: #FFFFFF;
        cursor: pointer;
    }
`
const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    a{
        font-family: 'Montserrat', sans-serif;
        font-size: 28px;
        font-weight: 700;
        text-decoration: none;
        color: #ffffff;
    }
`