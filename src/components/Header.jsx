import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header(){
    return (
        <HeaderContainer>
            <Logo>
                <Link to="/folders">MyFolders</Link>
            </Logo>
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
`
const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    img {
        width: 40px;
        height: 40px;
        object-fit: cover;
    }
    a{
        font-family: 'Montserrat', sans-serif;
        font-size: 28px;
        text-decoration: none;
        color: #fc466b;
    }
`