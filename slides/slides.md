name: inverse
layout: true
class: center, middle, inverse
---
# NodeJS and JavaScript for 2016 Onwards
Server side JavaScript (NodeJS 6) for API development

Beginner to intermediate

Vinay Agarwal

Licensed under [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/)

[<img src="https://help.github.com/assets/images/site/invertocat.png">](https://github.com/vinkaga/learn-node)


---
layout: false
.left-column[
  ## About
]
.right-column[

- Not an introduction to programming. Audience should be well-versed in one or more programming languages.

- Uses PHP and Java for reference

- Will not go into obvious stuff - easily guessed or Googled

- Will not go into historical constructs.

- Focused on high performance and maintainability

- Uses Hapi framework

- Benchmark data from [vinkaga/node6perf](https://github.com/vinkaga/node6perf)

- Opinionated :-)

]
---
template: inverse

# 1. The Basics

---
template: inverse

# 1. The Basics
## What is it?
## Why use it?

---
layout: false
.left-column[
  ## 1. Basics
  ###What is it?
]
.right-column[
####JavaScript

- Dynamically typed

- JIT (Just-In-Time) compiler: no compile step needed

- ECMAScript 2015 (previously known as ES6). ES6 support is not yet complete.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

####NodeJS

- An un-sandboxed JavaScript living outside of browser

- Has access to system resources

- A general purpose language - not a server

- Current version 6.3.0. Supports almost all ES6 (https://kangax.github.io/compat-table/es6/)

- https://nodejs.org/dist/latest-v6.x/docs/api/
]
---
.left-column[
  ## 1. Basics
  ### What is it?
  ### Why use it?
]
.right-column[
Not too many languages are fun for humans as well as efficient for machines!

- A slide is from Go lang presentation https://talks.golang.org/2014/gocon-tokyo.slide#28

<img src="langs.png" width="100%">
]
---
template: inverse

# 1. The Basics
## Installing
## Running

---
layout: false
.left-column[
  ## 1. Basics
  ### Installing
]
.right-column[
####OS X

```
brew update
brew upgrade
brew install node
```
####Windows

- Windows Installer at https://nodejs.org/en/download/

####Ubuntu

- `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`

- `sudo apt-get install -y nodejs`

####Updating

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

```
]
---
.left-column[
  ## 1. Basics
  ### Installing
  ### Running
]
.right-column[
####REPL (Read Eval Print Loop)
- `node` (equivalent to `php -a`)

- ^C twice to exit

####Run from file
- Create directory `basics`

- `cd basics`
- Create `hello.js` containing
```JavaScript
console.log('hello world!');
```
- Run with `node hello`
```
~/lean-node/basics $ node hello
hello world!
```
]
---
template: inverse

# 1. The Basics
## NPM - Node Package Manager
Like PHP `composer` but less painful
---
name: how

.left-column[
  ## 1. Basics
  ### NPM
  #### - What?
]
.right-column[
####package.json

- name, version, description etc.

- license, homepage, author/contributors, repository

- dependencies, devDependencies

- scripts

####node_modules

 - holds all dependencies

####Best Practices

- Use exact versions for dependencies. No equivalent of PHP `composer.lock`.

- Include scripts - anyone knows how to run or test

]
---
.left-column[
  ## 1. Basics
  ### NPM
  #### - What?
  #### - How?
]
.right-column[
####package.json
- `npm init` and accept all default responses

- `npm install --save hapi`

```JSON
{
  "name": "basics",
  "version": "1.0.0",
  "description": "",
  "main": "hello.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "hapi": "^13.4.1"
  }
}
```

- `npm install`

- `node_modules` folder
]
---
.left-column[
  ## 1. Basics
  ### NPM
  #### - What?
  #### - How?
]
.right-column[
####Updating dependencies
- `sudo npm -g install npm-check-updates`

- Run `ncu` to update `package.json`

####Scripts
- `npm test`

```
~/p/n/basics $ npm test

> basics@1.0.0 test /Users/vagarwal/public_html/nodejs/basics
> echo "Error: no test specified" && exit 1

Error: no test specified
npm ERR! Test failed.  See above for more details.
```

- `npm run myscript`
]
---
template: inverse

# 1. The Basics
## Simple Server
---
.left-column[
  ## 1. Basics
  ### Simple Server
  #### - Editor
]
.right-column[
####WebStorm/PHPStorm

- Preferences > Languages & Frameworks > JavaScript > JavaScript language version > ECMAScript 6

- Preferences > Languages & Frameworks > JavaScript > NodeJS core library is not enabled. > Enable

####Visual Studio Code (Sublime/Atom like)
- Create `jsconfig.json` in each working folder

```JSON
{
    "compilerOptions": {
        "target": "ES6"
    },
    "exclude": [
        "node_modules"
    ]
}
```
]
---
.left-column[
  ## 1. Basics
  ### Simple Server
  #### - Editor
  #### - Creating
]
.right-column[
- Create `server.js` in `basics/src`

```JavaScript
'use strict';
const Hapi = require('hapi');
const server = module.exports = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply) {
		reply({ simple: 'server' });
	}
});

