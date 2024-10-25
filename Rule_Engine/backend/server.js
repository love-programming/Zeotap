const express = require('express');
const ruleRoutes = require('./src/routes');
const db = require('./config/db');
const cors = require('cors');

const app = express();

const PORT = 2000;

app.use(cors({
    origin: 'http://localhost:3000', 
}));


app.use(express.json()); // Middleware to parse JSON request bodies

// Use the rule routes
app.use('/', ruleRoutes);


async function startServer() {
    try {
        await db.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on : http://localhost:${PORT}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log('Server startup error: address already in use');
            } else {
                console.log(err);
            }
        });
    } catch (error) {
        console.error('Unable to sync the database:', error);
    }
}

startServer();





// Sync the database and start the server
// db.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// })
// .catch((error) => {
//     console.error('Unable to sync the database:', error);
// });
