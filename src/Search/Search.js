import React from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ onSearch }) {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ paddingTop: 3, paddingX: 2, maxWidth: 500, margin: '0 auto' }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search Rooms"
        placeholder="Search by room type, status, etc."
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}



