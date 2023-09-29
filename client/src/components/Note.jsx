import React, { useState, useEffect } from 'react';
import editIcon from '../assets/images/edit.svg';
import deleteIcon from '../assets/images/delete.svg';
import done from '../assets/images/done.svg';
import close from '../assets/images/close.svg';

export default function Note(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [editingState, setEditingState] = useState({ id: props.id })

    useEffect(() => {
        resetState()
    }, [props.id, props.title, props.content])

    const resetState = () => {
        setEditingState({
            id: props.id,
            title: props.title,
            content: props.content
        })
    }

    const handleChange = (key, value) => {
        setEditingState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <div className="note">
            <div className="noteHeader">
                {isEditing ? <input className='noteTitleInput' value={editingState?.title}
                    onChange={e => { handleChange("title", e.target.value) }} />
                    : <h2 className="noteTitle">{editingState?.title}</h2>}
                {isEditing
                    ? <>
                        <button className="noteButton" onClick={() => {
                            props.onEdit(editingState)
                            setIsEditing(false)
                        }} >
                            <img src={done} alt="done" />
                        </button>
                        <button className="noteButton" onClick={() => {
                            resetState()
                            setIsEditing(false)
                        }} >
                            <img src={close} alt="close" />
                        </button>
                    </>
                    : <>
                        <button className="noteButton" onClick={() => {
                            setIsEditing(true)
                        }} >
                            <img src={editIcon} alt="edit" />
                        </button>
                        <button className="noteButton" onClick={() => {
                            props.onDelete(props.id)
                        }}>
                            <img src={deleteIcon} alt="delete" />
                        </button>
                    </>
                }
            </div>
            <hr />
            {isEditing ? <textarea className='noteContentInput' value={editingState?.content} onChange={e => { handleChange("content", e.target.value) }} />
                : <div className="noteContent">{editingState?.content?.split('\n')?.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index !== props.content?.split('\n')?.length - 1 && <br />}
                    </React.Fragment>
                ))}</div>}
        </div>
    )
}