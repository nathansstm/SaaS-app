# SaaS-app

This project demonstrates a basic React setup without using `npx`. It focuses on the use of Webpack for bundling JavaScript modules, including React components, and serves the app locally on port 5000 using Webpack's development server and Uses a Node Proxy for webhooks on port 3000.

## Features

- **Custom React Setup**: No reliance on `create-react-app`. Manual setup using Webpack and Babel.
- **Webpack Bundling**: Configured to handle React JSX, ES6, and CSS.
- **Development Server**: Uses Webpack Dev Server for hot-reloading, running on port 5000.
- **Custom Host Configuration**: Requires setting the `host` key in the `devServer` object in `webpack.config.js` to `yourhost.domain.com`.
- **Custom Proxy Webhooks**: Enables session management using json webtokens with cookies and integrates with Stripe webhooks.

## Project Setup Steps

### 1. Initialize Project:
Create the necessary directories and files for the project.

```bash
mkdir app src public
cd app
mkdir webhooks
cd src
mkdir pages
cd pages
mkdir components
```

### 2. Install Dependencies:
Use npm to install the required modules:

```bash
npm init -y
npm install --save-dev @babel/core babel-loader @babel/cli @babel/preset-env @babel/preset-react
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev html-webpack-plugin
npm install --save-dev style-loader css-loader
npm install @svgr/webpack --save-dev
npm install url-loader --save-dev
npm install react react-dom react-router-dom @mui/material @emotion/react @emotion/styled js-cookie node-forge
npm install @mui/icons-material
npm install js-yaml
npm install gsap
npm install @mui/material @emotion/react @emotion/styled chart.js react-chartjs-2
```

### 3. Create the HTML File:
Inside the `public` directory, create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

### 4. Configure Babel:
Create a `.babelrc` file in the root directory with the following content:

```json
{
  "presets": ["@babel/preset-env","@babel/preset-react"]
}
```

### 5. Webpack Configuration:
Create `webpack.config.js` in the root directory:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  target: 'web',
  devServer: {
    port: '5000',
    host: 'yourhost.domain.com',
    static: {
      directory: path.join(__dirname, 'public')
    },
    open: true,
    hot: true,
    liveReload: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        secure: false, // For non-HTTPS, set to false
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: 'babel-loader', 
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    })
  ]
};
```

### 6. Create React Components:
In the `src` directory, create `App.js`:

```javascript
import React from "react";

const App = () =>{
    return (
        <h1>
            Hello world! I am using React
        </h1>
    )
}

export default App
```

And in the root directory create the entry point, `index.js`:

```javascript
import React from 'react'
import  { createRoot }  from 'react-dom/client';
import App from './src/App.js'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
```

### 7. Use these Webpack Scripts Settings:
Ensure that `package.json` has:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server .",
    "build": "webpack ."
  }
```
### 8. Use these Webpack Development Server Settings:
Ensure that `webpack.config.js` has host set correctly:

```javascript
  devServer: {
    port: '5000',
    host: 'yourhost.domain.com',
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    }
```
### 9. Use these Webpack Proxy Settings:
Ensure that `webpack.config.js` uses the correct route prefix and port for the webhooks proxy:

```javascript
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        secure: false, // For non-HTTPS, set to false
      },
    ]
```

### 10. Create the backend for webhooks:
Ensure this schema exists:

```sql
-- Create payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  payment_id VARCHAR(255) NOT NULL,
  amount INT NOT NULL,
  currency VARCHAR(3) NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  token VARCHAR(255),
  isAdmin BOOLEAN,
  created_at TIMESTAMP NOT NULL
);
```

Ensure the following privileges are set:

```sql
-- Grant all privileges on the payments table to the app user
GRANT ALL PRIVILEGES ON TABLE payments TO app;

-- Grant all privileges on the sequence for the id field to the app user
GRANT ALL PRIVILEGES ON SEQUENCE payments_id_seq TO app;
```

### 11. Use the following packages for webhooks proxy:
Enter `app/webhooks` and install:

```bash
npm install express body-parser stripe bcrypt jsonwebtoken pg cookie-parser
```
Create environment variables for webhooks proxy:

```bash
export JWT_SECRET="your_token_value"
export STRIPE_API_TOKEN="your_token_value"
export STRIPE_WEBHOOK_TOKEN="your_token_value"
```

### 12. Run the Development Server:
Run the application:

```bash
npm start
```

## Importance of Webpack

Webpack is a crucial tool in this project because it bundles your JavaScript files for browser compatibility and allows you to develop and test your React application with features like:

- **Module Bundling**: Bundles all the modules (React, CSS, etc.) into a single file for efficient browser loading.
- **Hot Reloading**: Automatically refreshes your app when code changes.
- **Dev Server**: Easily sets up a local development environment with Webpack Dev Server.

The use of Webpack's `devServer` allows for live reloading on port 5000, and the `host` key in the configuration ensures the server runs on your specified domain, enhancing flexibility in deployment scenarios.

## License

This project is licensed under the MIT License.










