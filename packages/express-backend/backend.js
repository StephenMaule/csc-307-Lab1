import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Generates random large ish (5 digit) integer as an id 
function generateID(){
  return Math.floor(Math.random() * 10000).toString();
}

app.post("/users", (req, res) => {

  const userToAdd = {
	  id: generateID(),
	  ...req.body
  };

  addUser(userToAdd);


  res.status(201).send(userToAdd);
});


const findUserByNameAndJob = (name, job) => {
  return users.users_list.filter(
    (user) => user.name === name && user.job === job
  );
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if(index === -1) return false;

  users.users_list.splice(index, 1);
  return true;
};

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; 
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    const result = findUserByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const deleted = deleteUserById(id);

  if (!deleted) {
    res.status(404).send("User not found");
  } else {
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    },
    {
      "id": "qwe123",
      "job": "Zookeeper",
      "name": "Cindy"
    }
  ]
};
