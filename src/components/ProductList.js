import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchProducts } from "../api";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { Grid,Box } from "@mui/material"; // Ensure you are importing from @mui/material

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All"); // default category is All
  const { data: products = [] } = useQuery(
    "products",
    fetchProducts
  );
 
  // Filter products based on search term and category
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || product.category === category)
  );


  return (
    <>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3,mt:3 }}>
        {/* Search bar with some margin */}
        <SearchBar setSearchTerm={setSearchTerm} sx={{ width: '75%' }} />

        {/* Filter dropdown */}
        <Filter setCategory={setCategory} sx={{ width: '25%' }} />
      </Box>
      {/* Grid layout for products */}
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
