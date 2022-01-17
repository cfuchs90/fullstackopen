// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FilterContacts, Number, PersonForm } from './components/numbers';
import numberService from './services/numberService';





function App() {
    // State
    const [persons, setPersons] = useState([]);
    // 	{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    // 	{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // 	{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // 	{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    // ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [currentId, setCurrentId] = useState(4);
    const [currentFilter, setFilter] = useState('');

    // fetch data from json-server

    useEffect(() => {
	numberService.getAllNumbers().
	    then(allNumbers => {
		console.log(allNumbers);
		setPersons(allNumbers);
	    })
	    .catch(error => console.log(error));
    }, []);



    // Event Handlers
    const updateNameField = function(e) {
        const newText = e.target.value;
        setNewName(newText);
    };

    const updateNumberField = function(e) {
        const newNumber = e.target.value;
        setNewNumber(newNumber);
    };

    const updateFilterField = function(e) {
        const newFilter = e.target.value.toLowerCase();
        setFilter(newFilter);
    };

    const addPerson = function(e) {
        e.preventDefault();
	const found = persons.find(item => item.name === newName);

        if(found) {
	    alert(`The person ${found.name} exists already in the numbers database`);
        } else {
	    const newId = currentId + 1;
	    const newPerson = {
		// id: currentId + 1,
		name: newName,
                number: newNumber.toString()
	    };

            axios.post("http://localhost:3001/persons", newPerson)
                .then(response => {
                    console.log(response);
		    setPersons(persons.concat(newPerson));
		    setCurrentId(newId);
		    setNewName('');
		    setNewNumber('');
                })
                .catch(error => {
                    console.log(error);
                });

        }
    };

    const deletePerson = function(e, id) {
	e.preventDefault();
	console.log(id);
    };

	const personsToShow = persons.filter(person => person.name.toLowerCase().includes(currentFilter));

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
	  <FilterContacts currentFilter={currentFilter} updateFilterField={updateFilterField} />
      </form>
      <div>
        <h3>Persons</h3>
      </div>
      <PersonForm newName={newName} updateNameField={updateNameField} newNumber={newNumber}
      updateNumberField={updateNumberField} addPerson={addPerson}/>
      <h2>Numbers</h2>
	  <ul>

	  {personsToShow.map((person, i) => {
	      return(<Number key={i} contact={person} deleteHandler={deletePerson} />);
	  })}
	  </ul>
    </div>
  );
}

export default App;


