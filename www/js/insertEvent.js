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
    //createTable();
}

/*
Main feature : insert some new data to table I created above
Brings : none
My code
*/
function insertEvent(eventName, eventLocation, eventDate, eventStartTime, eventOrganizer)
{
    eventDB.transaction(function(transaction) {
    var executeQuery = "INSERT INTO event (eventName, eventLocation, eventDate, eventStartTime, eventOrganizer) VALUES (?,?,?,?,?)";
    transaction.executeSql(executeQuery, [eventName, eventLocation, eventDate, eventStartTime, eventOrganizer]
    , function(tx, result) {
            alert('Create new event successfully !');
        },
        function(error){
            alert('Error : ' + error);
        });
    });
}

/*
Main feature : check duplicate event name, location, date, start time
if duplicate and show alert window, if not so insert data to table
Brings : none
My code
*/
function checkDuplicate(eventName, eventLocation, eventDate, eventStartTime, eventOrganizer)
{
	var review = "";
	eventDB.transaction(function(transaction) {
    var executeQuery = "SELECT * FROM event where eventName=? and eventLocation=? and eventStartTime=? and eventOrganizer=?";
    transaction.executeSql(executeQuery, [eventName, eventLocation, eventStartTime, eventOrganizer],
        function(tx, result) {
        	var len = result.rows.length;
        	if(len != 0)
        	{
        		alert("This event has been already inserted! Please check the list again!");
        	}else{

        		//insert new event
        		review = "";
                review += "Event name : " + eventName + "\n";
                review += "Event location : " + eventLocation + "\n";
                review += "Event create date : " + eventDate + "\n";
                review += "Event start time : " + eventStartTime + "\n";
                review += "Event organizer's name : " + eventOrganizer + "\n";
                var qconfirm = confirm("Your new event information\n\n" + review + "\nChoose Cancel if you not sure, choose OK if everything is fine!");
                if(qconfirm)
                {
                	insertEvent(eventName, eventLocation, eventDate, eventStartTime, eventOrganizer);
                }
        		
        	}
        },
        function(error){
            alert('Something went Wrong');
        });
 	});
}