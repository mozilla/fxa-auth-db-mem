# Firefox Accounts DB Server, Memory Backend

Memory backend (used in testing) for the [fxa-auth-db-server](https://github.com/mozilla/fxa-auth-db-server/).

## Prerequisites

* node 0.10.x or higher
* npm

## Configuration ##

No configuration is usually needed for this module, but you may overwrite values should you
need to. If you then set your `NODE_ENV`, then the file `config/$NODE_ENV.json` will be read in
as part of loading configuration:

```
export NODE_ENV=dev
```

In `config/config.js` you can see a set of defaults for various config options. Go take a look and
then create a new local file called `config/dev.js`. This will contain a set of values to override
the defaults. For example, if want to run on port 8080 instead of port 8000, try this:

```json
{
  "port": 8080
}
```

The same config is used by the main server as shown below.

## Starting the Server ##

Once the database has been created and patched, you can start the server (keep the same `NODE_ENV`
as you had earlier):

```sh
npm start
```

Once this has started up, it will be listening on `locahost:8000` (or whatever port you have
configured in your local config file).

## License

MPL 2.0
