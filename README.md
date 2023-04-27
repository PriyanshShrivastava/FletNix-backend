
# Fletnix Backend

This is the backend for the Fletnix application, a search and filtering app for TV shows and movies available on Netflix.


## Requirement

- Node.js v14 or later
- npm or Yarn package manager


## Installation

Install Fletnix Backend with npm

- Clone this repo
```bash
git clone https://github.com/PriyanshShrivastava/FletNix-backend.git

```

- Navigate to the project directory:
```bash
cd fletnix-backend

```

- Install the dependencies:

```bash
npm install

```

- Create a .env file in the project root and add the following environment variables:

```bash
PORT=any-port
MONGO_URL='Your_URL'
MONGO_PASSWORD= 'Your_Password'
JWT_SECRET=your-secret-key

```
Replace your-secret-key with your own secret key for JWT token generation.

- Start the server:

```bash
npm start

```

## Authors

- [Priyansh Shrivastava](https://www.github.com/PriyanshShrivastava)
## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

