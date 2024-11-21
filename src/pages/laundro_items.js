import * as React from "react";
import { Tabs, Tab } from "@mui/material";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Table from "@mui/material/Table";
import Grid from '@mui/material/Grid';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Snackbar from "@mui/joy/Snackbar";
import Link from "@mui/joy/Link";
import CircularProgress from "@mui/joy/CircularProgress";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as XLSX from "xlsx";


import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  Input,
  TableFooter,
  TablePagination,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
 export default function LaundroItems() {
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState();
  const [idxData, setIdxData] = React.useState();
  const [openSignings, setoOenSignings] = React.useState(false);
  const [openUpdateSignings, setOpenUpdateSignings] = React.useState(false);
  const [data, setData] = useState();
  const [change, setChange] = useState(0);
  const [signings, setSignings] = useState();
  const [OGsignings, setOGSignings] = useState();
  const [Quantity, setQuantity] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [SearchQuery, setSearchQuery] = React.useState();
  const [SearchQueryValue, setSearchQueryValue] = React.useState("");
  const [snackbarData, setSnackbarData] = React.useState();
 
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  var config = (url, method, data) => {
    return {
      method: method,
      maxBodyLength: Infinity,
      // url: `https://su-bitspilani.org/su/signings-api/${url}`,
      url: `https://onetap.su-bitspilani.org/su/signings-api/${url}`,
      headers: {
        "x-authorization":
          "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
        "x-origin": "826bead8ad2ad9ce955028045788f371",
        "X-COORD-ID": token,
      },
      data: data,
    };
  };

  React.useEffect(() => {
    axios(config("list_laundro_items", "get"))
      .then(function (response) {
        setData(response.data.data.packages);
      })
      .catch(function (error) {
        navigate("/Laundromat-Frontend");
      });

    axios(config("get_laundro_siginigs", "get")).then(function (response) {
      setSignings(
        response.data.data.signings.map((signing) => ({
          ...signing,
          get name() {
            return this.student.profile.name;
          },
          get email_id() {
            return this.student.profile.email;
          },
          get bid() {
            return this.student.profile.bits_id;
          },
        }))
      );
      setOGSignings(response.data.data.signings);
    });
  }, [token, change]);
 
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 

  const handleCreateSignings = (data_s) => {
    var data = new FormData();
    data.append("email", data_s.email);
    data.append("item_name", data_s.item_name);
    data.append("quantity", data_s.quantity);
    axios(config("add_laundro_siginigs", "post", data))
      .then(function (response) {
        setSnackbarData(response.data.message);
        setOpen_snackbar(true);

        // console.log(response.data);
        setChange(!change);
      })
      .catch(function (error) {
        toast.error(error);
        console.log(error);
      });
  };




  const handleUpdateSignings = (data_) => {
    var data = new FormData();
    data.append("email", data_.email);
    data.append("item_name", data_.item_name);
    data.append("new_item_name", data_.new_item_name);
    data.append("quantity", data_.quantity);
    data.append("quantity_delivered", data_.qunatity_delivered);
    data.append("amount", data_.amount);
    data.append("is_delivered", data_.is_delivered);
    data.append("laundro_billed", data_.laundro_billed);
    console.log(data_);

    var config_ = {
      method: "post",
      maxBodyLength: Infinity,
      // url: `https://su-bitspilani.org/su/signings-api/update_laundro_siginigs`,
      url: `https://onetap.su-bitspilani.org/su/signings-api/update_laundro_siginigs`,
      headers: {
        "x-authorization":
          "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
        "x-origin": "826bead8ad2ad9ce955028045788f371",
        "X-COORD-ID": token,
      },
      data: data,
    };
    // console.log(config_);
    axios(config_)
      .then(function (response) {
        console.log(response.data);
        setSnackbarData(response.data.message);
        setOpen_snackbar(true);
        setChange(!change);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  const handleDeleteSignings = (idxData) => {
    console.log(idxData);

    var data = new FormData();
    console.log(idxData.event_name);
    data.append("email", idxData.student.profile.email);
    data.append("item_name", idxData.event_name);

    var config_ = {
      method: "post",
      // url: "https://su-bitspilani.org/su/signings-api/delete_laundro_signings",
      url: "https://onetap.su-bitspilani.org/su/signings-api/delete_laundro_signings",
      headers: {
        "x-authorization":
          "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
        "x-origin": "826bead8ad2ad9ce955028045788f371",
        "X-COORD-ID": token,
      },
      data: data,
    };
    axios(config_).then(function (response) {
      console.log(response.data);
      setSnackbarData(response.data.message);
      setOpen_snackbar(true);
      setChange(!change);
    });
  };

  const handleLaundro = (data_l) => {
    setOpen(true);

    var data = new FormData();
    data.append("name", data_l.name);
    data.append("price", data_l.price);
    data.append("cancellation_date", data_l.cancellation);
    data.append("description", data_l.description);
    data.append("event_venue", "");
    data.append("no_of_cycles", 1);
    data.append("signing_date", data_l.date);

    axios(config("add_laundro", "post", data)).then(function (response) {
      console.log(response.data);
      setOpen(false);
      setChange(!change);
    });
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = OGsignings.filter((row) => {
      return (
        row.student.profile.email
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        row.student.profile.name
          .toLowerCase()
          .includes(searchedVal.toLowerCase())
      );
    });
    setSignings(filteredRows);
  };

  const cancelSearch = () => {
    setSearchQuery("");
    setSignings(OGsignings);
  };

  const [open_snackbar, setOpen_snackbar] = React.useState(false);

  return (
    <Box sx={{ px: 2, my: 2 }}>
      <Snackbar
        autoHideDuration={4000}
        open={open_snackbar}
        variant="soft"
        color="neutral"
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen_snackbar(false);
        }}
      >
        {snackbarData ? snackbarData : "Something went wrong"}
      </Snackbar>

      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ mr: 3 }}>
          <h2>Laundromat CMS</h2>
        </Box>

        <TextField
          id="outlined-basic"
          label="Search Email ID/Name Sigings"
          variant="outlined"
          value={SearchQueryValue}
          onChange={(newValue) => {
            setSearchQueryValue(newValue.target.value);
            requestSearch(newValue.target.value);
            newValue.target.value === "" && cancelSearch();
          }}
          sx={{ flexGrow: 1 }}
          InputProps={{
            endAdornment: (
              <Button
                onClick={() => {
                  setSearchQueryValue("");
                  cancelSearch();
                }}
                className="materialBtn"
              >
                Clear
              </Button>
            ),
          }}
        />

        <Button
          variant="soft"
          color="danger"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          sx={{ ml: 3 }}
        >
          Sign Out
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "text.primary" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          stripe="odd"
        >
          <Tab label="Signings" {...a11yProps(1)} />
          <Tab label="Laundro" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={1}>
        <Box variant="outlined" color="neutral">
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                handleLaundro();
                location.reload();
              }}
            >
              Create Laundros
            </Button>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} size="lg" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {/* <th style={{ width: "40%" }}>Column width (40%)</th> */}
                  <TableCell>Plan name</TableCell>
                  {/* <TableCell>Type</TableCell> */}
                  <TableCell>Price</TableCell>
                  {/* <TableCell>signing_date</TableCell>
                  <TableCell>cancellation_end</TableCell> */}
                  {/* <th>Status</th> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ? data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        {/* <TableCell>{row.type}</TableCell> */}
                        <TableCell>{row.price}</TableCell>
                        {/* <TableCell>
                          {new Date(row.signing_date).toString()}
                        </TableCell>
                        <TableCell>
                          {new Date(row.cancellation_date).toString()}
                        </TableCell> */}
                        {/* <td>{row.status}</td> */}
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Laundro</DialogTitle>
            <DialogContent>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    name: formElements.plan.value,
                    price: formElements.price.value,
                    cancellation: formElements.cancel_date.value,
                    description: formElements.desc.value,
                    date: formElements.date.value,
                  };
                  console.log(data);
                  handleLaundro(data);
                  // handleLogin(data);
                }}
              >
                <FormControl sx={{ m: 1 }}>
                  <FormLabel>Plan Name</FormLabel>
                  <Input type="text" name="plan" />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <FormLabel>Price</FormLabel>
                  <Input type="number" name="price" />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <FormLabel>cancellation_date</FormLabel>
                  <Input type="date" name="cancel_date" />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <FormLabel>description</FormLabel>
                  <Input type="text" name="desc" />
                </FormControl>

                <FormControl sx={{ m: 1 }}>
                  <FormLabel>signing_date</FormLabel>
                  <Input type="date" name="date" />
                </FormControl>
                {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  name="persistent"
                />
                <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
                  Forgot password
                </Link>
              </Box> */}
                <Button type="submit" fullWidth>
                  submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <Signings
          setoOenSignings={setoOenSignings}
          signings={signings}
          idx={idx}
          idxData={idxData}
          setIdx={setIdx}
          setIdxData={setIdxData}
          setOpenUpdateSignings={setOpenUpdateSignings}
          handleDeleteSignings={handleDeleteSignings}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          TablePaginationActions={TablePaginationActions}
        />
      </TabPanel>

      <Dialog
        open={openSignings}
        onClose={() => {
          setoOenSignings(false);
        }}
      >
        <DialogTitle>Create Signings</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              console.log();
              const data = {
                email: formElements.email.value,
                item_name: formElements.item_name.value,
                quantity: formElements.quantity.value,
              };
              console.log(data);
              handleCreateSignings(data);
              setoOenSignings(false);
              // handleLogin(data);
            }}
          >
            <FormControl
              sx={{
                width: 250,
                height: 50,
              }}
            >
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            {data && (
              <FormControl sx={{ m: 1 }}>
                <FormLabel>Plan Name</FormLabel>
                {/* <Input type="text" name="item_name" /> */}

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="item_name"
                  sx={{
                    width: 200,
                    height: 50,
                  }}
                >
                  {data.map((laundro) => (
                    <MenuItem value={laundro.name}>{laundro.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" name="quantity" />
            </FormControl>
            <Button type="submit" fullWidth sx={{ mt: 5 }}>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {signings && idxData ? (
        <Dialog
          open={openUpdateSignings}
          onClose={() => {
            setOpenUpdateSignings(false);
          }}
        >
          <DialogTitle>Update Signings</DialogTitle>
          <DialogContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                console.log(formElements);

                var data_ = {
                  email: formElements.email.value,
                  item_name: idxData.event_name,
                  new_item_name: formElements.item_name.value,
                  amount: idxData.quantity, //  major bt
                  qunatity_delivered: formElements.delivered.checked ? 1 : 0,
                  is_delivered:
                    formElements.delivered.checked
                      .toString()
                      .charAt(0)
                      .toUpperCase() +
                    formElements.delivered.checked.toString().slice(1),
                  laundro_billed:
                    formElements.billed.checked
                      .toString()
                      .charAt(0)
                      .toUpperCase() +
                    formElements.billed.checked.toString().slice(1),
                };
                console.log(data_)
                handleUpdateSignings(data_);
                setOpenUpdateSignings(false);
                // handleLogin(data_);
              }}
            >
              {/* <FormControl
                sx={{
                  width: 250,
                  height: 50,
                }}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  defaultValue={idxData.student.profile.email}
                  disabled
                />
                <Box sx={{ my: 1 }}>
                  <FormLabel>Card Given?</FormLabel>
                  {idxData.is_delivered ? (
                    <Checkbox name="delivered" type="checkbox" defaultChecked />
                  ) : (
                    <Checkbox name="delivered" type="checkbox" />
                  )}
                </Box>
                <Box sx={{ my: 2 }}>
                  <FormLabel>Billed?</FormLabel>
                  {idxData.laundro_billed ? (
                    <Checkbox name="billed" type="checkbox" defaultChecked />
                  ) : (
                    <Checkbox name="billed" type="checkbox" />
                  )}
                </Box>
              </FormControl> 
               {data && (
                <FormControl sx={{ m: 1 }}>
                  <FormLabel>Plan Name</FormLabel>
                  <Input type="text" name="item_name" />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={idxData.event_name}
                    name="item_name"
                    sx={{
                      width: 200,
                      height: 50,
                    }}
                  >
                    {data.map((laundro) => (
                      <MenuItem value={laundro.name}>{laundro.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )} */}


              <FormControl
                  sx={{
                    width: 500,
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Email Field */}
                    <Grid item xs={6}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        defaultValue={idxData.student.profile.email}
                        disabled
                        sx={{ width: '100%' }}
                      />
                    </Grid>

                    {/* Plan Name Dropdown */}
                    <Grid item xs={6}>
                      {data && (
                        <FormControl sx={{ width: '100%' }}>
                          <FormLabel>Plan Name</FormLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={idxData.event_name}
                            name="item_name"
                            sx={{
                              width: '100%',
                              height: 40,
                            }}
                          >
                            {data.map((laundro) => (
                              <MenuItem key={laundro.name} value={laundro.name}>
                                {laundro.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {/* Card Given Field */}
                    <Grid item xs={6}>
                      <FormLabel>Card Given?</FormLabel>
                      <Checkbox
                        name="delivered"
                        type="checkbox"
                        defaultChecked={idxData.is_delivered}
                      />
                    </Grid>
                      {/* {console.log(idxData)} */}
                    {/* Billed Field */}
                    <Grid item xs={6}>
                      <FormLabel>Billed?</FormLabel>
                      <Checkbox
                        name="billed"
                        type="checkbox"
                        defaultChecked={idxData.laundro_billed}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              
              {/* <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  name="quantity"
                  defaultValue={idxData.quantity}
                  sx={{
                    width: 200,
                    height: 50,
                  }}
                />
              </FormControl>
              <FormControl sx={{ mx: 2 }}>
                {console.log(idxData)}

                <FormLabel>Quantity Delivered</FormLabel>
                <Input
                  type="number"
                  name="qunatity_delivered"
                  defaultValue={idxData.quantity_delivered}
                  sx={{
                    width: 200,
                    height: 50,
                  }}
                />
              </FormControl> */}
              <DialogActions>
                <Button
                  sx={{ mt: 5 }}
                  variant="outlined"
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </Box>
  );
}

function Tablehead({
  createSortHandler,
  active,
  order,
  tableheadtitle,
  tableheadtitletag,
}) {
  return (
    <TableCell>
      <Link
        underline="none"
        color="neutral"
        component="button"
        onClick={createSortHandler(tableheadtitle)}
        fontWeight="lg"
        // endDecorator={<ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />}
        // sx={{
        //   "& svg": {
        //     transition: "0.2s",
        //     transform:
        //       active && order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
        //   },
        //   "&:hover": { "& svg": { opacity: 1 } },
        // }}
      >
        {tableheadtitletag}
      </Link>
    </TableCell>
  );
}

function Signings({
  setoOenSignings,
  signings,
  idx,
  idxData,
  setIdx,
  setIdxData,
  setOpenUpdateSignings,
  handleDeleteSignings,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  TablePaginationActions,
}) {
  const [open, setOpen] = React.useState(false);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("hostel");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => -descendingComparator(a, b, orderBy)
      : (a, b) => descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };
  const active = orderBy;

  const handleExcelExport = () => {
    //  var config_ = {
    //    method: "post",
    //    maxBodyLength: Infinity,
    //    url: `https://su-bitspilani.org/su/signings-api/update_laundro_siginigs`,
    //    headers: {
    //      "x-authorization":
    //        "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
    //      "x-origin": "826bead8ad2ad9ce955028045788f371",
    //      "X-COORD-ID": token,
    //    },
    //    data: data,
    //  };
    //  console.log(config_);
    //  axios(config_)
    //    .then(function (response) {
    //      console.log(response.data);
    //      setSnackbarData(response.data.message);
    //      setOpen_snackbar(true);
    //      setChange(!change);
    //    })
    //    .catch(function (error) {
    //      console.log(error);
    //      toast.error(error.response.data.message);
    //    });

    const worksheet = XLSX.utils.json_to_sheet(signings.map(({ email_id, ...rest }) => ({ email_id, ...rest })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "Laundromat_data.xlsx");
  };


  // for the confirmation of Billed all or not
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const token = localStorage.getItem("token");
  const  callApi = async   () => {
  
    var config_ = {
         method: "post",
         maxBodyLength: Infinity,
         url: `https://onetap.su-bitspilani.org/su/signings-api/mark_all_signings_billed`,
         headers: {
           "x-authorization":
             "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
           "x-origin": "826bead8ad2ad9ce955028045788f371",
           "X-COORD-ID": token,
         },
       };
       console.log(config_);
       axios(config_)
         .then(function (response) {
           console.log(response.data);
           window.location.reload();
         })
         .catch(function (error) {
           console.log(error);
           toast.error(error.response.data.message);
         });
  
  }
  const handleBilledAll = () => {
    setOpenConfirmation(true);
  }
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  const handleConfirm = () => {
    callApi(); 
    toast.info("All items have been successfully set to Billed.")
    setOpenConfirmation(false); 
    
  };
//Ends


  return (
    <Box variant="outlined" color="neutral">
      <Box>
        <Button
          variant="outlined"
          onClick={() => {
            setoOenSignings(true);
          }}
        >
          Create Signings
        </Button>
        <Button color="success" onClick={handleExcelExport} variant="outlined">
          Export to Excel
        </Button>
        {/* <Button variant="outlined">Update Signings</Button> */}
        {/* <Button variant="outlined">Delete Signings</Button> */}
        <Button color="warning" onClick={handleBilledAll} variant="outlined">
          Set All to Billed
        </Button>
        <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Change All To Billed?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to set the All to Billed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button
            color="primary"   
            onClick={handleConfirm}
            variant="outlined"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      </Box>
      {signings ? (
        <TableContainer>
          <Table
            sx={{
              minWidth: 650,
            }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {/* <th style={{ width: "40%" }}>Column width (40%)</th> */}
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                {/* <TableCell>Name</TableCell>
                 */}
                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"name"}
                  tableheadtitletag={"Name"}
                />
                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"bid"}
                  tableheadtitletag={"BITS ID"}
                  
                />
                {/* <TableCell>ID</TableCell> */}
                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"hostel"}
                  tableheadtitletag={"Hostel"}
                />
                <Tablehead
                
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"room_no"}
                  tableheadtitletag={"Room No"}
                />

                {/* <TableCell>Room No</TableCell> */}
                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"mobile_no"}
                  tableheadtitletag={"Mobile No."}
                />
                
                

                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"Plan Code"}
                  tableheadtitletag={"Plan Code"}
                />
                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"Qty"}
                  tableheadtitletag={"Qty"}
                />
                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"quantity"}
                  tableheadtitletag={"Amount"}
                />
                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"is_delivered"}
                  tableheadtitletag={"Card Given"}
                />
                <Tablehead
                  createSortHandler={createSortHandler}
                  active={active}
                  order={order}
                  tableheadtitle={"laundro_billed"}
                  tableheadtitletag={"Billed"}
                />
                <TableCell />
                <TableCell />
                {/* <th>Status</th> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {signings
                ? (rowsPerPage > 0
                    ? stableSort(signings, getComparator(order, orderBy)).slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : stableSort(signings, getComparator(order, orderBy))
                  ).map((row, idx) => (
                    
                    <TableRow key={idx}>
                      {/* {console.log(row)} */}
                      <TableCell>
                        {new Date(row.signing_date).toISOString().split("T")[0]}
                      </TableCell>
                      <TableCell>
                        {new Date(row.signing_date).toLocaleTimeString("en-US")}
                      </TableCell>
                      <TableCell>{row.student.profile.name}</TableCell>
                      {/* <TableCell>{row.student.profile.email}</TableCell> */}
                      {/* <TableCell>{row.student.profile.id}</TableCell> */}
                      <TableCell
                      >{row.student.profile.bits_id}</TableCell>
                      
                      <TableCell>{row.hostel}</TableCell>
                      <TableCell
                      style={{ width: '20px', textAlign: 'center', whiteSpace: 'nowrap' }}>{row.room_no}</TableCell>
                      <TableCell>{row.student.profile.phone_number}</TableCell>
                      <TableCell>{row.event_name}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      {/* <TableCell>{row.quantity_delivered}</TableCell> */}
                      <TableCell>{row.price}</TableCell>
                      <TableCell>
                        {/* {row.is_delivered ? (
                        <Checkbox
                          color="neutral"
                          disabled
                          variant="outlined"
                          defaultChecked
                        />
                      ) : (
                        <Checkbox color="neutral" disabled variant="outlined" />
                      )} */}

                        <Checkbox
                          color="neutral"
                          disabled
                          variant="outlined"
                          // value={row.is_delivered ? "checked" : ""}
                          checked={row.is_delivered}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          color="neutral"
                          disabled
                          variant="outlined"
                          checked={row.laundro_billed}
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setIdx(idx);
                              setIdxData(row);
                              setOpenUpdateSignings(true);
                            }}
                          >
                            Update
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setIdxData(row);
                            handleClickOpen();
                          }}
                          color="danger"
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Delete the Student's Signing?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Disagree</Button>
                          <Button
                            color="danger"
                            onClick={() => {
                              handleDeleteSignings(idxData);
                              handleClose();
                            }}
                            variant="outlined"
                          >
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                      {/* <td>{row.status}</td> */}
                    </TableRow>
                  ))
                : null}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    50,
                    100,
                    200,
                    {
                      label: "All",
                      value: -1,
                    },
                  ]}
                  colSpan={3}
                  count={signings ? signings.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ display: "grid", placeItems: "center" }}>
          <Button
            startDecorator={<CircularProgress variant="solid" />}
            variant="soft"
            size="lg"
          >
            Loading…
          </Button>
        </Box>
      )}
    </Box>
  );
}
