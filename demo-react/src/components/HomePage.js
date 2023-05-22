// // import React from 'react';
// //
// // function home() {
// //   return <div>Homepage</div>;
// // }
// //
// // export default home;
//
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import ReactEcharts from 'echarts-for-react';
// // import * as echarts from 'echarts';
// //
// // const MyMap = () => {
// //   const [option, setOption] = useState({});
// //
// //   useEffect(() => {
// //     axios.get('australia_state.geojson')
// //       .then(res => {
// //         const australiaMap = res.data;
// //         echarts.registerMap('Australia', australiaMap);
// //
// //         return axios.get('state_tweet_count_demo.json');
// //       })
// //       .then(res => {
// //         const tweetData = res.data.map(item => ({
// //           name: item.key[0],
// //           value: item.value,
// //         }));
// //
// //         setOption({
// //           title: {
// //             text: '',
// //             left: 'right'
// //           },
// //           tooltip: {
// //             trigger: 'item',
// //             showDelay: 0,
// //             transitionDuration: 0.2
// //           },
// //           visualMap: {
// //             left: 'right',
// //             min: 0,
// //             max: 1000, // Please set this according to your data
// //             inRange: {
// //               color: [
// //                 '#313695',
// //                 '#4575b4',
// //                 '#74add1',
// //                 '#abd9e9',
// //                 '#e0f3f8',
// //                 '#ffffbf',
// //                 '#fee090',
// //                 '#fdae61',
// //                 '#f46d43',
// //                 '#d73027',
// //                 '#a50026'
// //               ]
// //             },
// //             text: ['High', 'Low'],
// //             calculable: true
// //           },
// //           toolbox: {
// //             show: true,
// //             left: 'left',
// //             top: 'top',
// //             feature: {
// //               dataView: { readOnly: false },
// //               restore: {},
// //               saveAsImage: {}
// //             }
// //           },
// //           series: [
// //             {
// //               name: 'Australia PopEstimates',
// //               type: 'map',
// //               roam: true,
// //               map: 'Australia',
// //               emphasis: {
// //                 label: {
// //                   show: true
// //                 }
// //               },
// //               data: tweetData
// //             }
// //           ]
// //         });
// //       });
// //   }, []);
// //
// //   return (
// //     <ReactEcharts option={option} />
// //   );
// // }
// //
// // export default MyMap;
//
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import ReactEcharts from 'echarts-for-react';
// // import * as echarts from 'echarts';
// //
// // const MyMap = () => {
// //   const [option, setOption] = useState({});
// //
// //   useEffect(() => {
// //     axios.get('australia_state.geojson')
// //       .then(res => {
// //         const australiaMap = res.data;
// //         echarts.registerMap('Australia', australiaMap);
// //
// //         return axios.get('http://127.0.0.1:5000//topic_climate');
// //       })
// //       .then(res => {
// //         const tweetData = res.data.map(item => ({
// //           name: item.key,
// //           value: item.value,
// //         }));
// //
// //         console.log(tweetData.data);
// //
// //         setOption({
// //           title: {
// //             text: 'Discussions on climate topics on twitter in each state of Australia',
// //             left: 'center'
// //           },
// //           tooltip: {
// //             trigger: 'item',
// //             showDelay: 0,
// //             transitionDuration: 0.2
// //           },
// //           visualMap: {
// //             left: 'right',
// //             min: 0,
// //             max: 4000,
// //             inRange: {
// //               color: [
// //                 '#313695',
// //                 '#4575b4',
// //                 '#74add1',
// //                 '#abd9e9',
// //                 '#e0f3f8',
// //                 '#ffffbf',
// //                 '#fee090',
// //                 '#fdae61',
// //                 '#f46d43',
// //                 '#d73027',
// //                 '#a50026'
// //               ]
// //             },
// //             text: ['High', 'Low'],
// //             calculable: true
// //           },
// //           toolbox: {
// //             show: true,
// //             left: 'left',
// //             top: 'top',
// //             feature: {
// //               dataView: { readOnly: false },
// //               restore: {},
// //               saveAsImage: {}
// //             }
// //           },
// //           series: [
// //             {
// //               name: 'Australia PopEstimates',
// //               type: 'map',
// //               roam: true,
// //               map: 'Australia',
// //               emphasis: {
// //                 label: {
// //                   show: true
// //                 }
// //               },
// //               data: tweetData
// //             }
// //           ]
// //         });
// //       });
// //   }, []);
// //
// //   return (
// //     <ReactEcharts option={option} echarts={echarts} />
// //   );
// // }
// //
// // export default MyMap;
//
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
// import { processData } from './dataProcessorClimate';
// const MyMap = () => {
//     const [tweetData, setTweetData] = useState([]);
//     const [climateData, setClimateData] = useState([]);
//     const [environmentalData, setEnvironmentalData] = useState([]);
//     const [processedData, setProcessedData] = useState([]);
//     const [mapLoaded, setMapLoaded] = useState(false);
//     const mapContainer = useRef(null);
//
//     useEffect(() => {
//       axios.get('australia_state.geojson')
//         .then(response => {
//           const australiaMap = response.data;
//           for (let feature of australiaMap.features) {
//               feature.properties.name = feature.properties.STATE_NAME;
//             }
//           echarts.registerMap('Australia', australiaMap);
//           setMapLoaded(true);
//         });
//     }, []);
//
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//               const responseClimate = await axios.get('http://127.0.0.1:5000/topic_climate');
//               const responseTotal = await axios.get('http://127.0.0.1:5000/state_tweet_count');
//               const responseEnv = await axios.get('http://127.0.0.1:5000/environment_sudo');
//
//               const totalData = responseTotal.data.map(item => ({
//                 name: item.key,
//                 value: item.value,
//               }));
//
//               const climateData = responseClimate.data.map(item => ({
//                 name: item.key,
//                 value: item.value,
//               }));
//
//               const environmentalData = responseEnv.data.map(item => ({
//                 name: item.key[0],
//                 greenCount: item.value[0],
//                 greenPercent: item.value[0] / item.value[1],
//                 solarCount: item.value[2],
//                 solarPercent: item.value[2] / item.value[3],
//               }));
//               console.log(environmentalData);
//
//               const processedData = climateData.map(item => {
//                 const totalItem = totalData.find(data => data.name === item.name);
//                 const environmentalItem = environmentalData.find(data => data.name === item.name);
//                 return {
//                   name: item.name,
//                   value: item.value || 0,
//                   details: {
//                     count: item.value || 0,
//                     percentage: totalItem ? item.value / totalItem.value : 0,
//                     greenCount: environmentalItem ? environmentalItem.greenCount : 0,
//                     green: environmentalItem ? environmentalItem.greenPercent : 0,
//                     solarCount: environmentalItem ? environmentalItem.solarCount : 0,
//                     solar: environmentalItem ? environmentalItem.solarPercent : 0,
//                   }
//                 };
//               });
//               console.log(processedData)
//
//               setTweetData(tweetData);
//               setClimateData(climateData);
//               setEnvironmentalData(environmentalData);
//               setProcessedData(processedData);
//
//           } catch (error) {
//               console.error(error);
//           }
//         };
//
//         fetchData();
//
//   }, []);
//
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //       const data = await processData();
//     //       setProcessedData(data);
//     //     };
//     //
//     //     fetchData();
//     // }, []);
//
//     useEffect(() => {
//       if (mapLoaded && climateData.length > 0 && mapContainer.current) {
//         const chart = echarts.init(mapContainer.current);
//         chart.setOption({
//           title: {
//             text: 'Discussions on climate topics on twitter in each state of Australia',
//             left: 'right'
//           },
//           tooltip: {
//             trigger: 'item',
//             // formatter: function (params) {
//             //     let value = params.data;
//             //     return `${params.name}<br/>Tweet for Climate: ${params.value} (${(value.percentage * 100).toFixed(2)}%)`;
//             // },
//             // formatter: function (params) {
//             //   let value = params.data;
//             //   return `
//             //     ${params.name}<br/>
//             //     Tweet for Climate: ${params.value.count} (${(value.value.percentage * 100).toFixed(2)}%)<br/>
//             //     Protected areas: ${value.value.green.toFixed(2)}%<br/>
//             //     Solar panel installation: ${value.value.solar.toFixed(2)}%
//             //   `;
//             // },
//             formatter: function (params) {
//               let details = params.data.details;
//               return `
//                 ${params.name}<br/>
//                 Tweet for Climate: ${details.count} (${(details.percentage * 100).toFixed(2)}%)<br/>
//                 Protected areas: ${details.greenCount} (${(details.green * 100).toFixed(2)}%)<br/>
//                 Solar panel installation: ${details.solarCount.toFixed(2)} (${details.solar.toFixed(2)})
//               `;
//             },
//             showDelay: 0,
//             transitionDuration: 0.2
//           },
//           visualMap: {
//             left: 'right',
//             min: 0,
//             max: 5000,
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
//               name: 'Tweets for Climate',
//               type: 'map',
//               roam: true,
//               map: 'Australia',
//               emphasis: {
//                 label: {
//                   show: true
//                 }
//               },
//               data: processedData
//               // data: processedData.map(item => ({
//               //     name: item.name,
//               //     value: item.value.count,
//               //     percentage: item.value.percentage
//               // }))
//             }
//           ]
//         });
//       }
//   }, [mapLoaded, processedData]);
//
//   return (
//     <div ref={mapContainer} style={{ width: '100%', height: '100vh' }}></div>
//   );
// }
//
// export default MyMap;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
// import MapS1 from './mapS1';
//
//
// export default MapS1;

