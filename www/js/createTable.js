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
    createTable();
    createReportTable();
    viewAllEvent();
    
    //dropAllTable();
    
}

/*
Main feature : Drop Table
Brings : none
My code
*/
function dropAllTable()
{
    
    transaction.executeSql('DROP TABLE IF EXISTS event');
    transaction.executeSql('DROP TABLE IF EXISTS eventReport');
    alert("Dropped all data !");
}

/*
Main feature : Create new table, if table is not exist then create one
Brings : none
My code
*/
function createTable()
{
    eventDB.transaction(function(transaction) {
        //transaction.executeSql('DROP TABLE IF EXISTS event');
        transaction.executeSql('CREATE TABLE IF NOT EXISTS event (eventID integer primary key, eventName text, eventLocation text, eventDate text, eventStartTime text, eventOrganizer text, eventStatus text default "happening")', [],
        function(tx, result) {
            //alert("Table Created");
        },
        function(error) {
            alert("Cannot create table");
        });
    });
}

/*
Main feature : create report table and have foreign key link to eventInfo Table
Brings : none
My code
*/
function createReportTable()
{
    eventDB.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS eventReport (eReportID integer primary key, eReporterName text, eReportContent text, eReportDate text, eventID int, FOREIGN KEY(eventID) REFERENCES event(eventID))', [],
        function(tx, result) {
            //alert("Table report is created !");
        },
        function(error) {
            alert("Cannot create table");
        });
    });
}

/*
Main feature : show some data of eventInfo table
Brings : none
My code
*/
function viewAllEvent()
{
    eventDB.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM event', [], function (tx, results) {
        var len = results.rows.length, i;
        $("#table tr").remove();
            for (i = 0; i < len; i++){
                $("#table").append("<tr><td align='center'>"+(i+1)+"</td><td>"+results.rows.item(i).eventName+"</td><td>"+results.rows.item(i).eventDate+"</td><td>"+results.rows.item(i).eventStartTime+"</td><td align='center'>"+results.rows.item(i).eventStatus+"</td><td align='center'><a href='javascript:void(0)' onclick='detailButtonClick("+results.rows.item(i).eventID+")' class='ui-btn ui-corner-all ui-icon-info ui-btn-icon-notext'>View details</a></td><td align='center'><a href='javascript:void(0)' onclick='reportClick("+results.rows.item(i).eventID+")' class='ui-btn ui-corner-all ui-icon-edit ui-btn-icon-notext'>Report event</a></td><td align='center'><a href='javascript:void(0)' class='ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext' id='delete_button' onclick='deleteEvent("+results.rows.item(i).eventID+")'>Delete event</a></td></tr>");
            }
        }, null);
    });
}

/*
Main feature : redirect to viewEventDetails activity (viewEventDetails.html)
Brings : event ID
My code
*/
function detailButtonClick(eventID)
{
    window.location = 'viewEventDetails.html?eID='+eventID;
}

/*
Main feature : redirect to reportInput activity (reportInput.html)
Brings : event id
My code
*/
function reportClick(eventID)
{
    window.location = 'reportInput.html?eID='+eventID;
}

/*
Main feature : delete one event you selected by ID
Brings : event id
My code
*/
function deleteEvent(eventID){
    eventDB.transaction(function(transaction) {
    var executeQuery = "DELETE FROM event where eventID=?";
    transaction.executeSql(executeQuery, [eventID],
        function(tx, result) {
        	//this is my code
            var qconfirm = confirm("Are you sure about delete this event action?");
            if(qconfirm)
            {
                alert('Deleted one event from the list !');
                viewAllEvent();
            }
            
        },
        function(error){
            alert('Something went Wrong');
        });
     });
}

/*
Main feature : redirect to reportInput activity (reportInput.html)
Brings : input search value get from user interface (UI)
My code
*/
function searchEventInformation(search_value)
{
    eventDB.transaction(function(transaction) {
    transaction.executeSql("SELECT * FROM event where eventOrganizer LIKE ? or eventLocation LIKE ? or eventDate LIKE ?", ['%'+search_value+'%', '%'+search_value+'%', '%'+search_value+'%'], function (tx, results) {
        var len = results.rows.length, i;
        $("#table tr").remove();
            for (i = 0; i < len; i++){
                $("#table").append("<tr><td align='center'>"+(i+1)+"</td><td>"+results.rows.item(i).eventName+"</td><td>"+results.rows.item(i).eventDate+"</td><td>"+results.rows.item(i).eventStartTime+"</td><td align='center'>"+results.rows.item(i).eventStatus+"</td><td align='center'><a href='javascript:void(0)' onclick='detailButtonClick("+results.rows.item(i).eventID+")' class='ui-btn ui-corner-all ui-icon-info ui-btn-icon-notext'>View details</a></td><td align='center'><a href='javascript:void(0)' onclick='reportClick("+results.rows.item(i).eventID+")' class='ui-btn ui-corner-all ui-icon-edit ui-btn-icon-notext'>Report event</a></td><td align='center'><a href='javascript:void(0)' class='ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext' id='delete_button' onclick='deleteEvent("+results.rows.item(i).eventID+")'>Delete event</a></td></tr>");
            }
        }, null);
    });
}
