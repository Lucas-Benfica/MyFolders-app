import styled from "styled-components";
import AddFolderBox from "./AddFolderBox";
import FolderBox from "./FolderBox";
import Title from "./Title";
import { useEffect, useState } from "react";
import refreshTokenHelper from "../../helpers/refreshTokenHelper";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";


export default function FoldersContainer({folderId, adding, setAdding, reloadFolders, setReloadFolders}) {
    const { access, refresh, signUp } = useAuth();
    const [folders, setFolders] = useState();
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const token = await refreshTokenHelper(access, refresh, signUp);

                const response = await api.getDirectories(token);

                if(folderId && response.data){
                    const foldersList = response.data.filter( f => f.parent == folderId );
                    setFolders(foldersList);
                }else{
                    setFolders(response.data);
                }

            } catch (error) {
                console.log('Erro ao obter diretórios:', error);
            }
        };

        fetchData();
    },[folderId, adding, reloadFolders]);

    return (
            <Container>
                <Title folderId={folderId} folders={folders} />
                <div>
                    <AddFolderBox adding={adding} setAdding={setAdding}/>
                    {folders && folders.map( f => <FolderBox key={f.id} folder={f} setReloadFolders={setReloadFolders} />)}
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    limit={3}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
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
