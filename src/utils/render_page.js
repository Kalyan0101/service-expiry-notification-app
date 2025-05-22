import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const render_page = async (pagename) => {
    return await ejs.renderFile(
        path.join(__dirname, `../views/pages/${pagename}.ejs`)
    );
}

export default render_page