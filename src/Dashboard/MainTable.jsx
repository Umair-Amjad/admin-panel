import { useState, useEffect, useCallback } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Link,
    Typography,
} from "@mui/material";
import TransportList from "./UserList";

import axios from "axios";

import Header_Design from "./Header_design";


const Transport = () => {
    const { id } = useParams();
    console.log(id)

    const [rows, setrows] = useState([]);
    const [open, setOpen] = useState(false);
    const [openeditModal, setEditModal] = useState(false);
    const [userData,setuserData]=useState({})
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        const User = async () => {
            const data = await axios.get(`http://localhost:5001`);
            setrows(data.data);
        }
        User()
    }, [open, refresh]);


    return (
        <>
            <title>Dashboard: Invoice List | Material Kit Pro</title>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 8,
                }}
            >
                <Container >
                {/* <Box sx={{ paddingLeft: 10, paddingRight: 10 }}> */}
                    <Header_Design
                        rows={userData}
                        open={open}
                        openeditModal={openeditModal}
                        setEditModal={setEditModal}
                        setOpen={setOpen}
                        text="Users"
                    />
                    <Box sx={{ mt: 3 }}>
                        <TransportList
                            setuserData={setuserData}
                            setRefresh={setRefresh}
                            open={openeditModal}
                            setOpen={setEditModal}

                            refresh={refresh}
                            invoices={rows}
                        />
                    </Box>
                {/* </Box> */}
                </Container>
            </Box>
        </>
    );
};

export default Transport;
