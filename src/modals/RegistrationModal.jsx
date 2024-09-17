import {TextField} from "formik-mui";
import TemplateFormikField from "../components/TemplateFormikField";
import {Button, Container, Dialog, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import {useState} from "react";


function Registration() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fields = [
        { username: "regemail", label: "Email", validate: (values) => {}, component: TextField },
        { username: "regpassword", label: "Password", validate: (values) => {}, component: TextField },
        { username: "regpasagaing", label: "RePassword", validate: (values) => {}, component: TextField }
    ].map((element, index) => ({
        ...element,
        id: index
    }));

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
                    <Stack spacing={2} maxWidth={"sm"} sx={{width: "19em"}}>
                        {fields.map(e => {
                            return <TemplateFormikField key={e.id} fieldName={e.username}
                                                    labelName={e.label}
                                                    validate={e.validate}
                                                    component={e.component}
                            />
                        })}
                        <Button type={"submit"} variant={"contained"} size={"medium"}>Registration</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

export default Registration;