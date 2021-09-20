const express = require('express')
const db = require('./db')
const app = express()
const port = 8080
//jeb
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// KAYTTAJAT

// GET
app.get('/kayttajat', async (req, res) => {
    try {
        const result = await db.pool.query("select * from kayttajat");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

 // POST COPY
// app.post('/kayttajat', async (req, res) => {
//     let kayttaja = req.body;
//     try {
//         const result = await db.pool.query("insert into kayttajat set kayttaja_taso = ?, kayttaja_tunnus = ?, kayttaja_salasana = ?, kayttaja_sahkoposti = ?", [kayttaja.kayttaja_taso, kayttaja.kayttaja_tunnus, kayttaja.kayttaja_salasana, kayttaja.kayttaja_sahkoposti]);
//         res.send(result);
//     } catch (err) {
//         throw err;
//     }
// });

// POST Toimiva duplikaatin estävä
app.post('/kayttajat', async (req, res) => {
    let kayttaja = req.body;
    try {
        const result = await db.pool.query("insert ignore into kayttajat set kayttaja_taso = ?, kayttaja_tunnus = ?, kayttaja_salasana = ?, kayttaja_sahkoposti = ?" ,[kayttaja.kayttaja_taso, kayttaja.kayttaja_tunnus, kayttaja.kayttaja_salasana, kayttaja.kayttaja_sahkoposti]);
        res.send(result);
    } catch (err) {
        throw err;
    }
});


app.put('/kayttajat', async (req, res) => {
    let kayttaja = req.body;
    try {
        const result = await db.pool.query("update kayttajat set description = ?, completed = ? where id = ?", [task.description, task.completed, task.id]);
        res.send(result);
    } catch (err) {
        throw err;
    } 
});
 
app.delete('/kayttajat', async (req, res) => {
    let id = req.query.id;
    try {
        const result = await db.pool.query("delete from kayttajat where id = ?", [id]);
        res.send(result);
    } catch (err) {
        throw err;
    } 
});

// ILMOITUKSET

// GET
app.get('/ilmoitukset', async (req, res) => {
    try {
        const result = await db.pool.query("select * from ilmoitukset");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// POST
app.post('/ilmoitukset', async (req, res) => {
    let ilmoitus = req.body;
    try {
        const result = await db.pool.query("insert into ilmoitukset set ilmoitus_laji = ?, ilmoitus_nimi = ?, ilmoitus_kuvaus = ?, ilmoitus_paivays = ?, ilmoittaja_id = ?", [ilmoitus.ilmoitus_laji, ilmoitus.ilmoitus_nimi, ilmoitus.ilmoitus_kuvaus, ilmoitus.ilmoitus_paivays, ilmoitus.ilmoittaja_id]);
        res.send(result);
    } catch (err) {
        throw err;
    }
});
 
 
app.listen(port, () => console.log(`Listening on port ${port}`));