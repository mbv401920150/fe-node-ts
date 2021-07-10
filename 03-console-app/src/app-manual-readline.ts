import { showMenu, showFinish } from '@/helpers/messages';

console.clear();

const main = async () => {
    let opt: string = '';

    do {
        opt = await showMenu();
    } while (opt !== '0')

    await showFinish();
}

main();