// comparisonChartS1
// import React, { useEffect, useState, useRef } from 'react';
// import * as echarts from 'echarts';
// import { processData } from './dataProcessorClimate';
//
// const YourComponent = () => {
//   const chartRef = useRef(null);
//   const [data, setData] = useState([]);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       const processedData = await processData();
//       console.log(processedData)
//       setData(processedData);
//     };
//
//     fetchData();
//   }, []);
//
//   useEffect(() => {
//     if (data.length > 0) {
//       const stateNames = data.map(item =>
//         item.name
//           .split(' ')
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//           .join(' ')
//       );
//       const tweetPercentages = data.map(item => (item.details.percentage * 1000).toFixed(2));
//       const protectedAreaPercentages = data.map(item => (item.details.green * 100).toFixed(2));
//       const solarPanelPercentages = data.map(item => item.details.solar.toFixed(2));
//       console.log(stateNames)
//       console.log(tweetPercentages)
//
//       const option = {
//         title: {
//           text: 'Comparison'
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         legend: {
//           data: ['Tweet Percentage(‰)', 'Protected Area Percentage(%)', 'Solar Panel Installation']
//         },
//         grid: {
//           left: '3%',
//           right: '4%',
//           bottom: '3%',
//           containLabel: true
//         },
//         toolbox: {
//           feature: {
//             saveAsImage: {}
//           }
//         },
//         xAxis: {
//           type: 'category',
//           boundaryGap: false,
//           data: stateNames,
//           axisLabel: {
//             interval: 0,
//             rotate: 45
//           }
//         },
//         yAxis: {
//           type: 'value'
//         },
//         series: [
//           {
//             name: 'Tweet Percentage(‰)',
//             type: 'line',
//             data: tweetPercentages
//           },
//           {
//             name: 'Protected Area Percentage(%)',
//             type: 'line',
//             data: protectedAreaPercentages
//           },
//           {
//             name: 'Solar Panel Installation',
//             type: 'line',
//             data: solarPanelPercentages
//           }
//         ]
//       };
//
//       const chartInstance = echarts.init(chartRef.current);
//       chartInstance.setOption(option);
//     }
//   }, [data]);
//
//   return <div ref={chartRef} style={{ height: '400px', width: '100%' }} />;
// };
//
// export default YourComponent;

// // mapS1
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
// import { processData } from './dataProcessorClimate';
//
// const MapS1 = () => {
//     const [data, setData] = useState([]);
//     const [mapLoaded, setMapLoaded] = useState(false);
//     const mapContainer = useRef(null);
//
//     useEffect(() => {
//       axios.get('australia_state.geojson')
//         .then(response => {
//           const australiaMap = response.data;
//           for (let feature of australiaMap.features) {
//               feature.properties.name = feature.properties.STATE_NAME;
//             }
//           echarts.registerMap('Australia', australiaMap);
//           setMapLoaded(true);
//         });
//     }, []);
//
//   //   useEffect(() => {
//   //       const fetchData = async () => {
//   //         try {
//   //             const responseClimate = await axios.get('http://127.0.0.1:5000/topic_climate');
//   //             const responseTotal = await axios.get('http://127.0.0.1:5000/state_tweet_count');
//   //             const responseEnv = await axios.get('http://127.0.0.1:5000/environment_sudo');
//   //
//   //             const totalData = responseTotal.data.map(item => ({
//   //               name: item.key,
//   //               value: item.value,
//   //             }));
//   //
//   //             const climateData = responseClimate.data.map(item => ({
//   //               name: item.key,
//   //               value: item.value,
//   //             }));
//   //
//   //             const environmentalData = responseEnv.data.map(item => ({
//   //               name: item.key[0],
//   //               greenCount: item.value[0],
//   //               greenPercent: item.value[0] / item.value[1],
//   //               solarCount: item.value[2],
//   //               solarPercent: item.value[2] / item.value[3],
//   //             }));
//   //             console.log(environmentalData);
//   //
//   //             const processedData = climateData.map(item => {
//   //               const totalItem = totalData.find(data => data.name === item.name);
//   //               const environmentalItem = environmentalData.find(data => data.name === item.name);
//   //               return {
//   //                 name: item.name,
//   //                 value: item.value || 0,
//   //                 details: {
//   //                   count: item.value || 0,
//   //                   percentage: totalItem ? item.value / totalItem.value : 0,
//   //                   greenCount: environmentalItem ? environmentalItem.greenCount : 0,
//   //                   green: environmentalItem ? environmentalItem.greenPercent : 0,
//   //                   solarCount: environmentalItem ? environmentalItem.solarCount : 0,
//   //                   solar: environmentalItem ? environmentalItem.solarPercent : 0,
//   //                 }
//   //               };
//   //             });
//   //             console.log(processedData)
//   //
//   //             setTweetData(tweetData);
//   //             setClimateData(climateData);
//   //             setEnvironmentalData(environmentalData);
//   //             setProcessedData(processedData);
//   //
//   //         } catch (error) {
//   //             console.error(error);
//   //         }
//   //       };
//   //
//   //       fetchData();
//   //
//   // }, []);
//
//     useEffect(() => {
//         const fetchData = async () => {
//           const processedData = await processData();
//           setData(processedData);
//         };
//
//         fetchData();
//     }, []);
//
//     // useEffect(() => {
//     //   console.log(data);
//     // }, [data]);
//
//     useEffect(() => {
//       if (mapLoaded && data.length > 0 && mapContainer.current) {
//         const chart = echarts.init(mapContainer.current);
//         chart.setOption({
//           title: {
//             text: 'Climate related tweets in Australia',
//             left: 'right'
//           },
//           tooltip: {
//             trigger: 'item',
//             formatter: function (params) {
//               console.log(params);
//               let details = params.data.details;
//               return `
//                 ${params.name}<br/>
//                 Tweet for Climate: ${details.count} (${(details.percentage * 100).toFixed(2)}%)<br/>
//                 Protected areas: ${details.greenCount} (${(details.green * 100).toFixed(2)}%)<br/>
//                 Solar panel installation: ${details.solarCount.toFixed(2)} (${details.solar.toFixed(2)})
//               `;
//             },
//             showDelay: 0,
//             transitionDuration: 0.2
//           },
//           visualMap: {
//             left: 'right',
//             min: 0,
//             max: 5000,
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
//               name: 'Tweets for Climate',
//               type: 'map',
//               roam: true,
//               map: 'Australia',
//               emphasis: {
//                 label: {
//                   show: true
//                 }
//               },
//               data: data
//             }
//           ]
//         });
//       }
//   }, [mapLoaded, data]);
//
//   return (
//     <div ref={mapContainer} style={{ width: '100%', height: '100vh' }}></div>
//   );
// }
//
// export default MapS1;

// mapS1
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
// // import { processData } from './dataProcessorClimate';
// import comparisonChartS1 from "./comparisonChartS1";
// import mapS1 from "./mapS1";
// const MapS1 = () => {
//     const [tweetData, setTweetData] = useState([]);
//     const [climateData, setClimateData] = useState([]);
//     const [environmentalData, setEnvironmentalData] = useState([]);
//     const [processedData, setProcessedData] = useState([]);
//     const [mapLoaded, setMapLoaded] = useState(false);
//     const mapContainer = useRef(null);
//
//     useEffect(() => {
//       axios.get('australia_state.geojson')
//         .then(response => {
//           const australiaMap = response.data;
//           for (let feature of australiaMap.features) {
//               feature.properties.name = feature.properties.STATE_NAME;
//             }
//           echarts.registerMap('Australia', australiaMap);
//           setMapLoaded(true);
//         });
//     }, []);
//
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//               const responseClimate = await axios.get('http://127.0.0.1:5000/topic_climate');
//               const responseTotal = await axios.get('http://127.0.0.1:5000/state_tweet_count');
//               const responseEnv = await axios.get('http://127.0.0.1:5000/environment_sudo');
//
//               const totalData = responseTotal.data.map(item => ({
//                 name: item.key,
//                 value: item.value,
//               }));
//
//               const climateData = responseClimate.data.map(item => ({
//                 name: item.key,
//                 value: item.value,
//               }));
//
//               const environmentalData = responseEnv.data.map(item => ({
//                 name: item.key[0],
//                 greenCount: item.value[0],
//                 greenPercent: item.value[0] / item.value[1],
//                 solarCount: item.value[2],
//                 solarPercent: item.value[2] / item.value[3],
//               }));
//               console.log(environmentalData);
//
//               const processedData = climateData.map(item => {
//                 const totalItem = totalData.find(data => data.name === item.name);
//                 const environmentalItem = environmentalData.find(data => data.name === item.name);
//                 return {
//                   name: item.name,
//                   value: item.value || 0,
//                   details: {
//                     count: item.value || 0,
//                     percentage: totalItem ? item.value / totalItem.value : 0,
//                     greenCount: environmentalItem ? environmentalItem.greenCount : 0,
//                     green: environmentalItem ? environmentalItem.greenPercent : 0,
//                     solarCount: environmentalItem ? environmentalItem.solarCount : 0,
//                     solar: environmentalItem ? environmentalItem.solarPercent : 0,
//                   }
//                 };
//               });
//               console.log(processedData)
//
//               setTweetData(tweetData);
//               setClimateData(climateData);
//               setEnvironmentalData(environmentalData);
//               setProcessedData(processedData);
//
//           } catch (error) {
//               console.error(error);
//           }
//         };
//
//         fetchData();
//
//     }, []);
//
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //       const data = await processData();
//     //       setProcessedData(data);
//     //     };
//     //
//     //     fetchData();
//     // }, []);
//
//     useEffect(() => {
//       if (mapLoaded && climateData.length > 0 && mapContainer.current) {
//         const chart = echarts.init(mapContainer.current);
//         chart.setOption({
//           title: {
//             text: 'Discussions on climate topics on twitter in each state of Australia',
//             left: 'right'
//           },
//           tooltip: {
//             trigger: 'item',
//             formatter: function (params) {
//               let details = params.data.details;
//               return `
//                 ${params.name}<br/>
//                 Tweet for Climate: ${details.count} (${(details.percentage * 100).toFixed(2)}%)<br/>
//                 Protected areas: ${details.greenCount} (${(details.green * 100).toFixed(2)}%)<br/>
//                 Solar panel installation: ${details.solarCount.toFixed(2)} (${details.solar.toFixed(2)})
//               `;
//             },
//             showDelay: 0,
//             transitionDuration: 0.2
//           },
//           visualMap: {
//             left: 'right',
//             min: 0,
//             max: 5000,
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
//               name: 'Tweets for Climate',
//               type: 'map',
//               roam: true,
//               map: 'Australia',
//               emphasis: {
//                 label: {
//                   show: true
//                 }
//               },
//               data: processedData
//             }
//           ]
//         });
//       }
//   }, [mapLoaded, processedData]);
//
//   return (
//     <div ref={mapContainer} style={{ width: '100%', height: '100vh' }}></div>
//   );
// }
//
// export default MapS1;

// comparisonchart with mapS1
// import React, { useEffect, useState, useRef } from 'react';
// import ComparisonChartS1 from "./comparisonChartS1";
// import MapS1 from "./mapS1";
// const ChartContainer = () => {
//   const [chartType, setChartType] = useState('map');
//
//   const handleChartTypeChange = (type) => {
//     setChartType(type);
//   };
//
//   let chartComponent;
//   switch (chartType) {
//     case 'map':
//       chartComponent = <MapS1 />;
//       break;
//     case 'line':
//       chartComponent = <ComparisonChartS1 />;
//       break;
//     default:
//       chartComponent = null;
//   }
//
//   return (
//     <div>
//       <div>
//         <button onClick={() => handleChartTypeChange('map')}>Map</button>
//         <button onClick={() => handleChartTypeChange('line')}>Line Chart</button>
//       </div>
//       {chartComponent}
//     </div>
//   );
// };
//
// export default ChartContainer;

// import React, { useEffect, useState, useRef } from 'react';
// import * as echarts from 'echarts';
// import { processData } from './dataProcessorClimate';
//
// const ComparisonLineChartS1 = () => {
//   const chartRef1 = useRef(null);
//   const chartRef2 = useRef(null);
//   const [data, setData] = useState([]);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       const processedData = await processData();
//       console.log(processedData)
//       setData(processedData);
//     };
//
//     fetchData();
//   }, []);
//
//   useEffect(() => {
//     if (data.length > 0) {
//       const stateNames = data.map(item =>
//         item.name
//           .split(' ')
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//           .join(' ')
//       );
//       const tweetPercentages = data.map(item => (item.details.percentage * 100).toFixed(2));
//       // const protectedAreaPercentages = data.map(item => (item.details.green * 100).toFixed(2));
//       // const solarPanelPercentages = data.map(item => item.details.solar.toFixed(2));
//       console.log(stateNames)
//       console.log(tweetPercentages)
//
//       const option1 = {
//         title: {
//           text: 'Tweet Percentage(%)'
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         legend: {
//           data: ['Tweet Percentage(%)']
//         },
//         grid: {
//           left: '3%',
//           right: '4%',
//           bottom: '3%',
//           containLabel: true
//         },
//         toolbox: {
//           feature: {
//             saveAsImage: {},
//             magicType:{show: true, type:['line','bar']}
//           }
//         },
//         xAxis: {
//           type: 'category',
//           boundaryGap: false,
//           data: stateNames,
//           axisLabel: {
//             interval: 0,
//             rotate: 45
//           }
//         },
//         yAxis: {
//           type: 'value'
//         },
//         series: [
//           {
//             name: 'Tweet Percentage(%)',
//             type: 'line',
//             data: tweetPercentages,
//             itemStyle: {
//             color: '#92B0C5' // Set the color for the first chart
//             }
//           },
//         ]
//       };
//
//       const chartInstance = echarts.init(chartRef1.current);
//       chartInstance.setOption(option1);
//     }
//   }, [data]);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       const processedData = await processData();
//       console.log(processedData)
//       setData(processedData);
//     };
//
//     fetchData();
//   }, []);
//
//   useEffect(() => {
//     if (data.length > 0) {
//       const stateNames = data.map(item =>
//         item.name
//           .split(' ')
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//           .join(' ')
//       );
//       const tweetPercentages = data.map(item => (item.details.percentage * 100).toFixed(2));
//       const protectedAreaPercentages = data.map(item => (item.details.green * 100).toFixed(2));
//       const solarPanelPercentages = data.map(item => item.details.solar.toFixed(2));
//
//       const option2 = {
//         title: {
//           text: 'Protected Area Percentage(%)'
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         legend: {
//           data: ['Protected Area Percentage(%)']
//         },
//         grid: {
//           left: '3%',
//           right: '4%',
//           bottom: '3%',
//           containLabel: true
//         },
//         toolbox: {
//           feature: {
//             saveAsImage: {},
//             magicType:{show: true, type:['line','bar']}
//           }
//         },
//         xAxis: {
//           type: 'category',
//           boundaryGap: false,
//           data: stateNames,
//           axisLabel: {
//             interval: 0,
//             rotate: 45
//           }
//         },
//         yAxis: {
//           type: 'value'
//         },
//         series: [
//           {
//             name: 'Protected Area Percentage(%)',
//             type: 'line',
//             data: protectedAreaPercentages,
//             itemStyle: {
//             color: '#E8D954' // Set the color for the first chart
//             }
//           },
//         ]
//       };
//
//       const chartInstance = echarts.init(chartRef2.current);
//       chartInstance.setOption(option2);
//     }
//   }, [data]);
//
//
//   return (
//       <div style={{ display: 'display: flex; flex-direction: row;'}}>
//         <div ref={chartRef1} style={{ height: '400px', width: '100%' }}></div>
//         <div ref={chartRef2} style={{ height: '400px', width: '100%' }}></div>
//
//       </div>
//   );
// };
//
// export default ComparisonLineChartS1;

//quiz
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './quizIndex.css';
// import Quiz from './Quiz.js'
//
// function QuizList() {
//   return (
//     <React.StrictMode>
//       <Quiz />
//     </React.StrictMode>
//   );
// }
//
// ReactDOM.render(
//   <QuizList />,
//   document.getElementById('root')
// );
//
// export default QuizList;

import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
import { processData } from './dataProcessorClimate';
import axios from "axios";

const ComparisonWithTesla = () => {
  const chartRef1 = useRef(null);
  const [chartTesla, setChartTesla] = useState([]);
  const [data, setData] = useState([]);
  const [chartprocessedData, setProcessedData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const processedData = await processData();
      console.log(processedData)
      setData(processedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response1 = await axios.get('http://127.0.0.1:5000/topic_tesla_related_climate');
                const responseTotal = await axios.get('http://127.0.0.1:5000/state_tweet_count');
                console.log(response1.data);

                const Tesla = response1.data.map((item) => ({
                    name: item.key,
                    value: item.value
                }));

                const totalData = responseTotal.data.map(item => ({
                      name: item.key,
                      value: item.value,
                }));

                const processedData1 = Tesla.map(item => {
                const totalItem = totalData.find(data => data.name === item.name);
                    return {
                      name: item.name,
                      value: totalItem ? item.value / totalItem.value : 0
                    };
                });

                setProcessedData(processedData1);

            } catch (error) {
                console.log(error);
            }
        };
            fetchData1();
        }, []);

  useEffect(() => {
    const chart = echarts.init(chartRef1.current)
    if (data.length > 0) {
      const stateNames = data.map(item =>
        item.name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      );
      const tweetPercentages = data.map(item => (item.details.percentage * 100).toFixed(2));
      const teslaPercentage = chartprocessedData.map(item => (item.value * 100).toFixed(2));

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Climate Tweet Percentage (%)', 'Tesla Tweet Percentage (%)']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            splitNumber: 10,
            max: 0.7,
          },
          {
            type: 'value',
            splitNumber: 10,
            max: 0.7,
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: stateNames
          }
        ],
        series: [
          {
            name: 'Climate Tweet Percentage (%)',
            type: 'bar',
            xAxisIndex: 1,
            label: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              focus: 'series'
            },
            data: tweetPercentages
          },
          {
            name: 'Tesla Tweet Percentage (%)',
            type: 'bar',
            stack: 'Total',
            xAxisIndex: 0,
            label: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              focus: 'series'
            },
            data: teslaPercentage
          }
        ]
      }
      chart.setOption(option);
    }
  }, [chartRef1,data,chartTesla]);

  useEffect(() => {
    const fetchData = async () => {
      const processedData = await processData();
      setData(processedData);
    };
    fetchData();
  }, []);

  return (
      <div style={{ display: 'display: flex; flex-direction: row;'}}>
        <div ref={chartRef1} style={{ height: '400px', width: '100%' }}></div>
      </div>
  );
};

export default ComparisonWithTesla;








