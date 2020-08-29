# handCalc
handCalc is a handwritten calculator for simple numerical expressions. 
* **Machine Learning based:** handCalc works with a 4-layered neural-network kernel, which has been trained with more than 200'000 handwritten symbols. Since the recognition algorithm is not yet perfect, this tool provides the analysis tools to play and understand better how a neural network may react and change its decision pattern depending on its different inputs and their variations.
* **Custom-made libraries and dataset:** The main goal of this project was not to build a complex and sophisticated tool with existing libraries like TensorFlow, Keras, or PyTorch, but rather to create a simple, but functional custom-made tool, using image-processing and neural-network libraries built from scratch in JavaScript and Python, that are easy to understand and adapt to other projects. The handwritten dataset itself was created specifically for this project and is available for download. 
* **Based in React:** The tool was created using React (https://reactjs.org/) on JavaScript, using a straight-forward project structure and component hierarchy, as well as an uncomplicated state management structure and data-flow using Redux (https://redux.js.org/), and a design powered by Material UI (https://material-ui.com/).
* **Future versions:** Currently, handCalc renders components and performs data-processing and machine-learning algorithms directly on the browser, considering they're not particularly ressource-intensive. However for future versions, a server-side API that includes server-side capabilities (based on Java Spring Boot) will be added. Among others, the saving of inputted symbols (dataset augmentation) to a database, and further server-side training of the neural network will be possible. Furthermore, a mobile version will be available optimized for iOS and Android (since currently, the drawing board is not optimized for touch-screens).

You can access the app through the following link: https://www.handcalc.io

## The App's Core Functionalities
In this section the core capabilities of the app will be discussed in depth, to understand better what the most important components are doing in the background.

### Drawing Board Image Processing
One of the main capabilities of the app is to dynamically render a responsive drawing board which serves as an input interface for the user to write a mathematical expression. Once the expression is written, the app uses a custom-made grid manipulation library which contains all the basic image processing capabilities (cropping, shifting, etc.), including an image segmentator which recursively agglomerates the different written signs onto independent grids, and a scaling function which resizes each segment to the input dimensions of the machine learning algorithm.

The effective recognition of the handwritten signs is greatly due to said image scaling function, which works by resizing the stroke itself: every pixel is mapped only once onto the resized image, and the pixels inbetween (for example in a line) are interpolated. This ensures that the stroke remains thin, containing the purest information about the stroke, even when the image is made bigger. This is important, because the data set used to train the neural network was created using the same algorithm (see section "Data Set Creation and Processing")

_Unscaled Image (14x14 pixels):_<br/>
![alt text](https://github.com/michheusser/symbol-neural-network/blob/master/src/Assets/Media/7_unscaled.png)

_Scaled Image (28x28 pixels):_<br/>
![alt text](https://github.com/michheusser/symbol-neural-network/blob/master/src/Assets/Media/7_scaled.png)


### Machine Learning Kernel
Behind the app's interface, there's a deep feedforward neural network kernel of four layers, trained to predict handwritten signs of 28x28 dimensions (black/white) onto an array of 16 possible symbols: all numerical digits (0-9), and basic operators ("plus", "minus", "times", "divided", "open bracket", "closed bracket"). The neural network object is part of a purely object-oriented library containing the functionalities to deal with neural networks and the data around it. 

Once the scaled grid object for each independent segment has been created out of the drawing board, the neural network receives it, and feeds it through the neural network. Considering this is just an array of mostly matrix operations, the browsers performance is more than enough to deal with this step, and no server-side or GPU computations are necessary. The predictions of each sign are then ordered and evaluated, and in the case of a possible mathematical result, this one is showed.

## Neural Network Training
Conceptionally, the biggest challenge when dealing with the neural network in this application, was with its training, rather than the actual recognition and classification of symbols. Although the creation of the app can be coding intensive and time consuming, most of the hard algorithm optimization work went to the creation of the data creation and image processing library, and to the training library for the neural network, both written in Python.

Hereafter I will present the main ideas behind both libraries and the dataset used, but for more detailed information, please visit the following links:

**Neural Network Training / Image Processing / Dataset Creation libraries:**<br/>
https://github.com/michheusser/neural-network-training

**Dataset Download and Documentation:**<br/>
https://www.kaggle.com/michelheusser/handwritten-digits-and-operators

### Data Set Creation and Processing
Inherently this Python library ("datatools") started by having the same core image-processing capabilities as the one in JavaScript. These include stroke scaling, fitting, and segmentating. However, it turned out to be more powerful since it was greatly enhanced not only to deal with batches of real photographs of handwritten signs, clean them, normalize, and segmentate them to create image datasets, but also to artificially augment datasets with rotations, and stretches. Since the handwritten symbols used for the dataset were much bigger than their thickness (on average less than a pixel width on a 28x28 pixel grid), I manage to create a high quality dataset containing thin strokes of handwritten signs. 

The datasets not only contain the purest information about strokes themselves, but can be easly enhanced if one wanted to include noise, or make the strokes thicker. Furthermore, since they were scaled and manipulated with virtually the same algorithms than in the JavaScript library, this ensures consitency accross the training sets and the handwritten signs inputted in the application. 

### Training Algorithm
This was by far the most difficult task in the whole project in terms of implementation, and optimization when it comes to time, memory and numerical stability. Inherently, this library ("nntools") has many of the same functionalities as the one written in JavaScript, but considering Python is a far superior language for numerical purposes (e.g. with the numpy library which deals with multidimensional arrays in a much more efficient fashion than JavaScript arrays) the training algorithm was exclusively implemented in this library. The basic training algorithm is based on back-propagation to calculate the gradient descent of two possible cost functions: cross-entropy and mean-square-error. Since the dataset was significantly larger than the amount of parameters within the neural network (~200'000 datapoints vs ~50'000 parameters), overfitting never seemed to be a risk, and never seemed to have happened, but despite that, the implementation of mild regularization methods proved to give satisfactory on the end-accuracy.

To find out more details about the training algorithm, the libraries for dataset creation, and neural network training please visit the links given above.

## The Projects Architecture in a Nutshell
This project was built with an MVC (Model-View-Controller) design pattern in mind. Although there's currently server-side, using Redux as a state management library allowed for a state, and data-flow infrastructure that is consistent to the MVC pattern, and will allow in the future for a straight-forward transfer to a server with it's dedicated database.

### Model (The Store and State)
The state in this app is managed by Redux, which handles the state with a so-called store, and its reducers. The store handles the state itself, which is immutable and can only be changed through action dispatchers that are processed by reducers. The advantages of immutability is the ability to have snapchots of the state which are always unambiguously and uniquely mapped to what is shown in the viewer. It allows for a much easier debugging, since the data flows are much more controlled, and the state of the whole application can be found in one place.

### View (The App's Components)
The user interface is handled by the components in React. 

_particular, immutability in the context of a Web app enables sophisticated change detection techniques to be implemented simply and cheaply, ensuring the computationally expensive process of updating the DOM occurs only when it absolutely has to (a cornerstone of React’s performance improvements over other libraries)._



### Controller (Actions and Reducers)
### Lorem Ipsum

## Component Architecture
### Main Structure

## Libraries Architecture
### Main Structure

## User Interface (UI) / User Experience (UX) Design :
## Main Project Folder Structure
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
│      └── MatrixData.js                 # File compiling data into a JavaScript
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
## Project Launching
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To launch the project and development server, you can use the following script on the project folder:
### **```npm start```** _(Runs the app in the development mode)_

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

To build the project use the following script:
### **```npm run build```** _(Builds the app for production to the 'build' folder)_

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
The app is then ready to be deployed. 

For more information consult the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

