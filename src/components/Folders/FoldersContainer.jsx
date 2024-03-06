import styled from "styled-components";
import AddFolderBox from "./AddFolderBox";
import FolderBox from "./FolderBox";
import Title from "./Title";


export default function FoldersContainer() {
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
