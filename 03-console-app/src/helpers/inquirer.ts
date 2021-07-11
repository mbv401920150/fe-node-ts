import Task from '@/models/task';
import chalk from 'chalk'
import inquirer, { ConfirmQuestion, InputQuestion, QuestionCollection } from 'inquirer';

enum MenuOption {
    taskNew = 1,
    taskViewAll = 2,
    taskViewCompleted = 3,
    taskViewPending = 4,
    taskComplete = 5,
    taskDelete = 6,
    exit = 0
}

enum QuestionType {
    'input' = 'input',
    'confirm' = 'confirm'
}

const menuOptions: QuestionCollection = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            { value: MenuOption.taskNew, name: chalk`{green.bold 1.} Create task` },
            { value: MenuOption.taskViewAll, name: chalk`{green.bold 2.} View all tasks` },
            { value: MenuOption.taskViewCompleted, name: chalk`{green.bold 3.} View completed tasks` },
            { value: MenuOption.taskViewPending, name: chalk`{green.bold 4.} View pending tasks` },
            { value: MenuOption.taskComplete, name: chalk`{green.bold 5.} Complete task(s)` },
            { value: MenuOption.taskDelete, name: chalk`{green.bold 6.} Delete a task` },
            { value: MenuOption.exit, name: chalk`{magenta.bold 0.} Exit app` }
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

const question = async (message: string, type: QuestionType = QuestionType.input, requireInput: boolean = true) => {
    const config: InputQuestion | ConfirmQuestion = {
        type: type.toString() === QuestionType.input ? 'input' : 'confirm',
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

const listTaskToDelete = async (tasks: Array<Task>) => {
    const choices = tasks.map((t, index) => {
        return { value: t.id, name: chalk`{green.bold ${index + 1}.} ${t.desc}` };
    });

    choices.unshift({ value: '0', name: chalk`{red.bold ${0}.} Cancel` });

    const tasksToDelete: QuestionCollection = [
        {
            type: 'list',
            name: 'id',
            message: 'Select the task to delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(tasksToDelete);

    return id;
}

const listTasksToComplete = async (tasks: Array<Task>): Promise<Array<string>> => {
    const choices = tasks.map((t, index) => {
        return {
            value: t.id,
            name: chalk`{green.bold ${index + 1}.} ${t.desc}`,
            checked: !!t.completedAt
        };
    });

    const tasksToComplete: QuestionCollection = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select the task(s) to complete',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(tasksToComplete);

    return ids;
}

export {
    inquirerMenu,
    question,
    listTaskToDelete,
    listTasksToComplete,
    MenuOption,
    QuestionType
}