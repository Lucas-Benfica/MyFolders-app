import styled from "styled-components";
import AddFolderBox from "./AddFolderBox";
import FolderBox from "./FolderBox";
import Title from "./Title";
import { useEffect, useState } from "react";


export default function FoldersContainer({folderInfo}) {

    const [folder, setFolder] = useState();

    useEffect(()=>{
        //console.log("id");
    },[folderInfo]);

    return (
            <Container>
                <Title />
                <div>
                    <AddFolderBox />
                    <FolderBox />
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
