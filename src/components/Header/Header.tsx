import styled from "styled-components";
import { RootState, useAppDispatch } from "../../app/store";
import { Link } from "react-router-dom";
import { Dropdown, Menu as AntMenu, MenuProps } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useSelector } from "react-redux";
import LogoGif from "../../assets/img/logo.gif";
import {
    AppstoreOutlined,
    BellOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { signOut } from "../../app/auth/AuthSlice";

interface StyleProps {
    background?: string;
}
const Menu: React.FunctionComponent<MenuProps> = styled(AntMenu)`
    width: 304px;
    .editMenuItem {
        cursor: default;
    }
    .menu__header {
        color: #5e6c84;

        text-align: center;
    }

    .menu__info {
        display: flex;
        gap: 10px;
        align-items: center;
        &-content {
            div {
                color: #172b4d;
            }
            span {
                font-size: 9pt;
                color: #b3bac5;
            }
        }
    }
`;

const HeaderComponent = styled.header`
    max-height: 44px;
    padding: 6px 4px;
    background-color: rgba(0, 0, 0, 0.45);
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.background-main {
        background-color: #026aa7;
    }
`;
const HeaderTSide = styled.div`
    height: 32px;
    display: flex;
    align-items: center;
    gap: 5px;
    a {
        color: white;
        &:hover {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
        }
        span {
            font-size: 15px;
            padding: 8px;
        }
    }
    .search {
        margin-left: 4px;
    }
    img {
        cursor: pointer;
    }
    ul {
        width: 304px;
        .menu__header {
            color: #5e6c84;

            text-align: center;
        }

        .menu__info {
            display: flex;
            gap: 10px;
            padding: 5px 12px;
            &-content {
                div {
                    color: #172b4d;
                }
                span {
                    font-size: 9pt;
                    color: #b3bac5;
                }
            }
        }
    }
`;

const LogoContainer = styled.div`
    height: 32px;
    padding: 0 6px;
    display: flex;
    align-items: center;
`;
const LogoImg = styled.div<StyleProps>`
    width: 80px;
    height: 15px;
    padding: 8px 0;
    background-image: url(${(props) => props.background});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

const Header = ({ isBoardPage }: any) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(signOut({}));
    };
    const SubMenu = (
        <Menu>
            <AntMenu.Item key={1} className='editMenuItem'>
                <div className='menu__header' key={1}>
                    Account
                </div>
            </AntMenu.Item>

            <AntMenu.Divider />

            <AntMenu.Item key={2} className='editMenuItem'>
                <div className='menu__info' key={2}>
                    <Avatar size='large' src={user.photoURL} />

                    <div className='menu__info-content'>
                        <div>{user.displayName}</div>
                        <span>{user.email}</span>
                    </div>
                </div>
            </AntMenu.Item>

            <AntMenu.Divider />

            <AntMenu.Item onClick={handleLogout} key={3}>
                Log out
            </AntMenu.Item>
        </Menu>
    );
    return (
        <HeaderComponent className={isBoardPage && "background-main"}>
            <HeaderTSide>
                <Link to='/'>
                    <AppstoreOutlined />
                </Link>
                <Link to='#'>
                    <HomeOutlined />
                </Link>

                <Link to='#'>
                    <SearchOutlined />
                </Link>
            </HeaderTSide>

            <LogoContainer>
                <LogoImg background={LogoGif} />
            </LogoContainer>
            <HeaderTSide>
                <Link to='#!'>
                    <InfoCircleOutlined />
                </Link>
                <Link to='#!'>
                    <BellOutlined />
                </Link>
                <Dropdown overlay={SubMenu} trigger={["click"]}>
                    <Avatar src={user.photoURL}></Avatar>
                </Dropdown>
            </HeaderTSide>
        </HeaderComponent>
    );
};

export default Header;
