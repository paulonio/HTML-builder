const fs = require('fs');
const path = require('path');

const removeFiles = () => {
    fs.rmdir(path.join(__dirname, 'files-copy'), { recursive: true, force: true }, err => {
    if (err) {
        throw err
    }                
    makeDir();
})
}  

const makeDir = () => {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err, data) => {
        if (err) {
            throw err
        }
    })

    const files = fs.readdir(path.join(__dirname, 'files'), (err, data) => {
        if (err) {
            throw err
        }
        
        for (let element of data) {
            fs.copyFile(path.join(__dirname, 'files', element), path.join(__dirname, 'files-copy', element), error => {
                if (error) {
                    throw err
                }
            })
        }
    })
}


removeFiles();
makeDir();




