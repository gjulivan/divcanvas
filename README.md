## Instructions

a single page application that allows user to add text and image into canvas.

## Features

Below are the basic features for the application:

- user can see the existing images from folder `images` to the images list
- user can *upload image* to folder `images` and directly added to images list
- user can *add and remove image / text* from the menu to the canvas
- user can *move the image / text* around the canvas

- the created objects on canvas can be saved and repopulated on refresh browser

## Codes Walkthrough

- javascript files are bundled using browserify and babelify to allow using import-export module

file structure :
```
index.js
```
initialize code structure, load images, linked drag handles

```
logic.js
```
handles logic and DOM manipulation

```
api.js
```
handles API call to and from server

```
helper.js
```
centralized helper functions


## How To Install

To set up the environment dependencies ( node version 5++ )

```
$ npm install
```

To build the bundle

```
$ npm run build
```

To run the node server

```
$ npm run start
```

Server is listening to port `8000`

### API

#### get uploaded images

```
GET /images
```

#### upload image to server

```
POST /uploads
```

#### save canvas div inner HTML element

```
POST /save
```

#### load previously saved canvas div inner HTML element

```
POST /load
```

### Note

_- The server only accepts `png` and `jpeg` file format_