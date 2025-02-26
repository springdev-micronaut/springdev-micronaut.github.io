var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};
function showElementsByClassName(className) {
    var elements = document.getElementsByClassName(className);
    for ( var i = 0; i < elements.length; i++ ) {
        var element = elements[i];
        element.style.display = "block";
    }
}

function trainingTable(data) {
    var msg = '';
    msg += '<table>';
    msg += '<colgroup>';
    msg += '<col>';
    msg += '<col>';
    msg += '<col>';
    msg += '<col>';
    msg += '</colgroup>';
    msg += '<thead>';
    msg += '<tr><th>Course</th><th>Date(s)</th><th>Instructor(s)</th><th>Hour(s)</th></tr>';
    msg += '</thead>';
    msg += '<tbody>';
    for ( var i = 0; i < data.length; i++ ) {
        msg += '<tr>';
        msg += '<td><a href="'+ data[i].enrollmentLink + '">'+ data[i].course + '</a></td>';
        msg += '<td>'+ data[i].dates + '</td><td>'+ data[i].instructors + '</td>';
        msg += '<td>'+ data[i].hours + '</td>';
        msg += '</tr>';
    }
    msg += '</tbody>';
    msg += '</table>';
    return msg;
}

function eventsTable(data) {
    var msg = '';
    msg += '<table>';
    msg += '<thead>';
    msg += '<tr><th>Name</th><th>Date(s)</th><th>Location</th></tr>';
    msg += '</thead>';
    msg += '<tbody>';
    for ( var i = 0; i < data.length; i++ ) {
        msg += '<tr>';
        msg += '<td><a href="'+ data[i].eventHref + '">'+ data[i].eventName + '</a></td>';
        msg += '<td>'+ data[i].eventDate + '</td>';
        msg += '<td>'+ data[i].eventLocation + '</td>';
        msg += '</tr>';
    }
    msg += '</tbody>';
    msg += '</table>';
    return msg;
}
var pwsurl  = 'https://oci-training.cfapps.io';
var ociTrainingTrack = 34;
getJSON(pwsurl + '/training?trackId='+ociTrainingTrack, function(err, data) {
    var msg = '';
    if (err != null) {
        msg = 'Something went wrong while retrieving OCI training offerings';

    } else {
        if ( data.length == 0 ) {
            msg = '<p><b>Currently, we don\'t have any training offerings available</b></p>.';

        } else {
            msg = trainingTable(data);
        }
    }
    var ociTraining = document.getElementById("ocitraining");
    ociTraining.innerHTML = msg;
    showElementsByClassName('training')
});
var category = 'Micronaut';
getJSON(pwsurl + '/events?category='+category, function(err, data) {
    var msg = '';
    if (err != null) {
        msg = 'Something went wrong while retrieving OCI Events';

    } else {
        if ( data.length == 0 ) {
            msg = '<p><b>Currently, we don\'t have any Micronaut events available</b></p>.';

        } else {
            msg = eventsTable(data);
        }
    }
    var ociTraining = document.getElementById("ocievents");
    ociTraining.innerHTML = msg;
    showElementsByClassName('training')
});

