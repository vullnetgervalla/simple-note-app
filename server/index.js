const express = require('express')
const data = require('./models/data.js')
const cors = require('cors'); 

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => 
    console.log(`Server listening in port: ${port}!`)
);

app.get('/', async (req, res) => {
    const list = await data.readData()
    res.send(list.reverse())
});

app.post('/', async (req, res) => {
    const note = req.body.note;
    const noteObj = await data.addNote(note);

        res.status(200).json({
        message: 'Note created successfully',
        note: JSON.stringify(noteObj)
    })
})

app.put('/', async (req, res) => {
    const note = req.body.note;
    const editedNote = await data.editNote(note);
    
    res.status(200).json({
        message: 'Note edited successfully',
        note: JSON.stringify(editedNote)
    })
})

app.delete('/', async (req, res) => {
    const id = req.body.id;
    const deletedNote = await data.deleteNote(id);
    
    res.status(200).json({
        message: 'Note deleted successfully',
        note: JSON.stringify(deletedNote)
    })
})