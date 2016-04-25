var React = require('react');

var HeaderControls = React.createClass({
  getInitialState: function() {
    return {
      text: '',
      btnText: '',
      btnImgPath: '/images/menu.png'
    };
  },
  // Data ends up in pinWrapper loadPinsFromServer() which requests from api
  handleTextChange: function(e) {
    window.scrollTo(0, 0);
    this.setState({text: e.target.value});
    this.props.onSearchSubmit('clear', e.target.value, 0);
  },
  // Data ends up in pinWrapper loadPinsFromServer() which requests from api
  handleLogoClick: function() {
    window.scrollTo(0, 0);
    this.setState({text: ''});
    this.props.onSearchSubmit('clear', '', 0);
  },
  handleMenuClick: function() {
    if(this.state.btnImgPath == '/images/face.png') {
      this.setState({btnImgPath: 'images/menu.png'})
      this.setState({btnText: ''})
    } else {
      this.setState({btnImgPath: '/images/face.png'})
      this.setState({btnText: '  Built by John Mogielnicki'})
    }
    
  },
  // Renders all header control components
  render: function() {
    return (
    <div className="row">
      <div className="col-lg-6">
        <div className="input-group">
          <span className="input-group-btn" id="left">
            <button 
              className="btn btn-default" 
              type="button"
              onClick={this.handleLogoClick}>
                <img src='/images/logo_transparent.png' id="logo" />
            </button>
          </span>
            <input type="text" 
              className="form-control" 
              placeholder="Search" 
              value={this.state.text} 
              onChange={this.handleTextChange}/>
          <span className="input-group-btn" id="right">
            <button 
              className="btn btn-default" 
              type="button"
              onClick={this.handleMenuClick}>
                <img src={this.state.btnImgPath} id="logo" />{this.state.btnText}
            </button>
          </span>

        </div>

      </div>
    </div>

    
    );
  }
});

module.exports = HeaderControls;