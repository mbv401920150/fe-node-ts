require('module-alias/register')

import chalk from 'chalk';

import { saveDb } from '@/helpers/databaseMethods';
import { inquirerMenu, listTasksToComplete, listTaskToDelete, MenuOption, question, QuestionType } from '@/helpers/inquirer';
import { TaskStatus, Tasks } from '@/models/tasks';

console.clear();

const main = async () => {
    let opt: MenuOption;
    const tasks = new Tasks();
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case MenuOption.taskNew:
                const description = await question(`Add the description of the new task:`);
                tasks.createTask(description);

                break;
            case MenuOption.taskViewAll:
                tasks.listTasks(TaskStatus.all);
                break;
            case MenuOption.taskViewCompleted:
                tasks.listTasks(TaskStatus.completed);
                break;
            case MenuOption.taskViewPending:
                tasks.listTasks(TaskStatus.pending);
                break;
            case MenuOption.taskComplete:
                const ids = await listTasksToComplete(tasks.list);
                
                if(ids.length > 0)
                    tasks.completeTasks(ids);

                break;
            case MenuOption.taskDelete:
                const id = await listTaskToDelete(tasks.list);
                if (id !== '0' && await question(`Do you want to proceed with the deletion?`, QuestionType.confirm)) {
                    tasks.deleteTask(id);
                    console.warn(chalk`\n{yellow.bold The task was deleted}\n`);
                }

                break;
        }
    } while (opt !== MenuOption.exit);

    saveDb(tasks.list)

    await question(chalk`Press {green.bold ENTER} to finish the app`, QuestionType.input, false);
}

main();