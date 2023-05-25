import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { processData } from './dataProcessorClimate';

const MapS1 = () => {
  const [data, setData] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);

  useEffect(() => {
    axios.get('/australia_state.geojson')
      .then(response => {
        const australiaMap = response.data;
        australiaMap.features = australiaMap.features.map(feature =>
          ({...feature, properties: {...feature.properties, name: feature.properties.STATE_NAME}})
        );
        echarts.registerMap('Australia', australiaMap);
        setMapLoaded(true);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const processedData = await processData();
      setData(processedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapLoaded && data.length > 0 && mapContainer.current) {
      const chart = echarts.init(mapContainer.current);
      chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: ({name, data: {details}}) => `
              ${name}<br/>
              Tweet for Climate: ${details.count} (${(details.percentage * 100).toFixed(2)}%)<br/>
              Protected areas: ${details.greenCount} Ha (${(details.green * 100).toFixed(2)}%)
          `,
          showDelay: 0,
          transitionDuration: 0.2
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: 5000,
          inRange: {
            color: [
              '#B7E3D7',
              '#A5CCE7',
              '#92C4E7',
              '#80BDE7',
              '#6EB6E7',
              '#5BAEE7',
              '#49A7E7',
              '#369FE7',
              '#369FE7',
              '#2397E7',
              '#4575b4',
              '#313695'
            ]
          },
          text: ['High', 'Low'],
          calculable: true
        },
        toolbox: {
          show: true,
          left: 'left',
          top: 'top',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'Tweets for Climate',
            type: 'map',
            roam: true,
            map: 'Australia',
            emphasis: {
              label: {
                show: true
              }
            },
            data
          }
        ]
      });

      chart.resize();
    }
  }, [mapLoaded, data]);

  return (
      <div ref={mapContainer} style={{width: '100%', height: '80vh'}}/>
  );
}
export default MapS1;