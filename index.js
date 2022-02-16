require("dotenv").config();

const axios = require("axios");
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

function marvelGet(path, params) {
  if (!params) {
    params = {};
  }
  return axios.get(`https://lereacteur-marvel-api.herokuapp.com${path}`, {
    params: {
      ...params,
      apiKey: process.env.API_KEY,
    },
  });
}

app.get("/comics", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 100;
    const skip = page * limit - limit;
    const response = await marvelGet("/comics", {
      limit,
      skip,
    });
    res.json(response.data);
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await marvelGet(`/comics/${req.params.characterId}`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 100;
    const skip = page * limit - limit;
    const response = await await marvelGet("/characters", {
      limit,
      skip,
    });
    res.json(response.data);
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.get("/character/:id", async (req, res) => {
  try {
    const response = await marvelGet(`/character/${req.params.id}`);
    const id = req.params.id;
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server has started");
});
