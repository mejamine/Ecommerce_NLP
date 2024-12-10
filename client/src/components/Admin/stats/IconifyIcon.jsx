
import { Box } from '@mui/material';
import { Icon } from '@iconify/react';

const IconifyIcon = ({ icon, width, height, ...rest }) => {
  return (
    <Box component={Icon} icon={icon} width={width} height={height} {...rest} />
  );
};

export default IconifyIcon;
