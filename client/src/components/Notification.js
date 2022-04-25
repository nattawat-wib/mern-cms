import { useState, useEffect } from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

export const NotifySnackbar = prop => {
    const [notify, setNotify] = useState(prop.notify);

    useEffect(() => { setNotify(prop.notify) }, [prop])

    return (
        <Snackbar 
            onClose={() => { setNotify({ ...notify, is_open: false }) }} 
            autoHideDuration={5000} 
            open={notify.is_open} 
            anchorOrigin={{ horizontal: "center", vertical: "top" }} >

            <Alert onClose={() => { setNotify({ ...notify, is_open: false }) }} severity={notify.status || "info"}>
                {
                    notify.title ? <AlertTitle> <b> {notify.status.toUpperCase()} </b> </AlertTitle> : ""
                }
                {notify.message}
            </Alert>

        </Snackbar>
    )
}