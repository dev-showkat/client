# React Application - React Client

This is the client-side of a web application built using React and Material-UI. The application includes user authentication and CRUD operations.

## Features

- User Authentication (Sign Up, Log In, Log Out)
- CRUD Operations for Items (Create, Read, Update, Delete)
- Alerts for HTTP Requests (Success/Error)
- Protected Routes for Authenticated Users

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v22.3.0)
- npm (Node Package Manager)(10.8.1)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dev-showkat/client.git
cd client
```

## Steps to run

- Go to client directory
```bash
cd client
```
- Install Dependencies
```bash
npm install
```
- Run the project
```bash
npm start
```
     
## Folder structure

```
server/
├── node_modules/
├── public/                             # public folder
├── src/ 
│    ├── components/
│    │   ├── AlertMessage.js            # Show Alert Messages
│    │   ├── ConfirmationDialog.js      # Confirmation Dialog
│    │   ├── NavBar.js                  # NavBar
│    │   ├── PrivateRoute.js            # Authorized Routes
│    │   ├── PublicRoute.js             # Public Routes
│    ├── screens/
│    │   ├── HomeScreen.js              # Home Screen
│    │   ├── ItemsScreen.js             # Display items list
│    │   ├── LoginScreen.js             # Login User
│    │   ├── RegisterScreen.js          # Register User
│    │   ├── SaveItemScreen.js          # Save or Update item Screen
│    ├── slices/
│    │   ├── alertSlice.js              # Authentication slice
│    │   ├── itemSlice.js               # Items slice
│    │   ├── userSlice.js               # Users slice
│    ├── utils/
│    │   ├── axiosInstance.js           # Global axios config
│    ├── App.css/                       # App Styling
│    ├── App.js/                        # App Component
│    ├── App.test.js                    # Testing
│    ├── index.css                      # Index Css
│    ├── logo.svg                       # Logo
│    ├── reportWebVitals.js             # report Web Vitals
│    ├── setupTests.js                  # setup Tests
│    ├── store.js                       # Global store for App State
├── .gitignore                          # Git ignore file
├── LICENSE                             # License
├── package-lock.json                   # NPM package configuration mete data
├── package.json                        # NPM package configuration
├── README.md                           # Project README file