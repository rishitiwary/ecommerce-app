import React, { useCallback } from "react";
import { debounce } from "lodash";
import { TextField } from "@mui/material";

const SearchBar = ({ setSearchTerm }) => {
  const handleSearch = useCallback(
    debounce((event) => {
      setSearchTerm(event.target.value);
    }, 300),
    []
  );

  return (
    <TextField
      label="Search products..."
      variant="outlined"
      onChange={handleSearch}
      fullWidth
      sx={{ marginBottom: 2 }}
    />
  );
};

export default SearchBar;
