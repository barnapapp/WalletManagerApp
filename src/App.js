import './App.css';
import {Button, Container, Grid, Typography} from "@mui/material";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./screens/Login";
import WalletList from "./screens/WalletList";
import AddWallet from "./screens/AddWallet";
import Wallet from "./screens/Wallet";
import Screen404 from "./screens/Screen404";
import {useAuth} from "./hooks/useAuth";


function ProtectedPage({children}) {
    const authData = useAuth();
    if(authData.authToken === false) return <Navigate to={"/"}></Navigate>

    return children;
}


function App() {
    const authData = useAuth();
    const navigate = useNavigate();

    const tmpLogout = () => {

        authData.logout();
        navigate("/");
    }

      return (
            <Container sx={{marginTop: "1em"}}>
                <Grid container>
                    <Grid item xs={10}><Typography variant="h4" align={"center"} sx={{marginLeft: "4em"}}>Wallet</Typography></Grid>
                    {authData.authToken === false ? <Grid item xs={2}><Button variant={"outlined"} sx={{float: "right"}}>Login</Button></Grid> : <Grid item xs={2}><Button variant={"outlined"} sx={{float: "right"}} onClick={tmpLogout}>Logout</Button></Grid>}
                </Grid>
                <Routes>
                    <Route path={"/"} element={<Login />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/walletlist"} element={<ProtectedPage><WalletList /></ProtectedPage>} />
                    <Route path={"/addwallet"} element={<ProtectedPage><AddWallet /></ProtectedPage>} />
                    <Route path={"/editwallet/:id"} element={<ProtectedPage><AddWallet /> </ProtectedPage>} />
                    <Route path={"/wallet/:id"} element={<ProtectedPage><Wallet /></ProtectedPage>} />
                    <Route path={"*"} element={<Screen404 />} />
                </Routes>
            </Container>
      );
}

export default App;
