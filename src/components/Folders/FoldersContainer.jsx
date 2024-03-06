import styled from "styled-components";
import AddFolderBox from "./AddFolderBox";
import FolderBox from "./FolderBox";
import Title from "./Title";
import { useEffect, useState } from "react";
import refreshTokenHelper from "../../helpers/refreshTokenHelper";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";


export default function FoldersContainer({folderId, adding, setAdding}) {
    const { access, refresh, signUp } = useAuth();
    const [folders, setFolders] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const token = await refreshTokenHelper(access, refresh, signUp);

                if (!token) return;

                const response = await api.getDirectories(token);

                if(folderId && response.data){
                    const foldersList = response.data.filter( f => f.parent === folderId );
                    setFolders(foldersList);
                }else{
                    setFolders(response.data);
                }

            } catch (error) {
                console.log('Erro ao obter diretórios:', error);
            }
        };

        fetchData();
    },[folderId]);

    return (
            <Container>
                <Title folderId={folderId} folders={folders} />
                <div>
                    <AddFolderBox adding={adding} setAdding={setAdding}/>
                    {folders && folders.map( f => <FolderBox key={f.id} folder={f} />)}
                </div>
            </Container>
    );
}

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 64px);
    background-color: #FFFFFF;
    border-radius: 20px 0 0 0;
    padding: 20px;

    display: flex;
    flex-direction: column;

    div{
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }
`;
