import axios from "axios";
import { apiKey } from "../theme";

const forecastEndPoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key= ${apiKey} &q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationsEndPoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key= ${apiKey} &q=${params.cityName}`;

const apiCAll = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (err) {
    console.log("Error : ", err);
    return null;
  }
};

export const fetchWeatherForecast = (params) => {
//   let forecastUrl = forecastEndPoint(params);
  return apiCAll(forecastEndPoint(params));
};

export const fetchLocations = (params) => {
//   let locationsUrl = locationsEndPoint(params);
  return apiCAll(locationsEndPoint(params));
};
