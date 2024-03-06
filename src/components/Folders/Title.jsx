import styled from "styled-components";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import refreshTokenHelper from "../../helpers/refreshTokenHelper";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Title({ folderId }) {
    const { access, refresh, signUp } = useAuth();

    const navigate = useNavigate();

    const [info, setInfo] = useState({
        id: 0,
        user: 0,
        name: "There is no folder yet",
        parent: null
    });

    useEffect(() => {
        if (!folderId) return;

        const fetchData = async () => {
            try {
                const token = await refreshTokenHelper(access, refresh, signUp);

                const response = await api.getDirectoryById(folderId, token);
                setInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <TitleFoldersContainer>
            {info.parent && <FaArrowAltCircleUp className="icon" onClick={() => navigate(`/folders/${information.parent}`)} />}

            <h1>{info.name}</h1>
        </TitleFoldersContainer>
    );
}

const TitleFoldersContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    h1{
        font-size: 25px;
        font-weight: 700;
        color: #5E5E5E;
    }
    .icon{
        font-size: 25px;
        color: #5E5E5E;
        cursor: pointer;
    }
`