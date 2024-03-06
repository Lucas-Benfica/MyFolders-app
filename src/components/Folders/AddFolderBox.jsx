import styled from "styled-components"
import { FaFolderPlus } from "react-icons/fa6"
import { FaRegCheckCircle } from "react-icons/fa";
import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import refreshTokenHelper from "../../helpers/refreshTokenHelper";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddFolderBox({ adding, setAdding }) {
    const { access, refresh, signUp } = useAuth();
    const { id } = useParams();

    const [newFolder, setNewFolder] = useState("");
    const [disabled, setDisabled] = useState(false);

    async function submitNewFolder(ev) {
        ev.preventDefault();
        setDisabled(true);

        try {
            const token = await refreshTokenHelper(access, refresh, signUp);

            const response = await api.postDirectories({
                user: 0,
                name: newFolder,
                parent: id ? Number(id) : null
            }, token);

            toast.success('Folder created successfully', { position: 'top-right' });
            setNewFolder('');
            setAdding(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to create folder', { position: 'top-right' });
        } finally {
            setDisabled(false);
        }
    }


    if (adding) {
        return (
            <Box>
                <FormCreate onSubmit={submitNewFolder}>
                    <input
                        type="text"
                        placeholder="Enter the folder name"
                        value={newFolder}
                        disabled={disabled}
                        onChange={(ev) => setNewFolder(ev.target.value)}
                    />
                    <button type="submit" disabled={disabled}>
                        <FaRegCheckCircle />
                    </button>
                </FormCreate>
                <div>
                    <FaFolderPlus className="icon" onClick={() => setAdding(!adding)} />
                </div>
            </Box>
        )
    }

    return (
        <Box onClick={() => setAdding(true)}>
            <h1>Add new folder</h1>
            <div>
                <FaFolderPlus className="icon" />
            </div>
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
    cursor: pointer;

    h1{
        font-size: 17px;
        font-weight: 500;
        text-align: center;
        color: #fc466b;
    }
    div{
        width: 100%;
        height: 80%;
        border-radius: 10px;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon{
        font-size: 75px;
        color: #fc466b;
    }

    &:hover{
        background-color: #E6E6E6;
    }
    @media (max-width: 500px) {
        width: 100%;
        height: 200px;
        padding: 10px 5px 5px;

        div {
            width: 100%;
            height: 70%;
        }
    }
`
export const FormCreate = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
        background: transparent;
        width: 200px;
        padding: 8px;
        border: none;
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.3);
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        letter-spacing: 0.8px;
        color: #5f5f5f;
        outline: none;

        &::placeholder {
            color: #5f5f5f;

        }
    }
    button{
        width: 30px;
        height: 30px;
        font-size: 25px;
        border: none;
        border-radius: 50px;
        background: transparent;
        color: #fc466b;
        cursor: pointer;
    }

    @media (max-width: 500px) {
        input{
            width: 75%;
        }
        button{
            margin-right: 5px;
        }
    }
`;
