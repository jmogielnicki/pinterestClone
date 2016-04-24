var React = require('react');


var HeaderControls = React.createClass({
  getInitialState: function() {
    return {
      text: '',
      x:10,
      y:10
    };
  },
  // Data ends up in pinWrapper loadPinsFromServer() which requests from api
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
    this.props.onSearchSubmit('clear', e.target.value, 0);
  },
  // Data ends up in pinWrapper loadPinsFromServer() which requests from api
  handleClick: function() {
    this.setState({text: ''});
    this.props.onSearchSubmit('clear', '', 0);
  },
  sliderChange: function() {

  },
  render: function() {
    return (
    <div className="row">
      <div className="col-lg-6">
        <div className="input-group">
          <span className="input-group-btn">
            <button 
              className="btn btn-default" 
              type="button"
              onClick={this.handleClick}>
                <img src='/images/logo_transparent.png' id="logo" />
            </button>
          </span>
            <input type="text" 
              className="form-control" 
              placeholder="Search" 
              value={this.state.text} 
              onChange={this.handleTextChange}/>

        </div>
      </div>
    </div>

    
    );
  }
});

module.exports = HeaderControls;