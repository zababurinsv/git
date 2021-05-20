"use strict";
// Node Modules
import express from "express";
const router = express.Router();
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from "swagger-ui-express";
import User from '../Models/User.js'
import waves from '../swagger/waves.js'
// App Modules

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /feed/:
 *    post:
 *      summary: Get Feed
 *      tags: [Feed]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: Feed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post("/users", (req, res, next) => {
  const { email, name } = req.body;
  const user = new User(name, email);
  res.json(user);
});

/**
 * @swagger
 * path:
 *  /users/:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get("/users", (req, res, next) => {
  const userOne = new User("Alice", "alice@gmail.com");
  const userTwo = new User("Bob", "bob@gmail.com");
  res.json({ userOne, userTwo });
});

const specs = swaggerJsdoc(waves);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(specs, { explorer: true }));

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

export default router;
