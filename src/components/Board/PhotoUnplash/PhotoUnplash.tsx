import React from "react";
import styled from "styled-components";

type Photo = {
    id: number;
    width: number;
    height: number;
    urls: { large: string; regular: string; full: string; small: string };
    color: string | null;
    user: {
        username: string;
        name: string;
    };
};

const PhotoItem = styled.img`
    display: inline-block;
    height: 96px;
    object-fit: cover;
    border-radius: 8px;
    width: calc(50% - 8px);
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`;

const PhotoUnplash: React.FC<{
    photo: Photo;
    updateImage: any;
    currentBoard: any;
}> = ({ photo, updateImage, currentBoard }) => {
    const { urls } = photo;

    return (
        <PhotoItem
            src={urls.regular}
            alt=''
            onClick={() => {
                updateImage(currentBoard, urls.full);
            }}
        ></PhotoItem>
    );
};

export default PhotoUnplash;
