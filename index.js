var _rawHeaders = {};
var _res = undefined;
var _doc = undefined;
if(this.document !== undefined) {
  _doc=this.document;
}

function _isResWritable() {
  if(!_res)
    return false;
  if(_res.headersSent === true)
    return false;
  return true;
}

function referer() {
  if (typeof _doc === 'undefined') {
      return _rawHeaders.referer;
  }
  return _doc.referrer;
}

function plugToRequest(req, res) {
  if (req.header) {
    _rawHeaders = req.header;
  } else if (req.headers) {
    _rawHeaders = req.headers;
  } else {
    _rawHeaders = {};
  }
  _res = res;
  return function unplug() {
    _res = null;
    _rawHeaders = {};
  }
}

var reactReferer = {
  referer: referer,
  plugToRequest: plugToRequest
};

module.exports = reactReferer;
