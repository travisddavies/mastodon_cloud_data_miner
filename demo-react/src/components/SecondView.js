import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const SecondView = () => {
    // const [string, setString] = useState('nothing');
    const [chartEmoji1, setChartEmoji1] = useState([]);
    const [chartTopic1, setChartTopic1] = useState([]);
    const [chartEmoji2, setChartEmoji2] = useState([]);
    const [chartTopic2, setChartTopic2] = useState([]);
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData1 = async () => {
            // setIsLoading(true);
            try {
                const response1 = await axios.get('http://127.0.0.1:5000/emoji_total');
                console.log(response1.data);

                const Emoji1 = response1.data.map((item) => ({
                    name: item.key,
                    value: item.value
                }));

                const sortedEmoji1 = Emoji1.sort((a, b) => b.value - a.value);
                const top10Emoji1 = sortedEmoji1.slice(0, 10);

                console.log(top10Emoji1);

                const topics1 = top10Emoji1.map((item) => item.name);

                console.log(topics1);

                setChartEmoji1(top10Emoji1);
                setChartTopic1(topics1);

            } catch (error) {
                console.log(error);
            }
            // setIsLoading(false);
        };
            fetchData1();
        }, []);

    useEffect(() => {
        const fetchData2 = async () => {
            // setIsLoading(true);
            try {
                const response2 = await axios.get('http://127.0.0.1:5000/emoji_mastodon');
                console.log(response2.data);

                const Emoji2 = response2.data.map((item) => ({
                    name: item.key,
                    value: item.value
                }));

                const sortedEmoji2 = Emoji2.sort((a, b) => b.value - a.value);
                const top10Emoji2 = sortedEmoji2.slice(0, 10);

                console.log(top10Emoji2);

                const topics2 = top10Emoji2.map((item) => item.name);

                console.log(topics2);

                setChartEmoji2(top10Emoji2);
                setChartTopic2(topics2);

            } catch (error) {
                console.log(error);
            }
            // setIsLoading(false);
        };

        // useEffect(() => {
        //     fetchData2();


            fetchData2();
        }, []);

        useEffect(() => {
            const chart = echarts.init(chartRef1.current);

            const options1 = {
                title: {
                    text: 'Top 10 Emoji popularity for Australians on Twitter',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    top: '5%',
                    left: 'center',
                    orient: 'horizontal',
                    data: chartTopic1
                },
                series: [
                    {
                        name: 'Emoji',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: chartEmoji1
                    }
                ]
            };

            chart.setOption(options1);
        }, [chartEmoji1, chartTopic1]);

        useEffect(() => {
            const chart = echarts.init(chartRef2.current);

            const options2 = {
                title: {
                    text: 'Top 10 Emoji popularity for Australians on Mastodon',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    top: '5%',
                    left: 'center',
                    orient: 'horizontal',
                    data: chartTopic2
                },
                series: [
                    {
                        name: 'Emoji',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: chartEmoji2
                    }
                ]
            };

            chart.setOption(options2);
        }, [chartEmoji2, chartTopic2]);

        // const Component = ({ fetchData }) => {
        //     return (
        //       <button onClick={fetchData}>Update Data</button>
        //     );
        //   };

        // const updateData = () => {
        //     fetchData();
        // };

        return (
            <div style={{ display: 'flex' }}>
                <div ref={chartRef1} style={{height: '500px', flex: 1 }}></div>
                <div ref={chartRef2} style={{ height: '500px', flex: 1 }}></div>
                {/*<button onClick={updateData}>Update Data</button>*/}
                {/*<Component fetchData={fetchData} />*/}
                {/*<h1>This is 2nd View</h1>*/}
                {/*<ul>{chartTopic1.map((item) => <li key={item}>{item}</li>)}</ul>*/}
            </div>
        );
    };


export default SecondView;

