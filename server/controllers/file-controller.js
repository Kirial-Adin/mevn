const fileService = require('../services/file-service');
const File = require('../models/file-model');
const User = require('../models/user-model');
const fs = require('fs')
const uuid = require('uuid');

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
    async getFiles(req, res) {
        try {
            const {sort} = req.query
            let files
            switch (sort) {
                case 'name':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name:1})
                    break
                case 'type':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type:1})
                    break
                case 'date':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date:1})
                    break
                case 'size':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({size:-1})
                    break
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent})
                    break;
            }
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Невозможно получить файлы"})
        }
    }
    async uploadFile(req, res) {
        try {
            const file = req.files.file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'Недостаточно места на диске'})
            }

            user.usedSpace = user.usedSpace + file.size
            let path;
            if (parent) {
                path = `${process.env.FILE_PATH}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${process.env.FILE_PATH}\\${user._id}\\${file.name}`
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'Файл уже существует'})
            }
            file.mv(path)

            const type = file.name.split('.').pop()
            let filePath = file.name
            if (parent) {
                filePath = parent.path + '\\' + file.name
            }
            const dbFile = new File({
                name: file.name,
                type, 
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Ошибка загрузки'})
        }
    }
    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id}) 
            const path = fileService.getPath(file)
            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            return res.status(400).json({message: 'Файл не найден'})
        } catch(e) {
            console.log(e)
            res.status(500).json({message: 'Ошибка при скачивании'})
        }
    }
    async deleteFile(req, res) {    
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id}) 
            if (!file) {
                return res.status(400).json({message: 'Файл не найден'})
            }
            fileService.deleteFile(file)
            await file.deleteOne({_id: file._id})
            return res.json({message: 'Файл удалён'})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'В папке есть файлы'})
        }
    }
    async searchFiles(req, res) {
        try{
            const searchName = req.query.search
            let files = await File.find({user: req.user.id})
            files = files.filter(file => file.name.includes(searchName))
            return res.json(files)
        } catch(e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка поиска'})
        }
    }
    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id)
            const avatarName = uuid.v4() + '.jpg'
            file.mv(process.env.STATIC_PATH + '\\' + avatarName)
            user.avatar = avatarName
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка загрузки аватара'})
        }
    }
    async deleteAvatar(req, res) {
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync(process.env.STATIC_PATH + '\\' + user.avatar)
            user.avatar = null
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка удаления аватара'})
        }
    }
    async getAvatar(req, res) {
        try {
            const user = await User.findById(req.user.id)
            // const avatar = fs.readFileSync(process.env.STATIC_PATH + '\\' + user.avatar)
            const avatar = user.avatar
            return res.json(avatar)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка получения аватара'})
        }
    }
}

module.exports = new FileController();