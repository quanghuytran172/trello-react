import React, { useState } from "react";
import styled from "styled-components";
import CardDetailModal from "../Modals/CardDetailModal";

const CardItem = styled.div`
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 #091e4240;
    cursor: pointer !important;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    position: relative;
    z-index: 0;
    padding: 5px 5px 5px 10px;
    margin: 0 5px 10px 5px;
    font-weight: 400;
    &:hover {
        background-color: #f4f5f7;
    }
`;

const CardName = styled.div``;
const Card = ({ card, columnName }: any) => {
    const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
    return (
        <>
            <CardItem
                onClick={() => {
                    setIsCardDetailOpen(true);
                }}
            >
                {card.name}
            </CardItem>
            <CardDetailModal
                card={card}
                columnName={columnName}
                isCardDetailOpen={isCardDetailOpen}
                setIsCardDetailOpen={setIsCardDetailOpen}
            />
        </>
    );
};

export default Card;
