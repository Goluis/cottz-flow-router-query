# cottz-flow-router-query
Simple package to easily manipulate the route query with Flow-router

## Installation
must first have [Flow-router](https://github.com/meteorhacks/flow-router). if you like [Iron-router](https://github.com/iron-meteor/iron-router) and do not want to leave it there is a version of this for him: [cottz-iron-query](https://github.com/Goluis/cottz-iron-query)

```sh
$ meteor add cottz:flow-router-query
```

## Getting Started
````js
FlowRouter.route('/home', {
	subscriptions: function (params, query) {
		query = query || {};
		
    	this.register('news', Meteor.subscribe('news', {
			skip: Number(query.skip),
			search: query.q
		}));
	}
});

// somewhere in the client
FlowRouter.query.set('skip', 10);
FlowRouter.query.set('q', 'beautiful places');
````

## API
`FlowRouter.query` works as a [Session](http://docs.meteor.com/#/full/session) but their values are stored in the route and depend of the route

#### FlowRouter.query.set (key, value)
add or change the value of a key in the current path. If you send undefined or an empty string the key and its value will be removed.
You can also send an object instead of `key` that will extend or will remove (if its value is undefined or empty string) the current query

````js
// path: meteorhacks.com
FlowRouter.query.set('skip', 10); // --> meteorhacks.com/?skip=10

// path: meteorhacks.com/?skip=10
FlowRouter.query.set('skip', undefined); // --> meteorhacks.com

// path: meteorhacks.com
FlowRouter.query.set('options', {skip: 10, limit: 10}); // --> meteorhacks.com/?options[skip]=10&options[limit]=10

// path: meteorhacks.com
FlowRouter.query.set({skip: 10, limit: 10}); // --> meteorhacks.com/?skip=10&limit=10
````

#### FlowRouter.query.unset ()
remove the complete query

````js
// path: meteorhacks.com/?skip=10&limit=10
FlowRouter.query.unset(); // --> meteorhacks.com
````

#### FlowRouter.query.get (key)
gets the value of a key in the current path

````js
// path: meteorhacks.com/?skip=10
FlowRouter.query.get('skip') // --> '10'

// path: meteorhacks.com/?options[skip]=10&options[limit]=10
FlowRouter.query.get('options'); // --> {skip: '10', limit: '10'}

// path: meteorhacks.com/?options[0]=skip&options[1]=limit
FlowRouter.query.get('options'); // --> ['skip', 'limit']
````

#### FlowRouter.query.getNonreactive (key)
is exactly equal to `FlowRouter.query.get` but non reactive (that description kills people)

#### FlowRouter.query.go (object)
replaces the query

````js
// path: meteorhacks.com/?skip=10&limit=10
FlowRouter.query.go({search: 'hacks', fast: true}) // --> meteorhacks.com/?search=hacks&fast=true

// to further clarify the above FlowRouter.query.unset is this
FlowRouter.query.unset = function () {
  return this.go({});
};
````