import multiply = require('./helpers/fs-multiply');
import args = require('./config/yargs')

console.clear();

multiply.createFile(args.base, args.limit, args.log)
    .then(msg => console.log('New file was created: %s', msg))
    .catch(err => console.error(err));