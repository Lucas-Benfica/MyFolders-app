import styled from "styled-components"
import Header from "../components/Header"
import SideBar from "../components/SideBar/SideBar"
import FoldersContainer from "../components/Folders/FoldersContainer"
import { useParams } from "react-router-dom"

export default function FoldersPage(){
    const { parentId, id } = useParams();

    return (
        <PageContainer>
            <Header />
            <Body>
                <SideBar />
                <FoldersContainer folderInfo={{ parentId, id }} />
            </Body>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: linear-gradient(45deg, #fc466b, #3f5efb);
    font-family: 'Montserrat', sans-serif;

    display: flex;
    flex-direction: column;
`
const Body = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`