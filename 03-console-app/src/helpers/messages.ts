import chalk from 'chalk';
import readline from 'readline';

const showMenu = (): Promise<string> => {
    return new Promise(resolve => {
        console.clear();
        console.log(chalk.green`===================`);
        console.log(chalk.bold.green`   SELECT OPTION   `);
        console.log(chalk.green`===================\n`);

        console.log(chalk`{green.bold 1.} Create task`);
        console.log(chalk`{green.bold 2.} View tasks`);
        console.log(chalk`{green.bold 3.} View completed tasks`);
        console.log(chalk`{green.bold 4.} View pending tasks`);
        console.log(chalk`{green.bold 5.} Complete a task`);
        console.log(chalk`{green.bold 6.} Delete a task`);
        console.log(chalk`{magenta.bold 0.} Exit app\n`);

        question('Select an option: ', resolve);
    });
}

const showFinish = (): Promise<string> => {
    return new Promise(resolve => {
        question(chalk`\nPress {green.bold ENTER} to exit\n`, resolve);
    });
}

interface questionResponse {
    (response: string): void;
}

const question = (message: string, resolve: questionResponse) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question(message, (resp: string) => {
        rl.close();
        resolve(resp);
    });
}

export {
    showMenu,
    showFinish
}