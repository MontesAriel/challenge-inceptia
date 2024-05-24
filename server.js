import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'build'), {
    cacheControl: true,
    setHeaders: function (res) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    }
}));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
