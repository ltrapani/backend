import { create } from 'express-handlebars';
import fileDirName from '../../utils/fileDirName.js';

const { _dirname } = fileDirName(import.meta);
export default function configureHandlebars(app) {
    const hbs = create({
        partialsDir: [`${_dirname}/../../views/partials`],
    });
    app.engine('handlebars', hbs.engine);
    app.set('views', `${_dirname}/../../views`);
    app.set('view engine', 'handlebars');
}
