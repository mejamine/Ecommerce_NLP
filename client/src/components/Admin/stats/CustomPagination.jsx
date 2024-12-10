import { PaginationItem, Typography } from '@mui/material';
import {
  GridPagination,
  gridExpandedRowCountSelector,
  gridPageCountSelector,
  gridPaginationRowRangeSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';

function Pagination({ page, className }) {
  const apiRef = useGridApiContext();
  
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const available = useGridSelector(apiRef, gridExpandedRowCountSelector);
  const paginationRowRange = useGridSelector(apiRef, gridPaginationRowRangeSelector);

  return (
    <>
      {/* {pageCount !== 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          mr="auto"
          ml="auto"
        >
          Affichage {(paginationRowRange?.firstRowIndex ?? 0) + 1} -{' '}
          {(paginationRowRange?.lastRowIndex ?? 0) + 1} de {available} elements
        </Typography>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          mr="auto"
          ml="auto"
        >
          Affichage 0 - 0 de {available} elements
        </Typography>
      )} */}
      <MuiPagination
        color="primary"
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(_event, newPage) => apiRef.current.setPage(newPage - 1)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: () => <>Précédent</>,
              next: () => <>Suivant</>,
            }}
            sx={(theme) => ({
              '&.Mui-selected': {
                color: theme.palette.common.white,
              },
              '&.Mui-disabled': {
                color: theme.palette.text.secondary,
              },
            })}
          />
        )}
        sx={{
          mx: { xs: 'auto', sm: 'initial' },
        }}
      />
    </>
  );
}

export default function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
