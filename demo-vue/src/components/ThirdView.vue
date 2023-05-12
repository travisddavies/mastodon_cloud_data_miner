<template>
    <div>
        <div id="map" style="height: 500px"></div>
        <button @click="getData1">Update Map</button>
        <h1>This is 3rd View</h1>
        <ul>{{string}}</ul>
        <button @click="getData2">Change Data</button>
    </div>
</template>

<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

export default {
    name: 'ThirdView',
    props: {
        msg: String
    },
    data() {
        return {
            data: [],
            map: null,
            mapData: null
        };
    },
    methods: {
        async getData1() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/sentiments');
                console.log(response.data);
                this.data = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getData2() {
            try {
                const response = await axios.post('http://127.0.0.1:8080/api_1');
                console.log(response.data);
                this.data = response.data;
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibGlhbmd5dWVzIiwiYSI6ImNsaDIwbXRxajE4eXQzZnMyc210NDhjaHYifQ.SaeQkPTRGqcLrmBfQe_lhw';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/liangyues/clhhgk9zp00hl01pwevs69b76',
            center: [144.9695, -37.8227], // Melbourne
            zoom: 10,
        });
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
