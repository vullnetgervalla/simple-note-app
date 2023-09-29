import { useState } from 'react';

export default function Input(props) {
    const [text, setText] = useState('');

    function handleInput(event) {
        const value = event.target.value;
        setText(value);
    }

    function handleSubmit() {
        if(text.trim()){
            props.onAdd(text);
            setText('');
        }
    }

    return (
        <div className="textAreaContainer">
            <textarea placeholder="Write a note" className="addNoteTextArea" onInput={handleInput} value={text} />
            <button onClick={handleSubmit} className="addNoteButton">Add</button>
        </div>
    )
}