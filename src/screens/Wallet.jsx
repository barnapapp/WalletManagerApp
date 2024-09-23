import {
    Button,
    Container,
    Grid, LinearProgress,
    Paper,
    Typography
} from "@mui/material";
import AddTransactionModal from "../modals/AddTransactionModal";
import {useNavigate, useParams} from "react-router-dom";
import useApi, {doApiCall} from "../hooks/useApi";

function Wallet() {
    const params = useParams();
    const navigate = useNavigate();
    const [wallet, loading, error] = useApi("GET", `/wallet/${params.id}`);

    if(loading) return <LinearProgress />

    const deleteWallet = async () => {

        await doApiCall("DELETE", `/wallet/${params.id}`, (data) => {

            console.log(data);
            navigate("/walletlist");
        }, (error) => {

            console.log(error);
        })
    }

    return (
        <Container>
            <Paper sx={{marginTop: "3em", padding: "1em 1em 1em 1em"}}>
                <Grid container maxWidth={"lg"} spacing={2}>
                    <Grid item lg={4}>
                        <Typography variant={"h2"}>{wallet.name}</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography variant={"h4"}>Balance {wallet.extra.money} HUF</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Button variant={"outlined"} sx={{marginRight: "0.4em"}} onClick={() => navigate(`/editwallet/${params.id}`)}>Edit</Button>
                        <Button variant={"outlined"} onClick={deleteWallet}>Delete</Button>
                    </Grid>
                    <Grid item lg={12}>
                        <Typography variant={"body1"}>
                            {wallet.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{marginTop: "3em", padding: "1em 1em 1em 1em"}}>
                <Grid container maxWidth={"lg"} spacing={2}>
                    <Grid item lg={7.62}>
                        <Typography variant={"h8"}>Transactions</Typography>
                    </Grid>
                    <Grid item lg={3.38}>
                        <AddTransactionModal param_id={params.id} />
                    </Grid>
                    <Grid container maxWidth={"lg"} spacing={2} sx={{padding: "1em 1em 1em 1em"}}>
                        <Grid item lg={2}>5000 Ft</Grid>
                        <Grid item lg={2}>Dinner</Grid>
                        <Grid item lg={2}>Magdi</Grid>
                        <Grid item lg={2}>2024.08.12</Grid>
                        <Grid item lg={4}>
                            <Button variant={"outlined"} sx={{marginRight: "0.4em"}}>Delete</Button>
                            <Button variant={"outlined"}>Edit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Button onClick={() => navigate("/walletlist")}>Back to Wallet List</Button>
        </Container>
    )
}

export default Wallet;