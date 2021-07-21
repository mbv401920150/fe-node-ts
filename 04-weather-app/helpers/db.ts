import fs from 'fs';
import { plainToClass } from 'class-transformer';

import CityWeather from '../models/CityWeather';
const filePath = 'db/db.json';

const loadData = (): CityWeather[] => {
    if (!fs.existsSync(filePath)) return [];

    const data: string = fs.readFileSync(filePath, { encoding: 'utf-8' });
    // Force the JSON Parse understand the object will be an array of objects
    const dataArray: object[] = JSON.parse(data);

    return plainToClass(CityWeather, dataArray);;
}

const saveData = (city: CityWeather): void => {
    // Avoid duplicate results into the new search and some entry previously stored
    const cities = loadData().filter(c => c.Id !== city.Id);

    cities.unshift(city);
    
    if (cities.length > 5) cities.pop();

    fs.writeFileSync(filePath, JSON.stringify(cities, null, 2));
}

export {
    loadData,
    saveData
}