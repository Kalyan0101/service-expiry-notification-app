import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import db_connect from "./src/DB/db.connect.js";
import { session_store } from "./src/DB/index.js";

//cron job import
import "./src/cronJob.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use("/static", express.static(path.join(__dirname, "public")));

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
            httpOnly: true,
        },
    })
);


import auth_router from './src/routes/auth.route.js';
import user_router from './src/routes/user.route.js';
import country_router from "./src/routes/country.route.js";
import state_router from "./src/routes/states.route.js";
import city_route from "./src/routes/city.route.js";
import service_route from "./src/routes/services.route.js";
import customer_route from "./src/routes/customer.route.js";
import order_route from "./src/routes/order.route.js";


app.use('/auth', auth_router);

// secure route
app.use('/', user_router);
app.use("/service", service_route);
app.use("/order", order_route);
app.use("/customer", customer_route);

app.use("/api", country_router);
app.use("/api", state_router);
app.use("/api", city_route);

// default route / 4O4 route
app.use((req, res) => {

    if(req.session.user) return res.redirect("/dashboard");
    
    return res.redirect("/auth/login");
})

const port = process.env.PORT || 3030
db_connect()
    .then(() => {
        app.on("error", (err) => {
            console.log(`On err: ${err}`);
        });

        app.listen(port, () => {
            console.log(`\n\napp listern on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(`index err: ${err}`);
    });
