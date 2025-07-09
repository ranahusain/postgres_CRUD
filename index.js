const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//CREATE A TODO

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) values ($1)",
      [description]
    );
    console.log(req.body);
    res.status(201).json({ success: true });
  } catch (error) {}
});

//GET ALL TODO
app.get("/todos", async (req, res) => {
  try {
    const alltodos = await pool.query("SELECT * FROM todo");
    res.json(alltodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// GET A TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
    console.log(req.params);
  } catch (error) {
    console.log(error.message);
  }
});

//UPDATE A TODO

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatetodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("todo was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//DELETE A TODO

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletetodo = await pool.query("DELETE FROM todo where todo_id = $1", [
      id,
    ]);
    res.json("todo was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started");
});
