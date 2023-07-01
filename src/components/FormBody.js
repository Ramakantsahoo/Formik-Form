import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    TextareaAutosize,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    gender: Yup.string().required('Gender is required'),
    hobbies: Yup.array().min(1, 'Please select at least one hobby'),
});

const countries = [
    { label: 'USA', value: 'usa' },
    { label: 'Canada', value: 'canada' },
    { label: 'UK', value: 'uk' },
    { label: 'India', value: 'India' },
];

const hobbiesOptions = [
    { label: 'Reading', value: 'reading' },
    { label: 'Sports', value: 'sports' },
    { label: 'Cooking', value: 'cooking' },
    { label: 'Music', value: 'music' },
    { label: 'Dancing', value: 'dancing' },
    { label: 'Swimming', value: 'swimming' },
];

const FormBody = () => {
    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <div className="user-form-container">
            <Formik
                initialValues={{
                    name: '',
                    address: '',
                    country: '',
                    gender: '',
                    hobbies: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, errors }) => (
                    <Form className="user-form">
                        <Field
                            as={TextField}
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.name)}
                            helperText={<ErrorMessage name="name" />}
                        />

                        <Field
                            as={TextareaAutosize}
                            rows={4}
                            placeholder="Address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.address)}
                            helperText={<ErrorMessage name="address" />}
                            className="text-area"
                        />

                        <FormControl error={Boolean(errors.country)}>
                            <InputLabel>Country</InputLabel>
                            <Field
                                as={Select}
                                name="country"
                                value={values.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                {countries.map((country) => (
                                    <MenuItem key={country.value} value={country.value}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Field>
                            <ErrorMessage name="country" component="div" className="error" />
                        </FormControl>

                        <FormControl error={Boolean(errors.gender)}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <Field
                                as={RadioGroup}
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                    className='gender'
                                />
                            </Field>
                            <ErrorMessage name="gender" component="div" className="error" />
                        </FormControl>

                        <FormControl error={Boolean(errors.hobbies)}>
                            <InputLabel className='hobbies'>Hobbies/Interests</InputLabel>
                            <Field
                                as={Autocomplete}
                                multiple
                                options={hobbiesOptions}
                                getOptionLabel={(option) => option.label}
                                getOptionSelected={(option, value) => option.value === value}
                                name="hobbies"
                                value={values.hobbies}
                                onChange={(_, value) => {
                                    handleChange({ target: { name: 'hobbies', value } });
                                }}
                                onBlur={handleBlur}
                                renderInput={(params) => (
                                    <TextField {...params} variant="standard" />
                                )}
                            />
                            <ErrorMessage name="hobbies" component="div" className="error" />
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormBody;