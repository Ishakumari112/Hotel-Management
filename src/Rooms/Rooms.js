import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableFooter, TablePagination, TableRow, Paper,
  IconButton, TableHead
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchBar from './Search';

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const theme = useTheme();

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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

// Sample room data
function createRoom(number, type, bed, price, desc, capacity, status) {
  return { number, type, bed, price, desc, capacity, status };
}

const rooms = [
  createRoom(101, 'Deluxe', 'King', 2500, 'Sea view room', 2, 'Available'),
  createRoom(102, 'Standard', 'Queen', 1800, 'Budget-friendly', 2, 'Booked'),
  createRoom(103, 'Suite', 'King', 4000, 'Private balcony', 4, 'Available'),
  createRoom(104, 'Standard', 'Twin', 1700, 'Mountain view', 2, 'Available'),
  createRoom(105, 'Deluxe', 'Queen', 2300, 'City view', 3, 'Booked'),
  createRoom(106, 'Suite', 'King', 4200, 'Luxury suite', 4, 'Available'),
  createRoom(107, 'Standard', 'Twin', 1500, 'Basic amenities', 2, 'Maintenance'),
  createRoom(108, 'Executive', 'Queen', 2700, 'Work desk and lounge access', 2, 'Available'),
  createRoom(109, 'Family Suite', 'Double Queen', 3500, 'Ideal for families, includes kitchenette', 5, 'Booked'),
  createRoom(110, 'Penthouse', 'King', 6000, 'Top floor with panoramic view', 4, 'Available'),

].sort((a, b) => a.number - b.number);

export default function HotelRoomsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rooms.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{pt: 15, px: 4 }}>
    <SearchBar onSearch={handleSearchFunction} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="hotel rooms table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
            <TableCell>Room Number</TableCell>
            <TableCell>Room Type</TableCell>
            <TableCell>Bed Type</TableCell>
            <TableCell>Price/Night</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rooms
          ).map((room) => (
            <TableRow key={room.number}>
              <TableCell>{room.number}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>{room.bed}</TableCell>
              <TableCell>₹{room.price}</TableCell>
              <TableCell>{room.desc}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.status}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="view" color="info">
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="edit" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={rooms.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Box>
  );
}
