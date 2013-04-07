var timeout;
var passcode;

window.onload = function() {

    // tailor results on each keystroke
    refineTxt.addEventListener('keydown', function() {
        clearTimeout(timeout);
        timeout = setTimeout(queryRecords, 100);
    });

    // delete all visible entries
    deleteBtn.addEventListener('click', function() {

        // confirm deletion
        if (counter.innerHTML > 0 && confirm('Delete ' + counter.innerHTML +
            ' record(s)? Severely permanent, mind you.')) {
            queryRecords('delete');
        }
    });

    // get passcode
    chrome.storage.local.get('passcode', function(response) {
      console.log(response)
      passcode = response.passcode
    });

    // change passcode
    passcodeBtn.addEventListener('click', function() {
        var p = prompt('Enter a passcode (minimum 4 characters):', passcode);
        if (p && p.length >= 4) {
          chrome.storage.local.set({'passcode': p}, function() {
            passcode = p;
          });
        }
    });

    // toggle an extraordinarily shameless plug
    logo.addEventListener('mouseover', function() {
        plug.style.display = 'block';
    });

    logo.addEventListener('mouseout', function() {
        plug.style.display = 'none';
    });

    function queryRecords(crud) {

        if (!crud)
            crud = 'read';

        chrome.extension.sendRequest({

            action: 'queryDatabase',
            crud: crud,
            refine: refineTxt.value

        }, function(rows) {

            counter.innerHTML = rows.length;
            recordList.innerHTML = '';

            for (i in rows) {
                recordList.innerHTML += '<li>' + rows[i].user + ' &#8227; ' +
                    rows[i].pass + '<a href="' + rows[i].href + '">' +
                    rows[i].host + '</a><p>' + rows[i].time + '</p></li>';
            }
        });
    }

    function displayRecords(rows) {

        counter.innerHTML = rows.length;
        recordList.innerHTML = '';

        for (i in rows) {

            var row = rows[i];

            // construct and append row element to `recordList`
            recordList.innerHTML += '<li>' + row.user + ' / ' + row.pass +
                '<a href="' + row.href + '">' + row.host + '</a>' +
                '<p class="timestamp">' + row.time + '</p></li>';
        }
    }

    queryRecords();
}
