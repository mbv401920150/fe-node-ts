import chalk from 'chalk'
import inquirer, { InputQuestion, QuestionCollection } from 'inquirer';

enum menuOption {
    taskNew = 1,
    taskViewAll = 2,
    taskViewCompleted = 3,
    taskViewPending = 4,
    taskComplete = 5,
    taskDelete = 6,
    exit = 0
}

const menuOptions: QuestionCollection = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            { value: menuOption.taskNew, name: chalk`{green.bold 1.} Create task` },
            { value: menuOption.taskViewAll, name: chalk`{green.bold 2.} View all tasks` },
            { value: menuOption.taskViewCompleted, name: chalk`{green.bold 3.} View completed tasks` },
            { value: menuOption.taskViewPending, name: chalk`{green.bold 4.} View pending tasks` },
            { value: menuOption.taskComplete, name: chalk`{green.bold 5.} Complete a task` },
            { value: menuOption.taskDelete, name: chalk`{green.bold 6.} Delete a task` },
            { value: menuOption.exit, name: chalk`{magenta.bold 0.} Exit app` }
        ]
    }
]

const inquirerMenu = async () => {
    // console.clear();
    console.log(chalk.green`===================`);
    console.log(chalk.bold.green`   SELECT OPTION   `);
    console.log(chalk.green`===================\n`);

    const { option } = await inquirer.prompt(menuOptions);
    return option;
}

const question = async (message: string, requireInput: boolean = true) => {
    const config: InputQuestion = {
        type: 'input',
        name: 'inputValue',
        message
    }

    if (requireInput)
        config.validate = (value: string) => {
            if (value.length === 0)
                return "Please include add a value";

            return true;
        }

    const { inputValue } = await inquirer.prompt(config);
    return inputValue;
}

export {
    inquirerMenu,
    question,
    menuOption
}