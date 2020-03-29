require('dotenv').config()
import DIContainer from './DIContainer';

const app = DIContainer.container.App;

app.listen();
