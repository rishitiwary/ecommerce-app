import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../auth/firebaseConfig';
import { toast } from 'react-toastify';
import { TextField, Button, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    const productCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productCollection);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Formik setup for product form
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      price: '',
      imageUrl: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      category: Yup.string().required('Category is required'),
      price: Yup.number().required('Price is required').positive('Price must be a positive number'),
      imageUrl: Yup.string().url('Invalid URL format').required('Image URL is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (editingProduct) {
          await updateDoc(doc(db, 'products', editingProduct.id), values);
          toast.success('Product updated successfully');
        } else {
          await addDoc(collection(db, 'products'), values);
          toast.success('Product added successfully');
        }
        formik.resetForm();
        setEditingProduct(null);
        fetchProducts();
      } catch (error) {
        toast.error('Error saving product');
      }
    },
  });

  // Edit product handler
  const handleEdit = (product) => {
    setEditingProduct(product);
    formik.setValues({
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  // Delete product handler
  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div className="admin-dashboard">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <form onSubmit={formik.handleSubmit} className="product-form">
        <Typography variant="h6">{editingProduct ? 'Edit Product' : 'Add New Product'}</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
              helperText={formik.touched.imageUrl && formik.errors.imageUrl}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            {editingProduct && (
              <Button variant="outlined" color="secondary" onClick={() => setEditingProduct(null)} fullWidth>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>

      <div className="product-list">
        <Typography variant="h6" gutterBottom>
          Product List
        </Typography>
        {products.length === 0 ? (
          <Typography>No products available</Typography>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {product.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${product.price}
                    </Typography>
                  </CardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
                    <IconButton color="primary" onClick={() => handleEdit(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
