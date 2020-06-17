const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  // Create a new repository
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  //Add repository into the array
  repositories.push(repository)

  // Response the new repository
  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  // Request Params
  const { id } = request.params
  // Request body
  const { title, url, techs } = request.body

  // Search the desired repo
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  // If exists error
  if(repoIndex < 0){
    return response.status(400).send()
  }


  // Update the repo
  repositories[repoIndex].title = title
  repositories[repoIndex].url = url
  repositories[repoIndex].techs = techs

  // Return the updated repo
  return response.json(repositories[repoIndex])
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  // If exists error
  if(repoIndex < 0){
    return response.status(400).send()
  }
  // Remove repo
  repositories.splice(repoIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // Request Params
  const { id } = request.params

  // Search for the desired repo
  const repoIndex = repositories.findIndex(repo => repo.id === id)
  
  // If exists error
  if(repoIndex < 0){
    return response.status(400).send()
  }

  //Add the number of likes 
  repositories[repoIndex].likes = repositories[repoIndex].likes + 1

  return response.send(repositories[repoIndex])
});

module.exports = app;
