const fs = require('fs');
const path = require('path');

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {
    if (err) {
        throw err
    } 
})

const files = fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    if (err) {
        throw err
    }

    for (let file of files) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const stream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            stream.on('data', (text) => {
                fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), text, (error) => {
                    if (error) {
                        throw err
                    }
                })
            })
            
        }
    }
});