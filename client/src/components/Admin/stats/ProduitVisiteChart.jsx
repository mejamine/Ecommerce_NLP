import { useTheme } from '@mui/material';
import ReactEchart from './ReactEcharts';
import * as echarts from 'echarts';
import { useMemo } from 'react';

const EventVisiteChart = ({ chartRef, seriesData, legendData, colors, ...rest }) => {
  const theme = useTheme();
  
  const option = useMemo(() => ({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: false,
      data: legendData,
    },
    series: [
      {
        name: 'nombre de visite par evennement',
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: true,
        startAngle: 0,
        itemStyle: {
          borderRadius: 10,
          borderColor: theme.palette.common.white,
          borderWidth: 2,
        },
        color: colors,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold',
            formatter: `{b}`,
          },
        },
        labelLine: {
          show: false,
        },
        data: seriesData,
      },
    ],
  }), [theme, seriesData, legendData, colors]);

  return <ReactEchart ref={chartRef} option={option} echarts={echarts} {...rest} />;
};

export default EventVisiteChart;
