const Express = require('express');
const router = require('./routes');
const PORT = 8080;

const app = Express();

app.listen(PORT, console.log(`App started at http://127.0.0.1:${PORT}`));

router(app);