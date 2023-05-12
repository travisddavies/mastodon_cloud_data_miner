import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";

// function ThirdView() {
//   const [data, setData] = useState([]);
//   // const [setMap] = useState(null);
//   // const [center] = useState([144.9695, -37.8227]);
//
//   useEffect(() => {
//     mapboxgl.accessToken = "pk.eyJ1IjoibGlhbmd5dWVzIiwiYSI6ImNsaDIwbXRxajE4eXQzZnMyc210NDhjaHYifQ.SaeQkPTRGqcLrmBfQe_lhw";
//     const map = new mapboxgl.Map({
//       container: "map",
//       // container: mapContainerRef.current,
//       style: "mapbox://styles/liangyues/clhhgk9zp00hl01pwevs69b76",
//       // center: center, // Melbourne
//       center: [144.9695, -37.8227], // Melbourne
//       zoom: 10,
//     });
//     // setMap(mapboxMap);
//   }, []);
//
//   const getData1 = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5000/sentiments");
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//
//   const getData2 = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8080/api_1");
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//
//   return (
//     <div>
//       <div id="map" style={{ height: "500px" }}></div>
//       <button onClick={getData1}>Update Map</button>
//       <h1>This is 3rd View</h1>
//       <ul>{data}</ul>
//       <button onClick={getData2}>Change Data</button>
//     </div>
//   );
// };
//
// export default ThirdView;


mapboxgl.accessToken = "pk.eyJ1IjoibGlhbmd5dWVzIiwiYSI6ImNsaDIwbXRxajE4eXQzZnMyc210NDhjaHYifQ.SaeQkPTRGqcLrmBfQe_lhw";

export default function ThirdView() {
  // var mapContainer = useRef(null);
  var map = useRef(null);
  const [lng] = useState(145.3607);
  const [lat] = useState(-37.8636);
  const [zoom] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      // container: mapContainer.current,
      container: 'map',
      style: "mapbox://styles/liangyues/clhhgk9zp00hl01pwevs69b76",
      center: [lng, lat],
      zoom: zoom
    });
  });

  const getData1 = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/sentiments");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData2 = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/api_1");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="map" style={{ height: "500px" }}></div>
      <button onClick={getData1}>Update Map</button>
      <h1>This is 3rd View</h1>
      <ul>{data}</ul>
      <button onClick={getData2}>Change Data</button>
    </div>
  );

}
