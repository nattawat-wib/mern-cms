import { useState, useEffect } from "react";
import { Snackbar, Alert, AlertTitle, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export const NotifySnackbar = prop => {
    const { notify, setNotify } = prop

    /*
        == notify should have ==
        { 
            is_open: Boolean
            title: String
            message: String
            status: String ["success", "error", "info"]
        }
    */

    return (
        <Snackbar
            onClose={() => { setNotify({ ...notify, is_open: false }) }}
            autoHideDuration={5000}
            open={notify.is_open}
            anchorOrigin={{ horizontal: "center", vertical: "top" }} >

            <Alert onClose={() => { setNotify({ ...notify, is_open: false }) }} severity={notify.status || "info"}>
                <AlertTitle> <b> {notify.title ? notify.title : notify.status.toUpperCase()} </b> </AlertTitle> 
                {notify.message}
            </Alert>

        </Snackbar>
    )
}

export const NotifyDialog = prop => {
    const { dialog, setDialog, callback } = prop;
    /*
        == dialog should have ==
        { 
            is_open: Boolean
            title: String
            message: String
            data: Object // extend data
        }
    */
    
    return (
        <Dialog open={dialog.is_open}>
            <DialogTitle>
                {dialog.title ? dialog.title : "Are you sure ?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                {dialog.message ? dialog.message : "Are you sure ? this action cannot undo"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialog({ ...dialog, is_open: false })}> CANCEL </Button>
                <Button onClick={callback} color="secondary"> CONFIRM </Button>
            </DialogActions>
        </Dialog>
    )
}