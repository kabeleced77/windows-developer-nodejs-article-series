# Windows Developer Node.js Article Series

This repositories contains the sample code shown in the Windows Developer Node.js article series which will be published in April. 

## Articles

Take a look at the following list for a mapping of article name to the folder containing the source code.
The code in this repository may be a bit more advanced than shown in the articles.

* _Serverentwicklung mal anders: Die Welt von Node.js_: `part1`
* _Gib mir den REST: Moderne Web APIs mit Node.js_: `part2`
* _3. Datenbanken mit Node.js: Aber mit Struktur!_: `part3`
* _Alles grün! Unit- und Integrationstests mit Node.js_: `part4`

## Requirements

* [Node.js](https://nodejs.org/en/)
  * Should be installed via Node Version Manager (nvm) to allow easily switching of different Node.js versions
  * [nvm for Mac OS X and Linux](https://github.com/creationix/nvm)
  * [nvm for Windows](https://github.com/coreybutler/nvm-windows)

## Usage

### Part 1

Part 1 implememnts a little calculator which can be accessed via the command line. To use the code from part 1, point a terminal to the `part1` folder. You can use the app via the following command: `node index.js operator operand1 operand2` whereas the command line parameters accept the following values:

* `operator`: Can be `add`, `subtract`, `multiply` or `divide`. 
* `operator1`: Can be any floating point number.
* `operator2`: Same as `operator1`
