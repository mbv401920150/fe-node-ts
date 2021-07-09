/// YARGS config
import yargs = require('yargs');

const args = yargs
    .options({
        base: { alias: 'b', type: 'number', demandOption: true, describe: 'Base to multiply' },
        log: { alias: 'l', type: 'boolean', default: true, describe: 'True to show logs in the screen, otherwise false' },
        limit: { alias: 'limit', type: 'number', default: 10, describe: 'Limit of the multiply' }
    })
    .check((args, options) => {
        if (isNaN(args.base)) throw 'The base parameter is required and must be a number';
        return true;
    }).parseSync();

const { base, log, limit } = args

export { base, log, limit };
