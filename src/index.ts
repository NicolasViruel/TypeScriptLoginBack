import app from './app';
import ConnectDB from './database/database';
require("dotenv").config();

function main() {
    app.listen(app.get('port'));
    console.log('Server on port ', app.get('port'));
}

ConnectDB()
main();