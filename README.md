# handCalc
handCalc is a handwritten calculator for simple numerical expressions. 
* **Machine Learning based:** handCalc works with a 4-layered neural-network kernel, which has been trained with more than 200'000 handwritten symbols. Since the recognition algorithm is not yet perfect, this tool provides the analysis tools to play and understand better how a neural network may react and change its decision pattern depending on its different inputs and their variations.
* **Custom-made libraries:** The main goal of this project was not to build a complex and sophisticated tool with existing libraries like TensorFlow, Keras, or PyTorch, but rather to create a simple, but functional custom-made tool, using image-processing and neural-network libraries built from scratch in both JavaScript and Python, that are easy to understand and adapt to other projects.
* **Based in React:** The tool was created using react using JavaScript using a straight-forward project structure and component hierarchy, as well as an uncomplicated state management structure and data-flow using Redux.
* **Future versions:** Currently, handCalc renders components and performs data-processing and machine-learning algorithms directly on the browser, considering they're not particularly ressource-intensive. However for future versions, server-side capabilities will be added, like saving of inputted symbols, and further training of the neural network. Furthermore, a mobile version will be available optimized for iOS and Android (since currently, the drawing board is not optimized for touch-screens).


## Sub-title
Lorem Ipsum

### Sub-sub title
Lorem Ipsum


## Main Project Structure
```
.public
├── index.html                           # Root html file, where the app is rendered
└── ...                                  # Further icon files / metadata

.src
├── .gitnore                             # git specific file (git-ignored files)
├── package.json                         # npm dependency file
├── package-lock.json                    # npm dependency file
│
├── App                                  # App components (See Component Hierarchy section)
│   └── ...                              
│
├── Assets                               # Various data ressources for the project
│   ├── Media                            # Gif images used for the project
│      └── ... 
│   └── NeuralNetwork                    # Exported neural network data from the training libraries in python
│      ├── SavedNetwork                  # Contains the .json files containing the numerical data for the neural network
│         ├── bias.json                  # Neuron bias data
│         └── weights.json               # Neuron input weights data
│      └── MatrixData.js                 # File compiling data into a JavaScript variables
│
├── Libraries                            # Custom Neural Network and Image processing libraries (See Custom Libraries section)
│   ├── gridTools                        # Grid / Image processing library
│      └── ... 
│   └── nnTools                          # Neural Network library
│      └── ...                           
│
├── storeSetup.js                        # Redux Reducer Setup
└── index.js                             # Root React file rendering the components in the App-folder into the root HTML

```

# Further information (React):

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
