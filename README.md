# react-referrer
Isomorphic function to load the referrer

## Isomorphic cookies!
You can also plug it directly with a Node.js request by adding just before the renderToString: `var unplug = reactReferer.plugToRequest(req, res);`<br />

## Download
NPM: `npm install react-referer`<br />
Bower: `bower install react-referer`<br />
CDN: `https://cdnjs.cloudflare.com/ajax/libs/react-referer/1.0.0/react-referer.min.js`

# Examples

```js
import { Component } from 'react';
import reactReferer from 'react-referer';

export default class MyApp extends Component {
  constructor(props) {
    super(props);

    this.state =  { referer: reactReferer.referer() };
  }

  render() {
    return (
      <div>
        {this.state.referer}
      </div>
    );
  }
}
```

## License
This project is under the MIT license. You are free to do whatever you want with it.
