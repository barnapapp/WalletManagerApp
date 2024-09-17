import {
    Button,
    Chip,
    Container,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import TextField from '@mui/material/TextField';

function AddWallet() {


    return(
        <Container>
            <Paper sx={{marginTop: "5em", minHeight: "32em"}}>
                <Grid container maxWidth={"lg"} spacing={2}>
                    <Grid item lg={6} align={"center"}>Create/Edit Wallet</Grid>
                    <Grid item lg={6} align={"center"}>
                        Shared With: <Chip onClick={() => {}} onDelete={() => {}} variant={"outlined"} label={"hmm"} /> <Chip onClick={() => {}} onDelete={() => {}} variant={"outlined"} label={"fiam"} />
                    </Grid>
                    <Grid item lg={6} align={"center"}>
                        <Grid container maxWidth={"lg"} spacing={2}>
                            <Grid item lg={12}>
                                <TextField variant={"outlined"} label={"Name"} sx={{width: "20em"}} />
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    multiline
                                    minRows={4}
                                    sx={{width: "20em"}}
                                    label={"Description"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} align={"center"}>
                        <Paper sx={{minHeight: "12em"}}>
                            <TextField variant={"outlined"} label={"User"}/>
                            <Grid container maxWidth={"lg"} sx={{marginTop: "1em"}}>
                                <Grid item lg={6}>
                                    <Typography variant={"h6"}>Magdi</Typography>
                                </Grid>
                                <Grid item lg={6}>
                                    <Button variant={"outlined"}>+</Button>
                                </Grid>
                                <Grid item lg={6}>
                                    <Typography variant={"h6"}>Magdi</Typography>
                                </Grid>
                                <Grid item lg={6}>
                                    <Button variant={"outlined"}>+</Button>
                                </Grid>
                                <Grid item lg={6}>
                                    <Typography variant={"h6"}>Magdi</Typography>
                                </Grid>
                                <Grid item lg={6}>
                                    <Button variant={"outlined"}>+</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item lg={12} align={"center"}>
                        <Button variant={"contained"} sx={{marginTop: "5em", width: "20em"}}>Add/Modify Wallet</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default AddWallet;