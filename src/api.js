'use strict'
/*
API calls
centralized the API call here, 
anything relates to server is called using axios/fetch library.
do not modify DOM in here.
*/

import $ from 'jquery';
import axios from 'axios';
import {DragImage} from './logic.js';

//retrieve images from "images" folder from server
export function GetImages(){
	return new Promise((resolve, reject) => {
		fetch('/images').then((resp) => resp.json())
			.then((data)=>{resolve(data)})
			.catch((err)=>{resolve(err)});
    });
}


//upload selected images from user
export function UploadImages(input){
	return new Promise((resolve, reject) => {
	 		var formData = new FormData();
			formData.append('upload',input[0].files[0]);
			axios['post']('/uploads',  formData )
					.then((data)=>{resolve(data)})
					.catch((err)=>{reject(err)});
	  });
 	
}

//save current canvas element
export function SaveProgress(progress){
	axios['post']('/save', {data : progress}  );
}


//load already saved canvas element
export function LoadProgress(){
	return new Promise((resolve, reject) => {
	 		axios['post']('/load')
					.then((data)=>{
						if(data.status===200){
							resolve(data.data)
						}
						else {
							reject(data.data);
						}
					})
					.catch((err)=>{reject(err)});
	  });
}