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
    var eventID = getUrlValue()['eID'];
    
    showDataByID();
    viewAllReport(eventID);
    
}

/*
Main feature : View report by event ID
Brings : event ID
My code
*/
function viewAllReport(eventID)
{
    eventDB.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM eventReport where eventID=?', [eventID], function (tx, results) {
        var len = results.rows.length;
        
            for (var i = 0; i < len; i++){
                var ul = document.getElementById("rList");
                var li = document.createElement("li");
                var spanName = document.createElement("span");
                var spanContent = document.createElement("span");
                var hr = document.createElement("hr");
                li.appendChild(spanName);
                li.appendChild(spanContent);
                li.appendChild(hr);
                spanName.appendChild(document.createTextNode(results.rows.item(i).eReporterName + " ("+results.rows.item(i).eReportDate+") : "));
                spanName.setAttribute("id", "eRName");
                spanContent.appendChild(document.createTextNode(results.rows.item(i).eReportContent));
                spanContent.setAttribute("id", "eRContent");
                // li.appendChild(document.createTextNode(results.rows.item(i).eReporterName + " : " + results.rows.item(i).eReportContent));
                ul.appendChild(li);
                // $("#rList").append("<ul><li><p>"+results.rows.item(i).eReporterName+"</p>                   
                //     <p>"+results.rows.item(i).eReportContent+"</p></li></ul>");
                //alert(results.rows.item(i).eReporterName);
            }
        }, null);
    });
}

/*
Main feature : get event ID from url and show event information by ID
Brings : event ID from url
My code
*/
function showDataByID()
{
    var eventID = getUrlValue()['eID'];
    eventDB.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM event where eventID=?', [eventID], function (tx, results) {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                enableButton(results.rows.item(i).eventStatus);
                document.getElementById('event_name').innerHTML = results.rows.item(i).eventName;
                document.getElementById('event_status').innerHTML = results.rows.item(i).eventStatus;
            };
            
        }, null);
    });
}


/*
Main feature : update event status from the user by event ID
Brings : event ID from url
My code
*/
function IndicateEndEvent()
{
    var eventID = getUrlValue()['eID'];
    var eventStatus = "ended";
    eventDB.transaction(function(transaction) {
         var executeQuery = "UPDATE event SET eventStatus=? WHERE eventID=?";
         transaction.executeSql(executeQuery, [eventStatus,eventID],
         function(tx, result) {
            alert('Thanks for your report !');
        },
         function(error){
            alert('Something went Wrong');
        });
     });
}

/*
Main feature : disable or enable insertNew button and eventEnded button
Brings : event status
My code
*/
function enableButton(eventStatus)
{
    
    if(eventStatus == "ended")
    {
        document.getElementById('insertNew').style.visibility = 'hidden';
        document.getElementById('eventEnded').style.visibility = 'hidden';
    }else{
        document.getElementById('insertNew').style.visibility = 'visible';
        document.getElementById('eventEnded').style.visibility = 'visible';
    }
}

/*
Main feature : redirect to insertReport activity (insertReport.html) with event ID
Brings : event ID from url
My code
*/
function buttonInsertClick()
{
    var eventID = getUrlValue()['eID'];
    window.location = 'insertReport.html?eID=' + eventID;
}

/*
Main feature : show confirm window for user confirm about the event status
Brings : none
My code
*/
function confirmAndUpdateEventStatus()
{
    var qconfirm = confirm("Are you sure about the ending of this event?");
    if(qconfirm)
    {
        //if the event is ending => call function indicateEndEvent() 
        IndicateEndEvent();
    }
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