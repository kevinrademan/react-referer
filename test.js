var rewire = require('rewire');

describe('ReactReferer', function () {

  describe('referer', function () {

    var clientReferer = null;
    beforeEach(function () {
      /** Import with rewire so we can check on private variable values */
      clientReferer = rewire('./index');
    });
    afterEach(function () {
      clientReferer = null;
    });

    it('should not crash if referer undefined', function () {
      expect(clientReferer.referer()).toBe(undefined);
    });

    it('should read the referer', function () {
      clientReferer.__set__('_doc', { referrer: 'http://test.com' });
      expect(clientReferer.referer()).toBe('http://test.com');
    });
  });

  describe('serverReferer', function () {

    var serverHeader = null;
    beforeEach(function () {
      /** Import with rewire so we can check on private variable values */
      serverHeader = rewire('./index')
    })
    afterEach(function () {
      serverHeader = null;
    })


    describe('plugToRequest', function () {
      it('should load the request header', function () {
        serverHeader.plugToRequest({ header: function(name){ return 'http://test.com';} });
        expect(serverHeader.referer()).toBe('http://test.com');
      });

      it('should load the request headers', function () {
        serverHeader.plugToRequest({ headers: function(name){ return 'http://test.com';} });
        expect(serverHeader.referer()).toBe('http://test.com');
      });

      it('should return undefined when header not set', function () {
        serverHeader.plugToRequest({ header: function(name){ return undefined;} });
        expect(serverHeader.referer()).toBeUndefined();
      });
    });
  });
});

