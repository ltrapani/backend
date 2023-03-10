import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default function fileDirName(meta){
    const _filename = fileURLToPath(meta.url);
    const _dirname = dirname(_filename)

    return {_dirname, _filename}
}