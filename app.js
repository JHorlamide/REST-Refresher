import express from 'express';
import routes from './routes/route.js';

const app = express();

const PORT = process.env.PORT || 3000;

/* Initialize Middleware */
app.use(express.json());

/* Define Routes */
app.use('/api/genres', routes);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})