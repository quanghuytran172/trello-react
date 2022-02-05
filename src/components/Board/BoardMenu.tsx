import { Drawer, Modal } from "antd";
import "./BoardMenu.css";
import styled from "styled-components";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Board } from "../../app/types";
import boardApi from "../../api/boardApi";
import { useNavigate } from "react-router-dom";

interface BoardMenuProps {
    visible: boolean;
    setVisible: (value: boolean) => void;
    currentBoard: Board;
}

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

const BoardMenu = (props: BoardMenuProps) => {
    const onClose = () => {
        props.setVisible(false);
    };
    const imageUrl: any = props.currentBoard.imageURL;

    const history = useNavigate();

    const confirm = () => {
        Modal.confirm({
            title: "Are you sure ?",
            icon: <ExclamationCircleOutlined />,
            content: "This board will be deleted",
            okText: "Delete",
            cancelText: "Cancel",
            onOk: async () => {
                if (props.currentBoard.id) {
                    boardApi
                        .deleteBoard(props.currentBoard.id)
                        .then(() => {
                            history("/");
                        })
                        .catch((error) => alert(error));
                }
            },
        });
    };
    return (
        <>
            <Drawer
                title='Menu'
                placement='right'
                onClose={onClose}
                visible={props.visible}
                contentWrapperStyle={{ top: "44px" }}
                maskStyle={{ backgroundColor: "unset" }}
            >
                <DrawerContent>
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
            </Drawer>
        </>
    );
};

export default BoardMenu;
