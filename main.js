const path = require('path');
const fs = require('fs');

const hwFolder = path.join(__dirname, 'hw_1')
// fs.mkdir(hwFolder, (err)=>{
//     if(err) {
//         console.log(err.message);
//         throw new Error(err.message);
//     }
// });

const createFolders = (n)=>{
    for (let i = 1; i <= n ; i++) {
        const folderPath = path.join(hwFolder, 'folder'+i);
        fs.mkdir(folderPath, (err)=>{
            if(err) {
                console.log(err.message);
                throw new Error(err.message);
            }
        })
    }
};

const createFails = (n)=>{
    for (let i = 1; i <=n ; i++) {
        const filePath = path.join(hwFolder, 'file'+i+'.txt')
fs.writeFile(filePath, ' ', (err)=>{
    if(err) {
        console.log(err.message);
        throw new Error(err.message);
    }
})
    }
}

// createFolders(5);
// createFails(5);

const readFolderOrFile = () => {
    fs.readdir(hwFolder,  { withFileTypes: true },(err, files) => {
        if (err) {
            console.log(err.message);
            throw new Error(err.message);
        } else {
            const FILES = [];
            const FOLDERS = [];
            files.forEach(file => {
                if (file.isFile()) {
                    FILES.push(file.name);
                } else if (file.isDirectory()) {
                    FOLDERS.push(file.name);
                }
            });
            console.log({FILES, FOLDERS});
        }
    });
};

readFolderOrFile();

//====================================================== Конспект =================================================
//lib u v => модуль що робить доступ до файлової системи, напиманий на C++

// const path = require('path')
// const currentPath = path.join(__dirname, 'main' );  //шлях до поточного файла
// const folderPath = path.join(__dirname);  //шлях до поточної папки
// console.log(currentPath)
//
// //os
// const os = require('os');
// console.log(os.cpus()); // інформація про процесор
//
// //fs
// const fs = require('node:fs');
// const newFoldeerName = 'lesson_1';
// const newFolderPath = path.join(__dirname, newFoldeerName)
// //create folder
// fs.mkdir(newFolderPath, (err)=>{
//     if(err) {
//         console.log(err.message)
//         throw new Error(err.message)
//     };
//     console.log('new folder created')
// });
// //remove folder
// fs.rmdir(newFolderPath, (err)=> {
//     if (err) {
//         console.log(err.message)
//         throw new Error(err.message)
//     }
//
//     console.log('folder del')
// });
// //read wot in folder
// fs.readdir(folderPath, (err, files)=>{
//     if(err) throw new Error(err.message);
//     console.log(files)
// })
//
// //create text in file and create file
// const filePath = path.join(__dirname, 'lesson_1', 'lesson_1.txt');
//
// fs.writeFile(filePath, 'learn new', (err)=>{
//     if(err) throw new Error(err.message);
// })
// //add text in file
// fs.appendFile(filePath, '\nadd new text', (err) => {
//     if(err) throw new Error(err.message);
// })
// //read info in file
// fs.readFile(filePath, (err, data)=>{
//     if(err) throw new Error(err.message);
//     console.log(data.toString());
// })
// //clear file
// fs.truncate(filePath, (err)=>{
//     if(err) throw new Error(err.message);
// })
// //remove file
// fs.unlink(filePath,(err)=>{
//     if(err) throw new Error(err.message);
// })

