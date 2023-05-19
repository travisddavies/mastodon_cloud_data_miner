import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const MyChart = () => {
    const [data, setData] = useState({});
    const [states, setStates] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            // const result = await axios.get(process.env.PUBLIC_URL + '/emoji_no_sentiment_twitter.json');
            const result = await axios.get('http://127.0.0.1:5000/emoji_no_sentiment');

            let rawData = result.data;
            let processedData = {};
            let stateSet = new Set();

            rawData.forEach(item => {
                let [state, emoji] = item.key;
                let count = item.value;

                stateSet.add(state);

                if (!processedData[state]) {
                    processedData[state] = {};
                }

                processedData[state][emoji] = count;
            });

            // Find the top 5 emojis for each state
            for (let state in processedData) {
                let stateData = processedData[state];
                let emojis = Object.keys(stateData);
                emojis.sort((a, b) => stateData[b] - stateData[a]);
                let top5Emojis = emojis.slice(0, 5);
                let top5Data = {};
                top5Emojis.forEach(emoji => top5Data[emoji] = stateData[emoji]);
                processedData[state] = top5Data;
            }

            setData(processedData);
            setStates(Array.from(stateSet));
        };

        fetchData();
    }, []);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);
        const getOption = () => {
            let series = [];
            for (let state in data) {
                let stateData = data[state];
                for (let emoji in stateData) {
                    let seriesItem = series.find(item => item.name === emoji);
                    if (!seriesItem) {
                        seriesItem = {
                            name: emoji,
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: true
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: new Array(states.length).fill(0)
                        };
                        series.push(seriesItem);
                    }
                    let index = states.indexOf(state);
                    seriesItem.data[index] = stateData[emoji];
                }
            }

            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: series.map(item => item.name)
                },
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: states
                    }
                ],
                series: series
            };
        }

        chartInstance.setOption(getOption());

        return () => {
            chartInstance.dispose();
        }
    }, [data, states]);

    return (
        <div ref={chartRef} style={{ height: '500px', width: '100%' }}></div>
    );
}

export default MyChart;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
//
// const EmojiNoSentiment = () => {
//     const [data, setData] = useState({});
//     const [states] = useState(["australian capital territory",
//         "new south wales", "northern territory",
//         "queensland", "south australia", "tasmania",
//         "victoria", "western australia"]);
//     const chartRef = useRef(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await axios.get(process.env.PUBLIC_URL + '/emoji_no_sentiment_twitter.json');
//
//             let rawData = result.data;
//             let processedData = {};
//
//             rawData.forEach(item => {
//                 let [state, emoji] = item.key;
//                 let count = item.value;
//
//                 // Only process data for the specified states
//                 if (states.includes(state)) {
//                     if (!processedData[state]) {
//                         processedData[state] = {};
//                     }
//
//                     processedData[state][emoji] = count;
//                 }
//             });
//
//             // Find the top 5 emojis for each state
//             for (let state in processedData) {
//                 let stateData = processedData[state];
//                 let emojis = Object.keys(stateData);
//                 emojis.sort((a, b) => stateData[b] - stateData[a]);
//                 let top5Emojis = emojis.slice(0, 5);
//                 let top5Data = {};
//                 top5Emojis.forEach(emoji => top5Data[emoji] = stateData[emoji]);
//                 processedData[state] = top5Data;
//             }
//
//             setData(processedData);
//         };
//
//         fetchData();
//     }, [states]);
//
//     useEffect(() => {
//         const chartInstance = echarts.init(chartRef.current);
//         const getOption = () => {
//             let series = [];
//             for (let state in data) {
//                 let stateData = data[state];
//                 for (let emoji in stateData) {
//                     let seriesItem = series.find(item => item.name === emoji);
//                     if (!seriesItem) {
//                         seriesItem = {
//                             name: emoji,
//                             type: 'bar',
//                             stack: 'total',
//                             label: {
//                                 show: true
//                             },
//                             emphasis: {
//                                 focus: 'series'
//                             },
//                             // barMaxWidth: '20%',
//                             data: new Array(states.length).fill(0)
//                         };
//                         series.push(seriesItem);
//                         // series.push({
//                         //     seriesItem,
//                         //     barMaxWidth: '20%',
//                         // });
//                     }
//                     let index = states.indexOf(state);
//                     seriesItem.data[index] = stateData[emoji];
//                 }
//             }
//
//             return {
//                 tooltip: {
//                     trigger: 'axis',
//                     axisPointer: {
//                         type: 'shadow'
//                     }
//                 },
//                 legend: {
//                     data: series.map(item => item.name)
//                 },
//                 xAxis: [
//                     {
//                         type: 'value'
//                     }
//                 ],
//                 yAxis: [
//                     {
//                         type: 'category',
//                         axisTick: {show: false},
//                         data: states
//                     }
//                 ],
//                 series: series
//             };
//         }
//
//         chartInstance.setOption(getOption());
//
//         return () => {
//             chartInstance.dispose();
//         }
//     }, [data, states]);
//
//     return (
//         <div ref={chartRef} style={{ height: '500px', width: '100%' }}></div>
//     );
// }
//
// export default EmojiNoSentiment;



