require('dotenv').config()
import DIContainer from './DIContainer';

const app = DIContainer.container.App;

module.exports = app.listen();
