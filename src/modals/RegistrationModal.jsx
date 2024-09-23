import {TextField} from "formik-mui";
import TemplateFormikField from "../components/TemplateFormikField";
import {Button, Container, Dialog, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {Form, Formik} from "formik";
import {doApiCall} from "../hooks/useApi";


function Registration() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fields = [
        { name: "name", label: "Name", validate: (value) => {if(value.length < 6) return "Please add min 6 char";}, component: TextField },
        { name: "password", label: "Password", validate: (value) => {if(value.length < 6) return "Please add min 6 char";}, component: TextField }
    ].map((element, index) => ({
        ...element,
        id: index
    }));

    const formValidate = (values) => {

        if(!values.name && !values.password) return "Please fill all input fields";
        return {};
    }

    return(
        <Container>
            <Typography sx={{cursor: "pointer"}} variant={"h8"} onClick={handleOpen}>If you have no account, sign up here.</Typography>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Registration
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{name: "", password: ""}}
                        validate={formValidate}
                        onSubmit={(values, actions) => {

                            actions.setSubmitting(true);
                            doApiCall("POST", "/reg", (responseData) => {

                                console.log(responseData);
                                handleClose();
                            }, (apiError) => {

                                console.log(apiError);
                            }, values);
                        }}
                    >
                        <Form>
                            <Stack spacing={2} maxWidth={"sm"} sx={{width: "19em"}}>
                                {fields.map(e => {
                                    return <TemplateFormikField key={e.id} fieldName={e.name}
                                                                labelName={e.label}
                                                                validate={e.validate}
                                                                component={e.component}
                                    />
                                })}
                                <Button type={"submit"} variant={"contained"} size={"medium"}>Registration</Button>
                            </Stack>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

export default Registration;