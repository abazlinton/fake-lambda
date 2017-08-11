exports = {};
module.exports = exports;
exports.handler = (event, context, callback) => {
    if (event.queryStringParameters) {
        if (event.queryStringParameters.type) {
            console.log(event.queryStringParameters.type);
        }
    }
    var state = "waiting";
    
  
    const http = require('http');

    const req = http.get('http://glacial-scrubland-75610.herokuapp.com', (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
     
    res.on('data', () => { });
      res.on('end', () => {
        console.log("SUCCESS");
        state = "ready";
        sendResponse();
      });
    })
    
    req.on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
    
    req.setTimeout(1000, () => {
      req.abort();
      console.log("TIMEOUT");
      sendResponse();
    });
    
    function sendResponse() {
        var body = `\
        <!DOCTYPE html>\
        <html>\
        <head>\
            <script type=\"text/javascript\" src=\"https://abazlinton.github.io/app.js\"></script>\
            <link rel=\"shortcut icon\" href=\"https://abazlinton.github.io/favicon.ico\" type=\"image/x-icon\">\
            <title></title>\
        </head>\
        <body>\
            <header><h1>This app runs on Heroku...waiting for it to be ready</h1></header>\
            <div id=\"countdown\"></div>\
            <script>var state = \"${state}\"</script>\
        </body>\
        </html>`;
         var response = {
            "statusCode": 200, 
            "headers": {
                "Content-Type": "text/html"
            },
            "body": body
        };
        
        callback(null, response);
    }
};
