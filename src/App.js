import './App.css';
import {Button, Container, Grid, Typography} from "@mui/material";
import Login from "./Pages/Login";

function App() {

  return (
    <Container sx={{marginTop: "1em"}}>
        <Grid container>
            <Grid item xs={10}><Typography variant="h4" align={"center"} sx={{marginLeft: "4em"}}>Wallet</Typography></Grid>
            <Grid item xs={2}><Button variant={"outlined"} sx={{float: "right"}}>Login</Button></Grid>
        </Grid>
        <Login />
    </Container>
  );
}

export default App;
