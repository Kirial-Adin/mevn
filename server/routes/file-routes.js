const Router = require("express").Router;
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const fileController = require("../controllers/file-controller");


router.post('', authMiddleware, fileController.createDir);
router.post('/upload', authMiddleware, fileController.uploadFile);
router.post('/avatar', authMiddleware, fileController.uploadAvatar);
router.get('', authMiddleware, fileController.getFiles);
router.get('/download', authMiddleware, fileController.downloadFile);
router.get('/search', authMiddleware, fileController.searchFiles);
router.get('/avatar', authMiddleware, fileController.getAvatar);
router.delete('/', authMiddleware, fileController.deleteFile)
router.delete('/avatar', authMiddleware, fileController.deleteAvatar)

module.exports = router;
