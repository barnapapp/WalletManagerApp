import {
    Button,
    Chip,
    Container, FormControl,
    Grid, InputLabel, LinearProgress, MenuItem,
    Paper, Select,
    Typography
} from "@mui/material";
import {TextField} from 'formik-mui';
import {Fragment, useCallback, useEffect, useState} from "react";
import useApi, {doApiCall} from "../hooks/useApi";
import {Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import useWallet from "../hooks/useWallet";

function AddWallet() {
    const params = useParams();
    const navigate = useNavigate();
    const [setCurrentWalletId, userSearch, name, money, desc, users, loading, funcReference, wallets, loadingWallet, currentSharedWallets, deleteSharedWallet, sharedWalletToUser, searchUser] = useWallet(params.id);


    if(loading || loadingWallet) {
        return <LinearProgress />
    }



    const validateUserText = (value) => {

        const foundedElement = users.users.filter(e => e.name === value);
        if(foundedElement.length <= 0 && value !== "") return "This user does not exist";
    }

    const validateMoneyText = (value) => {

        const regex = /^[0-9]*$/;

        if(!regex.test(value)) return "Please enter only numbers";
    }

    return(
        <Container>
            <Paper sx={{marginTop: "5em", minHeight: "32em"}}>
                <Grid container maxWidth={"lg"} spacing={2}>
                    <Grid item lg={6} align={"center"}>Create/Edit Wallet</Grid>
                    <Grid item lg={6} align={"center"}>
                    Shared With:
                    {currentSharedWallets.map((e, i) => {
                        return <Chip key={i} variant={"outlined"} label={e.name} onDelete={async () => {await deleteSharedWallet(e.id)}}/>
                    })}
                    </Grid>
                    <Grid item lg={6} align={"center"}>
                            <Formik initialValues={{name: name, money: money, desc: desc}} onSubmit={async (values, actions) => {

                                actions.setSubmitting(true);
                                //await createWallet(values);
                                await funcReference(values);
                                actions.setSubmitting(false);
                                actions.resetForm();
                            }}>
                                <Form>
                                    <Grid container maxWidth={"lg"} spacing={2}>
                                        <Grid item lg={12}>
                                            <Field variant={"outlined"} label={"Name"} sx={{width: "20em"}} name={"name"} component={TextField}/>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Field variant={"outlined"} label={"Money"} validate={validateMoneyText} sx={{width: "20em"}} name={"money"} component={TextField}/>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Field multiline
                                                   minRows={4}
                                                   sx={{width: "20em"}}
                                                   label={"Description"}
                                                   name={"desc"}
                                                   component={TextField}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button type={"submit"}>Create / Edit Wallet</Button>
                                </Form>
                            </Formik>
                    </Grid>
                    <Grid item lg={6} align={"center"}>
                        <Paper sx={{minHeight: "12em"}}>
                            <Formik initialValues={{user: "", option: ""}} onSubmit={async (values, actions) => {

                                actions.setSubmitting(false);
                                await searchUser(values.user);
                            }}>
                                {({values, setFieldValue}) => (
                                    <Form>
                                        <FormControl>
                                        <InputLabel id="select-label">Wallets</InputLabel>
                                        <Field as={Select} label={"Option"} name={"option"} onChange={(event) => {

                                            const selectedValue = event.target.value;

                                            if(selectedValue !== "" && selectedValue !== undefined) {
                                                setCurrentWalletId(selectedValue);
                                            }
                                            setFieldValue("option", selectedValue)
                                        }} value={values.option} sx={{margin: "0.3em", width: "13em", height: "3em"}}>
                                            <MenuItem value={""}><em>None</em></MenuItem>
                                            {wallets.map((e, index) => {
                                                return <MenuItem key={index} value={e.id}>{e.name}</MenuItem>
                                            })}
                                        </Field>
                                        </FormControl>
                                        <Field variant={"standard"} label={"User"} name={"user"} validate={validateUserText} component={TextField}/>
                                        <Button variant={"text"} type={"submit"} sx={{marginTop: "0.6em"}}>Search</Button>
                                    </Form>
                                )}
                            </Formik>
                            <Grid container maxWidth={"lg"} sx={{marginTop: "1em"}}>
                                {userSearch === "" ? users?.users?.map((userp, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Grid item lg={6}>
                                                <Typography variant={"h8"}>{userp.name}</Typography>
                                            </Grid>
                                            <Grid item lg={6} sx={{padding: "0.2em"}}>
                                                <Button variant={"text"} size={"small"} onClick={() => sharedWalletToUser(userp.id)}>+</Button>
                                            </Grid>
                                        </Fragment>
                                    )
                                }):
                                    <>
                                        <Grid item lg={6}>
                                            <Typography variant={"h8"}>{userSearch.name}</Typography>
                                        </Grid>
                                        <Grid item lg={6} sx={{padding: "0.2em"}}>
                                            <Button variant={"text"} size={"small"} onClick={() => sharedWalletToUser(userSearch.id)}>+</Button>
                                        </Grid>
                                    </>
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
            <Button onClick={() => navigate("/walletlist")}>Back to the List</Button>
        </Container>
    )
}

export default AddWallet;