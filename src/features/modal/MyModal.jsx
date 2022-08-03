import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function MyModal(props) {

    const {
        openModal,
        titleDialog,
        cancelClick,
        children,
    } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleActionClose = () => {
        cancelClick();
    }

    return (
        <Dialog open={openModal} onClose={handleActionClose} fullScreen={fullScreen}>
            <DialogTitle>{titleDialog}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleActionClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    )
}

MyModal.propTypes = {}

export default MyModal