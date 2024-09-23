import {Button, Container, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import TemplateFormikField from "../components/TemplateFormikField";
import {useState} from "react";
import {TextField} from "formik-mui";
import {Form, Formik} from "formik";
import {doApiCall} from "../hooks/useApi";
import addWallet from "../screens/AddWallet";

function AddTransactionModal({param_id}) {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const fields = [
        { name: "name", label: "Name", validate: (values) => {}, component: TextField },
        { name: "amount", label: "Amount", validate: (values) => {}, component: TextField }
    ].map((element, index) => ({
        ...element,
        id: index
    }));


    const createTransaction = async (values) => {

        await doApiCall("PUT", "/transactions", (res) => {

            console.log(res);
        }, (error) => {

            console.log(error);
        }, {"wallet_id": param_id, "title": values.name, "amount": values.amount});
    };

    return (
        <Container>
            <Button variant={"outlined"} onClick={handleOpen}>Add</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Add Transaction
                </DialogTitle>
                <DialogContent>
                    <Formik initialValues={{name: '', amount: ''}} onSubmit={async (values, actions) => {

                        actions.setSubmitting(true);
                        await createTransaction(values);
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
                                <Button type={"submit"} variant={"contained"} size={"medium"}>Add</Button>
                            </Stack>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

export default AddTransactionModal;