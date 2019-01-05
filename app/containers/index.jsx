import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userinfo' 

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    componentDidMount(){
        //从localStorage中获取城市
        let cityName = LocalStore.getItem(CITYNAME);
        if(cityName==null){
            cityName = '北京'
        }
        //将城市信息存入redux中
        this.props.userInfoActions.update({
            cityName
        })
        this.setState({
            initDone:true
        })
    }
    render() {

        return (
            <div>
                {
                    this.state.initDone?
                    this.props.children:<div>加载中。。。</div>

                }
            </div>
        )
    }

}

// -------------------redux react 绑定--------------------
//state是仓库中的状态对象
let mapStateToProps = state=>({});//{number:0}
//dispatch是仓库中的dispatch方法
let mapDispatchToProps = (dispatch)=>({
    userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(App)
