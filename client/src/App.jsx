import { useEffect, useState } from 'react'
import './App.css'
import Input from './components/Input';
import Note from './components/Note';

function App() {
    const [list, setList] = useState([]);

    useEffect(() => {
        getNotes()
    }, []);

    const getNotes = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/');

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            setList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const onAdd = async (text) => {
        fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note: text })
        })
        .then(response => response.json())
        .then(data => {
            setList(prev => [JSON.parse(data?.note), ...prev])
        })
        .catch(error => console.error(error));        
    }

    const onEdit = async (note) => {
        fetch('http://127.0.0.1:5000/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note: note })
        })
        .catch(error => console.error(error)); 
    }

    const onDelete = async (id) => {
        fetch('http://127.0.0.1:5000/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
            const note = JSON.parse(data?.note)
            setList(prev => prev.filter(item => item.id !== note.id))
        })
        .catch(error => console.error(error));
    }

    const notes = list.map((item, index) => {
        return <Note key={item.id} id={item.id} title={item.title} content={item.content} onEdit={onEdit} onDelete={onDelete} />
    })

    return (
        <>
            <Input onAdd={onAdd} />
            {notes?.length? <h1>Notes</h1> : <h1>No notes here, yet...</h1>}
            {notes}
        </>
    );
}

export default App;
