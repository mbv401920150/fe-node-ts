require('module-alias/register')

import chalk from 'chalk';

import { saveDb } from '@/helpers/databaseMethods';
import { inquirerMenu, menuOption, question } from '@/helpers/inquirer';
import { TaskStatus, Tasks } from '@/models/tasks';

console.clear();

const main = async () => {
    let opt: menuOption;
    const tasks = new Tasks();
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case menuOption.taskNew:
                const description = await question(`Add the description of the new task:`);
                tasks.createTask(description);

                break;
            case menuOption.taskViewAll:
                tasks.listTasks(TaskStatus.all);
                break;
            case menuOption.taskViewCompleted:
                tasks.listTasks(TaskStatus.completed);
                break;
            case menuOption.taskViewPending:
                tasks.listTasks(TaskStatus.pending);
                break;
            case menuOption.taskComplete:
                break;
            case menuOption.taskDelete:
        }
    } while (opt !== menuOption.exit);

    saveDb(tasks.list)

    question(chalk`Press {green.bold ENTER} to finish the app`, false);
}

main();