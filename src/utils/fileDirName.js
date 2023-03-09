import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default function fileDirName(meta){
    
    const filename = fileURLToPath(meta.url);
    const _dirname = dirname(filename)

    return {_dirname, filename}
}