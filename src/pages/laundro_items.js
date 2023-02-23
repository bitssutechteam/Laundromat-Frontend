import * as React from "react";
import { Tabs, Tab } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/joy/Button";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
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
  const [data, setData] = useState();
  const [signings, setSignings] = useState();

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
        console.log(error);
      });

    axios(config("get_laundro_siginigs", "get")).then(function (response) {
      console.log(response.data.laundro_signings);
      setSignings(response.data.laundro_signings);
    });
  }, [token]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLaundro = (data_l) => {
    setOpen(true);
    var data = new FormData();
    data.append("name", data_l.name);
    data.append("price", data_l.price);
    data.append("cancellation_date", data_l.cancellation);
    data.append("description", data_l.description);
    data.append("event_venue", data_l.venue);
    data.append("event_date", data_l.date);

    axios(config("add_laundro", "post", data)).then(function (response) {
      console.log(response.data);
    });
  };
  const submitLaundro = () => {
     setOpen(false);
  }
  return (
    <Box sx={{ mt: 3, p: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Signings" {...a11yProps(0)} />
          <Tab label="Laundro" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box variant="outlined" color="neutral">
          <Box>
            <Button variant="outlined" onClick={handleLaundro}>
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
              <FormControl variant="standard" sx={{ m: 2 }}>
                <InputLabel htmlFor="component-simple">Name</InputLabel>
                <Input id="component-simple" />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 2 }}>
                <InputLabel htmlFor="component-simple">Price</InputLabel>
                <Input id="component-simple" />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 2 }}>
                <InputLabel htmlFor="component-simple">
                  cancellation_date
                </InputLabel>
                <Input id="component-simple" />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 2 }}>
                <InputLabel htmlFor="component-simple">description</InputLabel>
                <Input id="component-simple" />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 2 }}>
                <InputLabel htmlFor="component-simple">date</InputLabel>
                <Input id="component-simple" />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>submit</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box variant="outlined" color="neutral">
          <Box>
            <Button variant="outlined">Create Signings</Button>
            <Button variant="outlined">Update Signings</Button>
            <Button variant="outlined">Delete Signings</Button>
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
                  {/* <th>Status</th> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {signings
                  ? signings.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.event_date}</TableCell>
                        <TableCell>{row.event_name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.qunatity_delivered}</TableCell>
                        {/* <td>{row.status}</td> */}
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
    </Box>
  );
}
