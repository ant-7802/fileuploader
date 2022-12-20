const express = require('express');
const path = require('path');
const multer = require('multer');
const port = 3000;

// create an express app
const app = express();

// specify the directory where the uploaded files will be stored
const uploadsDir = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // specify the uploads directory as the destination
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    // generate a random string to add to the file name
    const randomString = Math.random().toString(36).substring(2, 15);

    // specify the file name with the random string appended to the end
    cb(null, `${file.originalname}-${randomString}`);
  }
});

const upload = multer({ storage: storage });

// serve the uploads directory as a static directory
app.use('/uploads', express.static(uploadsDir));

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    // get the file name
    const fileName = req.file.originalname;

    // construct the URL of the uploaded file
    const fileUrl = `https://FileUploader.andromidamcab.repl.co/uploads/${fileName}\n`;

    // send a response to the client with the URL of the uploaded file
    res.send(fileUrl);
  } else {
    res.status(400).send('No file was uploaded.');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
