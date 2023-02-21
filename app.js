const express = require('express');
const app = express();
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session  = require('express-session');
const path = require('path')
const route = require('./routes')
const port = 3000
require('dotenv/config')

app.use(methodOverride('_method'))

// Static file
app.use(express.static(path.join(__dirname, 'public')))

const pagination = require('./helpers/handlebars.helper');

// View Engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: pagination
  }),
);
app.set('view engine', 'hbs');

// Midleware
app.use(morgan('tiny'))

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(cookieParser());
app.use(session(
    {
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    }
))

// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});



// Routes
route(app)

mongoose.set('strictQuery', false)
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connecting successfully !!!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('Server is running http://localhost:3000')
})
