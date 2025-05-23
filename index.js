import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


import user_router from './src/routes/user.route.js';
import auth_router from './src/routes/auth.route.js';

app.use('/', user_router);
app.use('/auth', auth_router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3030, () => {
    console.log(`app listern on http://localhost:${3030}`);
})