server.start(function(err) {
	if (err) {
		throw err;
	}
	console.log('Server running at:', server.info.uri);
});
```

- Add the following in `package.json` > `scripts`

```
    "start": "node src/server",
```

- `npm start` and browse to http://localhost:3000/
]

---
.left-column[
  ## 1. Basics
  ### Simple Server
  #### - Editor
  #### - Creating
  #### - Testing
]
.right-column[
- `npm install --save-dev lab code`

- Modify `package.json` > `scripts` as follows

```
    "test": "./node_modules/lab/bin/lab"
```

- Create `test.js` in `basics/test`

```JavaScript
'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const server = require('./server.js');

lab.experiment("Basic HTTP Tests", function() {
	lab.test('It will return simple server JSON', function(done) {
		server.inject('/', function(res) {
			Code.expect(res.statusCode).to.equal(200);
			Code.expect(res.payload).to.equal('{"simple":"server"}');
			done();
		});
	});
});
```

- `npm test`
]
---
.left-column[
  ## 1. Basics
  ### Simple Server
  #### - Editor
  #### - Creating
  #### - Testing
  #### - Code Coverage
]
.right-column[
- Add the following in `package.json` > `scripts`

```
"coverage": "./node_modules/lab/bin/lab -c -t 80 -r html -o coverage.html --coverage-path ./src"
```

- `npm run coverage`

- View `coverage.html` in a browser

<img src="coverage.png" width="100%">
]
---
template: inverse

# 2. NodeJS
---
template: inverse

# 2. NodeJS
## JavaScript Language
---
.left-column[
  ## 2. NodeJS
  ### Language
  #### - Basics
]
.right-column[

- Declaration: `const`, `let` - block scoped, preferred

- Function scoped declaration: `var` - used in legacy code

- There is no `int` type, all numbers are `float`. Use `Math.floor` or `Math.round` to convert to integer

- There is no typecasting - use `Number()`, `String()`, `.toString()` or implicit conversion

- Use `!` or `!!` to convert to boolean

- Standard operators `+`, `-`, `*`, `/`, `%`, `++`, `--`, `+=`, `-=` etc.

- Comparison operators compare reference of objects/arrays not contents

- `null` is different from `undefined` - prefer `undefined`

- `typeof`: `string`, `number`, `function`, `object` or `undefined`

- `==` vs `===` etc. - the former converts type

- `use strict;` disable legacy bad syntax
]
---
.left-column[
  ## 2. NodeJS
  ### Language
  #### - Basics
  #### - Strings
]
.right-column[

```JavaScript
let s1 = 'astring';
let s2 = "another\nstring";
let s3 = `string in
multiple lines`;
```

- Comparison operators compare content (unlike Java)

- Template support using `

```
let a = 'QuX';
let b = `bbb${a.toLowerCase()+'y'}eee`; // bbbquxyeee
```

- `.length` gives the number of characters

- `.startsWith`, `.endsWith`, `.includes` functions

- `.slice` vs `.substr`/`.substring`: use `.slice`

- `.concat` is limiting and *3x* slower than `+`: use `+`

