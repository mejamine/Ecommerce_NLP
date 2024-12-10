import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import ProduitVisiteChart from './ProduitVisiteChart';

const ProduitVisite = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [produitType, setproduitType] = useState({});
  const chartRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/ecommerce/produits/');
        const produits = await response.json();

        const transformedData = produits.map(produit => ({
          name: produit.title,
          value: produit.visite,
        }));

        const initialProduitType = transformedData.reduce((acc, produit) => {
          acc[produit.name] = false;
          return acc;
        }, {});

        setSeriesData(transformedData);
        setproduitType(initialProduitType);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  const onChartLegendSelectChanged = (name) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  const toggleClicked = (name) => {
    setproduitType((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const totalVisitors = useMemo(
    () => seriesData.reduce((acc, next) => acc + next.value, 0),
    [seriesData]
  );

  // Fonction pour générer des couleurs aléatoires
  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return `#${randomColor}`;
  };

  // Génération des couleurs en fonction du nombre d'événements
  const colors = seriesData.map(() => getRandomColor());

  return (
    <Box
      sx={{
        bgcolor: 'common.white',
        borderRadius: 5,
        height: 'min-content',
        boxShadow: theme.shadows[4],
      }}
    >
      <Typography variant="subtitle1" color="text.primary" p={2.5}>
        Nombre de visites par produit
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
        <Stack direction="row" justifyContent="center" flex={'1 1 0%'}>
          <ProduitVisiteChart
            chartRef={chartRef}
            seriesData={seriesData}
            colors={colors}
            sx={{
              width: 222,
              maxHeight: 222,
              mx: 'auto',
            }}
          />
        </Stack>
        <Stack
          spacing={1}
          divider={<Divider />}
          sx={{ px: 2.5, py: 2.5 }}
          justifyContent="center"
          alignItems="stretch"
          flex={'1 1 0%'}
        >
          {Array.isArray(seriesData) &&
            seriesData.map((dataItem, index) => (
              <Button
                key={dataItem.name}
                variant="text"
                fullWidth
                onClick={() => {
                  toggleClicked(dataItem.name);
                  onChartLegendSelectChanged(dataItem.name);
                }}
                sx={{
                  justifyContent: 'flex-start',
                  p: 0,
                  borderRadius: 1,
                  opacity: produitType[`${dataItem.name}`] ? 0.5 : 1,
                }}
                disableRipple
              >
                <Stack direction="row" alignItems="center" gap={1} width={1}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: produitType[`${dataItem.name}`]
                        ? 'action.disabled'
                        : colors[index % colors.length],
                      borderRadius: 400,
                    }}
                  ></Box>
                  <Typography variant="body1" color="text.secondary" flex={1} textAlign={'left'}>
                    {dataItem.name}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {((dataItem.value / totalVisitors) * 100).toFixed(0)}%
                  </Typography>
                </Stack>
              </Button>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProduitVisite;
