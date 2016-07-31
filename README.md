# Windows Developer Node.js Article Series

This repositories contains the sample code shown in the Windows Developer Node.js article series which will be published in April. 

If you are interested in working with Node.js and TypeScript, take a look at the [Windows Developer Node.js TypeScript repository](https://github.com/thinktecture/windows-developer-nodejs-typescript).

## Articles

Take a look at the following list for a mapping of article name to the folder containing the source code.
The code in this repository may be a bit more advanced than shown in the articles.

* _Serverentwicklung mal anders: Die Welt von Node.js_: `part1`
* _Gib mir den REST: Moderne Web APIs mit Node.js_: `part2`
* _Datenbanken mit Node.js: Aber mit Struktur!_: `part3`
* _Alles grün! Unit- und Integrationstests mit Node.js_: `part4`

## Requirements

* [Node.js](https://nodejs.org/en/)
  * Should be installed via Node Version Manager (nvm) to allow easily switching of different Node.js versions
  * [nvm for Mac OS X and Linux](https://github.com/creationix/nvm)
  * [nvm for Windows](https://github.com/coreybutler/nvm-windows)

## Usage

### Part 1

Part 1 implements a little calculator which can be accessed via the command line. To use the code from part 1, point a terminal to the `part1` folder. You can use the app via the following command: `node index.js operator operand1 operand2` whereas the command line parameters accept the following values:

* `operator`: Can be `add`, `subtract`, `multiply` or `divide`. 
* `operator1`: Can be any floating point number.
* `operator2`: Same as `operator1`.

### Part 2

Part 2 implements a HTTP based Web API to access customer data. To start, point a terminal to the `part2` folder and start the Web API via `node index.js`. The following Web APIs will be available:

* `GET /customers`: A list of all customers.
* `GET /customer/:id`: Returns a specific customer by id.
* `DELETE /customer/:id`: Deletes a specific customer by id.
* `POST /customer`: Creates a new customer.
    * JSON must be sent in the body:

    ```
    {
        "firstName": "Manuel",
        "lastName": "Rauber"
    }
    ```
* `PUT /customer/:id`: Updates a specific customer by id. The same JSON as in the POST route must be sent.

# Part 3

Part 3 extends the HTTP based Web API to use a database. Before part 3 can be started, you need to install PostgreSQL on your machine and create a login and a database.
The sample uses username `dev` with password `dev`. The database name is `NodeJsWebApi`. You can customize this by changing the [connection string](part3/server/index.js#L14).
After that, [Sequelize](http://sequelizejs.com) is used for creating all necessary tables and relationships.

To start, point a terminal to the `part3` folder and start the Web API via `node index.js`. In addition to part 2 the following Web APIs are available:

* `DELETE customer/:id/bill/:billId`: Deletes a bill by the given customer and bill id.
* `POST customer/:id/bill`: Creates a bill for the given customer by its id.
    * JSON must be sent in the body:

    ```
    {
        "title": "Title of the bill",
        "sum": 1337
    }
    ```

All other endpoints (see part 2) will return the bills of a customer.

# Part 4

Part 4 extends Part 3 by adding some tests. Execute `npm i` again since some packages were added. After that use `npm test` to let all tests run.
A folder `coverage` will be created containing the code coverage.
