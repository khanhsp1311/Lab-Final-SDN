import multer from 'multer';
import approotpath from 'app-root-path'

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${approotpath}/public/asset`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });
export default upload;
