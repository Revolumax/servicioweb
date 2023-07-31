// app.js

// Importar la librería Express
const express = require('express');
const axios = require('axios');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();



app.use(express.static('public'));

// Configurar Express para utilizar Express Handlebars como el motor de plantillas
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", "views");

// Configurar body-parser para analizar datos de formularios codificados en formato URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Definir una ruta y su respuestas


app.get('/agregar-datos', async (req, res) => {

  try {
    // Hacer la solicitud GET a la API con axios
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    const users = response.data;

    // Renderizar la vista 'users' y pasar los datos de usuarios como contexto
    res.render('index', { users });
  } catch (error) {
    // Si ocurre un error, renderizar una vista de error
    res.render('error', { message: 'Error al obtener los datos de la API' });
  }
});


// Ruta para manejar la solicitud POST y enviar datos a la API pública
app.post('/api/agregar-datos', async (req, res) => {
  const { nombre, apellido, telefono } = req.body;

  // Validar que se envíen los datos requeridos desde el formulario
  if (!nombre || !apellido || !telefono) {
   
  }

  try {
    // Realizar la solicitud POST a la API pública para enviar los datos
    const response = await axios.post('http://www.raydelto.org/agenda.php/agregar-datos', { nombre, apellido, telefono });

    // Si la solicitud fue exitosa, devolver la respuesta de la API pública
    res.json(response.data);
  } catch (error) {
    // Si ocurre un error en la solicitud a la API pública, devolver un mensaje de error
    res.status(500).json({ error: 'Error al enviar datos a la API pública' });
  }
});




// Iniciar el servidor y escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
  });











