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
Main feature : get current date
Brings : none
My code
*/
function getCurrentDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //start with 0 so +1
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0' + dd;
    } 

    if(mm<10) {
        mm = '0' + mm;
    } 

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

/*
Main feature : Insert reporter name, report content to report table
Brings : eReporterName, eReportContent
My code
*/
function insertReport(eReporterName, eReportContent)
{
    var eventID = getUrlValue()['eID'];
    var eReportDate = getCurrentDate();
    eventDB.transaction(function(transaction) {
    var executeQuery = "INSERT INTO eventReport (eReporterName, eReportContent, eReportDate, eventID) VALUES (?,?,?,?)";
    transaction.executeSql(executeQuery, [eReporterName, eReportContent, eReportDate, eventID]
    , function(tx, result) {
            alert('Thanks for your report !');
        },
        function(error){
            alert('Error : ' + error);
        });
    });
}

/*
Main feature : get event ID from url and show event information by ID
Brings : event ID
My code
*/
function showDataByID()
{
    var eventID = getUrlValue()['eID'];
    eventDB.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM event where eventID=?', [eventID], function (tx, results) {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                //alert(results.rows.item(i).eventName);
                document.getElementById('event_name').innerHTML = results.rows.item(i).eventName;
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

/*
Main feature : redirect back to reportInput activity (reportInput.html)
Brings : event id from url
My code
*/
function goBack()
{
    var eventID = getUrlValue()['eID'];
    window.location='reportInput.html?eID='+eventID;
}