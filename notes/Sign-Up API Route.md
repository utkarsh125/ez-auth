In this section, the entire creation of the **sign-up API Route** is explained. This is where authentication starts, for that, creation of a separate **authentication route** is required.

**NOTE: `import` methods are used in *modules*.**

**Initializing `auth.route.js`**

```js
import express from 'express';
const router = express.Router();
router.post('/signup');
export default router;
```

**Importing `authRoute` into `index.js`**

```js
import authRoute from "./routes/auth.route.js"
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js"
dotenv.config();
  
mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
console.log("Connected to MongoDB");
})
.catch((err) => {
console.log(err);
})
  
const app = express();
app.listen(3000, () => {
console.log('Server Listening on PORT 3000')
})  
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);
```

**Initializing the `auth.controller.js`**
*For the **POST** method we cannot use the browser to test our API Route since we do not have the UI for it yet. That is where the API testing tools like **ThunderClient, Insomnia, or Postman*** - in this case I prioritised **Insomnia** since that was all that was available to me at the time.

```js
export const signup = (req, res) => {
	console.log(req.body);
}
```

**Note** - *remember to use this inside* `index.js` *so that you can pass in the* `JSON POST `*requests.*

```js
app.use(express.json());
```

After sending a `POST` request to `/api/auth/signup` we receive this on the terminal

```
{ username: 'user1', email: 'user1@gmail.com', password: 'utkarsh' }
```

To store the above data, we need to de-structure the request body. For that head to the `auth.controller.js` and de-structure it like this
```js
import User from "../models/user.model.js"

export const signup = async(req, res) => {
    // console.log(req.body);
    const { name, email, password } = req.body;
    const newUser = new User( { name, email, password} );
    await newUser.save() //Remember that this is an synchronous function!
    //after that send a response code.
    
}
```

On sending `POST` we get this response, this creates the user - also check the **MongoDB Database** for any changes.

```
{
	"message": "User created successfully."
}
```

Make sure you have the **MongoDB Extension for VSCode**
Go to the connection and check the `user` schema

```
{
"_id": {
"$oid": "662000aa45cb617ee2abb15e"
},
"username": "user1",
"email": "user1@gmail.com",
"password": "utkarsh",
"createdAt": {
"$date": "2024-04-17T17:02:34.427Z"
},
"updatedAt": {
"$date": "2024-04-17T17:02:34.427Z"
},
"__v": 0
}
```

As evident, the data is being stored to the MongoDB database, also if we tried to make the same `POST` request then it would not register it since we set the parameters to **unique: true**.

**Brushing up `auth.controller.js`**
Always remember to put the Response inside a `try-catch` block.

```js
import User from "../models/user.model.js"
export const signup = async(req, res) => {
// console.log(req.body);
const { username, email, password } = req.body;
const newUser = new User( { username, email, password} );

try{
	await newUser.save();
	res.status(201).json({message: "User created successfully."});

}catch(error){

	// res.status(500).json({message: "User already exists"});
	res.status(500).json({message: "User already exists"});

	}
}
```

After sending the request again, on the **Insomnia Application** we are prompted with `User already exists`

##### Hashing the Passwords

In cases if our databases are compromised, we wouldn't want the passwords to be stolen so for that we *encrypt or hash* them. For that, `bcryptjs` is predominantly used.

**Installing `bcryptjs`**

Make sure you install it in root `/ez-auth/`
`npm install bcryptjs`

Go inside `auth.controller.js` and make a new variable to store the *hashedPassword*. There are two ways to do this

```js
const hashedPassword = bcryptjs.hashSync(password, 10); --> BETTER!
//OR
const hashedPassword = await bcryptjs.hash(password, 10);
```

Instead of saving the password, we save the *hashedPassword*
```js
const newUser = new User({ username, email, password: hashedPassword });
```

The passwords stored are now hashed.
```
{
"_id": {
"$oid": "66200b6773812776c2fff724"
},
"username": "user1",
"email": "user1@gmail.com",
"password": "$2a$10$wSopc2Y79uRaQXaSC0b2jOyChraJbgcYrwqInHPXLehk6nmGnodT2",
...
```

Another *middleware* for **Internal Server Error**
```js
app.use((err, req, res, next) => {
const statusCode = err.statusCode || 500;
const message = err.message || "Internal Server Error";
return res.status(statusCode).json({
success: false, //indicates that the request was not successful.
message,
statusCode,
})
})
```

errorHandler ---> `error.js` 

```js
export const errorHandler = (statusCode, message) => {
const error = new Error();
error.statusCode = statusCode;
error.message = message;
return error;
}
```

Modifying the `auth.controller.js`

```js
try{
	await newUser.save();
	res.status(201).json({message: "User created successfully."});
}catch(error){
	// res.status(500).json({message: "User already exists"});
	// res.status(500).json(error.message);
	next(errorHandler(300, "Something went wrong."));
}
```

```js
// eslint-disable-next-line no-unused-vars

import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
const [formData, setFormData ] = useState({});
const handleChange = (e) => {
setFormData( {...formData, [e.target.id]: e.target.value } );
}
console.log(formData);
return (...)
```


1. **`...formData`:** This part is using the spread operator (`...`) to create a new object that contains all the key-value pairs from the existing `formData` state object. It essentially creates a shallow copy of the `formData` object.

2. **`[e.target.id]: e.target.value`:** This part is creating a new key-value pair where the key is dynamically determined by `e.target.id`, and the value is the current value of the input field, `e.target.value`. Here, `e.target` refers to the DOM element that triggered the event (in this case, the input field), and `e.target.id` retrieves the ID of that element.

3. **`setFormData(...)`:** This is a function provided by React's `useState` hook that updates the state variable `formData` with the new object created by combining the existing state (`...formData`) with the new key-value pair. It essentially updates the state with the new data entered into the input field.

**Making a handleSubmit function for the form**

```js
const handleSubmit = async (e) => {
e.preventDefault(); //this is going to prevent refreshing the page on submit
//Making request to the backend.
const res = await fetch("http://localhost:4000/api/auth/signup", formData);
const data = await res.json();//To convert to JSON
console.log(data);
}
```

But on submitting the form, we get something like this
`Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:4000/api/auth/signup. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing). Status code: 200`

This happens because we are sending data from `localhost:5173` to `localhost:4000` and *CORS Policy* prohibits that.

To fix that we need to install the `cors package` through
`npm install cors` OR **as suggested, try using a Proxy first.**

