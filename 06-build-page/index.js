const fs = require('fs');
const path = require('path');

// HTML
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) {
        throw err
    }

    fs.open(path.join(__dirname, 'project-dist', 'index.html'), 'w', (err) => {
        if (err) {
            throw err
        } 

    })

    fs.open(path.join(__dirname, 'project-dist', 'style.css'), 'w', (err) => {
        if (err) {
            throw err
        } 
    })
})

fs.readFile(path.join(__dirname, '/', 'template.html'), 'utf8', (err, template) => {
    if (err) {
        throw err
    } 
    let str = template;    

    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, components) => {
        if (err) {
            throw err
        }
    
        for (let file of components) {
            const stream = fs.createReadStream(path.join(__dirname, 'components', file.name), 'utf-8');
            stream.on('data', (text) => {
                let fileName = path.basename(file.name, path.extname(file.name));
                if (str.includes(`{{${fileName}}}`)) {
                    str = str.replace(`{{${fileName}}}`, text);
                }

                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), str, (error) => {
                    if (error) {
                        throw err
                    }
                })
            })
        }
    });
});

// Style
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    if (err) {
        throw err
    }

    for (let file of files) {
        const stream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
        stream.on('data', (text) => {
            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${text}\n\n`, (error) => {
                if (error) {
                    throw err
                }
            })
        })
    }
});

// Assets
const makeDir = () => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err, data) => {
        if (err) {
            throw err
        }
    })

    fs.readdir(path.join(__dirname, 'assets'), (err, folders) => {
        if (err) {
            throw err
        }
        
        for (let folder of folders) {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder), { recursive: true }, (err, data) => {
                if (err) {
                    throw err
                }
            })

            fs.readdir(path.join(__dirname, 'assets', folder), (err, data) => {
                for (let file of data) {
                    fs.copyFile(path.join(__dirname, 'assets', folder, file), path.join(__dirname, 'project-dist', 'assets', folder, file), error => {
                        if (error) {
                            throw err
                        }
                    })
                }
            })    
        } 
    })
}

makeDir();