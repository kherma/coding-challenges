import React, { useState } from 'react';
import data from './data';
import List from './List';
function App() {
  const [people, setPeople] = useState(data);
  console.log(people);
  return (
    <main>
      <section className="container">
        <h3> {people.length > 0 ? `${people.length}` : '0'} birthdays today</h3>
        {people.map((person) => (
          <List key={person.id} {...person} />
        ))}
        <button onClick={() => setPeople([])}>clear all</button>
      </section>
    </main>
  );
}

export default App;
