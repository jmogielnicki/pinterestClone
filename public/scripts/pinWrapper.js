var React = require('react');

var HeaderControls = require('./headerControls');
var PinList = require('./pinList');

var taskFired  = false;


var PinWrapper = React.createClass({
  // Call function to assemble url params and then send to server via ajax
  loadPinsFromServer: function(action, searchTerm, next_index) {
    console.log('aaaand the state of next index is')
    console.log(next_index)
    this.setState({searchTxt:searchTerm});
    var apiCall = this.props.urlProperty + this.assembleParams(searchTerm, action, next_index)
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
  // Check if nearing bottom of page, if yes add pins
  handleScroll: function(event) {
    if($(window).scrollTop() >= ($(document).height() - $(window).height()) - $(window).height()){
      
      if(!taskFired){
            taskFired = true;
            this.loadPinsFromServer('noClear', this.state.searchTxt, this.state.next_index);
            setTimeout(function(){taskFired  = false;}, 1500);
        }
    }
  },
  // Assemble url paramaters to pass to the API
  assembleParams: function(searchTerm, action_param = 'clear', next_index = 0) {
  var apiParams = '';
  console.log('assembling url parameters')
  if (searchTerm.length>0) {apiParams = '/' + searchTerm};
  apiParams += '?action=' + action_param
  apiParams += '&next_index=' + String(next_index)
  return apiParams;
  },
  getInitialState: function() {
    return {api_response_pins: []};
  },
  // Load initial set of pins and listen for scroll to enable add pin trigger
  componentDidMount: function() {
    this.loadPinsFromServer('clear', '', 0);
    window.addEventListener('scroll', this.handleScroll);
  },
  render: function() {
    return (
      <div className="wrapper">
        <HeaderControls onSearchSubmit={this.loadPinsFromServer} />
        <PinList dataFromPinWrapper={this.state.api_response_pins} />
      </div>
    );
  }
});

module.exports = PinWrapper;