const Router = require("express").Router;
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const fileController = require("../controllers/file-controller");


router.post('', authMiddleware, fileController.createDir);
router.post('/upload', authMiddleware, fileController.uploadFile);
router.get('', authMiddleware, fileController.getFiles);
router.get('/download', authMiddleware, fileController.downloadFile);
router.get('/search', authMiddleware, fileController.searchFiles);
router.delete('/', authMiddleware, fileController.deleteFile)

module.exports = router;
