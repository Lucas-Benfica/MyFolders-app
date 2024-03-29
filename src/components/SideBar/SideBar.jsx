import styled from "styled-components"
import FolderCard from "./FolderCard"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

export default function SideBar({setAdding, folders}) {
    const navigate = useNavigate();
    const [sideBarFolders, setSideBarFolders] = useState(folders);
    useEffect(()=>{
        if(!folders) return;
        setSideBarFolders(folders.filter( f => f.parent == null));
    },[folders]);
    return (
        <Sidebar>
            <Home onClick={()=>navigate("/folders")}>
                All folders
            </Home>
            {sideBarFolders && sideBarFolders.map(folder => <FolderCard key={folder.id} folder={folder} allFolders={folders} />)}

            <AddFolderButton onClick={()=>setAdding(true)}>+</AddFolderButton>
        </Sidebar>
    )
}

const Sidebar = styled.div`
    width: 300px;
    min-height: calc(100vh - 64px);
    padding: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
`
const Home = styled.div`
    width: 100%;
    height: 35px;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    background: transparent;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);

`
const AddFolderButton = styled.button`
    background: rgba(255,255,255,0.3);
    border-left: 1px solid rgba(255,255,255,0.3);
    border-top: 1px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(10px);
    border: none;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    color: #FFFFFF;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    border-radius: 50px;
    width: 40px;
    height: 40px;
    margin-top: 20px;
`