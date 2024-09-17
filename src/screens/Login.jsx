import {Container, Stack, Button} from "@mui/material";
import {Form, Formik} from 'formik';
import { TextField } from 'formik-mui';
import TemplateFormikField from "../components/TemplateFormikField";
import RegistrationModal from "../modals/RegistrationModal";


function Login() {


    const fields = [
        { username: "email", label: "Email", validate: (values) => {}, component: TextField },
        { username: "password", label: "Password", validate: (values) => {}, component: TextField },
    ].map((element, index) => ({
        ...element,
        id: index
    }));

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
                    <RegistrationModal />
                    <Button type={"submit"} variant={"contained"} size={"medium"}>Login</Button>
                </Stack>
            </Form>
          </Formik>
      </Container>
    );
}

export default Login;