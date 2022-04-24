import { useState, useEffect } from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

export const NotifySnackbar = prop => {
    const [alert, setAlert] = useState(prop.alert);

    useEffect(() => {
        setAlert(prop.alert)
        console.log("alert", alert);
        console.log("prop.alert", prop.alert);
        
    }, [prop])
    
    return (
        <Snackbar onClose={() => { setAlert({ ...alert, is_open: false }) }} autoHideDuration={5000} open={alert.is_open} anchorOrigin={{ horizontal: "center", vertical: "top" }} >
            <Alert onClose={() => { setAlert({ ...alert, is_open: false }) }} severity={alert.status || "info"}>
                {
                    prop.title ?
                        <AlertTitle> <b> {alert.status.toUpperCase()} </b> </AlertTitle>
                        :
                        ""
                }
                {alert.message}
            </Alert>
        </Snackbar>
    )
}

// export const NotifyDialog = prop => {
//     return (

//     )
// }