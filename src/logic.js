'use strict'

/*
Logic codes,
this codes here manipulates the DOM
*/

import $ from 'jquery';
import {GetNextId, GetDefaultText} from './helper.js';
import {SaveProgress} from './api.js'

//event triggered when element on canvas is clicked
function ClickElement(ev){
	  setActive(ev.target.id);
}

//event triggered when element on canvas get dragged
function DragElement(ev){
   ev.originalEvent.dataTransfer.setData("id", ev.target.id);
   setActive(ev.target.id);
     let style = window.getComputedStyle(ev.target, null);

     let currentLeft = parseInt(style.getPropertyValue("left"),10) - ev.clientX;
     let currentTop = parseInt(style.getPropertyValue("top"),10) - ev.clientY;
   	 ev.originalEvent.dataTransfer.setData("pos", `${currentLeft},${currentTop}`);
     console.log(`${ev.target.id} : ${currentLeft},${currentTop}`);
}

//event triggered when text on canvas out of focused
function TextDoneEdit(ev){
	let spanElement = $(`#${ev.target.parentElement.id}`);
	let content = ev.target.value;
    spanElement.empty();
    spanElement.append(content);
}

//event triggered when text element on canvas double clicked, allow user edit text
function TextDoubleClick(ev){
	let content = $(`#${ev.target.id}`)[0].textContent;
	$(`#${ev.target.id}`).empty();
	$(`#${ev.target.id}`).append(`<input  type="text" value='${content}'></input>`);
	$(`#${ev.target.id}`).find('input').on({blur:TextDoneEdit});
}

//set any given ID element as active
function setActive(id){
	$("div.canvas div.block>.active").removeClass("active");
	$(`#${id}`).addClass('active');
}

//initialize drag event for newly loaded elements
export function initFunctionDrag(){
	let content = $("div.canvas div.block");
	content.children().on({dragstart:DragElement, click: ClickElement});
}

//event triggered when element on the list, get dragged into canvas
export function DragImage(ev){
	ev.originalEvent.dataTransfer.setData("image", ev.target.src);
}

//event triggered when element on the list, get dragged into canvas
export function DragOver(ev){
	ev.preventDefault();
}

//event triggered when image dropped on canvas
export function DropImage(ev){
	 ev.preventDefault();
	let next_id = Math.round(Math.random()*100);
    let data = ev.originalEvent.dataTransfer.getData("image");
    if(data){
    	//if image is a new image taken from the image list
    	let element_id = GetNextId('img_obj');
    	$("div.canvas div.block").append(`<img id='${element_id}' draggable='true' src='${data}'/>`);
      	$(`#${element_id}`).on({dragstart:DragElement, click: ClickElement});
      	setActive(element_id);
    }
    else{
    	//if image is already on canvas, just needed to change position
    	let element_id = ev.originalEvent.dataTransfer.getData("id");
    	let offset = ev.originalEvent.dataTransfer.getData("pos").split(',');
	    var dm = document.getElementById(element_id);
	    dm.style.left = (ev.clientX + parseInt(offset[0],10)) + 'px';
	    dm.style.top = (ev.clientY + parseInt(offset[1],10)) + 'px';
	    return false;
    }
    
}

//event trigger when user added new text to canvas
export function AddTextElement(ev){
	let element_id = GetNextId('text_obj');
	$("div.canvas div.block").append(`<span id='${element_id}' draggable='true'>${GetDefaultText()}</span>`);
  	$(`#${element_id}`).on({dragstart:DragElement, click: ClickElement, dblclick: TextDoubleClick});
  	setActive(element_id);
}

//event triggered when delete button is clicked, remove current active element
export function RemoveElement(){
     $("div.canvas div.block").find('.active').remove(); 
}

//event triggered when save button is clickd, save current canvas elements
export function SaveCanvas(){
     SaveProgress($("div.canvas div.block")[0].innerHTML);
}
