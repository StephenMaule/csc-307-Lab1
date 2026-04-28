// src/MyApp.jsx
import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list || []))
      .catch(console.log);
  }, []);

  const removeOneCharacter = (id) => {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCharacters((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  function updateList(person) {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setCharacters((prev) => [...prev, newUser]);
      })
      .catch(console.log);
  }


  function fetchUsers() {
  	const promise = fetch("http://localhost:8000/users");
  	return promise;
  }

  function postUser(person) {
      console.log("SENDING TO BACKEND:", person); 
      return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then(res => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("Failed to create user");
        }
      }); 
  }

  return (
    <div className="container">
      <Table 
	  characterData={characters}
	  removeCharacter={removeOneCharacter}
	  />
	  <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
