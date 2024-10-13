const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routers/index');
const port = process.env.PORT || 8080;
const app = express();
const dotenv = require('dotenv')
const createError = require('http-errors');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Importing the database connection
// const mongodb = require('./connectionDB/mongodb');

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport);

connectDB()

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to detect requests from Swagger UI
app.use((req, res, next) => {
    const userAgent = req.get('User-Agent');
    if (userAgent && userAgent.includes('Swagger UI')) {
        // Respond with JSON data for Swagger UI requests
        return res.json({ message: 'This is a JSON response for Swagger UI' });
    } else {
        // Continue with normal request processing
        return next();
    }
});

// Method Override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
)

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);



process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

app.use((req, res, next) => {
    // const err = new Error('Not found');
    // err.status = 404;
    // next(err);
    next(createError(404, "Not found"));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');


app.listen(port, console.log('Running'));