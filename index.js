/**
  @module  function
*/
require("ibt-Object");

var iter    = require("ibt-iter"),
    is      = require("ibt-is"),
    map     = iter.map,
    toArray = iter.toArray,
    typeOf  = is.typeOf;
    enforce = is.enforce;


/**
  @description  binds and partially applies a method to a given scope||this in any browser
  @param        {object} [scope]
  @param        {function} func
  @return       {function}
*/
function bind(scope, func) {

  var args;

  if (typeOf("function", arguments[0])) {

    args = toArray(arguments, 1);

    return function() {

      return scope.apply(this, args.concat(toArray(arguments)));

    };

  }
  else {

    args = toArray(arguments);
    args.splice(1, 1);

    return func.bind.apply(func, args);

  }

}



/**
  @description  partially applies a function
  @param        {function} func
  @return       {function}
*/
function partial(func) {

  var args = toArray(arguments);
  args.unshift(null);

  return bind.apply(null, args);

}



/**
  @description  creates a function composed of other functions
                all functions must have the same input/output signature
  @params       {function} f1, f2, f3...
  @return       {function}
*/
function compose() {

  var functions = map(arguments, partial(enforce, "function"));

  return function () {

    var funcs = [].concat(functions),
        args = arguments,
        func;

    while (funcs.length) {
      args = [funcs.pop().apply(null, args)];
    }

    return args;

  }

}


exports.bind    = bind;
exports.partial = partial;
exports.compose = compose;
