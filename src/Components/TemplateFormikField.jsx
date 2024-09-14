import {Field} from "formik";

const TemplateFormikField = ({fieldName, labelName, validate, component}) => {

    return (
        <Field variant={'standard'} required name={fieldName} label={labelName} validate={validate} component={component} />
    );
};

export default TemplateFormikField;