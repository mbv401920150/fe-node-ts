import { saveData } from "@/helpers/db";
import chalk from "chalk";

class CityWeather {
    public Id: string;
    public City: string;
    public Lat: string;
    public Lng: string;
    public Temp: string;
    public WeatherDescription: string;
    public Min: string;
    public Max: string;

    public ShowInLog(): void {
        console.log(chalk`\n\n{green.bold -- CITY INFORMATION --}`);
        console.log(chalk`{yellow.bold Name}: ${this.City}`);
        console.log(chalk`{yellow.bold Lat}: ${this.Lat}`);
        console.log(chalk`{yellow.bold Lng}: ${this.Lng}`);
        if(this.Temp) console.log(chalk`{yellow.bold Temp}: ${this.Temp}`);
        if(this.Min) console.log(chalk`{yellow.bold Min}: ${this.Min}`);
        if(this.Max) console.log(chalk`{yellow.bold Max}: ${this.Max}`);
        if(this.WeatherDescription) console.log(chalk`{yellow.bold Weather description}: ${this.WeatherDescription}\n\n`);
    }

    public Save(): void {
        saveData(this);
    }

}

export default CityWeather;