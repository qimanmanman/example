import React from "react";
import $ from "jQuery";
// import MySingle from './store';
class MyApp extends React.Component {
	loadDataFromServer() {
	    $.ajax({
	    	type: "GET",
	      	url: '../testdata/test.json',
	      	dataType: 'json',
	      	cache: false,
	      	success: function(res) {
	        	if(res.questionType != 5){
	        		if(res.questionType == 1){
	        			res.subtype = '单选题';
	        		} else if(res.questionType == 2){
	        			res.subtype = '多选题';
	        		} else if(res.questionType == 3){
	        			res.subtype = '判断题';
	        		}  else if(res.questionType == 4){
	        			res.subtype = '填空题';
	        		} else if(res.questionType == 6){
	        			res.subtype = '阅读理解';
	        		}
	    			let promise = new Promise(function(resolve, reject) {
	    				let MySingle;
					  	require.ensure([],function(require){
			        		MySingle = require('./store').default;
			        		resolve(MySingle);
			        	});
					});
		        	promise.then(function(data){
		        		window.MySingle = data;
		        		this.setState({data:res,timer:"00:00"});
		        	}.bind(this), function(data){
		        		console.log(data);
		        	}.bind(this));
			    }else {
			    	res.subtype = '阅读理解';
			    	let promise = new Promise(function(resolve, reject) {
	    				let MySingle;
					  	require.ensure([],function(require){
			        		MySingle = require('./fill').default;
			        		resolve(MySingle);
			        	});
					});
		        	promise.then(function(data){
		        		window.MySingle = data;
		        		this.setState({data:res,timer:"00:00"});
		        	}.bind(this), function(data){
		        		console.log(data);
		        	}.bind(this));
			    }   
	      	}.bind(this),
	      	error: function(xhr, status, err) {
	        	console.error(status, err.toString());
	      	}.bind(this)
	    });
	}
	constructor(props) {
	    super(props);
	    this.state = {};
	    this.tick = this.tick.bind(this);
	    this.timer = this.timer.bind(this);
	    this.subanswer = this.subanswer.bind(this);
	    this.loadmodule = this.loadmodule.bind(this); 
	    this.setupWebViewJavascriptBridge = this.setupWebViewJavascriptBridge.bind(this);
	}
	tick() {
	    this.refs.mysingle.animate();
	}
	subanswer() {
		var obj = {
		    "type": "qAnswer",
		    "uid": "290000752",
		    "appType": "1",
		    "userType": "student",
		    "orgType": "single",
		    "roomId": "890",
		    "pushTime": 1470802164489,
		    "answer": [
		        {
		            "questionType": "3",
		            "questionId": "1653",
		            "answer": {
		                "145": "C"
		            }
		        }
		    ]
		};
		this.setupWebViewJavascriptBridge(function(bridge) {
	        var uniqueId = 1

	        bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
	            alert("原生-->JS, " + JSON.stringify(data));
	            responseCallback({"type": "返回的数据"});
	        })

	        // 从原生代码获取数据 对应的handler name 在原生代码里面会返回数据
	        bridge.callHandler('getQuestion', {'foo': 'bar'}, function(response) {
	            alert("question" + JSON.stringify(response));
	        })

	        document.body.appendChild(document.createElement('br'))

	        var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
	        callbackButton.innerHTML = 'Fire testObjcCallback'
	        callbackButton.onclick = function(e) {
	            e.preventDefault()
	            bridge.callHandler('submitResult', {'foo': 'bar'}, function(response) {
	                alert("result" + JSON.stringify(response));
	            })
	        }
	    });
	}
	timer(){
		var HH = 0;
		var mm = 0;
		var ss = 0;
		var str = '';
		var self = this;
		var times = setInterval(function(){
			str = "";
			
			if(++ss==60)
			{
				if(++mm==60)
				{
					HH++;
					mm=0;
				}
				ss=0;
			}
			
			// str+=HH<10?"0"+HH:HH;
			// str+=":";
			str+=mm<10?"0"+mm:mm;
			str+=":";
			str+=ss<10?"0"+ss:ss;
			let temp = self.state;
			temp.timer = str;
			self.setState(temp);
		},1000);
	}
	componentDidMount() {
	    this.loadDataFromServer();
	    window.addEventListener('load', this.timer);
	}
	loadmodule(module,res){
		let promise = new Promise(function(resolve, reject) {
			let MySingle;
		  	require.ensure([],function(require){
		  		// var req = require.context("./", false, /^\.\/.*\.js$/);
        		// MySingle = require("./" + module).default;
        		resolve(MySingle);
        	});
		});
    	promise.then(function(data){
    		window.MySingle = data;
    		this.setState({data:res});
    	}.bind(this), function(data){
    		console.log(data);
    	}.bind(this));
	}
	setupWebViewJavascriptBridge(callback) {
		var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if (isAndroid) {
            if (window.WebViewJavascriptBridge) {
                WebViewJavascriptBridge.init();
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                        WebViewJavascriptBridge.init();
                        callback(WebViewJavascriptBridge)
                    },false);
            }
        } else {
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
        }
	}
    render () {
    	if(this.state.data){
			let MySingle = window.MySingle;
			return (
	        	<div className="all-sub">
		        	<div className="sub-head">
		        		{this.state.data.subtype}
		        	</div>
		        	<div className="sub-content">
		        		<MySingle mydata={this.state.data} onClick={this.tick} ref="mysingle"></MySingle>
		        	</div>
		        	<div className="sub-bottom" onClick={this.subanswer}>
		        		<div className="inner-vertical">
			        		<label>提交</label>
			        		<div className="timer">{this.state.timer}</div>
		        		</div>
		        	</div>
	        	</div>
		    );
	    } else {
	    	return (
		      <div>
		      </div>
		    );
	    }
    }
}
export default MyApp; 

