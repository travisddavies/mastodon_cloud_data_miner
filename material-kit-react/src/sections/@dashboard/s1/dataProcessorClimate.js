import axios from 'axios';

const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
export const processData = async () => {
  try {
    const responseClimate = await axios.get('http://flask:5000/topic_climate');
    const responseTotal = await axios.get('http://flask:5000/state_tweet_count');
    const responseEnv = await axios.get('http://flask:5000/environment_sudo');

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

    const processedData = climateData.map(item => {
      const totalItem = totalData.find(data => data.name === item.name);
      const environmentalItem = environmentalData.find(data => data.name === item.name);
      return {
        name: toTitleCase(item.name),
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

    return processedData;

  } catch (error) {
    console.error(error);
    return [];
  }
};
