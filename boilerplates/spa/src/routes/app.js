import React from "react";
import {connect} from "dva";
import { withRouter } from 'dva/router';
import QueueAnim from "rc-queue-anim";
  import { Breadcrumb } from 'antd';   // 面包屑
import Footer from "../components/footer";
import 'moment/locale/zh-cn';
import "./app.scss";
import {getCurrentRating, getparma} from "../utils/util";




class App extends React.Component {
	
  render() {

    const {
      pathname,
      loading,
      children,
      menShow,
    } = this.props;
    const currentRating = getCurrentRating(pathname, menShow); //等到当前层级的节点树
    const objTree = getparma(currentRating, {}, "title", "sub", "key");

    const result = (
        <QueueAnim>
          <div>
            <div className='container'>
              <div className='container_left'></div>
              <div className='container_center'>
                <div className='breadcrumb'>
                    <div className='breadcrumb-div'>
                      <a className='breadcrumb-pingtai' href="/">买个号</a>
                      <span className='breadcrumb-high'>></span>
                      <Breadcrumb separator=">" style={{display:"inline-block"}} className='breadcrumb-list'>
                        <Breadcrumb.Item href="/home">个人中心</Breadcrumb.Item>
                        <Breadcrumb.Item href={objTree.sub} disabled={true}>{objTree.title}</Breadcrumb.Item>
                        <Breadcrumb.Item href={objTree.children ? objTree.children.sub : ""} disabled={true}>
                          {objTree.children ? objTree.children.title : ""}
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                </div>
                <div className='container_center_ctn'>
                  <div className='container_center_left'>
                  </div>
                    <div className='container_center_right'
                         style={menShow ? {} : {width: "100%"}}>
                      {children}
                    </div>
                </div>
              </div>
              <div className='container_right'></div>

            </div>
            <Footer></Footer>
          </div>
        </QueueAnim>
    )
    return (
      <div className='app'>
        {
          loading.global ? <div>123</div> : null
        }
        {
          result
        }
      </div>
    );
  }
}
export default withRouter(connect((state) => {
  return {
    ...state.app,
    ...state.routing,
    loading: state.loading
  }
})(App));





