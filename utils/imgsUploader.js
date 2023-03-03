import multer from 'multer'
import * as path from 'path'
import fileDirName from './fileDirName.js'


const {_dirname} = fileDirName(import.meta);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(_dirname , '..', 'public', 'img'))
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

export const imgsUploader = multer({storage})