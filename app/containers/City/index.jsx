import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'


import Header from "../../components/Header/index";
import CurrentCity from "../../components/CurrentCity/index";

import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

import { CITYNAME } from '../../config/localStoreKey'
import localStore from '../../util/localStore'
import CityList from "../../components/CityList/index";

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
               <Header title="选择城市"/>
                <CurrentCity cityName={this.props.userInfo.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }


    changeCity(newCity){
        if(newCity==null) return

        //修改redux
        const userInfo = this.props.userInfo
        userInfo.cityName = newCity
        this.props.userInfoActions.update(userInfo)


        //修改localStorage
        localStore.setItem(CITYNAME,newCity)

        //跳转到首页
        hashHistory.push('/')
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default City
//module.exports = City
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)