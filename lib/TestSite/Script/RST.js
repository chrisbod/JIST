// Really Simple Testing for JavaScript
// (c) 2008 Bertrand Le Roy, licensed under MS-PL
function test(tests, consoleElement) {
    var results = {}, failed = 0,
        console = typeof(consoleElement) === "string" ?
            document.getElementById(consoleElement) :
            consoleElement || document.body;
    function write(message, color) {
        if (!console.appendChild) return;
        var div = document.createElement("div");
        div.style.color = color;
        div.innerHTML = message;
        console.appendChild(div);
    }
    for (var testName in tests) {
        try {
            tests[testName]();
            write(testName + " passed", "green");
            results[testName] = null;
        }
        catch (ex) {
            write(testName + " failed with " + ex.message, "red");
            results[testName] = ex;
            failed++;
        }
    }
    if (failed) write(failed + " failed." , "red");
    return results;
}
test.assert = function(condition, failMessage) {
    if (!condition) throw new Error(failMessage || "Assertion failed.");
}