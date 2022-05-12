const express = require('express')
const router = express.Router()

const db = require('../database/db-connector')

// Get all nurses
router.get('/', (req, res) => {  
    const query1 = "SELECT * FROM Nurses;";

    db.pool.query(query1, (error, rows, fields) => {    
        res.render('Nurses', {data: rows});                  
    })                                                      
}); 


// Create new nurse
router.post('/add-nurse-form', (req, res) => {
    const data = req.body;

    const query1 = `INSERT INTO Nurses (nurseFName, nurseLName, licenseNumber, licenseExpiration) VALUES ('${data['input-fname']}', '${data['input-lname']}', '${data['input-licnum']}','${data['input-exp']}')`;
    
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/nurses');
        }
    })
});

// Update nurse license
router.put('/put-nurse-ajax', (req,res,next) => {
    const data = req.body;

    const queryUpdateWorld = `UPDATE bsg_people SET homeworld = ? WHERE bsg_people.id = ?`;
    const selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`
  
    // Run the 1st query
    db.pool.query(queryUpdateWorld, [homeworld, person], (error, rows, fields) => {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            db.pool.query(selectWorld, [homeworld], (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete existing nurse
router.delete('/:nurseID', (req, res) => {

    const nurseID = parseInt(req.params.nurseID);
    console.log(nurseID);
    res.sendStatus(200);

    // TODO: delete from database

});

module.exports = router