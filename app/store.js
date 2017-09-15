import React from "react";
import $ from "jQuery";
class MySingle extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = this.props.mydata;
	    this.tick = this.tick.bind(this);
	    this.blur = this.blur.bind(this);
	}
	componentDidMount() {
		// console.log(this);
	}
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
	}
	tick(key,index) {
		let str = 'item' + key + index;
		$(this.refs[str]).addClass('active');
		if(this.props.mydata.questionType != 2){
			$(this.refs[str]).siblings('li').removeClass('active');
		}
	}
	blur(key,index) {
		let str = 'item' + key + index;
		$(this.refs[str]).removeClass('active');
	}
	animate() {
		console.log("氟元素");
	}
    render () {
    	let questionNodes = this.props.mydata.question.question.map(function(question,index,arr){
    		let smallNodes = [];
    		if(this.props.mydata.questionType == 4){
    			for (let key in question.option_list) {
		            smallNodes.push(<li ref={'item' + key + index} className='fill-type'><div className='optab'><div className='inertab'><span>{key}</span></div></div><input className='optinput' type='text' onInput={this.tick.bind(this, key,index)} onBlur={this.blur.bind(this, key,index)}/></li>);
		        }
    		} else if(this.props.mydata.questionType == 3){
    			for (let key in question.option_list) {
    				if(key == 1){
		            	smallNodes.push(<li onClick={this.tick.bind(this, key,index)} ref={'item' + key + index}><div className='optab'><div className='inertab'><span><img src="../img/V_nor@3x.png" className="blur-arrow"/><img src="../img/V_focus@3x.png" className="focus-arrow" /></span></div></div><span className='optstr' dangerouslySetInnerHTML={{__html: question.option_list[key]}}></span></li>);
			        } else {
			        	smallNodes.push(<li onClick={this.tick.bind(this, key,index)} ref={'item' + key + index}><div className='optab'><div className='inertab'><span><img src="../img/X_nor@3x.png" className="blur-arrow"/><img src="../img/X_focus@3x.png" className="focus-arrow" /></span></div></div><span className='optstr' dangerouslySetInnerHTML={{__html: question.option_list[key]}}></span></li>);
			        }
		        }
    		} else {
    			if(this.props.mydata.questionType == 6){
    				smallNodes.push(<li className='small-stem' dangerouslySetInnerHTML={{__html: this.props.mydata.question.question[0].question}}></li>)
    			}
    			for (let key in question.option_list) {
		            smallNodes.push(<li onClick={this.tick.bind(this, key,index)} ref={'item' + key + index}><div className='optab'><div className='inertab'><span>{key}</span></div></div><span className='optstr' dangerouslySetInnerHTML={{__html: question.option_list[key]}}></span></li>);
		        }
    		}
	        return 	smallNodes;
	    }.bind(this));
 
    	return (
	      	<div className="sub-wrap single" onClick={this.props.onClick}>
	        	<div className="sub-left sub">
	        		<div dangerouslySetInnerHTML={{__html: this.state.question.stem}}>
	        		</div>
	        	</div>
	        	<div className="sub-right sub">
	        		<ul className="alloption">
	        			{questionNodes}
	        		</ul>
	        	</div>
	        </div>
    	);
    }
}
export default MySingle; 
