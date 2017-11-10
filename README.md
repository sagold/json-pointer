# Json Pointer

This json-pointer implementation conforms to [RFC 6901](https://tools.ietf.org/html/rfc6901), currently with one
exception:

> The _URI Fragment Identifier Representation_ **#**, e.g. '#/path/to/value' is treated as syntactic sugar, mainly for
> readability purposes, to clarify that the given string is a json-pointer used with gson-pointer. The identifier will
> be stripped when resolving values of the data and will **not** escape values through _percent-encoding_.

The _URI Fragment Identifier Representation_ may be omitted, e.g. using `#/path/to/value` is equal to `/path/to/value`.
But you should be aware that using methods like `join('/path/to', 'value')` will return the pointer as `#/path/to/value`

As the _error handling_ is not further specified in [RFC 6901](https://tools.ietf.org/html/rfc6901), this implementation
will return `undefined` for any invalid pointer/missing data, making it very handy to check uncertain data, i.e.

```js
if (pointer.get({}, "#/path/to/nested/item") !== undefined) {
	// value is set, do something
}

// instead of
// if (path && path.to && path.to.nested && path.to.nested.item) {
// do something
```


## install

`npm i gson-pointer --save`


## pointer.get

```js
	var data = {
		parent: {
			child: {
				title: "title of child"
			}
		}
	}

	var titleOfChild = pointer.get(data, "#/parent/child/title");
	// "title of child"
```


## pointer.set

set values on an object

```js
	var data = {
		parent: {
			children: [
				{
					title: "title of child"
				}
			]
		}
	};

	pointer.set(data, "#/parent/children/1", {title: "second child"});
	console.log(data.parent.children.length);
	// 2
```


## pointer.delete

delete properties or array items

```js
	pointer.delete(data, "#/parent/arrayOrObject/1");
```


## Helpers

### pointer.join

`pointer.join` joins all arguments to a valid json pointer:

```js
	var key = "child";
	var target = pointer.join("parent", key, "title");
	// "#/parent/child/title"
```