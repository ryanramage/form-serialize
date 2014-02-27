(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory( );
    } else if (typeof define === 'function' && define.amd) {
        define(['element-value'],factory);
    } else {
        root.form_serialize = factory(root.element_value);
    }
}(this, function (value) {

  /*******************************************************************/
  // form serialize. From https://github.com/yields/serialize/blob/master/index.js
  /*******************************************************************/

  /**
   * Serialize the given `form` to object.
   *
   * @param {Element} el
   * @return {Object}
   */

  return function form_serialize(el){
    return reduce(el.elements, function(ret, el){
      if (!submittable(el)) return ret;

      if (!ret[el.name]) {
        ret[el.name] = value(el);
      } else if (ret[el.name].push) {
        ret[el.name].push(value(el));
      } else {
        ret[el.name] = [ret[el.name], value(el)];
      }

      return ret;
    }, {});
  };

  /*******************************************************************/
  // submittable. From https://github.com/yields/submittable/blob/master/index.js
  /*******************************************************************/

  /**
   * Check if the given `el` is submittable.
   *
   * @param {Element}
   * @return {Boolean}
   */

  function submittable(el){

    var rtype = /^(?:submit|button|image|reset|file)$/i;
    var rname = /^(?:input|select|textarea|keygen)$/i;
    var rcheck = /^(?:checkbox|radio)$/i;

    return ! el.disabled
      && el.name
      && ! rtype.test(el.type)
      && rname.test(el.nodeName)
      && (!rcheck.test(el.type)
      || el.checked);
  };


  /*******************************************************************/
  // reduce. From https://github.com/yields/reduce/blob/master/index.js
  /*******************************************************************/
  /**
   * Reduce `obj` with `fn`.
   *
   * @param {Mixed} obj
   * @param {Function} fn
   * @param {Mixed} val
   * @api public
   */

  function reduce(obj, fn, val){
    each(obj, function(a, b){
      val = fn.apply(null, [val, a, b]);
    });
    return val;
  }

  /**
   * Iterate array-ish.
   *
   * @param {Array|Object} obj
   * @param {Function} fn
   * @param {Object} ctx
   * @api private
   */

  function each(obj, fn, ctx) {
    for (var i = 0; i < obj.length; ++i) {
      fn.call(ctx, obj[i], i);
    }
  }

}));