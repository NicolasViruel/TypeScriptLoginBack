import express, {Application} from 'express'
import morgan from 'morgan';
import authRoutes from './routes/auth';
import cors from 'cors'
const bodyParser = require("body-parser")
const app: Application = express();

//settings
app.set('port', 4000);

//middlewares
app.use(bodyParser.urlencoded( {extended:true} ));
app.use(bodyParser.json());
app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials: true
}))
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/auth' , authRoutes);

export default app;