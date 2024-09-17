import {Button, Container, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import TemplateFormikField from "../components/TemplateFormikField";
import {useState} from "react";
import {TextField} from "formik-mui";
import {Form, Formik} from "formik";

function AddTransactionModal() {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const fields = [
        { name: "Name", label: "Name", validate: (values) => {}, component: TextField },
        { name: "Amount", label: "Amount", validate: (values) => {}, component: TextField }
    ].map((element, index) => ({
        ...element,
        id: index
    }));

    return (
        <Container>
            <Button variant={"outlined"} onClick={handleOpen}>Add</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Add Transaciton
                </DialogTitle>
                <DialogContent>
                    <Formik initialValues={{name: '', amount: ''}}>
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