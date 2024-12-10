export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// what's inside the Options is the method(GET) used for the fetch...
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e73776b8b9msha3c3d3c0cfff434p1fcd9ajsn1741d715ebc6",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const WEATHER_API_KEY = "1ba6901506fa9f973dbcfcada176416f";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
