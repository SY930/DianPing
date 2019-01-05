import React from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHeader from "../../components/HomeHeader/index";
import Category from "../../components/Category/index";
import Ad from "./subpage/Ad";
import List from "./subpage/List";


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
             <HomeHeader cityName={this.props.userInfo.cityName}/>
                <Category/>
                <div style={{height:'15px'}}></div>
                <Ad/>
                <List cityName={this.props.userInfo.cityName}/>
            </div>
        )
    }
}
// -------------------redux react 绑定--------------------
//state是仓库中的状态对象
let mapStateToProps = state=>({
    userInfo:state.userInfo
});//{number:0}
//dispatch是仓库中的dispatch方法
let mapDispatchToProps = (dispatch)=>({

})
export default connect(mapStateToProps,mapDispatchToProps)(Home)
