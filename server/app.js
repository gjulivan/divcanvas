var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const multer = require( 'multer' );
const fs = require( 'fs' );
const junk = require( 'junk' );

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( express.static('./') );

// define file name and destination to save
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname +  '/../images')
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split( '.' );
    ext = ext[ext.length - 1];
    cb(null, 'uploads-' + Date.now() + '.' + ext);
  }
});

// define what file type to accept
let filter = ( req, file, cb ) => {
  if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ) {
    cb( null, true );
  } else {
    cb( 'Failed: format not supported' );
  }
}

// set multer config
let upload = multer( {
  storage: storage,
  fileFilter: filter
}).single( 'upload' );

/* ===============================
  ROUTE
 ============================== */

// route for file upload
app.post( '/uploads', ( req, res ) => {
    console.log('UPLOADS!');
  upload( req, res, err => {
    if ( err ) {
      console.log( err )
      res.status(400).json( {message: err} );
    } else {
      res.status(200).json( {
        file: req.protocol + '://' + req.get('host') + '/../images/' + req.file.filename
      } )
    }
  })
})

app.get( '/images', ( req, res ) => {
  let file_path = req.protocol + '://' + req.get('host') + '/../images/';
  console.log(file_path);
  let files = fs.readdirSync( './images/' );
  files = files
          .filter( junk.not ) // remove .DS_STORE etc
          .map( f => file_path + f ); // map with url path
  res.json( files );
});

//save canvas element, to be loaded on refresh
app.post('/save', function(request, respond) {
    let body = '';
    let filePath = __dirname + '/../save/progress.txt';
 
    var data = request.body.data;
    
     fs.writeFile(filePath, data, function(error) {
         if (error) {
           
         } else {
           
         }
    });
});


//load saved file
app.post('/load',function(request,respond){
  let filePath = __dirname + '/../save/progress.txt';
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    respond.json( data );
   // console.log(data);
  });
})

// general route
app.get( '/', ( req, res ) => {
  res.sendFile( __dirname + '/index.html' );
})


module.exports = app;
