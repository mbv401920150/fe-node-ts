import { readDb } from '@/helpers/databaseMethods';
import { listTaskToDelete } from '@/helpers/inquirer';
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

    public deleteTask(id: string) {
        this._tasks = this._tasks.filter(t => t.id !== id);
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

    public createTask(description: string) {
        const newTask = new Task(description);
        this._tasks.push(newTask);
    }

    public completeTasks(completedTasks: Array<string>) {
        this._tasks = this._tasks.map(t => {

            if (completedTasks.findIndex(completedId => t.id === completedId) >= 0) {
                if (t.completedAt === null)
                    t.completedAt = new Date();
            }
            else
                t.completedAt = null;

            return t;
        });
    }
}

export {
    Tasks,
    TaskStatus
};
