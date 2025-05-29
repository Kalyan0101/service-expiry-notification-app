import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import db_connect from './src/DB/db.connect.js';
import { session_store } from './src/DB/db.config.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "jkewrtg87tygdvoq734hgqero87",
    store: session_store,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        // secure: true
        // maxAge: 1000 * 60 * 60 // 1 hour
        httpOnly: true
    },
  })
);
app.use('/static', express.static(path.join(__dirname, 'public')));


import auth_router from './src/routes/auth.route.js';
import user_router from './src/routes/user.route.js';
import customer_router from './src/routes/customer.route.js';

app.use('/auth', auth_router);

// secure route
app.use('/', user_router);
app.use("/customer", customer_router);

// default route / 4O4 route
app.use((req, res) => {
    res.redirect("/auth/login");
})

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