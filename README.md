# Training of Handwritten Symbols 
As a part of a bigger task, the aim of this project is to train a neural network to understand and evaluate handwritten digits and a small array of mathematical operators. Currently, it definitely would not be hard to find existing libraries or tools within the community that would allow me to perform the same tasks described here (e.g. PIL, tensorflow, keras, etc.). But the intention of this project was mainly to create everything from scratch, not only as a learning experience, but also as a way to demonstrate my way to approach the problem, my knowledge of machine learning, algorithms, data structures, data manipulation, and a general approach to structuring and problem solving.

## Project overview
Upon having tried several existing databases for handwritten digits (e.g. MNIST) or similar ones that included mathematical symbols, that did not work well for the intended purpose, I decided to create my own training, validation and testing datasets from scratch which were then fed to the training algorithms. I developed two packages in Python to deal firstly with the image processing and data creation, and secondly with the creation and training of a feedforward neural network using back-propagation and stochastic gradient descent.

### Image Processing and Data Manipulation Package (‘datatools’)
This package provides public high-level methods that allow the user to create lists of input-output-datapoints containing image information, and the desired symbolic representation. It allows the user to import images containing multiple hand-written instances of a certain symbol (e.g. a scanned image), and segment them to individual images of the desired proportions.

Thanks to the image processing tools, the package allows a user to artificially expand the dataset by performing batch-transformations (scaling / rotations) to each image, putting emphasis on the transformation of the handwritten strokes and not on every pixel. A consequence of this, is that no matter how an image might be resized, strokes of one pixel widths will be scaled to the desired size, keeping the one pixel width. This is advantageous, because strokes won’t disappear when images are made smaller, nor will they become thicker when the images are made bigger. In the end, what is important when training a neural network, is that it understands the drawing stroke a user meant when writing the symbol, disregarding the tickness of the pen the user might have used. If one wanted to include information about the thickness, or add noise to the images, it would be easy, once a dataset is available that contains the stroke-information.

The package can be found in the following path:
```
neural-network-training/src/datatools
```

## Project Structure
```
.src
├── datatools                            # Data manipulation and image processing package
│   ├── __init__.py                      # Initialization of package
│   ├── dataset_processor.py             # API module to provide high-level functionalities
│   ├── io_datapoint.py                  # Datapoint module containing the input-output class to work with the neural network
│   └── Image_processing                 # Image processing sub-package
│      ├── __init__.py                   # Sub-package initialization
│      ├── image_data.py                 # Module containing the custom image-data object
│      ├── manipulator.py                # Module containing object for image manipulations transformations
│      └── segmentator.py                # Module containing object to segment images containing several symbols
│
├── nntools                              # Neural Network Training package
│   ├── __init__.py                      # Initialization of package
│   ├── manipulator.py                   # API module to provide high-level functionalities 
│   └── tools                            # Sub-package with specific modules
│      ├── __init__.py                   # Initialization of sub-package
│      ├── neural_network.py             # Module containing the neural-network class
│      ├── classifier.py                 # Module containing the object to classify outputs on a neural network
│      ├── validator.py                  # Module containing the object to validate a neural network on a dataset
│      └── trainer.py                    # Module containing the object to train a natural network on a dataset
│
├── main_dataset_creation.py             # Script containing steps for the creation of data
├── main_neural_network_training.py      # Script containing steps for the training of a neural network
│
└── Saved Networks                       # Main folder for saved trained neural networks
    ├── Current                          # Default folder where a neural network is saved (see main_neural_network_training.py)
    ├── Best                             # Manually saved files for neural network with best validation reults 
    └── ...                              # Further saved networks
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
