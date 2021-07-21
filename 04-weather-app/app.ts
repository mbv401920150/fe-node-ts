require('module-alias/register');
require('dotenv').config()

import chalk from 'chalk';
import { showMenu, showMessage, showCities } from '@/helpers/inquirer';
import Searchs from './models/Searchs';
import { MenuOption } from './models/Enums';
import CityWeather from './models/CityWeather';
import { loadData } from './helpers/db';

const searchs = new Searchs();

const showCity = async (cities: CityWeather[], history: boolean): Promise<void> => {
    const selectedCity: CityWeather = await showCities(cities);
    if (!history) {
        await searchs.getWeather(selectedCity);
        selectedCity.Save();
    }

    selectedCity.ShowInLog();
}

const main = async () => {
    console.clear();


    let option: MenuOption = 0;
    do {
        option = await showMenu();

        switch (option) {
            case MenuOption.Search:
                const city = await showMessage('Type the city:');
                const cities = await searchs.searchByCity(city);
                await showCity(cities, false);

                break;
            case MenuOption.History:
                const history = loadData();
                console.log('HIS', { history });
                await showCity(history, true);

                break;
        }
    }
    while (option !== MenuOption.Exit);

    await showMessage(chalk`{yellow.bold \nThe app will close. Press any key to continue.}`);
}

main();