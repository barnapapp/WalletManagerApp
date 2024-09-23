import {useCallback, useEffect, useState} from "react";
import useApi, {doApiCall} from "./useApi";
import {useNavigate} from "react-router-dom";

function useWallet(paramId) {

    const [currentWalletId, setCurrentWalletId] = useState();
    const [userSearch, setUserSearch] = useState("");
    const [name, setName] = useState("");
    const [money, setMoney] = useState("");
    const [desc, setDesc] = useState("");
    const [users, loading, error] = useApi("POST", "/user/list", {"prefix": "", limit: "", "cursor": ""});
    const navigate = useNavigate();

    const createWallet = useCallback(async (data) => {

        await doApiCall("PUT", `/wallet`, (res) => {

            console.log(res);
        }, (error) => {

            console.log(error);
        }, {"name": data.name, "description": data.desc, "extra": {"money": data.money}});
    }, []);

    const modifyWallet = useCallback(async (data) => {

        await doApiCall("PATCH", `/wallet/${paramId.id}`, (data) => {

            navigate("/walletlist");
            console.log(data);
        }, (error) => {

            console.log(error);
        }, {"description": data.desc, "extra": {"money": data.money}});
    }, []);

    const [funcReference, setFuncReference] = useState(() => createWallet);
    useEffect(() => {

        if(paramId !== undefined) {
            if(!(Object.keys(paramId).length === 0)) {

                doApiCall("GET", `/wallet/${paramId}`, (data) => {

                    setName(data.name);
                    setDesc(data.description);
                    setMoney(data.extra.money);

                    setFuncReference(() => modifyWallet);
                }, (error) => {

                    console.log(error);
                })
            }
        }
    }, []);

    const [wallets, loadingWallet, errorWallet] = useApi("GET", "/wallets", undefined, [createWallet]);
    const [currentSharedWallets, setCurrentSharedWallets] = useState([]);

    useEffect(() => {

        if(currentWalletId !== undefined) {
            doApiCall("GET", `/wallet/${currentWalletId}`, (data) => {

                setCurrentSharedWallets(data.access);
            }, (error) => {

                console.log(error);
            })
        }
    }, [currentWalletId]);

    const deleteSharedWallet = useCallback(async (id) => {

        await doApiCall("POST", `/wallet/${currentWalletId}/remove_access`, (res) => {

            setCurrentSharedWallets(res.access);
        }, (err) => {

            console.log(err);
        }, {"user_id": id});
    }, []);

    const sharedWalletToUser = useCallback(async (id) => {
        console.log(currentWalletId)
        await doApiCall("POST", `/wallet/${currentWalletId}/grant_access`, (res) => {

            setCurrentSharedWallets(res.access);
        }, (err) => {

            console.log(err);
        }, {"user_id": id});
    }, [])

    const searchUser = useCallback(async (user) => {

        if(user === "") {

            setUserSearch("");
        } else {

            await doApiCall("POST", "/user/search", (response) => {

                if(response !== "" && response !== undefined) {

                    const tmpUser = users.users.filter(e => e.name === user);
                    setUserSearch(tmpUser[0]);
                }
            }, (error) => {

                console.log(error.toString());
            }, {"name": user});
        }
    }, []);


    return [setCurrentWalletId, userSearch, name, money, desc, users, loading, funcReference, wallets, loadingWallet, currentSharedWallets, deleteSharedWallet, sharedWalletToUser, searchUser];
}

export default useWallet;