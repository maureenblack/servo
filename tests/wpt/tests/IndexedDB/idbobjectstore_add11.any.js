// META: global=window,worker
// META: title=IDBObjectStore.add() - Attempt to add a record where the record's key does not meet the constraints of a valid key
// META: script=resources/support.js
// @author Microsoft <https://www.microsoft.com>

'use_strict';

let db;
const t = async_test();
const record = { key: { value: 1 }, property: "data" };

const open_rq = createdb(t);
open_rq.onupgradeneeded = function(e) {
    db = e.target.result;

    let rq;
    const objStore = db.createObjectStore("store", { keyPath: "key" });

    assert_throws_dom("DataError",
        function() { rq = objStore.add(record); });

    assert_equals(rq, undefined);
    t.done();
};
