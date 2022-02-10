import React from "react";
import styled from "styled-components";

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
`;

const CardName = styled.div``;
const Card = ({ card }: any) => {
    return <CardItem>{card.name}</CardItem>;
};

export default Card;
