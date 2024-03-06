import styled from "styled-components"
import FolderCard from "./FolderCard"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth";
import refreshTokenHelper from "../../helpers/refreshTokenHelper";
import api from "../../services/api";

export default function SideBar() {
    const { access, refresh, signUp } = useAuth();

    const [folders, setFolders] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await refreshTokenHelper(access, refresh, signUp);

                if (!token) return;

                const response = await api.getDirectories(token);
                setFolders(response.data);
            } catch (error) {
                console.log('Erro ao obter diretórios:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <Sidebar>
            <Home>
                All folders
            </Home>
            {folders && folders.map(folder => <FolderCard key={folder.id} folder={folder} />)}

            <AddFolderButton>+</AddFolderButton>
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