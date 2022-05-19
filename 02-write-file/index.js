const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const process = require('process');

const file = fs.open(path.join(__dirname, '/', 'newFile'), 'w', (err) => {
    if(err) {
        throw err
    }
})

const rl = readline.createInterface({ input, output });

rl.on('SIGINT', () => {
    console.log('Thank you, Goodbye!');
    rl.close();
})

rl.question('Write something to append or "exit" to exit!\n', (input) => {
    if (input === 'exit') {
        console.log('Thank you, Goodbye!');
        rl.close();
    } else {
        fs.appendFile(path.join(__dirname, '/', 'newFile'), input, err => {
            if (err) {
                throw err
            }
        })
        console.log('Write more to append or "exit" to exit!');
        rl.on('line', (input) => {
            if (input === 'exit') {
                console.log('Thank you, Goodbye!');
                rl.close();
            } else {
                fs.appendFile(path.join(__dirname, '/', 'newFile'), input, err => {
                    if (err) {
                        throw err
                    }
                })
                console.log('Write more to append or "exit" to exit!');
            }
        })
    }
})