- Spread operator `...` explodes to array of chars

]
---
.left-column[
  ## 2. NodeJS
  ### Language
  #### - Basics
  #### - Strings
  #### - Arrays
]
.right-column[

- `let arr = ['a', ];`

- 0 indexed, never associative, trailing comma allowed

- `.length` gives the number of elements

- Access an element with `[]`

- Iteration: use `for` (fastest) or `for-of` (*2-3x* slower). `forEach` is *7x* slower.

```JavaScript
for (let i = 0, il = items.length; i < il; ++i) {
  console.log(items[i]);
}
for (let item of items) {
  console.log(item);
}
```

- Assignment does *not* copy arrays, use `slice`

- `push`, `pop`, `shift`, `unshift`

- `join` and string `split` (like PHP `implode` and `explode`)

- `obj instanceof Array` to see if a variable is array

- Spread operator `...` to merge arrays `a1.push(...a2)`

]
---
.left-column[
  ## 2. NodeJS
  ### Language
  #### - Basics
  #### - Arrays
  #### - Functions
]
.right-column[

- Can be assigned to variables, passed as params, returned as result

- 2 ways to declare: named version hoisted to top

```JavaScript
function a(p = 2) {
  return p * p;
}
let b = function(p = 2) {
	return p * p;
};
```

- Alternate syntax, AKA, arrow function or lambda expression (doesn't define its own `this`)

```JavaScript
let b = (p = 2) => {
	return p * p;
};
let c = (p = 2) => (p * p);
```

- Default parameter value used when parameter is not provided or is `undefined`

```
let c = b();           // 4
let d = b(undefined);  // 4
```
]
---
.left-column[
  ## 2. NodeJS
  ### Language
  #### - Basics
  #### - Arrays
  #### - Functions
  #### - Objects
]
.right-column[

- `let obj = { prop: 'aval', };`

- Syntax is JSON superset, trailing comma allowed

- Keys are strings (and Symbols)

- `Object.keys(obj)` returns property names (own not inherited)

- Access a property: `obj.propName`, `obj[propInVar]` or `obj['prop-name']`

- Iteration includes inherited properties

```JavaScript
for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(obj[prop]);
  }
}
```
]
---
.left-column[
  ## 2. NodeJS
  ### Language
  #### - Basics
  #### - Arrays
  #### - Functions
  #### - Objects
  #### - Maps
]
.right-column[

- Like objects, stores key values. Keys can be non-string.

- Uses `get`/`set` syntax (unlike objects). `size` returns number of keys.

```JavaScript
let map = new Map();
map.set('a string', 'a val');
map.get('a string');  // 'a val'
let key = {};
map.set(key, 'obj val');
map.get(key);         // 'obj val'
map.get({});          // undefined
map.size;             // 2
```

```JavaScript
for (let key of map.keys()) {
  console.log(key);
}
for (let value of map.values()) {
  console.log(value);
}
for (let [key, value] of map.entries()) {
  console.log(key + " = " + value);
}
```

- Faster than objects but many libraries expect objects instead of maps

]
---
.left-column[
  ## 2. NodeJS
  ### Language
  #### - Basics
  #### - Arrays
  #### - Functions
  #### - Objects
  #### - Maps
  #### - Classes
]
.right-column[

```JavaScript
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	static distance(a, b) {
		return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
	}
	getName() {
		return this.constructor.name;
	}
    get area() {
        return this.x*this.y;
    }
}
class Point3D extends Point {
	constructor(x, y, z) {
		super(x, y);
		this.z = z;
	}
}
let p = new Point(10, 11);
let cp = new Point3D(1, 2, 3);
p.getName();
cp.getName();
Point3D.distance(p, cp);
cp.area;
```

- Use named functions for members, arrow functions cause unexpected behavior

- No private keyword - use closure or WeakMap
]
---
.left-column[
  ## 2. NodeJS
  ### Language
  #### - Basics
  #### - Arrays
  #### - Functions
  #### - Objects
  #### - Maps
  #### - Classes
  #### - Misc
]
.right-column[

####Generators

- An alternate way for handling async operations - not convenient to use

####Symbols

- Designed to avoid conflict with a library object keys

- Provide hooks to library objects

####Reflect

```JavaScript
let yay = Reflect.defineProperty(target, 'foo', { value: 'bar' });
let deleted = Reflect.deleteProperty(target, 'foo');
```

####Proxy

- Used to do something whenever the properties of a target object are accessed

]
---
template: inverse

# 2. NodeJS
## Language
## API
---
.left-column[
  ## 2. NodeJS
  ### API
  #### - Overview
]
.right-column[

####Globals
- `__dirname`, `__filename`

- `console` and `process`

####process.env.NODE_ENV

- `process.env` has environment variables

- By convention `NODE_ENV` stores `production` or another run-time environment. If defaults to `development`.

- App behavior can be customized based on this run-time environment. Many libraries automatically change their behavior when it's set to `production`.

- Environment can be set as follows on UNIX/Mac
```
NODE_ENV=production npm start
```

- On Windows
```
set NODE_ENV=production && npm start
```

]
---
.left-column[
  ## 2. NodeJS
  ### API
  #### - Overview
  #### - Functionality
]
.right-column[

- File system: `fs` and `path`

- `http`/`https`: typically used through a library

- Multicore CPU support: [`cluster`](https://nodejs.org/dist/latest-v6.x/docs/api/cluster.html)


- All functionality accessed as modules (see below)

- Async functions have following calling convention

```JavaScript
somefunc([params, params], callback);
// E.g.
const fs = require('fs');
fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

```

- Use Promises instead of callbacks (discussed later): less code, more maintainable
]
---
.left-column[
  ## 2. NodeJS
  ### API
  #### - Overview
  #### - Functionality
  #### - Module
]
.right-column[

- NodeJS defined interface for libraries and components

- Each module is defined in one file: can use other files (also modules)

- Contents of a module files are wrapped in

```JavaScript
(function (exports, require, module, __filename, __dirname) {
	// let exports = module.exports = {};
    // Contents of module file are inserted here
});
```

- Exports `module.exports`, an object; `exports` refers to `module.exports`

- To export a single item, assign `module.exports` to it. To export multiple items, add them to `exports` object

- `require('foo')` imports what `foo` exports

- Module name vs path: name is looked up in `node_modules` folder
]

---
.left-column[
  ## 2. NodeJS
  ### API
  #### - Overview
  #### - Functionality
  #### - Module
  #### - Create Module
]
.right-column[
- In folder `nodejs`, create `sq.js`

```JavaScript
'use strict';
module.exports = (a) => {
	return a * a;
};
```

- Also create `main.js`

```JavaScript
'use strict';
const sq = require('./sq');
console.log(sq(2));
```

- Run it

```
~/p/n/module $ node main
4
```
]
---
template: inverse

# 2. NodeJS
## Language
## API
## Libraries
---
.left-column[
  ## 2. NodeJS
  ### Libraries
]
.right-column[

- [`lodash`](https://lodash.com/docs): Extension to basic JavaScript functionality 

- [`async`](http://caolan.github.io/async/): Serial/parallel I/O made easy

- [`bluebird`](http://bluebirdjs.com/docs/api-reference.html): A better promise than that in ES6

- ORM/ODM: [`sequelize`](http://docs.sequelizejs.com/en/latest/), [`mongoose`](http://mongoosejs.com/docs/guide.html) (not recommending MongoDB)

- Logging: [`winston`](https://github.com/winstonjs/winston), [`bunyan`](https://github.com/trentm/node-bunyan)

- Servers: [`express`](http://expressjs.com/en/4x/api.html), [`meteor`](http://docs.meteor.com/#/full/) (not pure JS), [`hapi`](http://hapijs.com/api)

- Testing: [`mocha`](https://mochajs.org/), [`jasmine`](http://jasmine.github.io/2.4/introduction.html)

- Production: [`pm2`](http://pm2.keymetrics.io/)

]

---
template: inverse

# 3. The Quirks
What may surprise you
---
.left-column[
  ## 3. Quirks
  ### Single threaded
]
.right-column[

- Like PHP, each request runs in a single thread. But unlike PHP, multiple requests share instantiated classes and data in memory.

- Unlike Java, deadlock not possible - no `synchronize`

- No data is shared between separate threads of the same machine

- Multi-core CPUs are treated as server clusters: each core runs one JavaScript thread. Use `cluster` or `pm2` to fully utilize multi-core CPUs.

- All I/O are executed asynchronously 

]
---
template: inverse

# 4. Promises, promises
---
template: inverse

# 5. A Microservice
---

name: last-page
template: inverse

# The End
Licensed under [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/)

Slideshow created using [remark](http://github.com/gnab/remark).

