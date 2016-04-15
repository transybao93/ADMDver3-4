document.addEventListener("deviceready", onDeviceReady, false);
/*
Main feature : Create database name eventInfo and version 1
or open database if existed
Brings : none
My code
*/
var eventDB;
function onDeviceReady(){
	eventDB = window.openDatabase('eventInfo', '1', 'event', 2000000);
	showDataByID();
}

/*
Main feature : show data by event id
Brings : get event id from url from function getUrlValue() below
My code
*/
function showDataByID()
{
	var eventID = getUrlValue()['eID'];
	eventDB.transaction(function(transaction) {
	transaction.executeSql('SELECT * FROM event where eventID=?', [eventID], function (tx, results) {
	    var len = results.rows.length;
	    for (var i = 0; i < len; i++) {
	    	var div = document.getElementById('event_detail');
	    	var pName = document.createElement('p');
	    	var pLocation = document.createElement('p');
	    	var pEventDate = document.createElement('p');
	    	var pStartTime = document.createElement('p');
	    	var pOrganizer = document.createElement('p');
	    	var pStatus = document.createElement('p');
	    	var b = document.getElementById('b');
	    	div.appendChild(pName);
	        div.appendChild(pLocation);
	        div.appendChild(pEventDate);
	        div.appendChild(pStartTime);
	        div.appendChild(pOrganizer);
	        div.appendChild(pStatus);

	        pName.appendChild(document.createTextNode("Event name : " + results.rows.item(i).eventName));
	        pLocation.appendChild(document.createTextNode("Event location : " + results.rows.item(i).eventLocation));
	        pEventDate.appendChild(document.createTextNode("Event date : " + results.rows.item(i).eventDate));
	        pStartTime.appendChild(document.createTextNode("Event start time : " + results.rows.item(i).eventStartTime));
	        pOrganizer.appendChild(document.createTextNode("Event organizer name : " + results.rows.item(i).eventOrganizer));
	        pStatus.appendChild(document.createTextNode("Event status : " + results.rows.item(i).eventStatus));
	    };
	        
	    }, null);
	});
}

/*
Main feature : get id from url
Brings : none
My code
*/
function getUrlValue() {
	var values = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
	function(m,key,value) {
	  values[key] = value;
	});
	return values;
}