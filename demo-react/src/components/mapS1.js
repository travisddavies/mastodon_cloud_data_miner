// import React from 'react';
//
// function home() {
//   return <div>Homepage</div>;
// }
//
// export default home;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ReactEcharts from 'echarts-for-react';
// import * as echarts from 'echarts';
//
// const MyMap = () => {
//   const [option, setOption] = useState({});
//
//   useEffect(() => {
//     axios.get('australia_state.geojson')
//       .then(res => {
//         const australiaMap = res.data;
//         echarts.registerMap('Australia', australiaMap);
//
//         return axios.get('state_tweet_count_demo.json');
//       })
//       .then(res => {
//         const tweetData = res.data.map(item => ({
//           name: item.key[0],
//           value: item.value,
//         }));
//
//         setOption({
//           title: {
//             text: '',
//             left: 'right'
//           },
//           tooltip: {
//             trigger: 'item',
//             showDelay: 0,
//             transitionDuration: 0.2
//           },
//           visualMap: {
//             left: 'right',
//             min: 0,
//             max: 1000, // Please set this according to your data
//             inRange: {
//               color: [
//                 '#313695',
//                 '#4575b4',
//                 '#74add1',
//                 '#abd9e9',
//                 '#e0f3f8',
//                 '#ffffbf',
//                 '#fee090',
//                 '#fdae61',
//                 '#f46d43',
//                 '#d73027',
//                 '#a50026'
//               ]
//             },
//             text: ['High', 'Low'],
//             calculable: true
//           },
//           toolbox: {
//             show: true,
//             left: 'left',
//             top: 'top',
//             feature: {
//               dataView: { readOnly: false },
//               restore: {},
//               saveAsImage: {}
//             }
//           },
//           series: [
//             {
//               name: 'Australia PopEstimates',
//               type: 'map',
//               roam: true,
//               map: 'Australia',
//               emphasis: {
//                 label: {
//                   show: true
//                 }
//               },
//               data: tweetData
//             }
//           ]
//         });
//       });
//   }, []);
//
//   return (
//     <ReactEcharts option={option} />
//   );
// }
//
// export default MyMap;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ReactEcharts from 'echarts-for-react';
// import * as echarts from 'echarts';
//
// const MyMap = () => {
//   const [option, setOption] = useState({});
//
//   useEffect(() => {
//     axios.get('australia_state.geojson')
//       .then(res => {
//         const australiaMap = res.data;
//         echarts.registerMap('Australia', australiaMap);
//
//         return axios.get('http://127.0.0.1:5000//topic_climate');
//       })
//       .then(res => {
//         const tweetData = res.data.map(item => ({
//           name: item.key,
//           value: item.value,
//         }));
//
//         console.log(tweetData.data);
//
//         setOption({
//           title: {
//             text: 'Discussions on climate topics on twitter in each state of Australia',
//             left: 'center'
//           },
//           tooltip: {
//             trigger: 'item',
//             showDelay: 0,
//             transitionDuration: 0.2
//           },
//           visualMap: {
//             left: 'right',
//             min: 0,
//             max: 4000,
//             inRange: {
//               color: [
//                 '#313695',
//                 '#4575b4',
//                 '#74add1',
//                 '#abd9e9',
//                 '#e0f3f8',
//                 '#ffffbf',
//                 '#fee090',
//                 '#fdae61',
//                 '#f46d43',
//                 '#d73027',
//                 '#a50026'
//               ]
//             },
//             text: ['High', 'Low'],
//             calculable: true
//           },
//           toolbox: {
//             show: true,
//             left: 'left',
//             top: 'top',
//             feature: {
//               dataView: { readOnly: false },
//               restore: {},
//               saveAsImage: {}
//             }
//           },
//           series: [
//             {
//               name: 'Australia PopEstimates',
//               type: 'map',
//               roam: true,
//               map: 'Australia',
//               emphasis: {
//                 label: {
//                   show: true
//                 }
//               },
//               data: tweetData
//             }
//           ]
//         });
//       });
//   }, []);
//
//   return (
//     <ReactEcharts option={option} echarts={echarts} />
//   );
// }
//
// export default MyMap;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
// import { processData } from './dataProcessorClimate';
const MapS1 = () => {
    const [tweetData, setTweetData] = useState([]);
    const [climateData, setClimateData] = useState([]);
    const [environmentalData, setEnvironmentalData] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapContainer = useRef(null);

    useEffect(() => {
      axios.get('australia_state.geojson')
        .then(response => {
          const australiaMap = response.data;
          for (let feature of australiaMap.features) {
              feature.properties.name = feature.properties.STATE_NAME;
            }
          echarts.registerMap('Australia', australiaMap);
          setMapLoaded(true);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
              const responseClimate = await axios.get('http://127.0.0.1:5000/topic_climate');
              const responseTotal = await axios.get('http://127.0.0.1:5000/state_tweet_count');
              const responseEnv = await axios.get('http://127.0.0.1:5000/environment_sudo');

              const totalData = responseTotal.data.map(item => ({
                name: item.key,
                value: item.value,
              }));

              const climateData = responseClimate.data.map(item => ({
                name: item.key,
                value: item.value,
              }));

              const environmentalData = responseEnv.data.map(item => ({
                name: item.key[0],
                greenCount: item.value[0],
                greenPercent: item.value[0] / item.value[1],
                solarCount: item.value[2],
                solarPercent: item.value[2] / item.value[3],
              }));
              console.log(environmentalData);

              const processedData = climateData.map(item => {
                const totalItem = totalData.find(data => data.name === item.name);
                const environmentalItem = environmentalData.find(data => data.name === item.name);
                return {
                  name: item.name,
                  value: item.value || 0,
                  details: {
                    count: item.value || 0,
                    percentage: totalItem ? item.value / totalItem.value : 0,
                    greenCount: environmentalItem ? environmentalItem.greenCount : 0,
                    green: environmentalItem ? environmentalItem.greenPercent : 0,
                    solarCount: environmentalItem ? environmentalItem.solarCount : 0,
                    solar: environmentalItem ? environmentalItem.solarPercent : 0,
                  }
                };
              });
              console.log(processedData)

              setTweetData(tweetData);
              setClimateData(climateData);
              setEnvironmentalData(environmentalData);
              setProcessedData(processedData);

          } catch (error) {
              console.error(error);
          }
        };

        fetchData();

    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const data = await processData();
    //       setProcessedData(data);
    //     };
    //
    //     fetchData();
    // }, []);

    useEffect(() => {
      if (mapLoaded && climateData.length > 0 && mapContainer.current) {
        const chart = echarts.init(mapContainer.current);
        chart.setOption({
          title: {
            text: 'Discussions on climate topics on twitter in each state of Australia',
            left: 'right'
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              let details = params.data.details;
              return `
                ${params.name}<br/>
                Tweet for Climate: ${details.count} (${(details.percentage * 100).toFixed(2)}%)<br/>
                Protected areas: ${details.greenCount} (${(details.green * 100).toFixed(2)}%)<br/>
                Solar panel installation: ${details.solarCount.toFixed(2)} (${details.solar.toFixed(2)})
              `;
            },
            showDelay: 0,
            transitionDuration: 0.2
          },
          visualMap: {
            left: 'right',
            min: 0,
            max: 5000,
            inRange: {
              color: [
                '#313695',
                '#4575b4',
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffbf',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026'
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
              dataView: { readOnly: false },
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
              data: processedData
            }
          ]
        });
      }
  }, [mapLoaded, processedData]);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '80vh' }}></div>
  );
}

export default MapS1;
