import styled from "styled-components"
import Header from "../components/Header"

export default function FoldersPage(){
    return (
        <PageContainer>
            <Header />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;

    background-color: #F8FAFD;
`