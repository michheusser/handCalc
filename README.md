# handCalc

handCalc is a handwritten calculator for simple numerical expressions.

- **Machine Learning based:** handCalc works with a 4-layered neural-network kernel, which has been trained with more than 200'000 handwritten symbols. Since the recognition algorithm is not always perfect, this tool provides the analysis tools to play and understand better how a neural network may react and change its decision pattern depending on its different inputs and their variations.
- **Custom-made libraries and dataset:** The main goal of this project was not to build a complex and sophisticated tool with existing libraries like TensorFlow, Keras, or PyTorch, but rather to create a simple, but functional custom-made tool, using image-processing and neural-network libraries built from scratch in JavaScript and Python, that are easy to understand and to adapt to other projects. The handwritten dataset itself was created specifically for this project and is available for download, along with the used libraries (see below).
- **Based in React:** The tool was created using React (https://reactjs.org/) on JavaScript, using a straight-forward project structure and component hierarchy, as well as an uncomplicated state management structure and data-flow using Redux (https://redux.js.org/), and a design powered by Material UI (https://material-ui.com/).
- **Future versions:** Currently, handCalc renders components and performs data-processing and machine-learning algorithms directly on the browser, considering they're not particularly resource-intensive. However for future versions, a server-side API, based on Java Spring Boot, will be added. This will include, among others, the saving of inputted symbols (dataset augmentation) to a database, and further server-side training of the neural network. Furthermore, a mobile version will be available, optimized for iOS and Android (since currently, the drawing board is not optimized for touch-screens).

You can access the app through the following link:
http://handcalc.io

## The App's Core Functionalities

In this section the core capabilities of the app will be discussed in depth, to understand better what the most important components are doing in the background.

### Drawing Board (Image Processing)

One of the main capabilities of the app is to dynamically render a responsive drawing board which serves as an input interface for the user to write a mathematical expression. Once the expression is written, the app uses a custom-made grid manipulation library which contains all the image processing capabilities, including an image segmentator which recursively agglomerates the different written signs onto independent grids, and a scaling function which resizes each segment to the input dimensions of the machine learning algorithm.

The effective recognition of the handwritten signs is greatly due to the special image scaling function, which works by resizing the stroke itself: every pixel is mapped only once onto the resized image, and the pixels in-between (for example in a line) are interpolated. This ensures that the stroke remains thin, containing the purest information about the stroke, even when the image is made bigger. This is important, because the data set used to train the neural network was created using the same algorithm (see section "Data Set Creation and Processing")

_Unscaled Image (14x14 pixels):_<br/>
![alt text](https://github.com/michheusser/symbol-neural-network/blob/master/src/Assets/Media/7_unscaled.png)

_Scaled Image (28x28 pixels):_<br/>
![alt text](https://github.com/michheusser/symbol-neural-network/blob/master/src/Assets/Media/7_scaled.png)

To understand deeper the motivation and implementation of the scaling algorithm please refer to my publication in Medium:
https://medium.com/@michheusser/handwritten-recognition-resizing-strokes-instead-of-images-b787af9935fc?sk=2d607131245f4b1850cc781492ed83b7

### Machine Learning Kernel

Behind the app's interface, there's a deep feedforward neural network kernel, of four layers, trained to predict handwritten signs of 28x28 dimensions (black/white) onto an array of 16 possible symbols: all numerical digits (0-9), and basic operators ("plus", "minus", "times", "divided", "open bracket", "closed bracket"). The neural network object is part of a purely object-oriented library containing the functionalities to deal with neural networks and the data around it.

Once the scaled grid object for each independent segment has been created out of the drawing board, the neural network receives it, and feeds it through the neural network. Considering this is just an array of mostly matrix operations, the browser's performance is more than enough to deal with this step, and no server-side or GPU computations are necessary. The predictions of each sign are then ordered and evaluated, and in the case of a possible mathematical result, this one is showed.

## Neural Network Training

Conceptually, the biggest challenge when dealing with the neural network in this application, was its training, rather than the actual recognition and classification of symbols. Although the creation of the app itself was coding-intensive and time-consuming, most of the hard algorithm optimisation work went to the creation of the data creation and image processing library, and to the training library for the neural network, both written in Python.

Hereafter I will present the main ideas behind both libraries and the dataset used, but for more detailed information, please visit the following links:

**Neural Network Training / Image Processing / Dataset Creation libraries:**<br/>
https://github.com/michheusser/neural-network-training

**Dataset Download and Documentation:**<br/>
https://www.kaggle.com/michelheusser/handwritten-digits-and-operators

### Data Set Creation and Processing

Inherently this Python library ("datatools") started by having the same core image-processing capabilities as the one in JavaScript. These include stroke aligning, cropping, scaling, fitting, and segmenting. However, it turned out to be more powerful since it was greatly enhanced not only to deal with batches of real photographs of handwritten signs, clean them, normalize them, and segment them to create image datasets, but also to artificially augment datasets with rotations, and stretches. Since the handwritten symbols used for the dataset were much bigger than their thickness (on average less than a pixel width on a 28x28 pixel grid), I managed to create a high quality dataset containing thin strokes of handwritten signs.

The datasets not only contain the purest information about the strokes themselves, but can easily be enhanced if one wanted to include noise, or make the strokes thicker. Furthermore, since they were scaled and manipulated with virtually the same algorithms than in the JavaScript library, this ensures consistency across the training sets and the handwritten signs inputted in the application.

### Training Algorithm

This was by far the most difficult task in the whole project, in terms of implementation and optimization regarding time, memory, and numerical stability. Inherently, this library ("nntools") has many of the same functionalities as the one written in JavaScript, but considering Python is a far superior language for numerical purposes (e.g. using the numpy library, which deals with multidimensional arrays in a much more efficient fashion than JavaScript arrays) the training algorithm was exclusively implemented in this library. The training algorithm is based on back-propagation to calculate the gradient descent of two possible cost functions: cross-entropy and mean-square-error. Since the dataset was significantly larger than the amount of parameters within the neural network (~200'000 data-points vs ~50'000 parameters), overfitting never seemed to be a risk, and never seemed to have happened. Despite that, the implementation of regularization methods proved to give satisfactory results on the end-accuracy.

To explore further details around the training algorithm and image processing, or around the dataset creation, please visit the links given above.

## The Projects Architecture in a Nutshell

This project was built with an MVC (Model-View-Controller) design-pattern in mind. Although there's currently no server-side capabilities, using Redux as a state management library allowed for a state, and data-flow infrastructure that is consistent with the MVC pattern, and will allow in the future for a straight-forward transfer to a server with a dedicated database.

### Model (The Store and State)

The data in this app is managed by Redux, which handles the state with a so-called store, and its reducers. The store manages the state itself, which is immutable and can only be changed through reducers triggered by dispatched actions. One big advantage of immutability is the ability to have snapshots of the state, which are unambiguously and uniquely mapped to what is shown in the viewer. It makes the behaviour of the application predictable, and opens the possibility for memoizing and the use of caches. It also allows for a much easier debugging, since the data flows are much more controlled, and the state of the whole application can be found in one place. This makes supervision algorithms like logging very easy to implement.

### View (The App's Components)

The user interface is handled by the components in React. They use declarative code, and represent each functional part in the user interface (including static components) which are laid out as a hierarchical tree. Each component can have an internal state and properties which are inherited by its parent component. Analogously, they can pass properties to their child components.

React works by updating a virtual DOM, which is a way of circumventing direct updates to the actual DOM, which happens to be computationally expensive. This hierarchical structure inherently allows for updates only to be made on components, when their inherited properties or internal state change, in which case only their child components are potentially updated. The main advantage of this, is that only components which actually need to be re-rendered are changed within the DOM, instead of refreshing the whole website with every little possible change.

Since the state is immutable, sophisticated change detection techniques can simply and cheaply be implemented, ensuring the computationally expensive process of updating the DOM only occurs when it absolutely has to (one of React’s performance improvements that keeps the edge over other libraries). Using Redux enhances this principles by allowing the state of components to be transferred to the store to centralize the data, and also to facilitate the information flow between components that are not directly connected within the tree, since every component can have access to any part of the state.

### Controller (Actions and Reducers)

The actions and reducers are in charge of the communication and data flow between the react components (view) and the state (model). This structure makes it easy very easy to track the role of every functional component within the codebase, and has a strict control over the data-flow within the application.

The store is made out of reducers, which take care of the task of updating one single "slice" of the whole state. Components in the application that interact with the user have the ability to create actions containing some data, which are dispatched to one or more reducers within the store. Each reducer involved, containing part of the state, takes the action and performs a "pure function" logic (the output is uniquely mapped from the inputs), unambiguously and immutably updating the reducer's corresponding part of the state.

As mentioned before, this approach allows for very easy tracking of data-flow between components towards reducers, and state updates. Considering state updates can only happen through actions being dispatched, and the state is always changed using pure functions in an immutable fashion, there cannot be unexpected surprises when it comes to changes in the application.

Immutable changes to the state, depending on the application, may sound like an unnecessary computationally intensive process. In case of small changes, for example, when changing one single field in the drawing board, the state of the whole drawing board changes, and it may seem that all unchanged variables would have to be cloned, together with the changed field, and updated to the state. However, shallow copies for variables that are unchanged are enough to keep the immutability satisfied, and thus, no significant performance leaks are created when satisfying immutability .

## Component Architecture

In general, there are two main trends when it comes to structuring a project of this type:

### Functional Structure

The first one, and more traditional one, separates files according to their functional nature within the project. According to the MVC model: reducers, actions, and components are grouped together in different folders. The main advantage of this, is that it is easy to navigate through these parts, if one is only dealing with state changes, or optimizing reducer-logic, or data-flow, or if one wants to quickly have an overview of all kinds of actions and reducers within the application.

Although this might sound very convenient, this technique has been proved to become too complex as the project scales. The more complex the application becomes, and more and more components and pages are added through routing, one has to unnecessarily navigate through at least three folders to update one single component. The organization between each of those folders also becomes cumbersome to manage, and the addition of more complex functionalities and action creators, containing middlewear for async operations and API calls, makes the overall structure rather convoluted.

### Modular Structure ("Ducks")

The second way of organizing the project is through the so called "Ducks" architecture, which is the one I chose for this project. This approach deals with components in a modular and hierarchical manner, where each complete module is self-contained, having all their actions, constants, and reducer-logic within the same folder. The main advantage of this is that working on different components or modules, becomes a more structured and independent task. In case, for example, where there are several people or teams working on different components, this structure proves to be very efficient.

In my opinion, this approach also follows a more consistent philosophy with the trends of web-development in the last decade. Frameworks like Angular, and React, have strived to bundle components, and make modular features, where the visible component, its functionality, and its style are encased together, instead of having all components bundled by function, the way it was done at the beginning of the internet (HTML, CSS, and JavaScript all in different files).

### Structure Template:

The folder structure works in the following simple fashion: Each component has its own folder, which contains one "Index.js" file, containing the react component, one "Actions.js" file, containing the actions (if needed), one "Reducer.js" file, containing the corresponding reducer logic and state-slice (if needed), and one or more folders containing child components with the same structure (if needed):

```
.Parent Component
├── Index.js
├── Actions.js
├── Reducer.js
|
├── Child Component 1
|   ├── Index.js
|   ├── Actions.js
|   ├── Reducers.js
|   |
|   ├── Child Component 1
|   |   └── ...
|   ├── Child Component 2
|   |   └── ...
|   └── ...
|
├── Child Component 2
|   └── ...
|
└── ...
```

### Component Hierarchy

Considering each component has the same structure, I'll present the component hierarchy without showing the files contained in it.

```
.App                                         # High level component setting up the UI theme for all the component hierarchy
└── Layout                                   # High level component encompassing all main components and contains the layout reducer that renders the drawing board
   ├── About                                 # Dialog showing project information, that can be opened through the menu
   ├── Instructions                          # Dialog showing the instructions tutorial presented at the opening of the application or through the application's menu
   |   ├── Pane 1                            # Element containing pane 1 of the instructions tutorial
   |   ├── Pane 2                            # Element containing pane 2 of the instructions tutorial
   |   └── ...                               # Rest of the elements containing the instruction tutorial panes
   ├── Header                                # Contains the header element containing the access to the menu, trigger buttons for processing the drawing and clearing the board
   |   └── Menu                              # Menu element containing the access to the Instructions, About, and GitHub Repository
   ├── Footer                                # Contains the static footer element
   ├── DrawBoard                             # Contains the high level component that renders the drawing board dynamically made out of field elements
   |   └── Field                             # Lowest level element of the drawing board, which allows the user to draw on the board
   └── ResultPane                            # High level dialog containing the results of the processed expression
       └──DetailedView                       # Renders the accordion showing the predicted result upon drawing, that can be expanded to display the details of the predictions
          └── AnalysisPane                   # Sets out the overall grid layout for the detailed view in the analysis pane
              ├── SymbolList                 # Handles the overall layout for the symbol list to select segments
              |   └── Item                   # High level element containing the segment image within the symbol list
              |       └── Segment            # Handles the canvas element that scales the processed image and displays it
              └── SegmentDetails             # Sets out the overall grid layout for the detailed information around the selected segments
                  ├── ImageDetails           # Displays the details around the selected drawn segment
                  ├── ScaledImage            # Displays the image of the processed version of the selected segment
                  ├── NeuralNetworkChart     # Displays the output likelihood of the neural network upon feeding of the selected processed image
                  └── NeuralNetworkDetails   # Displays the prediction details around the selected segment upon feeding it into the neural network
```

## Library Architecture

In this section the structure for the JavaScript image processing (drawing board) and neural network libraries are presented. These can be found within the "Libraries" folder inside the project folder structure.

### Image Processing ("imageTools")

```
.imageTools
├── Grid                                 # Contains the main Grid object and the modules containing objects needed for it
|   ├── Coordinate.js                    # Module containing the immutable coordinate object
|   ├── Field.js                         # Module containing the field object
|   └── Grid.js                          # Module containing the main grid object made out of fields and its core methods
├── Tools                                # Contains the decorators with more sophisticated methods for the grid object
|   ├── Tool.js                          # Contains the abstract class out of which the rest of the decorators are made of
|   ├── Cloner.js                        # Provides deep copy capabilities on the grid object
|   ├── Aligner.js                       # Contains the private and public methods to shift and align grids
|   ├── Cropper.js                       # Contains the private and public methods to crop and wrap grids
|   ├── Manipulator.js                   # Contains the private and public methods for data manipulation around grids
|   ├── Scaler.js                        # Contains the private and public methods to scale and fit grids
|   └── Segmentator.js                   # Contains the private and public methods to segment grids into smaller independent grids
└── Generator.js                         # Contains the high level API to generate, build and initialize grids. This is the preferred way of creating grids
```

### Neural Networks ("nnTools")

```

.nnTools
├── Data                                 # Contains the objects to handle neural network data in a serializable manner
|   ├── NeuronData.js                    # Module containing the object that encapsulates serializable data of a single neuron within a neural network
|   ├── NeuronLayerData.js               # Module containing the object that encapsulates serializable data a neuron layer within a neural network
|   └── NeuralNetworkData.js             # Module containing the object that encapsulates serializable data of a neural network
├── NeuralNetwork                        # Contains the main objects surrounding a neural network
|   ├── ActivationFunctions.js           # Module containing the possible activation functions to be used within a neuron
|   ├── NeuronConnection.js              # Module containing the object containing the information about a connection between two neurons (weight and references)
|   ├── Neuron.js                        # Module containing the neuron object within a neuron layer with its core functionalities and methods
|   ├── NeuronLayer.js                   # Module containing the neuron layer within a neural network with its core functionalities and methods
|   └── NeuralNetwork.js                 # Module containing the main neural network object containing its core functionalities and methods
├── Tools                                # Contains the decorator tools to deal efficiently with the neural network object
|   ├── Tool.js                          # Contains the abstract class out of which the rest of the decorator tools are made of
|   ├── Activator.js                     # Contains the private and public methods for the activation of neural networks upon a certain input layer
|   ├── Classifier.js                    # Contains the private and high-level public methods for the classification of outputs of a neural network upon a certain input
|   ├── Builder.js                       # Contains the private and public methods for the correct building and initialization neural network instances and their tools
|   └── Manipulator.js                   # Contains the private and public methods for the manipulation and loading and saving of data objects (within the "Data" subfolder)
└── Generator.js                         # Contains the high level API to generate, build and initialize a neural network. This is the preferred way of creating neural networks
```

## User Interface (UI) / User Experience (UX) Design :

The user interface and user experience of this project were set up with the Material UI framework (https://material-ui.com/) and inspired by Matrial Design guidelines (https://material.io/design/). User experience and design decisions were made in collaboration with:

**Briana Seiderman**
https://www.linkedin.com/in/briana-seiderman/
https://www.brianaseiderman.com/

## Main Project Folder Structure

```
.public
├── index.html                           # Root html file, where the app is rendered
└── ...                                  # Further icon files / metadata

.firebase                                # Firebase deploy-specific files
└── ...

.src
├── .gitnore                             # git specific file (git-ignored files)
├── package.json                         # npm dependency file
├── package-lock.json                    # npm dependency file
│
├── App                                  # App components (See Component Hierarchy section)
│   └── ...
│
├── Assets                               # Various data ressources for the project
│   └── Media                            # Gif images used for the project
│      └── ...
│   └── NeuralNetwork                    # Exported neural network data from the training libraries in python
│      ├── SavedNetwork                  # Contains the .json files containing the numerical data for the neural network
│      |  ├── bias.json                  # Neuron bias data
│      |  └── weights.json               # Neuron input weights data
│      └── MatrixData.js                 # File compiling data into a JavaScript
│
├── Libraries                            # Custom Neural Network and Image processing libraries (See Custom Libraries section)
│   ├── imageTools                       # Grid / Image processing library
│   |  └── ...
│   └── nnTools                          # Neural Network library
│      └── ...
│
├── storeSetup.js                        # Redux Reducer Setup
└── index.js                             # Root React file rendering the components in the App-folder into the root HTML

```

## Project Launching

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To launch the project and development server, you can use the following script on the project folder:

## **`npm start`** _(Runs the app in the development mode)_

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

To build the project use the following script:

## **`npm run build`** _(Builds the app for production to the 'build' folder)_

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
The app is then ready to be deployed.

For more information consult the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
