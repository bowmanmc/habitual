'use strict';

describe('Sandbox', function () {

    var now = moment();
    var today = now.format('YYYY-MM-DD');
    //console.log('Today: ' + today);

    var ts = new Date();
    var chain = {
        '2013-10-29': {
            'completed': true,
            'date_created': ts,
            'last_updated': ts
        },
        '2013-10-25': {
            'completed': true,
            'date_created': ts,
            'last_updated': ts
        }
    };

    // console.log('---- Chain ----');
    // console.log(JSON.stringify(chain));
    // console.log('--------');

    var c = now;
    var day, link;
    for (var i = 0; i < 10; i++) {
        day = c.format('YYYY-MM-DD');
        link = chain[day];
        if (typeof link !== 'undefined') {

        }
        else {
            // console.log('No link for: ' + day);
        }
        c = c.subtract('days', 1);
    }

    // console.log('---- Chain ----');
    // console.log(JSON.stringify(chain));
    // console.log('--------');

});
