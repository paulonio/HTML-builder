const fs = require('fs');
const path = require('path');

let str = '';
const files = fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, data) => {
    if (err) {
        throw err
    } 

    for (let element of data) {
        if (element.isFile()) {
            fs.stat(path.join(__dirname, 'secret-folder', `${element.name}`), (err, stats) => {
                str = '';
                if (err) {
                    throw err
                }
                str += `${path.basename(element.name, path.extname(element.name))} - ${path.extname(element.name).slice(1)} - ${stats.size / 1024}kb`
                console.log(str)
            })
        }
    }
});
