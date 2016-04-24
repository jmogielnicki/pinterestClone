var React = require('react');
var PinWrapper = require('./pinWrapper');

ReactDOM.render(
  <PinWrapper urlProperty="/api/pins" />,
  document.getElementById('content')
);

