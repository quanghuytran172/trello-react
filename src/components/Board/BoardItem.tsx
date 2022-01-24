import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface BoardProps {
    board: {
        imageURL: String;
        name: String;
    };
    linkTo: String;
}

const BoardLink = styled(Link)`
    display: inline-block;
    width: 100%;
    height: 90px;
    .image-overlay {
        background-image: url("https://media.istockphoto.com/photos/capitol-in-washington-dc-with-police-fence-picture-id1297919069");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100%;
        border-radius: 3px;

        &:hover {
            opacity: 0.7;
        }

        h3 {
            font-weight: bold;
            padding: 4px 0 0 6px;
            color: #fff;
        }
    }
`;

const BoardItem = (props: BoardProps) => {
    return (
        <BoardLink to={`${props.linkTo}`}>
            <div
                className='image-overlay'
                style={{ backgroundImage: `url(${props.board.imageURL})` }}
            >
                <h3>{props.board.name}</h3>
            </div>
        </BoardLink>
    );
};

export default BoardItem;
