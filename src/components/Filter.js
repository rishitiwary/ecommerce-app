import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const Filter = ({ setCategory }) => {
  const categories = ["All", "women's clothing", "men's clothing", "electronics", "jewelery"];

  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        defaultValue="All"
        onChange={(e) => setCategory(e.target.value)}
        label="Category"
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
