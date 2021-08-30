(function initialize(){
    app = new window.Webex.Application();
    app.onReady().then(() => 
    {
        log('onReady()', {message:'app is ready'});
        app.listen().then(function () {
            app.on("application:shareStateChanged", function (isShared) {
            });
        }).catch(function (reason) {
            log("listen: fail reason=" + reason);
        });
    });
        
})();

function log(type, data) {
    /*
  var ul = document.getElementById("console");
  var li = document.createElement("li");
  var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
  li.appendChild(payload)
  ul.prepend(li);*/
}