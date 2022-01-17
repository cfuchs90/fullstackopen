import React from 'react';

const Note = function({ note, toggleImportance }) {
    const label = note.import ? "make not important" : "make important";

    return(
	<li>
	    {note.content}
	    <button onClick={toggleImportance}>{label}</button>
	    </li>
    );
};

export default Note;
