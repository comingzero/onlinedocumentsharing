
var SHARE_LINK = null;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sharinglink = urlParams.get('sharinglink');
if (typeof sharinglink === 'undefined' || sharinglink === null) 
{
    SHARE_LINK = sharinglink;
}


(function initialize(){
    app = new window.Webex.Application();
    app.onReady().then(() => 
    {
        log('onReady()', {message:'app is ready'});
        if (typeof SHARE_LINK === 'undefined' || SHARE_LINK === null) 
        {
            showHostView();
        }
        else
        {
            showAttendeeView();
        }

        app.listen().then(function () {
            app.on("application:shareStateChanged", function (isShared) {
            });
        }).catch(function (reason) {
            log("listen: fail reason=" + reason);
        });
    });
        
})();

function showHostView()
{
    document.getElementById("sharinglink").hidden = false;
    document.getElementById("sharingbutton").hidden = false;
}

function showAttendeeView()
{
    //document.getElementById("sharinglink").hidden = true;
    //document.getElementById("sharingbutton").hidden = true;

    document.getElementById("sharinglink").style.display = "none";
    document.getElementById("sharingbutton").style.display = "none";
    window.location.replace(sharinglink, "_self");
}

window.onkeyup = keyup;

function keyup(e) {
    //setting your input text to the global Javascript Variable for every key press
    SHARE_LINK = e.target.value;
}

function shareLink()
{
    setShareUrl();
}

function setShareUrl() 
  {
    var internalUrl = "https://comingzero.github.io/onlinedocumentsharing/?sharinglink=" + SHARE_LINK;
    var externalUrl = internalUrl;
    var title = "Countdown Timer";
    var opt = {};

    app.setShareUrl(internalUrl, externalUrl, title, opt)
      .then(function (res) {
        log("Promise setShareUrl success", JSON.stringify(res));
      })
      .catch(function (reason) {
        log("setShareUrl: fail reason=" + reason);
      });
  }

function log(type, data) {
    /*
  var ul = document.getElementById("console");
  var li = document.createElement("li");
  var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
  li.appendChild(payload)
  ul.prepend(li);*/
}