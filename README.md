# react-referer
Isomorphic function to load the referer

## Isomorphic referer!
You can also plug it directly with a Node.js request by adding just before the renderToString: `reactReferer.plugToRequest(req);`<br />

## Download
NPM: `npm install react-referer`<br />

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
