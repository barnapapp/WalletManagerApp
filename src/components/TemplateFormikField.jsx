import {Field} from "formik";

const TemplateFormikField = ({fieldName, labelName, validate, component}) => {

    if(labelName === "Password") return <Field variant={'standard'} type={"password"} required name={fieldName} label={labelName} validate={validate} component={component} />

    return (
        <Field variant={'standard'} required name={fieldName} label={labelName} validate={validate} component={component} />
    );
};

export default TemplateFormikField;