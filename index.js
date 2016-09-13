var _rawHeaders = {};
var _doc = undefined;
try{
  _doc = document;
}
catch(e) { 
  // Just ignore the error 
}

function referer() {
  if (typeof _doc === 'undefined') {
      return _rawHeaders.referer;
  }
  return _doc.referrer;
}

function plugToRequest(req) {
  if (req.header) {
    _rawHeaders = {
      referer: req.header('referer')
    };
  } else if (req.headers) {
    _rawHeaders = {
      referer: req.headers('referer')
    };
  } else {
    _rawHeaders = {};
  }
}

var reactReferer = {
  referer: referer,
  plugToRequest: plugToRequest
};

module.exports = reactReferer;
