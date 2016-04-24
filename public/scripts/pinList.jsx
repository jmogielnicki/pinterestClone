var React = require('react');
var Pin = require('./pin');

var PinList = React.createClass({
  // Iterate through pins array, creating new react pin components for each element
  render: function() {
    var pinNodes = this.props.dataFromPinWrapper.map(function(pin) {
      return (
        <Pin 
          key={pin.layout_id} 
          pinner_name={pin.pinner.full_name} 
          pinner_pic={pin.pinner.image_small_url}
          text={pin.description} 
          img_url={pin.img_url} 
          board_name={pin.board.name}
          like_count={pin.like_count}
          repin_count={pin.repin_count}
        />
      );
    });
  
    return (
      <div className="pinsWrapper">
        {pinNodes}
      </div>
    );
  }
});

module.exports = PinList;
