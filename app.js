
// Solución temporal para resolver error DNS querySrv ECONNREFUSED
// Debo consultar otra solución con el profe Martín
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

//Aquí se importa la herramienta de modelado de datos mongoose
const mongoose = require('mongoose');

// Aquí se establece la cadena de conexión a la base de datos
mongoose.connect('mongodb+srv://grupo-02:grupo-02@cluster0.blryo.mongodb.net/NodeMod3Cohorte5')
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:', error));

// Aquí se define el esquema y modelo para estructurar la colección en la BD
// Definición de documentos dentro de la colección de superhéroes
const superheroSchema = new mongoose.Schema ({
    nombreSuperHeroe: { type: String, require: true },
    nombreReal: { type: String, require: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creator: String
    }, { collection: 'Grupo-02'});

// Aquí se crea el modelo
const SuperHero = mongoose.model ('SuperHero', superheroSchema);


/*** METODOS CRUD (create, read, update, delete) ***/

// Función asíncrona para insertar nuevo Superhéroe
async function insertSuperHero () {
    const hero = new SuperHero ({ // se crea nueva instancia del modelo a la colección
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioctiva',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Superfuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde'],
        creator: 'MarcosBat'
    });
    //Se envía el documento a MongoDB, se guarda en la coleccióng y se genera automáticamente un _id
    await hero.save ();
    console.log ('Superhéroe insertado:', hero); // muestra el resultado
}

insertSuperHero(); // Invocación de la función


// Aquí se define la función asíncrona que recibe un parámetro, en este caso el nombre
async function updateSuperHero (nombreSuperHeroe) {
    const result = await SuperHero.updateOne( //actualizar el documento que cumpla la condición
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 26 } } // se modificar ese campo con el nuevo valor.
    );
    console.log ('Resultado de la actualización:', result); // muestra el resultado de la actualización
}

updateSuperHero ('Spiderman'); // Invocación de la función


// Aquí se define la función asíncrona para eliminar algún superhéroe
async function deleteSuperHero (nombreSuperHeroe) {
    const result = await SuperHero.deleteOne(
        { nombreSuperHeroe: nombreSuperHeroe }
    );
    console.log ('Superhéroe eliminado:', result);
}

deleteSuperHero ('Spiderman'); // Invocación de la función


// Aquí se define la función asíncrona para buscar algún superhéroe por parámetro específico
async function findSuperHeroes () {
    const heroes = await SuperHero.find(
        { planetaOrigen: 'Tierra' }
    );
    console.log ('Superhéroes encontrados:', heroes);
}

findSuperHeroes(); // Invocación de la función