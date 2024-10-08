import { Backdrop } from '@mui/material';

import SimpleLoader from '../../shared/components/SimpleLoader';

function BlockPageWhileLoading(props: { isLoading: boolean }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={props.isLoading}
    >
      <SimpleLoader />
    </Backdrop>
  );
}

export default BlockPageWhileLoading;
