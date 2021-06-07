const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const multer = require('multer');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'));
app.use(cors());

// multer middleware
const upload = multer({
  dest: path.join(__dirname, './tmp/uploads')
  // for later: to set some limits: https://github.com/expressjs/multer#limits
});

// error handling
const handleError = (err, res) => {
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!');
};

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log(req.file.path);
    const filePath = req.file.path;
    const storagePath = path.join(
      __dirname,
      `./tmp/uploads/${req.file.originalname}`
    );
    // only these files are supported
    if (
      path.extname(req.file.originalname).toLowerCase() === '.png' ||
      path.extname(req.file.originalname).toLowerCase() === '.jpg' ||
      path.extname(req.file.originalname).toLowerCase() === '.gif' ||
      path.extname(req.file.originalname).toLowerCase() === '.svg'
    ) {
      fs.rename(filePath, storagePath, err => {
        // unexpected error handler
        if (err) return handleError(err, res);

        console.log('File uploaded!');
        return res.redirect(`http://localhost:3000/`);
      });
    } else {
      fs.unlink(filePath, err => {
        // unexpected error handler
        if (err) return handleError(err, res);

        return res
          .status(403)
          .contentType('text/plain')
          .end(
            'Please check file format. Only [.png, .jpg, .gif, .svg] files are allowed!'
          );
      });
    }
  } else {
    res
      .status(403)
      .contentType('text/plain')
      .end('Please select a file!');
  }
});

// put image files in a directory named "public/images"
app.get('/', (req, res) => {
  const fp = path.join(__dirname, `./tmp/uploads`);
  // check for directory contents and pass contents as data to template( index.ejs )
  fs.readdir(fp, (err, contents) => {
    // unexpected error handler
    if (err) return handleError(err, res);
    console.log(contents);
    return res.send({files: contents});
  });
});

app.get('/api/uploads/:file', (req, res) => {
  // do something more useful here later on redirect

  // render the file
  res.sendFile(path.join(__dirname, `./tmp/uploads/${req.params.file}`));
});

// Reminder: [ ] need to implement delete function
app.get('/delete/:file', async (req, res) => {
  console.log(req.params.file);
  const fp = path.join(__dirname, `./tmp/uploads/${req.params.file}`);
  await fs.unlink(fp, err => {
    // unexpected error handler
    if (err) return handleError(err, res);
    return console.log(`${req.params.file} was removed from the server.`);
  });
  res.redirect('http://localhost:3000');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});