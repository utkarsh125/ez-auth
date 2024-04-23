The **Sign Up** API route was made with no errors, but it is highly recommended that the usage of **axios** is involved into the development stage instead of fetch as it automates most of the things that require more useless coding...

Go inside `api/controllers/auth.controller.js` and export a similar function for **Sign In** *as you did for Sign Up.*

```js
export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email });
		//VALIDITY CHECK
		if(!validUser) return next(errorHandlerler(401, "Invalid Credentials"));
		const validPassword = bcryptjs.compareSync(password, validUser.password);
	} catch (error) {
		next(error);
	}
}
```

A little explanation about the **PASSWORD** - since the password that we are storing is being encrypted through `bcryptjs` we need to check if the password is correct using a function called `compareSync`:
```js
const validPassword = bcryptjs.compareSync(password, validUser.password);
```

#### **JSON WEB TOKEN**

**Installation and Import** 
`npm install jsonwebtoken`

```js
import jwt from "jsonwebtoken";
```

**What is JWT?**
JSON Web Token (JWT) is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the **HMAC** algorithm) or a public/private key pair using **RSA** or **ECDSA**.

```js
const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
```

A **token** should use the *_id* as the parameter since it is unique for MONGODB and is different every single time, and apart from that you need a `JWT_SECRET` key in order to keep your token more secure.

**Remember to incorporate the usage of `cookie`**
```js
res.cookie('access_token', token, { httpOnly: true }).status(200).json(validUser);
```

Now head into **Insomnia** and `POST` a request on `api/auth/signin` with the following parameters (given that the user is already present in the database).

```
{
	"email" : "user1@gmail.com",
	"password" : "123123"
}
```

OUTPUT
```
{
	"_id": "6627fb2e5fa11ac238d8a58a",
	"username": "utkarsh",
	"email": "user1@gmail.com",
	"password": "$2a$10$XtIN8lmgJuh9eUv1pBfFF.AxqmpVoaex4Is2xvc93CHq8vh0wQXTm",
	"createdAt": "2024-04-23T18:17:18.876Z",
	"updatedAt": "2024-04-23T18:17:18.876Z",
	"__v": 0
}
```

Under the **Cookies Section** you can see something like this
![[Pasted image 20240423235053.png]]

But the problem is that you are getting the **PASSWORD** back, even if it is encrypted you need to hide it!

Too fix that just add this line after **token**
```js
const { password: hashedPassword, ...rest } = validUser._doc;
```
*Always add _doc as it helps to clear the unnecessary information.*

and instead of passing in the **validUser** pass the **rest**
```js
res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
```
