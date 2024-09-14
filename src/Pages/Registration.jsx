import {TextField} from "formik-mui";
import TemplateFormikField from "../Components/TemplateFormikField";
import {Button, Stack} from "@mui/material";


function Registration() {

    const fields = [
        { username: "regemail", label: "Email", validate: (values) => {}, component: TextField },
        { username: "regpassword", label: "Password", validate: (values) => {}, component: TextField },
        { username: "regpasagaing", label: "RePassword", validate: (values) => {}, component: TextField }
    ].map((element, index) => ({
        ...element,
        id: index
    }));

    return(
        <Stack spacing={2} maxWidth={"sm"}>
            {fields.map(e => {
                return <TemplateFormikField key={e.id} fieldName={e.username}
                                            labelName={e.label}
                                            validate={e.validate}
                                            component={e.component}
                />
            })}
            <Button type={"submit"} variant={"contained"} size={"medium"}>Registration</Button>
        </Stack>
    )
};

export default Registration;