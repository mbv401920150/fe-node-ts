import inquirer, { QuestionCollection } from 'inquirer'
import chalk from 'chalk';
import { MenuOption } from '@/models/Enums';
import CityWeather from '../models/CityWeather';

const showMenu = async (): Promise<MenuOption> => {
    console.log(`-----------------`);
    console.log(`   WEATHER APP   `);
    console.log(`-----------------\n`);

    const choices: QuestionCollection = [
        { value: MenuOption.Search, name: chalk`{green.bold 1.} Search for a city` },
        { value: MenuOption.History, name: chalk`{green.bold 2.} Check history` },
        { value: MenuOption.Exit, name: chalk`{red.bold 3.} Exit app` }
    ];

    const result = await inquirer.prompt([{
        type: 'list',
        name: 'mainOption',
        message: 'Select an option:',
        choices
    }])

    return result.mainOption;
}

const showCities = async (cities: CityWeather[]): Promise<CityWeather> => {
    const choices: QuestionCollection = cities.map((city, i) => ({
        value: city.Id,
        name: chalk`{green.bold ${i + 1}} ${city.City}`
    }));

    const result = await inquirer.prompt([{
        type: 'list',
        name: 'cityOption',
        message: 'Select a city:',
        choices
    }])

    return cities.find(c => c.Id === result.cityOption);
}

const showMessage = async (message: string): Promise<any> => {
    const result = await inquirer.prompt([{
        type: 'input',
        name: 'message',
        message
    }]);

    return result.message;
}

export {
    showMenu,
    showCities,
    showMessage
}