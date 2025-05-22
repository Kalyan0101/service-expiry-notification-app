import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render('layout', { body: "hello world" });
})

import auth_router from './src/routes/auth.route.js'
import user_router from './src/routes/user.route.js'

app.use('/auth', auth_router);
app.use('/', user_router);

app.listen(3030, () => {
    console.log(`app listern on http://localhost:${3030}`);
})