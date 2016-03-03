# SimpleCORS 

SimpleCORS is a lightweight proxy to sites that do not support CORS or JSONP.

The server defaults to run on port 5001.

## Configuration and running

There are two options to specify your host domain + path and start the server:

1. Specify the host domain + path as a CLI parameter in `package.json`'s `script.start'

```
"scripts": {
	"start": "node server.js 'http://your.data-source.com/path/to/data'"
},
```

and then run via `npm start`. Or:

2. Specify the host domain + path directly via the CLI:

```
node server.js 'http://your.data-source.com/path/to/data'`
```

## Using with a data-consuming application

Your application cannot directly pull data from your favorite data source because the source doesn't support CORS or JSONP. Tears! Instead of making requests directly to your data source, make them to SimpleCORS and all your data are belong to you.

1. Configure the SimpleCORS server with the URL of your data source, as instructed above.

2. Run SimpleCORS as instructed above.

3. Point your application's data requests to SimpleCORS, running by default at `http://localhost:5001/`. For example: `http://localhost:5001/?dataParam1=foo&dataParam2=bar`.

And now you have the datas.