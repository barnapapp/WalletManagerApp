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
import {Fragment, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';


function Wallet() {
    const params = useParams();
    const navigate = useNavigate();
    const [wallet, loading, error] = useApi("GET", `/wallet/${params.id}`);
    const [updatedTrans, setUpdatedTrans] = useState(false);
    const [transactions, loadingTran, errorTran] = useApi("POST", `/transactions`, {"wallet_id": params.id, "limit": 50, "cursor": ""}, [updatedTrans]);


    if(loading || loadingTran) return <LinearProgress />

    const deleteWallet = async () => {

        await doApiCall("DELETE", `/wallet/${params.id}`, (data) => {

            console.log(data);
            navigate("/walletlist");
        }, (error) => {

            console.log(error);
        });
    }

    const deleteTransaction = async (id) => {

        await doApiCall("DELETE", `/transaction/${id}`, (data) => {

            console.log(data);
            setUpdatedTrans(prev => !prev);
        }, (error) => {

            console.log(error);
        });
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
                        <AddTransactionModal param_id={params.id} setUpdatedTrans={setUpdatedTrans} change={false} data={{}} />
                    </Grid>
                    <Grid container maxWidth={"lg"} spacing={2} sx={{padding: "1em 1em 1em 1em", marginTop: "2em"}}>
                        {transactions.transactions.map((e, i) => {
                            return (<Fragment key={i}>
                                    <Grid item lg={2}>{e.amount} HUF</Grid>
                                    <Grid item lg={2}>{e.extra.item}</Grid>
                                    <Grid item lg={2}>{e.title}</Grid>
                                    <Grid item lg={2}>{new Date(e.created_at).toLocaleDateString()}</Grid>
                                    <Grid item lg={2} sx={{cursor: "pointer"}}>
                                        <DeleteIcon onClick={() => deleteTransaction(e.id)} />
                                    </Grid>
                                    <Grid item lg={2}><AddTransactionModal param_id={params.id} setUpdatedTrans={setUpdatedTrans} change={true} data={e} /></Grid>
                            </Fragment>)
                        })}
                    </Grid>
                </Grid>
            </Paper>
            <Button onClick={() => navigate("/walletlist")}>Back to Wallet List</Button>
        </Container>
    )
}

export default Wallet;