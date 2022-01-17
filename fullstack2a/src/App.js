import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Note from './components/Note.js';
import noteService from './services/notes.js';
import axios from 'axios';



function App() {
    // State
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("...a new note");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
	noteService.getAll()
	    .then(initialNotes => {
		setNotes(initialNotes);
	    });
    }, []);
    // const hook = function() {
    // 	noteService.getAll()
    // 	    .then(response => {
    // 		setNotes(response.data);
    // 	    });
    // };

    // useEffect(hook, []);


    const handleNodeChange = function(event) {
      setNewNote(event.target.value);
    };


    const addNote = function(event) {
	event.preventDefault();

	const noteObject = {
	    content: newNote,
	    date: new Date().toISOString(),
	    important: Math.random() < 0.5,
	    // id: notes.length + 1
	};

	    noteService.create(noteObject)
		.then(returnedNote => {
		    setNotes(notes.concat(returnedNote));
		    setNewNote('');
		});

	    // axios.post("http://localhost:3001/notes", noteObject)
	    //     .then(response => {
	    // 	setNotes(notes.concat(response.data));
	    // 	setNewNote("");
	    //     });
    };

    const toggleImportanceOf = function(id) {
	const note = notes.find(n => n.id === id);
	const changedNote = {...note, important: !note.important};

	noteService.update(id, changedNote)
	    .then(returnedNote => {
		setNotes(notes.map(note => note.id !== id ? note : returnedNote));
	    })
	    .catch(error => {
		alert(`the note '${note.content}' was already deleted from server`);
		setNotes(notes.filter(n => n.id !== id));
	    });

    };


  const notesToShow = showAll ? notes : notes.filter(note => note.important == true);

  return (
    <div>
	<h1>Notes</h1>
	<button onClick={() => setShowAll(!showAll)}>
	    show {showAll ? "important" : "all"}
	</button>
	  <ul>
	  {notesToShow.map((note, i) =>
		  <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
	  )}
	<form onSubmit={addNote}>
	    <input value={newNote} onChange={handleNodeChange}/>
	    <button type="submit">save</button>
	</form>
	    </ul>
    </div>
  );
}

export default App;

		  // <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />