import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./useAuth";
import {doApiCall} from "./useApi";

function useWallets() {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useAuth();


    const listOwnWallets = useCallback(async () => {

        await getWallets();
        setWallets(prev => {

            return prev.filter(e => {

                const filteredAccess = e.access.filter(access => access.id === user.sessionUser.id);

                return filteredAccess.length === 1 && e.access.length === 1;
            })
        })
    }, [user.sessionUser.id]);

    const listSharedWallets = useCallback(async () => {

        await getWallets();
        setWallets(prev => {

            return prev.filter(e => {

                const filteredAccess = e.access.some(access => access.id !== user.sessionUser.id);
                return filteredAccess
            })
        })
    }, [user.sessionUser.id]);

    const getWallets = async () => {

        await doApiCall("GET", "/wallets", (res) => {

            setWallets(res);
            setLoading(false);
        }, (err) => {

            setLoading(false);
            console.log(err);
        });
    }

    useEffect(() => {

        listOwnWallets();
    }, []);

    return [wallets, listOwnWallets, listSharedWallets, loading]
}

export default useWallets;