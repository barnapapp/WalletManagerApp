import {Button, Container, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import TemplateFormikField from "../components/TemplateFormikField";
import {useEffect, useState} from "react";
import {TextField} from "formik-mui";
import {Form, Formik} from "formik";
import {doApiCall} from "../hooks/useApi";

function AddTransactionModal({param_id, setUpdatedTrans, change, data}) {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);


    const validateMoneyText = (values) => {

        const regex = /^[0-9]*$/;
        if(!regex.test(values)) return "Please enter only numbers";
    }


    const fields = [
        { name: "name", label: "Name", validate: (values) => {}, component: TextField },
        { name: "item", label: "Item", validate: (values) => {}, component: TextField},
        { name: "amount", label: "Amount", validate: validateMoneyText, component: TextField }
    ].map((element, index) => ({
        ...element,
        id: index
    }));


    const createTransaction = async (values) => {

        await doApiCall("PUT", "/transactions", (res) => {

            console.log(res);
        }, (error) => {

            console.log(error);
        }, {"wallet_id": param_id, "title": values.name, "amount": values.amount, "extra": {"item": values.item}});
    };

    const modifyTransaction = async (values) => {

        //console.log(data)
        //const id = data.filter(e => e.wallet_id === param_id);
        //console.log(id);

        await doApiCall("PATCH", `/transaction/${data.id}`, (res) => {

            console.log(res);
        }, (error) => {

            console.log(error);
        }, {"wallet_id": param_id, "title": values.name, "amount": values.amount, "extra": {"item": values.item}});
    };


    return (
        <Container>
            <Button variant={"outlined"} onClick={handleOpen}>{change ? "Modify": "Add"}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Add Transaction
                </DialogTitle>
                <DialogContent>
                    <Formik initialValues={{name: "", amount: "", item: ""}} onSubmit={async (values, actions) => {

                        actions.setSubmitting(true);
                        if(change) {
                            await modifyTransaction(values);
                        } else {
                            await createTransaction(values);
                        }
                        setUpdatedTrans(prev => !prev);
                        actions.setSubmitting(false);
                        actions.resetForm();
                    }}>
                        <Form>
                            <Stack spacing={2} maxWidth={"sm"} sx={{width: "19em"}}>
                                {fields.map(e => {
                                    return <TemplateFormikField key={e.id} fieldName={e.name}
                                                                labelName={e.label}
                                                                validate={e.validate}
                                                                component={e.component}
                                    />
                                })}
                                <Button type={"submit"} variant={"contained"} size={"medium"}>{change ? "Modify": "Add"}</Button>
                            </Stack>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

export default AddTransactionModal;