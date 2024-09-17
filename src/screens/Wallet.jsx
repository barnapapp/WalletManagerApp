import {
    Button,
    Container,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import AddTransactionModal from "../modals/AddTransactionModal";

function Wallet() {

    return (
        <Container>
            <Paper sx={{marginTop: "3em", padding: "1em 1em 1em 1em"}}>
                <Grid container maxWidth={"lg"} spacing={2}>
                    <Grid item lg={4}>
                        <Typography variant={"h8"}>Wallet 1</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography variant={"h8"}>Balance 1000</Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Button variant={"outlined"} sx={{marginRight: "0.4em"}}>Edit</Button>
                        <Button variant={"outlined"}>Delete</Button>
                    </Grid>
                    <Grid item lg={12}>
                        <Typography variant={"body1"}>
                            Desc...
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
                        <AddTransactionModal />
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
        </Container>
    )
}

export default Wallet;