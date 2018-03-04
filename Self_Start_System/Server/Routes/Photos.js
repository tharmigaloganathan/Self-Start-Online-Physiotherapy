// Import libraries
var multer = require('multer');
var path = require('path');
var Grid = require('gridfs-stream');
var fs = require('fs');
// set the directory for the uploads to the uploaded to for temp storage
var DIR = './uploads';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');

module.exports = (router, mongoose, conn) => {
  //  Connect the GridFS and mongo
  Grid.mongo = mongoose.mongo;

  router.route('/')
    .get(function (request, response) {
      console.log("Hello");
      response.json({success: true, message: "Route is working!"})
    })
    .post(function (request, response) {
      let path = '';
      // Begin upload of the file
      upload(request, response, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return response.json({success: false, message: err});
        }
        // No error occurred
        path = request.file.path;
        var fileName = request.file.filename;

        // Create a new Grid pointing to the current database
        var gfs = Grid(conn.db);
        // Create a write stream to save file
        var writestream = gfs.createWriteStream(
          {
            filename: fileName
          }
        );
        // Read in the write stream
        fs.createReadStream(path).pipe(writestream);

        // On close, send a confirmation of success
        writestream.on('close', function(file){
          response.json({success: true, file: file.filename})

          // Delete photo on temporary storage
          fs.unlink(path, function(error) {
            if (error) {
              throw error;
            }
            console.log(fileName + ' Deleted');
          });
        });
      });
    });

  router.route('/:object_id')
    .get(function (request, response) {
      if (!request.params.object_id) {
        response.json({success: false, message: 'id was not provided'});
      }
      var filename = request.params.object_id;
      var gfs = Grid(conn.db);
      var filePath = DIR+"/"+filename+".png"; // Path of the image's temp location
      // Write to temporary location
      var fs_write_stream = fs.createWriteStream(filePath);

      // Create readstream with the picture name we want
      var readstream = gfs.createReadStream({
        filename: filename
      });

      // Pipe the picture into the read stream
      readstream.pipe(fs_write_stream);

      // On close, send the picture and delete the temporary picture
      fs_write_stream.on('close', function() {
        console.log("Successfully retrieved");
        response.sendFile(path.resolve(filePath), function(err){
          if (err){
            throw(err);
          } else {
            console.log(filename + ' sent!');
            // Delete photo on temporary storage
            fs.unlink(filePath, function(error) {
              if (error) {
                throw error;
              }
              console.log(filename + ' Deleted');
            });
          }
        });
      });
    });
    // .delete(function (req, response) {
    //   if (!request.params.object_id) {
    //     response.json({success: false, message: 'id was not provided'});
    //   }
    //   Payments.deleteOne(request.params.object_id).then(function(payment){
    //     response.json({success: true, message: 'payment deleted!'});
    //   }).catch(function(err){
    //     response.json({success: false, message: err});
    //   })
    // });

  return router;
};