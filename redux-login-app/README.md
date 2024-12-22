# README.md

# Redux Login App

This project is a simple React application that implements login functionality using Redux for state management. The application utilizes Ant Design for the UI components.

## Project Structure

```
redux-login-app
├── public
│   ├── index.html          # Main HTML file
├── src
│   ├── components
│   │   └── Login.jsx      # Login component with form
│   ├── redux
│   │   ├── actions
│   │   │   └── authActions.js  # Action creators for authentication
│   │   ├── reducers
│   │   │   ├── authReducer.js   # Reducer for authentication state
│   │   │   └── rootReducer.js    # Combines all reducers
│   │   └── store.js        # Configures and exports the Redux store
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point of the React application
├── package.json            # npm configuration file
├── .babelrc                # Babel configuration file
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd redux-login-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- The application provides a login form where users can enter their username and password.
- Upon submission, the form validates the input and dispatches authentication actions to the Redux store.

## Technologies Used

- React
- Redux
- Ant Design
- Redux Thunk (for asynchronous actions)

## License

This project is licensed under the MIT License.