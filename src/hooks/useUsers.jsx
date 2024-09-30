import {useCallback, useState} from "react";
import useApi, {doApiCall} from "./useApi";

function useUsers() {
    const [userSearch, setUserSearch] = useState("");
    const [users, loading, error] = useApi("POST", "/user/list", {"prefix": "", limit: "", "cursor": ""});

    const searchUser = useCallback(async (user) => {

        if(user === "") {

            setUserSearch("");
        } else {

            await doApiCall("POST", "/user/search", (response) => {

                users.users.map(e => console.log(e));
                if(response !== "" && response !== undefined) {

                    const tmpUser = users.users.filter(e => e.name === user);
                    setUserSearch(tmpUser[0]);
                }
            }, (error) => {

                console.log(error.toString());
            }, {"name": user});
        }
    }, [users.users]);

    return [userSearch, users, loading, searchUser];
}

export default useUsers;