import {Button, ButtonGroup, Container, Fab, Grid, LinearProgress} from "@mui/material";
import OneWallet from "../components/OneWallet";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import useWallets from "../hooks/useWallets";

function WalletList() {
    const navigate = useNavigate();
    const [wallets, listOwnWallets, listSharedWallets, loading] = useWallets();

    if(loading) return <LinearProgress />

    return (
        <Container>
            <Grid spacing={2} container maxWidth={"lg"}>
                <Grid item lg={12} align={"center"} sx={{marginTop: "3em", marginBottom: "3em"}}>
                    <ButtonGroup size={"large"} variant={"text"}>
                        <Button onClick={listOwnWallets}>Own Wallets</Button>
                        <Button onClick={listSharedWallets}>Shared Wallets</Button>
                    </ButtonGroup>
                </Grid>
                {wallets.map((e, i) => {
                    return <OneWallet key={i} name={e.name} desc={e.description} sharedWallets={[...e.access]} money={e.extra.money} id={e.id}/>
                })}
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