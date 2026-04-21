// src/MyApp.jsx
import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      })
      .then(res => {
        if (res.status === 204) {
          setCharacters(prev =>
            prev.filter(user => user.id !== id)
          );
        } else if (res.status === 404) {
          console.error("User not found");
        }
      })
      .catch(err => console.error(err));
  }

  function updateList(person) {
   postUser(person)
    .then((newUsr) => {
      setCharacters(prev => [...prev, newUsr]);
    })
    .catch((error) => {
      console.log(error);
    }); 
  }

  function fetchUsers() {
  	const promise = fetch("http://localhost:8000/users");
  	return promise;
  }

  function postUser(person) {
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
