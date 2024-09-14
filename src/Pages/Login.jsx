import {Container, Stack, Button, Modal, Typography, Box} from "@mui/material";
import {Field, Form, Formik} from 'formik';
import { TextField } from 'formik-mui';
import {useState} from "react";
import Registration from "./Registration";
import TemplateFormikField from "../Components/TemplateFormikField";


function Login() {

    const [open, setOpen] = useState(false);
    const fields = [
        { username: "email", label: "Email", validate: (values) => {}, component: TextField },
        { username: "password", label: "Password", validate: (values) => {}, component: TextField },
    ].map((element, index) => ({
        ...element,
        id: index
    }));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 4,
        p: 4,
        maxHeight: "40em"
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const formValidate = (values) => {

        if(!values.username && !values.email && !values.password && !values.repassword) return;
        return {};
    }

    return (
      <Container sx={{width: "35em"}}>
          <Formik initialValues={{username: '', email: '', password: '', repassword: ''}}
                  validate={formValidate}
                  onSubmit={(values, actions) => {

                      actions.setSubmitting(true);
                      setTimeout(() => {

                          actions.setSubmitting(false);
                          console.log(values);
                      }, 2000);
                  }}
          >
            <Form>
                <Stack spacing={2} maxWidth={"sm"} sx={{ margin: "7em auto" }}>
                    {fields.map(e => {
                        return <TemplateFormikField key={e.id} fieldName={e.username}
                                                    labelName={e.label}
                                                    validate={e.validate}
                                                    component={e.component}
                        />
                    })}
                    <Typography sx={{cursor: "pointer"}} variant={"h8"} onClick={handleOpen}>If you have no account, sign up here.</Typography>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <Registration />
                        </Box>
                    </Modal>
                    <Button type={"submit"} variant={"contained"} size={"medium"}>Login</Button>
                </Stack>
            </Form>
          </Formik>
      </Container>
    );
}

export default Login;