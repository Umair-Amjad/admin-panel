import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

// import Dialog from "../feereport/FeeReport";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const sortOptions = [
  {
    label: "Newest first",
    value: "createdAt|desc",
  },
  {
    label: "Oldest first",
    value: "createdAt|asc",
  },
];



const applyFilters = (invoices, query, filters) =>
  invoices.filter((invoice) => {
    let matches = true;

    if (query) {
      const properties = ["name"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (invoice[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    if (filters.status && invoice.status !== filters.status) {
      matches = false;
    }

    return matches;
  });

const applyPagination = (invoices, page, limit) =>
  invoices.slice(page * limit, page * limit + limit);

const UserList = (props) => {
  const { invoices, refresh, setRefresh,open, setOpen ,setuserData, ...other } = props;
  //   console.log("invoices", invoices);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    status: null,
  });

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSelectAllInvoices = (event) => {
    // console.log("1",event.target.checked);
    setSelectedInvoices(
      event.target.checked ? invoices.map((invoice) => invoice.id) : []
    );
  };

  const removeHandler = () => {
    const text = confirm(`Are You Sure You Want to Delete `);

    if (text == true) {
      // let idstring = "";
      // selectedInvoices.forEach((e) => {
      //   idstring = e + "," + idstring;
      // });
      // idstring = idstring.slice(0, -1);
      // const obj = {
      //   id: idstring,
      // };
      // console.log(idstring, obj, selectedInvoices)
    //   customAxios()
      axios.delete(`http://localhost:5001/deletes/many`, { data: selectedInvoices })
        .then((res) => {
          res.data.json;
          setRefresh(!refresh);
          setSelectedInvoices([]);
        });
    } else {
      setSelectedInvoices([...selectedInvoices]);
    }
  };


const handleEdit=(id,name,email,Phone,password,work)=>{
  console.log(id, name, email, Phone, password, work)
  const data = {id:id, name:name, email:email, Phone:Phone, passowrd:password, work:work}
  setuserData(data)
  setOpen(!open)
}





  const handleSelectOneInvoice = (event, invoiceId) => {
    // console.log("2", invoiceId);
    if (!selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices((prevSelected) => [...prevSelected, invoiceId]);
    } else {
      setSelectedInvoices((prevSelected) =>
        prevSelected.filter((id) => id !== invoiceId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredInvoices = applyFilters(invoices, query, filters);
  const paginatedInvoices = applyPagination(filteredInvoices, page, limit);
  const enableBulkActions = selectedInvoices.length > 0;
  const selectedSomeInvoices =
    selectedInvoices.length > 0 && selectedInvoices.length < invoices.length;
  const selectedAllInvoices = selectedInvoices.length === invoices.length;

  return (
    <Card {...other}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          m: -1,
          p: 2,
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 500,
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  {/* <SearchIcon fontSize="small" /> */}
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            placeholder="Search invoices by Student Name"
            value={query}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 240,
          }}
        >
          <TextField
            fullWidth
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
      {enableBulkActions && (
        <Box sx={{ position: "relative" }}>
          <Stack direction="row">
            <Box
              sx={{
                backgroundColor: "background.paper",
                mt: "6px",
                position: "absolute",
                px: "4px",
                width: "100%",
                zIndex: 2,
              }}
            >
              <Checkbox
                checked={selectedAllInvoices}
                color="primary"
                indeterminate={selectedSomeInvoices}
                onChange={handleSelectAllInvoices}
              />

              <Button
                color="primary"
                sx={{ ml: 2 }}
                variant="outlined"
                onClick={removeHandler}
              >
                Delete
              </Button>
              <Button color="primary" sx={{ ml: 2 }} variant="outlined">
                Edit
              </Button>
            </Box>
          </Stack>
        </Box>
      )}

      {/* <Scrollbar> */}
        <Box sx={{ minWidth: 1200 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllInvoices}
                    color="primary"
                    indeterminate={selectedSomeInvoices}
                    onChange={handleSelectAllInvoices}
                  />
                </StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Mobile</StyledTableCell>
                <StyledTableCell>E-mail</StyledTableCell>
                <StyledTableCell>Roll</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
                {/* <TableCell>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.map((invoice) => {
                const isInvoiceSelected = selectedInvoices.includes(invoice._id);
                // console.log("inv", isInvoiceSelected);
                // if (invoice.id == "") {
                //   {
                //     ("data not found");
                //   }
                // } else {
                return (
                  <TableRow hover key={invoice._id} selected={isInvoiceSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isInvoiceSelected}
                        color="primary"
                        onChange={(event) =>
                          handleSelectOneInvoice(event, invoice._id)
                        }
                        value={isInvoiceSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        color="textPrimary"
                        component={RouterLink}
                        to="#"
                        underline="none"
                        variant="subtitle2"
                      >
                        {invoice.name}
                      </Link>
                      <Typography color="textSecondary" variant="body2">
                        {invoice.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{invoice.Phone}</TableCell>
                    {/* <TableCell>{getStatusLabel(invoice.status)}</TableCell> */}

                    <TableCell>{invoice.email}</TableCell>
                    <TableCell>{invoice.work}</TableCell>
                    <TableCell> <Stack direction="row" spacing={2}>
                     
                      <Button onClick={() => (handleEdit(invoice._id, invoice.name, invoice.email, invoice.Phone,invoice.password, invoice.work))} variant="contained" endIcon={<SendIcon />}>
                        Send
                      </Button>
                    </Stack>
                    
                    </TableCell>
                    {/* <TableRow>
                      <IconButton
                        title="Edit Item"
                        component={RouterLink}
                        to="./TransportForm"
                        state={{ ...invoice }}
                      >
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </TableRow> */}
                  </TableRow>
                );
                // }
              })}
            </TableBody>
          </Table>
        </Box>
      {/* </Scrollbar> */}
      <TablePagination
        component="div"
        count={filteredInvoices.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserList.propTypes = {
  invoices: PropTypes.array.isRequired,
};

export default UserList;
