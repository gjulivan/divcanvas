'use strict'

/*
Initialization codes
This is the page for initialize things on the application
*/

import $ from 'jquery';
import {GetImages,LoadProgress , UploadImages} from './api.js';
import {DropImage,DragImage, DragOver, RemoveElement, AddTextElement, SaveCanvas, initFunctionDrag} from './logic.js';

//initial function, loads when DOM is ready
$( document ).ready(function() {
      initImagesList();
      loadSavedElement();
     $('#submit').click(function(){
		let val = $('input.form-control[type=file]');
     	UploadImages(val).then((data)=>{initImagesList();});
     });

     $('div.canvas div.block').on({drop: DropImage, dragover : DragOver});
     $('div.canvas-control img').click(controlClick);
     $('#addText').click(AddTextElement)
});

//load previously saved elements, and initialize drag handle
function loadSavedElement(){
	LoadProgress().then((data)=>{
		$("div.canvas div.block").append(data);
		initFunctionDrag();
	})
}

//retrieve images, and load it as list on the left side nav bar
function initImagesList(){
	GetImages().then((data)=>{
		let parentImgContainer =  $('.image ul.list-unstyled');
		parentImgContainer.empty();
        $.each(data, (i,img)=>{
        	parentImgContainer.append(`<li>
        						<img src=${img} class="image-list" draggable="true"/>
        						</li>`);
        })  
        $('.image-list').on('dragstart', DragImage);
	})
}

//top control click handle
function controlClick(ev){
   switch(ev.target.name){
   	case "delete":
   	  RemoveElement();
   	break;
   	case "save":
   		SaveCanvas();
   	 break;
   }
}

