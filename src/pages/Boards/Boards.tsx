import React from "react";
import Header from "../../components/Header/Header";
import { auth } from "../../firebase/config";
import { useNavigate, useLocation } from "react-router-dom";

// const [name, domain] = email.split(/(?<=^.+)@(?=[^@]+$)/);

const Boards: React.FC = () => {
    const history = useNavigate();
    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
    };
    const pathName = usePathname();
    if (pathName === "/") {
        history("/");
    }
    // const dispatch = useAppDispatch();

    // const handleSignOut = () => {
    //     auth.signOut()
    //         .then(() => {
    //             dispatch(signOut({}));
    //         })
    //         .catch((err) => alert(err.message));
    // };

    return (
        <div>
            {/* <button onClick={handleSignOut}>Sign out</button> */}
            <Header />
        </div>
    );
};

export default Boards;
