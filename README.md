﻿## CRUD operation using POSTGRES

1. SQL SHELL(psql)

```
    CREATE DATABASE db_name;
    \c db_name
    CREATE TABLE tablename();
```
2. Dependencies

```
      yarn add express
```

```
      yarn add pg
```

3. create a db.js file

```
      const { Pool } = require("pg");

      const pool = new Pool({
      host: "localhost",
      user: "postgres",
      port: 5111,
      password: "123456",
      database: "mydb",
      });

      pool.connect().then(() => console.log("database connected"));

      module.exports = pool;
```

---

4. index.js

```
      const express = require("express");
      const app = express();
      const cors = require("cors");
      const pool = require("./db");
      //middleware
      app.use(cors());
      app.use(express.json());

      //ROUTES//

      //CREATE
      //READ
      //UPDATE
      //DELETE


      app.listen(5000, () => {
      console.log("Server has started");
      });

```
