import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


import auth_router from './src/routes/auth.route.js';
import user_router from './src/routes/user.route.js';
import db_connect from './src/DB/db.connect.js';

app.use('/', user_router);
app.use('/auth', auth_router);
app.use('/static', express.static(path.join(__dirname, 'public')));

db_connect()
.then(() => {

    app.on("error", (err) => {
        console.log(`On err: ${err}`);        
    })

    app.listen(3030, () => {
        console.log(`\n\napp listern on http://localhost:${3030}`);
    });
    
})
.catch(err => {
    console.log(`index err: ${err}`);
})