import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function FolderCard(props) {
    const { folder, allFolders } = props;
    const navigate = useNavigate();
    const [subFolders, setSubFolders] = useState(undefined);

    useEffect(() => {
        const subFoldersList = allFolders.filter( f => f.parent === folder.id);
        setSubFolders(subFoldersList);
    }, [allFolders]);

    function navigateToFolder(){
        navigate(`/folders/${folder.id}`);
    }

    const [showSubFolders, setShowSubFolders] = useState(false);
    const handleMouseEnter = () => {
        setShowSubFolders(true);
    };
    const handleMouseLeave = () => {
        setShowSubFolders(false);
    };

    if (!folder) return (<></>);

    return (
        <>
            <Card
                className="open"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={navigateToFolder}
            >
                <IoIosArrowForward className="icon" />
                {folder.name}
            </Card>
            {(showSubFolders && subFolders.length > 0) && (
                <SubFolders>
                    {subFolders.map((subFolder) => (
                        <div key={subFolder.id}>
                            <GoDotFill className="sub-icon" />
                            {subFolder.name}
                        </div>
                    ))}
                </SubFolders>
            )}
        </>
    );
}

export const Card = styled.div`
    width: 100%;
    height: 30px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    background: #073dd3cf;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    padding: 0 10px;
    margin-top: 10px;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s ease;

    background: rgba(255,255,255,0.3);
    border-left: 1px solid rgba(255,255,255,0.3);
    border-top: 1px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(10px);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);

    .icon {
        transition: transform 0.3s ease-in-out;
        margin-right: 5px;
    }

    &:hover {
        .icon {
            transform: rotate(90deg);
        }
        border-radius: 20px 20px 0 0;
        background: #fc466b;
    }
`;

export const SubFolders = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    border-radius: 0 0 20px 20px;
    padding: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    transition: height 1s ease;

    background: rgba(255,255,255,0.3);
    border-left: 1px solid rgba(255,255,255,0.3);
    border-top: 1px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(10px);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);

    .sub-icon {
        margin-right: 5px;
    }

    div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }
`;
