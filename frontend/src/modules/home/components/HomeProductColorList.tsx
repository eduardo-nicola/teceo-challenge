import { CircularProgress, Grid, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { ProductColorDTO } from '../interfaces/product-color.dto';
import HomeProductColorListItem from './HomeProductColorListItem';
import useHomeProductColorList from './hooks/useHomeProductColorList';

const HomeProductColorList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useHomeProductColorList();

  const loaderRef = useInfiniteScroll(fetchNextPage, !!hasNextPage, isFetchingNextPage);

  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const itemsPerRow = upMd ? 4 : upSm ? 3 : 2;
  const productColors = status === 'success' ? data.pages.flat() : [];
  const rowCount = Math.ceil(productColors.length / itemsPerRow);
  const rowSize = 392;
  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowSize,
    overscan: 6,
  });

  if (status === 'pending') {
    return (
      <Grid container spacing={2}>
        {new Array(8).fill(1).map((_, index: number) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
            <Skeleton variant="rounded" width="100%" height={300} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (status === 'error') {
    return <p>error</p>;
  }

  return (
    <>
      <div style={{ height: `${rowCount * rowSize}px`, position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map((vRow) => {
          const startIndex = vRow.index * itemsPerRow;

          const rowItems = productColors.slice(startIndex, startIndex + itemsPerRow);

          return (
            <div
              key={vRow.key}
              data-index={vRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${vRow.start}px)`,
              }}
            >
              <Grid container spacing={2}>
                {rowItems.map((productColor) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={productColor.id} data-id={productColor.id}>
                    <HomeProductColorListItem item={ProductColorDTO.toCardItem(productColor)} />
                  </Grid>
                ))}
              </Grid>
            </div>
          );
        })}
      </div>

      <div ref={loaderRef} style={{ height: 10 }} />

      {isFetchingNextPage && (
        <Stack alignItems="center" padding={2}>
          <CircularProgress size="24px" />
        </Stack>
      )}
    </>
  );
};

export default HomeProductColorList;
