# Json Pointer

Here is a [solid json-pointer implementation](https://github.com/manuelstofer/json-pointer).
The main differences to this implementation are

- conforms to [RFC 6901](https://tools.ietf.org/html/rfc6901)
- throws an error when a value is not found / the pointer is invalid
- additional utilities

This json-pointer implementation will return `undefined` if the pointer could not be resolved, which allows checks like
`if (pointer.get(data, "#/path/to/nested/item") {...}`
instead of
`if (path && path.to && path.to.nested ...`.

This library exposes

- jsonpointer.get
- jsonpointer.set and
- jsonpointer.delete


## install

`npm i @sagold/json-pointer`


## pointer.get

```js
	var data = {
		parent: {
			child: {
				title: "title of child"
			}
		}
	}

	var titleOfChild = pointer.get(data, "#/parent/child/title"); // "title of child"
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
	console.log(data.parent.children.length); // 2
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
	var target = pointer.join("parent", key, "title"); // "#/parent/child/title"
```