## Instructions

a single page application that allows user to add text and image into canvas.

## Features

Below are the basic features for the application:

- user can see the existing images from folder `images` to the images list
- user can *upload image* to folder `images` and directly added to images list
- user can *add and remove image / text* from the menu to the canvas
- user can *move the image / text* around the canvas

- the created objects on canvas can be saved and repopulated on refresh browser

## Resources


## Requirements

## How to Submit

## How To Install

To set up the environment dependencies ( node version 5++ )

```
$ npm install
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

### Note

_- The server only accepts `png` and `jpeg` file format_