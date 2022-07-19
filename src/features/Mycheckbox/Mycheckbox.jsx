import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@mui/material';
import { useField, Field } from 'formik'


function Mycheckbox({ children, ...props }) {
    const [field, meta] = useField({ ...props });
    return (
        <Checkbox
            {...field} {...props}
        />
    )
}

Mycheckbox.propTypes = {}

export default Mycheckbox

