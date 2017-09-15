import React from "react";
import $ from "jQuery";
import "../lib/idangerous.swiper2.7.6.css";
import Swiper from "../lib/idangerous.swiper2.7.6.min";
let mySwiper;
class MySingle extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = this.props.mydata;
	    this.state.activeIndex = 1;
	    // console.log(this.state);
	    this.tick = this.tick.bind(this);
	    this.animate = this.animate.bind(this);
	    this.prev = this.prev.bind(this);
	    this.next = this.next.bind(this);
	}
	componentDidMount() {
		// console.log(this);
		let self = this;
		mySwiper = new Swiper('.swiper-container',{
		    // loop: true,
			// autoplay: 3000,
		});
		mySwiper.addCallback('SlideChangeStart',function(swiper){
			// console.log(swiper.activeIndex);
			let data = self.state;
			// console.log(data);
			data.activeIndex = swiper.activeIndex + 1;
			self.setState(data);	
		});
	}
	prev(){
		$('.focus-arrow').hide();
		$('.blur-arrow').show();
		$(this.refs.prevbtn).find('.blur-arrow').hide();
		$(this.refs.prevbtn).find('.focus-arrow').show();
		mySwiper.swipePrev();
	}
	next(){
		$('.focus-arrow').hide();
		$('.blur-arrow').show();
		$(this.refs.nextbtn).find('.blur-arrow').hide();
		$(this.refs.nextbtn).find('.focus-arrow').show();
		mySwiper.swipeNext();
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}
	tick(key,index) {
		let str = 'item' + key + index;
		$(this.refs[str]).addClass('active');
		if(this.props.mydata.questionType != 2){
			$(this.refs[str]).siblings('li').removeClass('active');
		}
	}
	animate() {
		console.log("氟元素");
	}
    render () {
    	let bigNodes = [];
    	let totalques = this.props.mydata.question.question.length;
    	// console.log(totalques);
    	let questionNodes = this.props.mydata.question.question.map(function(question,index,arr){
    		let smallNodes = [];
    		for (let key in question.option_list) {
	            smallNodes.push(<li key={key} onClick={this.tick.bind(this, key,index)} ref={'item' + key + index}><div className='optab'><div className='inertab'><span>{key}</span></div></div><span className='optstr' dangerouslySetInnerHTML={{__html: question.option_list[key]}}></span></li>);
	        }
	        return (
	        	<div className="swiper-slide" key={index}>
			    	<ul className="alloption">
						{smallNodes}
					</ul>
			    </div>
		    );
	    }.bind(this));
 		var boundClick = this.prev.bind(this);
    	return (
	      	<div className="sub-wrap fill" onClick={this.props.onClick}>
	        	<div className="sub-left sub">
	        		<div dangerouslySetInnerHTML={{__html: this.state.question.stem}}>
	        		</div>
	        	</div>
	        	<div className="sub-right sub">
	        		<div className="control-btn">
	        			<a href="javascript:void(0);" className="prev" onClick={boundClick} ref="prevbtn">
	        				<img src="../img/Icon_<_nor@3x.png" className="blur-arrow"/>
	        				<img src="../img/Icon_<_focus@3x.png" className="focus-arrow" style={{display:"none"}} />
	        			</a>
	        			<span>第{this.state.activeIndex}/{totalques}空</span>
	        			<a href="javascript:void(0);" className="next" onClick={this.next} ref="nextbtn">
	        				<img src="../img/Icon_>_nor@3x.png" className="blur-arrow" />
	        				<img src="../img/Icon_>_focus@3x.png" className="focus-arrow" style={{display:"none"}} />
	        			</a>
	        		</div>
	        		<div className="swiper-container">
		        		<div className="swiper-wrapper">
		        			{questionNodes}
						</div>
					</div>
					
	        	</div>
	        </div>
    	);
    }
}
export default MySingle; 
