import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
//import the file uploader plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
//define the constant url we would be uploading to.
const URL = environment.apiURL + '/Photos';
//create the component properties

@Component({
  selector: 'app-image-upload-test',
  templateUrl: './image-upload-test.component.html',
  styleUrls: ['./image-upload-test.component.scss']
})

export class ImageUploadTestComponent implements OnInit {
  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  //This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';

  constructor(public snackbar : MatSnackBar){

  }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      // Open snack bar to comfirm file has been uploaded
      this.snackbar.open("Upload completed!", "", {
        duration: 2000,
      });
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }
}
