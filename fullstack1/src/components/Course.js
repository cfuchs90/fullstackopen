import React from 'react';


const Header = function({ headername }) {
  return(
      <h1>{headername}</h1>
  );
}
;

const Part = function(props) {
  return(
    <>
      <p>{props.part} {props.exercises} </p>
    </>
  );
};

const Total = function(props) {
    const total = props.parts.reduce((prev, cur) => {
	return prev + cur.exercises;
    }, 0);

  return (
      <>
      <p>Number of exercises: {total}</p>
      </>
  );
};

const Content = function({ parts }) {

    return(
        <div>
          {parts.map(part =>
              <Part key={part.id} part={part.name} exercises={part.exercises}/>
          )}
        </div>
    );

};

const Course = function( { course }) {
    console.log(course);
    return(
	<div>
          <Header headername={course.name}/>
          <Content parts={course.parts}/>
	  <Total parts = {course.parts} />,
	</div>
    );
};


export { Course };
