import { readDb } from '@/helpers/databaseMethods';
import Task from '@/models/task';
import chalk from 'chalk';

enum TaskStatus {
    all,
    pending,
    completed
}

class Tasks {
    private _tasks: Array<Task>;

    constructor() {
        this._tasks = readDb()
        console.log('READ', { TAREAS: this._tasks });
    }

    public get list(): Array<Task> {
        return this._tasks;
    }

    public listTasks(status: TaskStatus = TaskStatus.all): void {
        console.log();

        this._tasks.filter(task => {
            if (status == TaskStatus.all) return true;
            if (status == TaskStatus.completed && task.completedAt) return true;
            if (status == TaskStatus.pending && !task.completedAt) return true;

            return false;
        }).forEach((task, i) => {
            const index = chalk`{green.bold ${i + 1}.}`;
            const taskStatus = task.completedAt
                ? chalk`{green.bold Completed} at ${task.completedAt}`
                : chalk`{red.bold Pending}`

            console.log(chalk`${index} ${task.desc} {green.bold ::} ${taskStatus}`);
        });

        console.log();
    }

    createTask(description: string) {
        const newTask = new Task(description);
        this._tasks.push(newTask);
    }


}

export {
    Tasks,
    TaskStatus
};
