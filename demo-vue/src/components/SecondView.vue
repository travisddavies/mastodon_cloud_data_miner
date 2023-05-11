<template>
    <div>
        <div ref="chart" style="height: 300px;"></div>
        <button @click="getData1">Update Chart</button>
        <h1>This is 2nd View</h1>
        <ul>{{string}}</ul>
        <button @click="getData2">Change Data</button>
    </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
    name: 'SecondView',
    props: {
        msg: String,
    },
    data() {
        return {
            string: 'nothing',
            chart: null,
            chartData: [5, 20, 36, 10, 10, 20]
        };
    },
    methods: {
        async getData1() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/sentiments');
                console.log(response.data);
                this.chartData = response.data;
                this.updateChart();
            } catch (error) {
                console.log(error);
            }
        },
        async getData2() {
            try {
                this.string = this.string + 'sth'
            } catch (error) {
                console.log(error);
            }
        },
        updateChart() {
            this.chart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: this.chartData,
                        type: 'line',
                    },
                ],
            });
        },
    },
    mounted() {
        this.chart = echarts.init(this.$refs.chart);
        this.updateChart();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
