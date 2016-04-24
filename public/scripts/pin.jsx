var React = require('react');

var Pin = React.createClass({
  handleImageLoaded: function() {
    console.log("Images Loading");
    $('#content').masonry({
      itemSelector: '.pin',
      gutter: 15,
      fitWidth: true,
      transitionDuration: 0
    });  
    $('#content').masonry('reloadItems');         
  },

  render: function() {
    // srcUrl = '"' + {this.props.url} + '"'
    return (
      <div className="pin">
        <img 
        src={this.props.img_url} 
        onLoad={this.handleImageLoaded}
        />
        <div className="info">
          <div className="pinInfo">
            <div className="description">
              <p>{this.props.text}</p>
            </div>
            <div className="pinStats">
              <div className="pinRepins">
                <img src="images/repin_icon.png" />
                <p>{this.props.repin_count}</p>
              </div>
              <div className="pinLikes">
                <img src="images/heart_icon.png" />
                <p>{this.props.like_count}</p>
              </div>
            </div>
          </div>
          <div className="userBoardInfo">
            <div className="userPic">
              <img src={this.props.pinner_pic} onLoad={this.handleImageLoaded} />
            </div>
            <div className="pinner">
              <p>{this.props.pinner_name}</p>
            </div>
            <div className="board">
              <p>{this.props.board_name}</p>
            </div>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = Pin;