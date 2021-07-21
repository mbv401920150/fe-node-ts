import axios from "axios";
import CityWeather from './CityWeather';

class Searchs {
    private _history: string[] = [];

    constructor() {

    }

    public async searchByCity(city: string): Promise<CityWeather[]> {
        const axiosInstance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
            params: {
                access_token: process.env.MAPBOX_TOKEN,
                limit: 5,
                language: 'es'
            }
        });

        const response = await axiosInstance.get('');

        const result: CityWeather[] =
            response.data.features.map(res => {
                const city = new CityWeather();
                city.Id = res.id;
                city.City = res.place_name;
                city.Lng = res.center[0];
                city.Lat = res.center[1];

                return city;
            })

        return result;
    }

    public async getWeather(city: CityWeather): Promise<void> {
        const axiosInstance = axios.create({
            baseURL: "https://api.openweathermap.org/data/2.5/weather",
            params: {
                lat: city.Lat,
                lon: city.Lng,
                appid: process.env.OPENWEATHER_TOKEN,
                unit: 'metric',
                lang: 'en'
            }
        });

        const response = await axiosInstance.get('');

        const { temp, temp_min, temp_max } = response.data.main;
        const { weather } = response.data;

        city.Temp = temp;
        city.Max = temp_max;
        city.Min = temp_min;
        city.WeatherDescription = weather[0].description;
    }
}

export default Searchs