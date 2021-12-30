import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { tableCellClasses } from "@mui/material/TableCell";
import ItemService from "../../src/service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    maxWidth: 950,
    position: "fixed",
    top: 100,
    left: "250px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },

  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    top: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ListTable = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = () => {
    ItemService.getAllItems()
      .then((response) => {
        console.log("-------------------------", response);
        setItems(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchByItemName = (itemName) => {
    ItemService.getByItemName(itemName)
      .then((response) => {
        console.log("-------Hellooo---------", response.data);

        setSearchData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch", top: "20" },
        }}
        noValidate
        autoComplete="off" // in this file where I am wrong ,, actually sir deko
      >
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          onChange={(e) => searchByItemName(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Item Id</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Item Name
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Price</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                addressid
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              // .filter((item) => {
              //   if ((searchData == "")) {
              //     return searchData;
              //   } else {
              //     if (
              //       item.itemName
              //         .toLowerCase()
              //         .includes(searchData.toLowerCase())
              //     ) {
              //       return item;
              //     }
              //   }
              // })
              .map((row, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.itemId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.itemName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.itemPrice}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {items.address}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default ListTable;
