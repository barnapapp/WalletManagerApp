import './App.css';
import {Button, Container, Grid, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Login from "./screens/Login";
import WalletList from "./screens/WalletList";
import AddWallet from "./screens/AddWallet";
import Wallet from "./screens/Wallet";
import Screen404 from "./screens/Screen404";

function App() {

  return (
        <Container sx={{marginTop: "1em"}}>
            <Grid container>
                <Grid item xs={10}><Typography variant="h4" align={"center"} sx={{marginLeft: "4em"}}>Wallet</Typography></Grid>
                <Grid item xs={2}><Button variant={"outlined"} sx={{float: "right"}}>Login</Button></Grid>
            </Grid>
            <Routes>
                <Route path={"/"} element={<Login />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/walletlist"} element={<WalletList />} />
                <Route path={"/addwallet"} element={<AddWallet />} />
                <Route path={"/wallet/:id"} element={<Wallet />} />
                <Route path={"*"} element={<Screen404 />} />
            </Routes>
        </Container>
  );
}

export default App;
