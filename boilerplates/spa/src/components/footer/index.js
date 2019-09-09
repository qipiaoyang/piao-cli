import React from "react";
import "./index.scss";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'foo'
        }
    }

    render() {
        return (
            <div className='footer'>
                我是footer组件
            </div>
        )
    }

}

export default Footer;