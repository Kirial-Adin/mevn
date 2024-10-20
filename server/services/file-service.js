const fs = require("fs");
const FileModel = require("../models/file-model");
const e = require("express");

class FileService {
    createDir(file) {
        const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'Файл создан'})
                } else {
                    return reject({message: 'Файл уже существует'})
                }
            } catch (e) {
                return reject({message: 'Ошибка при создании файла'})
            }
        })
    }
    getPath(file) {
        return process.env.FILE_PATH + '\\' + file.user + '\\' + file.path
    }
    deleteFile(file) {
        const path = this.getPath(file)
        const stats = fs.lstatSync(path);
        if (stats.isDirectory()) {
            fs.rmSync(path, { recursive: true })
        } else {
            fs.unlinkSync(path)
        }
    }
}

module.exports = new FileService()