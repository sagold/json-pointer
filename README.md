<h1 align="left"><img src="./docs/gson-pointer.png" width="296" alt="gson-pointer"></h1>

This is a json-pointer implementation following [RFC 6901](https://tools.ietf.org/html/rfc6901).
As the _error handling_ is not further specified, this implementation will return `undefined` for any invalid
pointer/missing data, making it very handy to check uncertain data, i.e.

```js
const data = {};
if (pointer.get(data, '/path/to/nested/item') !== undefined) {
    // value is set, do something
}

// instead of
if (data.path && data.path.to && data.path.to.nested && data.path.to.nested.item) {
    // value is set, do something
}
```

**install with** `yarn add gson-pointer` or `npm i gson-pointer`


## Breaking Changes

- 2020/11/09    since `v4`, `gp.delete` has been renamed to `remove`


## API

| method                                | description
| ------------------------------------- | -------------------------------------------------------------
| get(data, pointer) -> value           | returns the value at given pointer
| set(data, pointer, value) -> data     | sets the value at the given path
| remove(data, pointer) -> data         | removes a property from data
| join(...pointers) -> pointer          | joins multiple pointers to a single one
| split(pointer) -> [array]             | returns a json-pointer as an array


> The methods `get`, `set`, `remove` and `join` also accept a list of properties as pointer. Using join with a list
> of properties, its signature changes to `join(properties:string[], isURI=false) -> string`


## Usage Examples

### pointer.get

> get(data:object|array, pointer:string|array, defaultValue:any) -> value:any

returns nested values

```js
const gp = require('gson-pointer');
const data = {
    parent: {
        child: {
            title: 'title of child'
        }
    }
}

const titleOfChild = gp.get(data, '/parent/child/title'); // output: 'title of child'
console.log(gp.get(data, '/parent/missing/path')); // output: undefined
```

and may optionally return a default value with

```js
const gp = require('gson-pointer');
const value = gp.get({}, "/invalid/value", 42);
console.log(value); // output: 42
```

`get` also accepts a list of properties as pointer (e.g. split-result)

```js
const titleOfChild = gp.get(data, ['parent', 'child', 'title']); // output: 'title of child'
console.log(gp.get(data, ['parent', 'missing', 'path'])); // output: undefined
```

### pointer.set

> set(data:object|array, pointer:string|array, value:any) -> data:object|array

changes a nested value

```js
const gp = require('gson-pointer');

var data = {
    parent: {
        children: [
            {
                title: 'title of child'
            }
        ]
    }
};

pointer.set(data, '/parent/children/1', { title: 'second child' });
console.log(data.parent.children.length); // output: 2
```

and may be used to build data

```js
const gp = require('gson-pointer');
const data = gp.set({}, '/list/[]/value', 42);
console.log(data); // output: { list: [ { value: 42 } ] }
```

`set` also accepts a list of properties as pointer (e.g. split-result)

```js
const gp = require('gson-pointer');
const data = gp.set({}, ['list', '[]', 'value'], 42);
console.log(data); // output: { list: [ { value: 42 } ] }
```


### pointer.remove

> remove(data:object|array, pointer:string|array) -> data:object|array

deletes a nested property or item

```js
const gp = require('gson-pointer');
const data = gp.remove({ parent: { arrayOrObject: [ 0, 1 ] }}, '/parent/arrayOrObject/1');
console.log(data.parent.arrayOrObject); // output: [0]
```

`remove` also accepts a list of properties as pointer (e.g. split-result)

```js
const gp = require('gson-pointer');
const data = gp.remove({ parent: { arrayOrObject: [ 0, 1 ] }}, ['parent', 'arrayOrObject', '1']);
console.log(data.parent.arrayOrObject); // output: [0]
```


### pointer.split

> split(pointer:string) -> properties:array

returns a json-pointer as a list of (escaped) properties

```js
const gp = require('gson-pointer');
const list = gp.split('/parent/arrayOrObject/1');
console.log(list); // output: ['parent', 'arrayOrObject', '1']
```

In order to resolve a list of properties, you can directly pass the list to `get`, `set` or `remove`

```js
const gp = require('gson-pointer');
const data = { a: { b: true } };
const list = gp.split('/a/b');
console.log(gp.get(data, list)); // output: true
```


### pointer.join

> join(...pointers:string[]) -> pointer:string

joins all arguments to a valid json pointer

```js
const gp = require('gson-pointer');
const key = 'my key';
console.log(gp.join('root', key, '/to/target')); // output: '/root/my key/to/target'
```

and joins relative pointers as expected

```js
const gp = require('gson-pointer');
console.log(gp.join('/path/to/value', '../object')); // output: '/path/to/object'
```

in order to join an array received from split, you can use `join(properties:string[], isURI=false) -> string` to
retrieve a valid pointer

```js
const gp = require('gson-pointer');
const list = gp.split('/my/path/to/child');
list.pop();
console.log(gp.join(list)); // output: '/my/path/to'
```

To join an array of pointers, you must use it with `join(...pointers)` or all pointers will be treated as properties:

```js
const gp = require('gson-pointer');
const pointer = gp.join(...['/path/to/value', '../object']);
console.log(pointer); // output: '/path/to/object'

// passing the array directly, will treat each entry as a property, which will be escaped and resolves to:
gp.join(['/path/to/value', '../object']); // output: '/~1path~1to~1value/..~1object'
```


## Fragment identifier

All methods support a leading uri fragment identifier (#), which will ensure that property-values are uri decoded
when resolving the path within data. This also ensures that any pointer is returned uri encoded with a leading `#`. e.g.

```js
const gp = require('gson-pointer');

// get
const value = gp.get({ 'my value': true }, '#/my%20value');
console.log(value); // output: true

// join
const pointer = gp.join('#/my value/to%20parent', '../to~1child');
console.log(pointer); // output: '#/my%20value/to~1child'

// join an array of properties
const uriPointer = gp.join(['my value', 'to~1child'], isURI = true);
console.log(uriPointer); // output: '#/my%20value/to~1child'
```

Additionally `join(...pointers, isURI)` may be used to enforce the pointer type, which is helpful in sanitizing inputs

```js
const uriPointer = gp.join('my pointer', 'to', 'property', isURI = true);
console.log(uriPointer); // output: '#/my%20pointer/to/property'

const uriSimple = gp.join('/my pointer/to/property', isURI = true);
console.log(uriSimple); // output: '#/my%20pointer/to/property'

const pointer = gp.join('#/my pointer', 'to', 'property', isURI = false);
console.log(pointer); // output: '/my pointer/to/property'
```

