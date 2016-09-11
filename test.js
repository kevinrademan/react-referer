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
      clientReferer.__set__('_doc', { referrer: 'test' });
      expect(clientReferer.referer()).toBe('test');
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
        serverHeader.plugToRequest({ header: { referer: 123 } });
        expect(serverHeader.referer()).toBe(123);
      });

      it('should load the request headers', function () {
        serverHeader.plugToRequest({ headers: { referer: 123 } });
        expect(serverHeader.referer()).toBe(123);
      });

      it('should return undefined when header not set', function () {
        serverHeader.plugToRequest({});
        expect(serverHeader.referer()).toBeUndefined();
      });
    });

    describe('unplug', function () {
      it('should return an unplug function', function () {
        var unplug = serverHeader.plugToRequest({ headers: { referer: 'test' } });
        expect(typeof unplug).toBe('function');
      });

      it('should set _res private variable when plugToRequest is called', function () {
        var req = { headers: { referer: 'test' } }
        var res = { headersSent: false }
        var unplug = serverHeader.plugToRequest(req, res);
        expect(serverHeader.__get__('_res')).toBe(res);
      });

      it('should clear reference to response cookie when called', function () {
        var req = { headers: { referer: 'test' } }
        var res = { headersSent: false }
        var unplug = serverHeader.plugToRequest(req, res);
        expect(serverHeader.referer()).toBe('test');
        expect(serverHeader.__get__('_res')).toBe(res);
        unplug();
        expect(serverHeader.referer()).toBeUndefined();
        expect(serverHeader.__get__('_res')).toBe(null);
      });
    });
  });
});

