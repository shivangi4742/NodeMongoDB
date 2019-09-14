module.exports = (app) => {
    const n = require('../controllers/note.controller.js');

    // Create a new Note
   // app.post('/notes', n.create);

    // Retrieve all Notes
    app.get('/rest_api', n.findAll);
    app.get('/vinayak', n.vinayakdetails);
    // Retrieve a single Note with noteId
    // app.get('/notes/:noteId', notes.findOne);

    // // Update a Note with noteId
    // app.put('/notes/:noteId', notes.update);

    // // Delete a Note with noteId
    // app.delete('/notes/:noteId', notes.delete);
}