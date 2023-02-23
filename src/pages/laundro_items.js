import * as React from "react";
import { Tabs, Tab } from "@mui/material";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
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
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [openSignings, setoOenSignings] = React.useState(false);
  const [data, setData] = useState();
  const [change, setChange] = useState(0);
  const [signings, setSignings] = useState();
  const [Quantity, setQuantity] = useState(0);
  var location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  var config = (url, method, data) => {
    return {
      method: method,
      maxBodyLength: Infinity,
      url: `https://su-bitspilani.org/su/signings-api/${url}`,
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
        setData(response.data.laundro);
      })
      .catch(function (error) {
        navigate("/Laundromat-Frontend");
      });

    axios(config("get_laundro_siginigs", "get")).then(function (response) {
      console.log(response.data.laundro_signings);
      setSignings(response.data.laundro_signings);
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
    console.log(data);
    axios(config("add_laundro_siginigs", "post", data))
      .then(function (response) {
        console.log(response.data);
        setChange(!change);
      })
      .catch(function (error) {
        toast.error(error);
        console.log(error);
      });
  };
  const handleUpdateSignings = (idx) => {
    var data = new FormData();
    data.append("email", signings[idx].email);
    data.append("item_name", signings[idx].event_name);
    data.append(
      "quantity_delivered",
      parseInt(signings[idx].qunatity_delivered) + parseInt(Quantity)
    );
    data.append("amount", signings[idx].amount);
    console.log(data);
    var config_ = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://su-bitspilani.org/su/signings-api/update_laundro_siginigs`,
      headers: {
        "x-authorization":
          "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
        "x-origin": "826bead8ad2ad9ce955028045788f371",
        "X-COORD-ID":
          "gAAAAABj9471--XTq5BHHEujzLsB8iB_nf9uMgTtBghPlR1vqW1FVGyNpAm3Rt_C4zG4Njhmr_uClqq5GznLgTkP5F8giELkkNAVrHMIgdBkIq8F3i4zlujgiEBsFlWxztyIDsJ68JdI",
      },
      data: data,
    };
    console.log(config_);
    axios(config_)
      .then(function (response) {
        console.log(response.data);
        setChange(!change);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  const handleDeleteSignings = (idx) => {
    console.log(signings[idx]);

    var data = new FormData();
    data.append("email", signings[idx].email);
    data.append("item_name", signings[idx].event_name);

    var config_ = {
      method: "post",
      url: "https://su-bitspilani.org/su/signings-api/delete_laundro_signings",
      headers: {
        "x-authorization":
          "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
        "x-origin": "826bead8ad2ad9ce955028045788f371",
        "X-COORD-ID":
          "gAAAAABj9471--XTq5BHHEujzLsB8iB_nf9uMgTtBghPlR1vqW1FVGyNpAm3Rt_C4zG4Njhmr_uClqq5GznLgTkP5F8giELkkNAVrHMIgdBkIq8F3i4zlujgiEBsFlWxztyIDsJ68JdI",
      },
      data: data,
    };
    axios(config_).then(function (response) {
      console.log(response.data);
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
    data.append("event_date", data_l.date);

    axios(config("add_laundro", "post", data)).then(function (response) {
      console.log(response.data);
      setOpen(false);
      setChange(!change);
    });
  };
  const submitLaundro = () => {
    setOpen(false);
  };
  

  return (
    <Box sx={{ p: 1 }}>
      <h1>Laundromat CMS</h1>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Laundro" {...a11yProps(0)} />
          <Tab label="Signings" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
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
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {/* <th style={{ width: "40%" }}>Column width (40%)</th> */}
                  <TableCell>Plan name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>event_date</TableCell>
                  <TableCell>cancellation_end</TableCell>
                  {/* <th>Status</th> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ? data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.event_date}</TableCell>
                        <TableCell>{row.cancellation_end}</TableCell>
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
                  <FormLabel>event_date</FormLabel>
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
      <TabPanel value={value} index={1}>
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
            {/* <Button variant="outlined">Update Signings</Button> */}
            {/* <Button variant="outlined">Delete Signings</Button> */}
          </Box>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {/* <th style={{ width: "40%" }}>Column width (40%)</th> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Event Date</TableCell>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Quantity delivered</TableCell>
                  <TableCell />
                  <TableCell />
                  {/* <th>Status</th> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {signings
                  ? signings.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.event_date}</TableCell>
                        <TableCell>{row.event_name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.qunatity_delivered}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                handleUpdateSignings(idx);
                              }}
                              sx={{ mx: 1 }}
                            >
                              Update Signing
                            </Button>
                            <TextField
                              id="outlined-basic"
                              label="Quantity Delivered"
                              variant="outlined"
                              onChange={(e) => {
                                setQuantity(e.target.value);
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              handleDeleteSignings(idx);
                            }}
                          >
                            Delete Signing
                          </Button>
                        </TableCell>

                        {/* <td>{row.status}</td> */}
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
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
            <FormControl sx={{ m: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <FormLabel>Plan Name</FormLabel>
              <Input type="text" name="item_name" />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" name="quantity" />
            </FormControl>
            <Button type="submit" fullWidth>
              submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
