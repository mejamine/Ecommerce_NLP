import { Box } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { forwardRef } from 'react';

const ReactEchart = forwardRef((props, ref) => {
  const { option, echarts, ...rest } = props;

  return (
    <Box
      component={ReactEChartsCore}
      ref={ref}
      echarts={echarts}
      option={{
        ...option,
        tooltip: {
          ...option.tooltip,
          confine: true,
        },
      }}
      {...rest}
    />
  );
});

export default ReactEchart;
