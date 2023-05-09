import React from "react";
// import CButton from "../../custom/Button";
// import AddSellItem from "../Forms/AddSellItem";
import { Box, Button, Container, Modal } from "@mui/material";
import TransportForm from "./Userform";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    marginTop: 2
};

const SellingModal = ({ open, openeditModal, setOpen, text, rows }) => {
    // console.log("sell",rows);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditModalOpen = () => setEditModal(true);
    const handleEditModalClose = () => setEditModal(false);
    return (
        <>
            <Container >
                <Button
                    onClick={handleOpen}
                    color="primary"
                    // startIcon={<PlusIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                >
                    Add New
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TransportForm rows={rows} setOpen={setOpen} />
                    </Box>
                </Modal>
                <Modal
                    open={openeditModal}
                    onClose={handleEditModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TransportForm rows={rows} setOpen={setOpen} />
                    </Box>
                </Modal>
            </Container>
        </>
    );
};

export default SellingModal;
