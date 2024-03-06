import styled from "styled-components"
import { FaFolder, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FormCreate } from "./AddFolderBox";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import refreshTokenHelper from "../../helpers/refreshTokenHelper";
import useAuth from "../../hooks/useAuth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FolderBox({ folder, setReloadFolders }) {
    const { access, refresh, signUp } = useAuth();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [newName, setNewName] = useState(folder.name);
    const [name, setName] = useState(folder.name);

    const navigate = useNavigate();

    function toggleEditing() {
        if (deleting) return;
        setEditing(true);
    }
    function toggleDeleting() {
        if (editing) return;
        setDeleting(!deleting);
    }

    function navigateToFolder() {
        if (editing || deleting) {
            setEditing(false);
            return;
        };

        navigate(`/folders/${folder.id}`);
    }

    async function updateFolderName(ev) {
        ev.preventDefault();
        try {
            const token = await refreshTokenHelper(access, refresh, signUp);
    
            const { id, ...folderWithoutId } = folder;
    
            const updatedFolder = {
                ...folderWithoutId,
                name: newName,
            };
    
            const response = await api.patchDirectory(updatedFolder, id, token);
    
            toast.success('Folder name updated', { position: 'top-right' });
            setName(newName);
            setNewName('');
            setReloadFolders("update");
            setEditing(false);
    
        } catch (error) {
            console.log(error);
            toast.error('Failed to update folder name', { position: 'top-right' });
        }
    }
    async function deleteFolder() {
        try {
            const token = await refreshTokenHelper(access, refresh, signUp);
    
            const response = await api.deleteDirectory(folder.id, token);
    
            toast.success('Folder deleted successfully', { position: 'top-right' });
            setReloadFolders('delete');
            setDeleting(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete folder', { position: 'top-right' });
        }
    }

    if (!folder) return (<></>);

    return (
        <Box>
            {editing ?
                <FormCreate onSubmit={updateFolderName}>
                    <input
                        type="text"
                        placeholder="Update folder name"
                        value={newName}
                        onChange={(ev) => setNewName(ev.target.value)}
                    />
                    <button type="submit">
                        <FaRegCheckCircle />
                    </button>
                </FormCreate>
                : <div>
                    <h1>{name}</h1>
                    <IconsBox>
                        <MdDriveFileRenameOutline className="update" onClick={toggleEditing} />
                        <MdDeleteForever className="delete" onClick={toggleDeleting} />
                    </IconsBox>
                </div>}
            <button onClick={navigateToFolder}>
                {
                    deleting ?
                        <>
                            <h2>Do you want to delete?</h2>
                            <DeleteContainer>
                                <FaRegCheckCircle className="confirm" onClick={deleteFolder}/>
                                <FaRegTimesCircle className="deny" onClick={()=>setDeleting(false)}/>
                            </DeleteContainer>
                        </>
                        : <FaFolder className="icon" />
                }
            </button>
        </Box>
    )
}

const Box = styled.div`
    width: 272px;
    height: 272px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    background-color: #EFEFEF;
    border-radius: 10px;
    font-family: 'Montserrat', sans-serif;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

    > div{
        padding: 2px;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    h1{
        width: 150px;
        font-size: 19px;
        font-weight: 500;
        text-align: start;
        color: #5E5E5E;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    h2{
        font-size: 15px;
        font-weight: 400;
        text-align: center;
        color: #5E5E5E;
    }
    > button{
        width: 100%;
        height: 80%;
        border-radius: 10px;
        border: none;
        background-color: #FFFFFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .icon{
        font-size: 75px;
        color: #EFEFEF;
    }

    &:hover{
        background-color: #E6E6E6;
        .icon{
            color: #E6E6E6;
        }
    }
`

const IconsBox = styled.div`
    display: flex;
    gap: 5px;
    .update{
        font-size: 22px;
        cursor: pointer;
    }
    .delete{
        font-size: 22px;
        cursor: pointer;
    }
`

const DeleteContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;

    .confirm{
        font-size: 50px;
        color: green;
    }
    .deny{
        font-size: 50px;
        color: red;
    }
`