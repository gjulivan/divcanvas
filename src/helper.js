'use strict'

/*
Helper functions,
for small configuration and helper functions.
centralized so that it is easier to change in the future
*/

//generates random number as element's id
export function GetNextId(prefix){
	return `${prefix}_${Math.round(Math.random()*100)}`;
}

//default text for newly created text elemen on canvas
export function GetDefaultText(){
	return 'Hello, what do you want to write?';
}