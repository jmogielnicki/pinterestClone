var taskFired  = false;
var searchTerm = '';

var assembleParams = function(action_param = 'clear', next_index = 0) {
  var apiParams = '';

  console.log('assembling url parameters')
  // debugger;
  if (searchTerm.length>0) {apiParams = '/' + searchTerm};
  apiParams += '?action=' + action_param
  apiParams += '&next_index=' + String(next_index)
  // debugger
  return apiParams;
};

var PinWrapper = React.createClass({
  loadPinsFromServer: function(action) {
    console.log(this.state.next_index)
    var apiCall = this.props.urlProperty + assembleParams(action, this.state.next_index)
    console.log(apiCall);
    console.log('loading new pins!');
    $.ajax({
      url: apiCall,
      datatype: 'json',
      type: 'GET',
      cache: false,
      success: function(response) {
        this.setState({
          api_response_pins: response['data'],
          next_index: response['meta']
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSearchSubmit: function(searchText) {
    console.log(this.props.url)
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: searchText,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleScroll: function(event) {
    if($(window).scrollTop() >= ($(document).height() - $(window).height()) - $(window).height()){
      
      if(!taskFired){
            taskFired = true;
            this.loadPinsFromServer('noClear');
            setTimeout(function(){taskFired  = false;}, 1500);
        }
      // this.loadPinsFromServer();
    }
  },
  getInitialState: function() {
    return {api_response_pins: []};
  },
  componentDidMount: function() {
    console.log('*componentDidMount*')
    this.loadPinsFromServer('clear');
    // setInterval(this.loadPinsFromServer, this.props.pollInterval);
    window.addEventListener('scroll', this.handleScroll);
  },
  componentDidUpdate: function() { 
    console.log('*componentDidUpdate*')      
  },
  render: function() {
    return (
      // TODO change onSearchSubmit to fire "handleSearchSubmit"
      <div className="wrapper">
        <Searchbox onSearchSubmit={this.loadPinsFromServer} />
        <PinList dataFromPinWrapper={this.state.api_response_pins} />
      </div>
    );
  }
});

var PinList = React.createClass({
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

var Pin = React.createClass({
  handleImageLoaded: function() {
    console.log("Images Loading");
    $('#content').masonry({
      itemSelector: '.pin',
      columnWidth: 250,
      gutter: 15,
      fitWidth: true,
      originLeft: true,
      originTop: true,
      transitionDuration: 0,
      resize: true,
      isFitWidth: true
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

var Searchbox = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  // With each text change, mirroring the new value into our setState
  handleTextChange: function(e) {
    console.log('*handleTextChange')
    this.setState({text: e.target.value});
    {searchTerm = e.target.value};
    this.props.onSearchSubmit();
  },
  render: function() {
    return (
    <div className="row">
      <div className="col-lg-6">
        <div className="input-group">
          <span className="input-group-btn">
            <button className="btn btn-default" type="button">
                <img src='/images/logo_transparent.png' id="logo" />
            </button>
          </span>
            <input type="text" className="form-control" placeholder="Search" value={this.state.text} onChange={this.handleTextChange}/>

        </div>

      </div>
    </div>

    
    );
  }
});

ReactDOM.render(
  <PinWrapper urlProperty="/api/pins"/>,
  document.getElementById('content')
  );
