# SimpleCORS 

SimpleCORS is a lightweight proxy to sites that do not support CORS or JSONP.

The server defaults to run on port 5001.

## Configuration and running

There are two options to specify your host domain + path and start the server:

1. Map the host domain + path to a route in `dataSourceRoutes.json`:

```
# set up the route
"nws-current": "http://www.wrh.noaa.gov/mesowest/mwXJList.php"

// make the request:
XHR.open('GET', http://localhost:5001/nws-current/?dataParam1=foo&dataParam2=bar');
```

This technique allows routing to multiple data sources via one server. Alternately:


2. Specify the host domain + path directly via the CLI:

```
# start the server: 
node server.js 'http://your.data-source.com/path/to/data'`

// make the request:
XHR.open('GET', http://localhost:5001/?dataParam1=foo&dataParam2=bar');
```

This technique supports only one data source per server instance.

## Using with a data-consuming application

Your application cannot directly pull data from your favorite data source because the source doesn't support CORS or JSONP. Tears! Instead of making requests directly to your data source, make them to SimpleCORS and all your data are belong to you.

1. Configure the SimpleCORS server with the URL of your data source, as instructed above.

2. Run SimpleCORS as instructed above.

3. Point your application's data requests to SimpleCORS, running by default at `http://localhost:5001/` + `data-source-route`. For example: `http://localhost:5001/nws-current/?dataParam1=foo&dataParam2=bar` where `nws-current` is mapped to a URL in dataSourceRoutes.json.

And now you have the datas.