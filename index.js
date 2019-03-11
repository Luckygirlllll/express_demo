const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const express = require('express');
const logger = require('./middleware/logger'); 
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true})); // key=value&key=value  
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/courses', courses);
app.use('/', home);


// Configuration
console.log('application name ' + config.get('name'));
console.log('Mail server ' + config.get('mail.host'));

// custom middelware function
if(app.get('env') === 'development'){
    app.use(logger);
}

// Do work...
//dbDebugger('Connected to the database...')


// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
