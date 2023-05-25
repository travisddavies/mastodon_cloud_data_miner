import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const EmojiTweetVsMastodon = () => {
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
            try {
                const response1 = await axios.get('http://172.26.135.191/api/emoji_total');
                // console.log(response1.data);

                const Emoji1 = response1.data.map((item) => ({
                    name: item.key,
                    value: item.value
                }));

                const sortedEmoji1 = Emoji1.sort((a, b) => b.value - a.value);
                const top10Emoji1 = sortedEmoji1.slice(0, 10);

                const topics1 = top10Emoji1.map((item) => item.name);

                setChartEmoji1(top10Emoji1);
                setChartTopic1(topics1);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData1();
    }, []);

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response2 = await axios.get('http://172.26.135.191/api/emoji_mastodon');

                const Emoji2 = response2.data.map((item) => ({
                    name: item.key,
                    value: item.value
                }));

                const sortedEmoji2 = Emoji2.sort((a, b) => b.value - a.value);
                const top10Emoji2 = sortedEmoji2.slice(0, 10);

                const topics2 = top10Emoji2.map((item) => item.name);

                setChartEmoji2(top10Emoji2);
                setChartTopic2(topics2);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData2();
    }, []);

    useEffect(() => {
        const chart = echarts.init(chartRef1.current);

        const options1 = {
            title: {
                text: 'Top 10 Emoji on Twitter',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}'
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
                text: 'Top 10 Emoji on Mastodon',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}'
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

    return (
        <div style={{display: 'flex'}}>
            <div ref={chartRef1} style={{height: '500px', flex: 1}}/>
            <div ref={chartRef2} style={{height: '500px', flex: 1}}/>
        </div>
    );
}


export default EmojiTweetVsMastodon;

