var db = openDatabase('Gumshoe', '1', 'login records', 5 * 1024 * 1024);

chrome.extension.onRequest.addListener(function(request, tab, respond) {

    // present the `manage` page
    if (request.action == 'openManage')
        chrome.tabs.create({'url': 'html/manage.html'});

    // query database
    if (request.action == 'queryDatabase') {

        db.transaction(function(tx) {

            if (request.crud == 'create') {

                // insert unique login credentials
                tx.executeSql('insert into log (href, host, user, pass) ' +
                    'VALUES (?, ?, ?, ?)', request.record);

            } else {

                var query = ' FROM log WHERE host LIKE ?1 OR user LIKE' +
                    ' ?1 OR pass LIKE ?1 OR time LIKE ?1';

                if (request.crud == 'read')
                    query = 'SELECT *' + query + ' ORDER BY time DESC';
                if (request.crud == 'delete')
                    query = 'DELETE' + query;

                // read or delete all which vaguely match `refine`
                tx.executeSql(query, ['%' + request.refine + '%'],
                    function(tx, result) {

                    var rows = [];

                    for (var i = 0; i < result.rows.length; i++)
                        rows.push(result.rows.item(i));

                    respond(rows);
                });
            }
        });
    }
});

chrome.runtime.onInstalled.addListener(function(details) {
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS log (time TIMESTAMP'
      + ' DEFAULT CURRENT_TIMESTAMP, href, host, user, pass, UNIQUE'
      + ' (host, user, pass))');
  });
  chrome.storage.local.set({'passcode':'gselog'});
});
