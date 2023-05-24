import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const StateEmojiMap = () => {
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
      try {
        const responseEmoji = await axios.get('http://localhost:5000/emoji_no_sentiment');

        const stateEmojiData = responseEmoji.data.reduce((acc, item) => {
          const state = item.key[0];
          const emoji = item.key[1];
          const count = item.value;

          if (!acc[state]) {
            acc[state] = [];
          }
          acc[state].push({ emoji, count });

          return acc;
        }, {});

        // Keep only top 5 emojis for each state
        Object.keys(stateEmojiData).forEach(state => {
          stateEmojiData[state].sort((a, b) => b.count - a.count);
          stateEmojiData[state] = stateEmojiData[state].slice(0, 5);
        });

        const processedData = Object.entries(stateEmojiData).map(([state, emojis]) => {
          const emojisStr = emojis.map(({ emoji, count }) => `${emoji}  ${count}`).join('<br/>');

          return {
            name: toTitleCase(state),
            value: emojis[0].count,
            details: {
              emojis: emojisStr,
              count: emojis[0].count,
            },
          };
        });

        setData(processedData);
        return processedData;

      } catch (error) {
        console.error(error);
        return [];
      }
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
              Top 5 emojis:<br/>
              ${details.emojis}
          `,
          showDelay: 0,
          transitionDuration: 0.2
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: 20000,
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
            name: 'Emoji Usage',
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
export default StateEmojiMap;