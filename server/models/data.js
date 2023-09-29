const fs = require('fs').promises

async function readData() {
    try {
        const data = await fs.readFile('./models/notes.json', { encoding: 'utf-8' })
        const list = JSON.parse(data);
        return list;
    }
    catch (err) {
        console.error(err);
        return;
    }
}

async function writeData(list) {
    try {
        await fs.writeFile('./models/notes.json', JSON.stringify(list));
    } catch (err) {
        console.error(err);
    }
}

async function addNote(item) {
    const titleEndList = ['\n', '.', ',', '!', '?', ':', ';']
    const note = item.trim()
    const list = await readData()
    let titleEndIndex = 0;

    for (let i = 0; i < note.length; i++) {
        if (titleEndList.includes(note.charAt(i))) {
            titleEndIndex = i
            break
        }
    }
    if (titleEndIndex === 0) {
        titleEndIndex = note.length
    }

    const title = note.slice(0, titleEndIndex).trim();
    const content = note.slice(titleEndIndex + 1).trim();

    const newItem = {
        id: list?.[list.length - 1]?.id + 1 || 0,
        title: title,
        content: content,
        createdAt: new Date().toISOString(),
        editedAt: null
    }
    list.push(newItem)

    writeData(list)

    return newItem
}


async function editNote(item) {
    const list = await readData();
    const index = list.findIndex(note => note.id === item.id)

    list[index] = {
        ...list[index],
        title: item.title,  
        content: item.content,
        editedAt: new Date().toISOString()
    }

    await writeData(list)

    return list[index]
}

async function deleteNote(id) {
    const list = await readData();
    const index = list.findIndex(note => note.id === id)

    const deletedNote = list.splice(index, 1)

    await writeData(list)

    return deletedNote?.[0]
}

module.exports = {
    readData,
    addNote,
    editNote,
    deleteNote
};