import styled from "styled-components";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function Title(){
    return(
        <TitleFoldersContainer>
            <FaArrowAltCircleUp className="icon"/>
            <h1>There is no folder yet</h1>
        </TitleFoldersContainer>
    );
}

const TitleFoldersContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    h1{
        font-size: 25px;
        font-weight: 700;
        color: #5E5E5E;
    }
    .icon{
        font-size: 25px;
        color: #5E5E5E;
        cursor: pointer;
    }
`