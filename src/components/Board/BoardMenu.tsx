import { Drawer, Modal, Upload, message, Divider } from "antd";
import "./BoardMenu.css";
import styled from "styled-components";
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Board } from "../../app/types";
import boardApi from "../../api/boardApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../app/store";
import { updateBoardImage } from "../../app/boards/BoardSlice";
import { createApi } from "unsplash-js";
import PhotoUnplash from "./PhotoUnplash/PhotoUnplash";

interface BoardMenuProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
    currentBoard: Board;
}

//Api unplash
const api = createApi({
    accessKey: process.env.REACT_APP_ACCESS_KEY_UNSPLASH || "null",
});

const DrawerContent = styled.a`
    display: flex;
    align-items: center;
    padding: 8px 6px;
    border-radius: 3px;
    font-weight: 600;
    color: #172b4d;
    cursor: pointer;
    &:hover {
        background-color: #091e4214;
        color: #091e42;
    }
    span {
        font-size: 20px !important;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .content {
        font-size: 14px;
    }
`;

const ButtonBackToMenu = styled.button`
    all: unset;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 17px;
    opacity: 0.9;
    color: rgba(0, 0, 0, 0.5);
    i {
        font-size: 15px;
    }
    &:hover {
        color: rgba(0, 0, 0, 0.75);
    }
`;

const BackgroundWrapped = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .avatar-uploader {
        width: calc(50% - 8px);
        .ant-upload.ant-upload-select-picture-card {
            width: 100%;
            height: 100%;
            margin: 0;
            border: none;
            background-color: #091e4221;
            border-radius: 8px;
            &:hover {
                background-color: #091e4214;
            }

            img {
                height: 96px;
                object-fit: cover;
                background-color: #091e4221;
                border-radius: 8px;
                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }
`;
const BackgroundSection = styled.button`
    all: unset;
    cursor: pointer;
    height: 96px;
    width: calc(50% - 8px);
    position: relative;
    .image {
        background-image: url("https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg");
        background-size: cover;
        width: 100%;
        height: 100%;
        border-radius: 8px;

        &:hover {
            opacity: 0.7;
        }
    }

    .plus-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &.upload {
    }
`;

const PhotoGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-bottom: 40px;
`;

function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
        message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
}

const BoardMenu = (props: BoardMenuProps) => {
    const [backgroundMenu, setBackgroundMenu] = useState(false);
    const [data, setPhotosResponse] = useState<any>(null);

    const [loading, setLoading] = useState(false);
    const [imageFromUser, setImageFromUser] = useState("");
    const { currentBoard } = props;
    const dispatch = useAppDispatch();
    const imageUrl: any = currentBoard.imageURL;
    const history = useNavigate();

    const confirm = () => {
        Modal.confirm({
            title: "Are you sure ?",
            icon: <ExclamationCircleOutlined />,
            content: "This board will be deleted",
            okText: "Delete",
            cancelText: "Cancel",
            onOk: async () => {
                if (currentBoard.id) {
                    boardApi
                        .deleteBoard(currentBoard.id)
                        .then(() => {
                            history("/");
                        })
                        .catch((error) => alert(error));
                }
            },
        });
    };
    const onClose = () => {
        props.setVisible(false);
        setBackgroundMenu(false);
        setLoading(false);
        setImageFromUser("");
        setPhotosResponse(null);
    };

    const updateImage = (currentBoard: any, imageFromUser: any) => {
        if (currentBoard.id) {
            boardApi
                .updateBoard(currentBoard.id, {
                    imageURL: imageFromUser,
                })
                .then(() => {
                    setLoading(true);
                    dispatch(
                        updateBoardImage({
                            id: currentBoard.boardId,
                            data: imageFromUser,
                        })
                    );
                    setImageFromUser(imageFromUser);
                })
                .catch((err) => {
                    setLoading(false);
                    setImageFromUser("");
                    alert(err);
                });
        }
    };

    const handleChange = (info: any) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response
            getBase64(info.file.originFileObj, (imageFromUser: any) => {
                updateImage(currentBoard, imageFromUser);
            });
        }
    };

    const uploadButton = (
        <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
    );

    const fetchImage = () => {
        api.photos
            .getRandom({ count: 4, collectionIds: ["Ouh8jd8l8Wo"] })
            .then((result: any) => {
                if (result.type === "success") {
                    setPhotosResponse(result);
                }
            })
            .catch(() => {
                console.log("something went wrong!");
            });
    };
    return (
        <>
            <Drawer
                title={!backgroundMenu ? "Menu" : "Change background"}
                placement='right'
                onClose={onClose}
                visible={props.visible}
                contentWrapperStyle={{ top: "44px" }}
                maskStyle={{ backgroundColor: "unset" }}
            >
                {backgroundMenu ? (
                    <>
                        <ButtonBackToMenu
                            onClick={() => setBackgroundMenu(false)}
                        >
                            <i className='fas fa-chevron-left'></i>
                        </ButtonBackToMenu>

                        <BackgroundWrapped>
                            <BackgroundSection onClick={fetchImage}>
                                <div className='image'></div>
                            </BackgroundSection>

                            <Upload
                                name='avatar'
                                listType='picture-card'
                                className='avatar-uploader'
                                showUploadList={false}
                                action='http://localhost:3004/api/v1/images/'
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageFromUser ? (
                                    <img
                                        src={imageFromUser}
                                        alt='avatar'
                                        style={{ width: "100%" }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </BackgroundWrapped>
                        <Divider />

                        {data && (
                            <PhotoGroup>
                                {data.response.map(
                                    (photo: any, index: number) => (
                                        <PhotoUnplash
                                            photo={photo}
                                            updateImage={updateImage}
                                            currentBoard={currentBoard}
                                            key={index}
                                        />
                                    )
                                )}
                            </PhotoGroup>
                        )}
                    </>
                ) : (
                    <>
                        <DrawerContent onClick={() => setBackgroundMenu(true)}>
                            <span>
                                <img src={imageUrl} alt='' />
                            </span>
                            <div className='content'>Change background</div>
                        </DrawerContent>
                        <DrawerContent>
                            <span>
                                <DeleteOutlined />
                            </span>
                            <div className='content' onClick={confirm}>
                                Delete board
                            </div>
                        </DrawerContent>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default BoardMenu;
