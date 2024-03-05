import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const example = [
    { name: 'lucas' },
    { name: 'pessoal' },
    { name: 'arquivos' }
];

export default function FolderCard() {
    const [showSubFolders, setShowSubFolders] = useState(false);

    const handleMouseEnter = () => {
        setShowSubFolders(true);
    };

    const handleMouseLeave = () => {
        setShowSubFolders(false);
    };

    return (
        <>
        <Card
            className="open"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <IoIosArrowForward className="icon" />
            Others folders
        </Card>
        {showSubFolders && (
            <SubFolders>
                {example.map((subFolder, index) => (
                    <div key={index}>
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
    background: #3f5efb;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    padding: 0 10px;
    margin-top: 10px;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s ease;

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
    background: #fc466b;
    border-radius: 0 0 20px 20px;
    padding: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    transition: height 1s ease;

    .sub-icon {
        margin-right: 5px;
    }

    div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }
`;
