import {useCallback, useEffect, useState} from "react";

// https://cold-lake-feb0.hmm9hdwnkz.workers.dev
// https://hidden-fog-722f.hmm9hdwnkz.workers.dev
const BASE_URL = 'https://hidden-fog-722f.hmm9hdwnkz.workers.dev';
let authToken = false;

export const setApiToken = (newToken) => authToken = newToken;

export const doApiCall = async (method, uri, onSuccess, onFailure = false, data = undefined) => {

    const token = authToken !== false ? `Bearer ${authToken}` : "";

    const options = {
        method: method,
        headers: {
            'Authorization': token
        }
    }

    if(method === "POST" || method === "PUT" || method === "PATCH") {

        options.body = JSON.stringify(data);
        options.headers = {'Authorization': token, "Content-Type": "application/json"};
    }

    await fetch(`${BASE_URL}${uri}`, options).then((res) => {

        if(!res.ok) {
            console.log("Request is unsuccessfull");
            throw new Error(`Request failed with status ${res.status}`);
        }

        return res.json();
    }).then((data) => {

        onSuccess(data);
    }).catch((err) => {

        console.log(err);
        if(!onFailure) return;

        onFailure(err);
    });
}

function useApi(method, uri, postData = undefined, deps = []) {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const apiCallCallBack = useCallback(async (apiPostData) => {

        await doApiCall(method, uri, (responseData) => {

            setData(responseData);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {

            setError(errorMessage);
            setData(false);
            setLoading(false);
        }, apiPostData);
    }, [method, setData, setError, setLoading, uri]);

    useEffect(() => {
        apiCallCallBack(postData);
    }, [apiCallCallBack, JSON.stringify(postData), ...deps]);

    return [data, loading, error, apiCallCallBack];
}

export default useApi;