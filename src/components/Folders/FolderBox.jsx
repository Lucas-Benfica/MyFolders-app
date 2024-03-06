import styled from "styled-components"
import { FaFolder, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FormCreate } from "./AddFolderBox";


export default function FolderBox() {

    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    function toggleEditing(){
        if(deleting) return;
        setEditing(true)
    }
    function toggleDeleting(){
        if(editing) return;
        setDeleting(true)
    }

    return (
        <Box>
                {editing ?
                    <FormCreate>
                        <input
                            placeholder="Update folder name"
                        />
                        <button>
                            <FaRegCheckCircle />
                        </button>
                    </FormCreate>
                    : <div>
                        <h1>FolderName</h1>
                        <IconsBox>
                            <MdDriveFileRenameOutline className="update" onClick={toggleEditing}/>
                            <MdDeleteForever className="delete" onClick={toggleDeleting}/>
                        </IconsBox>
                    </div>}
            <span>
                {
                    deleting ? 
                    <>
                        <h2>Do you want to delete?</h2>
                        <DeleteContainer>
                            <FaRegCheckCircle className="confirm"/>
                            <FaRegTimesCircle className="deny" />
                        </DeleteContainer>
                    </>
                    : <FaFolder className="icon" />
                }
                
            </span>
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
        text-align: center;
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
    span{
        width: 100%;
        height: 80%;
        border-radius: 10px;
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