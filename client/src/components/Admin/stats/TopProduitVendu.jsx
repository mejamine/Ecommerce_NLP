import { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Divider,
  InputAdornment,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
  debounce,
} from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from './IconifyIcon';
import CustomPagination from './CustomPagination';

const columns = [
  {
    field: 'avatar',
    headerName: 'Produit',
    flex: 1,
    minWidth: 182.9625,
    renderCell: (params) => {
      const product = params.row;
      return (
        <Stack direction="row" spacing={1.5} marginTop={1.5} alignItems="center" component={Link}>
          <Tooltip title={product.title} placement="top" arrow>
            <Avatar src={product.imgUrl[0]} sx={{ objectFit: 'cover' }} />
          </Tooltip>
          <Stack direction="column" spacing={0.5} justifyContent="space-between">
            <Typography variant="body1" color="text.primary">
              {product.title}
            </Typography>
          </Stack>
        </Stack>
      );
    },
  },
  
  {
    field: 'vendue',
    headerName: 'Sold',
    flex: 0.75,
    minWidth: 137.221875,

  },
  {
    field: 'quantite',
    headerName: 'Quantity',
    flex: 0.75,
    minWidth: 137.221875,
  },
  {
    field: 'prix',
    headerName: 'Price',
    flex: 0.75,
    minWidth: 137.221875,
   
  },
];

const TopProduitVendu = () => {
  const apiRef = useGridApiRef();
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/ecommerce/produits/');
        const data = await response.json();
        const rowsWithId = data.map((product) => ({
          ...product,
          id: product._id,
        }));
        setRows(rowsWithId);
        setFilteredRows(rowsWithId); // Initialiser les lignes filtrées
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => b.vendue - a.vendue);
  }, [filteredRows]);

  const handleGridSearch = useMemo(() => {
    return debounce((searchValue) => {
      const filtered = rows.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredRows(filtered);
    }, 250);
  }, [rows]);

  const handleChange = (event) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  return (
    <Stack
      bgcolor="background.paper"
      borderRadius={5}
      width={1}
      boxShadow={(theme) => theme.shadows[4]}
      height={1}
    >
      <Stack
        direction={{ sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        padding={3.75}
        gap={3.75}
      >
        <Typography variant="h5" color="text.primary">
          Les Produits les plus vendus
        </Typography>
        <TextField
          variant="filled"
          placeholder="Search..."
          id="search-input"
          name="table-search-input"
          onChange={handleChange}
          value={search}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
                <IconifyIcon icon="mdi:search" width={1} height={1} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Divider />
      <Stack height={1}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={sortedRows}
          getRowHeight={() => 70}
          hideFooterSelectedRowCount
          disableColumnResize
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelection={false}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          pageSizeOptions={[5]}
          onResize={() => {
            apiRef.current.autosizeColumns({
              includeOutliers: true,
              expand: true,
            });
          }}
          slots={{
            loadingOverlay: LinearProgress,
            pagination: CustomPagination,
            noRowsOverlay: () => <section>No rows available</section>,
          }}
          sx={{
            height: 1,
            width: 1,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default TopProduitVendu;
