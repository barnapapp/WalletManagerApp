import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";

const RootRoutes = () => {
    //const wallets = useWallets();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/registration",
            element: <Registration />
        },
/*     {
                 path: "/walletlist",
                 element: <WalletList />
             },
             {
                 path: "/wallet:walletId",
                 element: <Wallet />,
                 loader: ({params}) => {

                     const wallet = wallets.list.find(wallet => wallet.id === params.walletId);

                     if (!wallet) {
                         return redirect('/');
                     }

                     return wallet;
                 }
             },
             {
                 path: "*",
                 element: <NotFoundScreen />
             }*/
    ]);

    return <RouterProvider router={router} />
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootRoutes />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
