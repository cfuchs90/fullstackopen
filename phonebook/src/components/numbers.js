import React from 'react';

function DeleteNumberButton({ id, handler }) {
    console.log(handler);
    return(
	<>
          <button onClick={handler}>delete number</button>
 
	</>
    );
}

function Number( { contact, deleteHandler }) {
    console.log(deleteHandler);
    return(
        <div>
	  <li>{contact.name} {contact.number} <DeleteNumberButton id={contact.id} handler={deleteHandler}/></li>,
        </div>
    );
}


function FilterContacts(props) {
    const currentFilter = props.currentFilter;
    const updateFilterField = props.updateFilterField;
    return(
        <div>
          search: <input name="" type="text" value={currentFilter} onChange={updateFilterField}/>
        </div>
    );
}

function PersonForm(props) {
    const newName = props.newName;
    const updateNameField = props.updateNameField;
    const newNumber = props.newNumber;
    const updateNumberField = props.updateNumberField;
    const addPerson = props.addPerson;
    
    return(
      <form>
        <div> name: <input name="" type="text" value={newName} onChange={updateNameField}/> </div>
	<div> phone number: <input name="" type="text" value={newNumber} onChange={updateNumberField}/> </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
    );
}

export { FilterContacts, Number, PersonForm };
