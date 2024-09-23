import {Container, Stack, Button} from "@mui/material";
import {Form, Formik} from 'formik';
import { TextField } from 'formik-mui';
import TemplateFormikField from "../components/TemplateFormikField";
import RegistrationModal from "../modals/RegistrationModal";
import {useAuth} from "../hooks/useAuth";
import {doApiCall} from "../hooks/useApi";
import {useNavigate} from "react-router-dom";


function Login() {
    const { handleLoginResult } = useAuth();
    const navigate = useNavigate();

    const fields = [
        { name: "name", label: "Name", validate: (value) => {if(value.length <= 6) return "Please add min 6 char"}, component: TextField },
        { name: "password", label: "Password", validate: (value) => {if(value.length <= 6) return "Please add min 6 char"}, component: TextField },
    ].map((element, index) => ({
        ...element,
        id: index
    }));

    const formValidate = (values) => {

        if(!values.name && !values.password) return;
        return {};
    }

    return (
      <Container sx={{width: "35em"}}>
          <Formik initialValues={{name: '', password: ''}}
                  validate={formValidate}
                  onSubmit={async (values, actions) => {

                      actions.setSubmitting(true);
                      await doApiCall("POST", '/login', (data) => {

                          handleLoginResult(data);
                          actions.setSubmitting(false);
                          navigate("/walletlist");
                      }, (apiError) => {

                         actions.setFieldError('password', apiError.toString());
                         actions.setSubmitting(false);
                      }, values);
                  }}
          >
            <Form>
                <Stack spacing={2} maxWidth={"sm"} sx={{ margin: "7em auto" }}>
                    {fields.map(e => {
                        return <TemplateFormikField key={e.id} fieldName={e.name}
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