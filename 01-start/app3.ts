
console.log('Start');

setTimeout(() => console.log('01-First'), 3000);

setTimeout(() => console.log('02-Second'), 0);

setTimeout(() => console.log('03-Third'), 0);

console.log('Finish!');