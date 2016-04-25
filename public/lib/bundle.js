/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var PinWrapper = __webpack_require__(2);

	ReactDOM.render(React.createElement(PinWrapper, { urlProperty: '/api/pins' }), document.getElementById('content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var HeaderControls = __webpack_require__(3);
	var PinList = __webpack_require__(4);

	var taskFired = false;

	var PinWrapper = React.createClass({
	  displayName: 'PinWrapper',

	  // Call function to assemble url params and then send to server via ajax
	  loadPinsFromServer: function (action, searchTerm, next_index) {
	    console.log('aaaand the state of next index is');
	    console.log(next_index);
	    this.setState({ searchTxt: searchTerm });
	    var apiCall = this.props.urlProperty + this.assembleParams(searchTerm, action, next_index);
	    console.log(apiCall);
	    console.log('loading new pins!');
	    $.ajax({
	      url: apiCall,
	      datatype: 'json',
	      type: 'GET',
	      cache: false,
	      success: function (response) {
	        this.setState({
	          api_response_pins: response['data'],
	          next_index: response['meta']
	        });
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	  // Check if nearing bottom of page, if yes add pins
	  handleScroll: function (event) {
	    if ($(window).scrollTop() >= $(document).height() - $(window).height() - $(window).height()) {

	      if (!taskFired) {
	        taskFired = true;
	        this.loadPinsFromServer('noClear', this.state.searchTxt, this.state.next_index);
	        setTimeout(function () {
	          taskFired = false;
	        }, 1500);
	      }
	    }
	  },
	  // Assemble url paramaters to pass to the API
	  assembleParams: function (searchTerm, action_param = 'clear', next_index = 0) {
	    var apiParams = '';
	    console.log('assembling url parameters');
	    if (searchTerm.length > 0) {
	      apiParams = '/' + searchTerm;
	    };
	    apiParams += '?action=' + action_param;
	    apiParams += '&next_index=' + String(next_index);
	    return apiParams;
	  },
	  getInitialState: function () {
	    return { api_response_pins: [] };
	  },
	  // Load initial set of pins and listen for scroll to enable add pin trigger
	  componentDidMount: function () {
	    this.loadPinsFromServer('clear', '', 0);
	    window.addEventListener('scroll', this.handleScroll);
	  },
	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'wrapper' },
	      React.createElement(HeaderControls, { onSearchSubmit: this.loadPinsFromServer }),
	      React.createElement(PinList, { dataFromPinWrapper: this.state.api_response_pins })
	    );
	  }
	});

	module.exports = PinWrapper;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var HeaderControls = React.createClass({
	  displayName: 'HeaderControls',

	  getInitialState: function () {
	    return {
	      text: '',
	      btnText: '',
	      btnImgPath: '/images/menu.png'
	    };
	  },
	  // Data ends up in pinWrapper loadPinsFromServer() which requests from api
	  handleTextChange: function (e) {
	    window.scrollTo(0, 0);
	    this.setState({ text: e.target.value });
	    this.props.onSearchSubmit('clear', e.target.value, 0);
	  },
	  // Data ends up in pinWrapper loadPinsFromServer() which requests from api
	  handleLogoClick: function () {
	    window.scrollTo(0, 0);
	    this.setState({ text: '' });
	    this.props.onSearchSubmit('clear', '', 0);
	  },
	  handleMenuClick: function () {
	    if (this.state.btnImgPath == '/images/face.png') {
	      this.setState({ btnImgPath: 'images/menu.png' });
	      this.setState({ btnText: '' });
	    } else {
	      this.setState({ btnImgPath: '/images/face.png' });
	      this.setState({ btnText: ' Built by John Mogielnicki' });
	    }
	  },
	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'row' },
	      React.createElement(
	        'div',
	        { className: 'col-lg-6' },
	        React.createElement(
	          'div',
	          { className: 'input-group' },
	          React.createElement(
	            'span',
	            { className: 'input-group-btn', id: 'left' },
	            React.createElement(
	              'button',
	              {
	                className: 'btn btn-default',
	                type: 'button',
	                onClick: this.handleLogoClick },
	              React.createElement('img', { src: '/images/logo_transparent.png', id: 'logo' })
	            )
	          ),
	          React.createElement('input', { type: 'text',
	            className: 'form-control',
	            placeholder: 'Search',
	            value: this.state.text,
	            onChange: this.handleTextChange }),
	          React.createElement(
	            'span',
	            { className: 'input-group-btn', id: 'right' },
	            React.createElement(
	              'button',
	              {
	                className: 'btn btn-default',
	                type: 'button',
	                onClick: this.handleMenuClick },
	              React.createElement('img', { src: this.state.btnImgPath, id: 'logo' }),
	              this.state.btnText
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = HeaderControls;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Pin = __webpack_require__(5);

	var PinList = React.createClass({
	  displayName: 'PinList',

	  // Iterate through pins array, creating new react pin components for each element
	  render: function () {
	    var pinNodes = this.props.dataFromPinWrapper.map(function (pin) {
	      return React.createElement(Pin, {
	        key: pin.layout_id,
	        pinner_name: pin.pinner.full_name,
	        pinner_pic: pin.pinner.image_small_url,
	        text: pin.description,
	        img_url: pin.img_url,
	        board_name: pin.board.name,
	        like_count: pin.like_count,
	        repin_count: pin.repin_count
	      });
	    });

	    return React.createElement(
	      'div',
	      { className: 'pinsWrapper' },
	      pinNodes
	    );
	  }
	});

	module.exports = PinList;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	var Pin = React.createClass({
	  displayName: 'Pin',

	  handleImageLoaded: function () {
	    console.log("Images Loading");
	    $('#content').masonry({
	      itemSelector: '.pin',
	      gutter: 15,
	      fitWidth: true,
	      transitionDuration: 0
	    });
	    $('#content').masonry('reloadItems');
	  },

	  render: function () {
	    // srcUrl = '"' + {this.props.url} + '"'
	    return React.createElement(
	      'div',
	      { className: 'pin' },
	      React.createElement('img', {
	        src: this.props.img_url,
	        onLoad: this.handleImageLoaded
	      }),
	      React.createElement(
	        'div',
	        { className: 'info' },
	        React.createElement(
	          'div',
	          { className: 'pinInfo' },
	          React.createElement(
	            'div',
	            { className: 'description' },
	            React.createElement(
	              'p',
	              null,
	              this.props.text
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'pinStats' },
	            React.createElement(
	              'div',
	              { className: 'pinRepins' },
	              React.createElement('img', { src: 'images/repin_icon.png' }),
	              React.createElement(
	                'p',
	                null,
	                this.props.repin_count
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'pinLikes' },
	              React.createElement('img', { src: 'images/heart_icon.png' }),
	              React.createElement(
	                'p',
	                null,
	                this.props.like_count
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'userBoardInfo' },
	          React.createElement(
	            'div',
	            { className: 'userPic' },
	            React.createElement('img', { src: this.props.pinner_pic, onLoad: this.handleImageLoaded })
	          ),
	          React.createElement(
	            'div',
	            { className: 'pinner' },
	            React.createElement(
	              'p',
	              null,
	              this.props.pinner_name
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'board' },
	            React.createElement(
	              'p',
	              null,
	              this.props.board_name
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Pin;

/***/ }
/******/ ]);