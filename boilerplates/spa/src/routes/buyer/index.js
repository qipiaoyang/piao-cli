import React from 'react';
import "./index.scss";
import { connect } from 'dva';


class Buyer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product_name: ''
    }
  }

  render() {

    return (
      <div className='xb-container buyer'>
        buyer页面
      </div>
    );
  }
}

export default connect(({
  buyer
}) => {
  return {
    ...buyer
  }
})(Buyer);
