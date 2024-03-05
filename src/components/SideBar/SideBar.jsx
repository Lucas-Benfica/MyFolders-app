import styled from "styled-components"
import FolderCard from "./FolderCard"

export default function SideBar(){
    return (
        <Sidebar>
            <Home>
                All folders
            </Home>
            <FolderCard />
            <FolderCard />
            <FolderCard />
            <FolderCard />
            <FolderCard />
        </Sidebar>
    )
}

const Sidebar = styled.div`
    width: 300px;
    min-height: calc(100vh - 64px);
    padding: 15px;

    display: flex;
    flex-direction: column;
`

const Home = styled.div`
    width: 100%;
    height: 30px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #FFFFFF;
    background: linear-gradient(45deg, #fc466b, #3f5efb);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
`