import {useCallback, useEffect, useState} from "react";
import useApi, {doApiCall} from "./useApi";
import {useNavigate} from "react-router-dom";

function useWallet(paramId) {

    const [currentWalletId, setCurrentWalletId] = useState();
    const [wallet, setWallet] = useState({name: "", desc: "", money: ""});
    const [walletUpdated, setWalletUpdated] = useState(false);
    const navigate = useNavigate();


    const createWallet = useCallback(async (data) => {

        await doApiCall("PUT", `/wallet`, (res) => {

            console.log(res);
            setWalletUpdated(prev => !prev);
        }, (error) => {

            console.log(error);
        }, {"name": data.name, "description": data.desc, "extra": {"money": data.money}});
    }, []);

    const modifyWallet = useCallback(async (data) => {

        await doApiCall("PATCH", `/wallet/${paramId.id}`, (data) => {

            setWalletUpdated(prev => !prev);
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

                    const tmpObj = {
                        name: data.name,
                        desc: data.description,
                        money: data.extra.money
                    };

                    setWallet(tmpObj);

                    setFuncReference(() => modifyWallet);
                }, (error) => {

                    console.log(error);
                })
            }
        }
    }, []);

    const [wallets, loadingWallet, errorWallet] = useApi("GET", "/wallets", undefined, [walletUpdated]);
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
    }, [currentWalletId]);

    const sharedWalletToUser = useCallback(async (id) => {

        await doApiCall("POST", `/wallet/${currentWalletId}/grant_access`, (res) => {

            setCurrentSharedWallets(res.access);
        }, (err) => {

            console.log(err);
        }, {"user_id": id});
    }, [currentWalletId])



    return [setCurrentWalletId, wallet, funcReference, wallets, loadingWallet, currentSharedWallets, deleteSharedWallet, sharedWalletToUser];
}

export default useWallet;