import React from "react";
import {
    Box,
    Button,
    Grid,
    Card,
    MenuItem,
    Typography,
} from "@mui/material";
import { Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import SellingModal from "./UserModal";
const Design = (props) => {
    const { text, dashText, open, openeditModal, setEditModal,setOpen, rows } = props;

    return (
        <Grid
            style={{ paddingBottom: "10px", marginTop: -30 }}
            container
            justifyContent="space-between"
            spacing={3}
        >
            <Grid item>
                <Typography color="textPrimary" variant="h5">
                    {text}
                </Typography>
               
            </Grid>
                <Grid item>
                    <Box sx={{ m: -1 }}>
                    <SellingModal open={open} openeditModal={openeditModal} rows={rows}  setOpen={setOpen} />
                    </Box>
                </Grid>
                {/* <Grid item>
                    <Box sx={{ m: -1 }}>
                    <SellingModal open={openeditModal} rows={rows} setOpen={setEditModal} />
                    </Box>
                </Grid> */}
        </Grid>
    );
};

export default Design;
