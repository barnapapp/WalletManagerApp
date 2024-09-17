import {
    Button, ButtonGroup, Card, CardActions, CardContent, CardMedia,
    Container, Fab,
    Grid, Paper, Typography
} from "@mui/material";
import OneWallet from "../components/OneWallet";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";

function WalletList() {

    const navigate = useNavigate();

    return (
        <Container>
            <Grid spacing={2} container maxWidth={"lg"}>
                <Grid item lg={12} align={"center"} sx={{marginTop: "3em", marginBottom: "3em"}}>
                    <ButtonGroup size={"large"} variant={"text"}>
                        <Button>Own Wallets</Button>
                        <Button>Shared Wallets</Button>
                    </ButtonGroup>
                </Grid>
                <OneWallet />
                <OneWallet />
                <OneWallet />
                <OneWallet />
                <OneWallet />
                <Grid item lg={12} align={"right"} sx={{marginTop: "3em"}}>
                    <Fab color={"secondary"} onClick={() => navigate("/addwallet")}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
        </Container>
    )
}

export default WalletList;