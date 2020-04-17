const fs = require('fs');
const heroes = JSON.parse(fs.readFileSync('./public/data/heroes.json', 'utf-8'));

let heroesController = {
    list: (req, res) => {
        res.send(heroes);
    },
    detail: (req, res) => {
        let heroe = req.params.id;
        let encontrado = false;
        let respuestaPositiva;
        let respuestaNegativa;
        heroes.forEach(function (cadaHeroe) {
            if(cadaHeroe.id == heroe) {
                respuestaPositiva = 'Hola, mi nombre es ' + cadaHeroe.nombre + ' y soy ' + cadaHeroe.profesion;
                res.render('heroes', { title: respuestaPositiva });
                encontrado = true;
            }
        })
        if (encontrado == false) {
            respuestaNegativa = 'No se puede encontrar el heroe requerido';
            res.render('heroes', { title: respuestaNegativa });
        }
    },
    bio: (req, res) => {
        let encontrado = false;
        let heroe = req.params.id;
        let parametroResenia = req.params.ok;
        let respuestaPositivaUno;
        let respuestaNegativa;
        let respuestaPositivaDos;
        heroes.forEach(function (cadaHeroe) {
            if(cadaHeroe.id == heroe && parametroResenia != 'ok') {
                respuestaPositivaUno = cadaHeroe.nombre + ' ' + 'Lamento que no desees saber mas de mi :(';
                res.render('heroes', { title: respuestaPositivaUno });
                encontrado = true;
            }else if (cadaHeroe.id == heroe && parametroResenia == 'ok') {
                respuestaPositivaDos = cadaHeroe.nombre + ' ' + cadaHeroe.resenia;
                res.render('heroes', { title: respuestaPositivaDos });
                encontrado = true;
            }
        })
        if (encontrado ==  false) {
            respuestaNegativa = 'No encontramos un heroe para mostrarte su biografia';
            res.render('heroes', { title: respuestaNegativa });
        }
    }
}

module.exports = heroesController;