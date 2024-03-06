import styled from "styled-components"
import Header from "../components/Header"
import SideBar from "../components/SideBar/SideBar"
import FoldersContainer from "../components/Folders/FoldersContainer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import refreshTokenHelper from "../helpers/refreshTokenHelper"
import api from "../services/api"

export default function FoldersPage(){
    const { access, refresh, signUp } = useAuth();

    const { id } = useParams();
    const [adding, setAdding] = useState(false);
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
    }, [id]);

    return (
        <PageContainer>
            <Header />
            <Body>
                <SideBar setAdding={setAdding} folders={folders}/>
                <FoldersContainer folderId={id} adding={adding} setAdding={setAdding}/>
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