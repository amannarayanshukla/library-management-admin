import React, {Component} from "react";
import { CloseOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';


import { Card} from 'antd';

import './IssuedBookCard.css'

const { Meta } = Card;

export default class IssuedBookCard extends Component{
    state = {
        visible: false,
        image :``,
        name: ``,
        author: ``,
        edition: ``,
        can_read_in_library: false,
        can_take_home:false,
        inventory:``,
    };

    componentDidMount() {
        const {image,name,author,edition,can_read_in_library,can_take_home,inventory} = this.props.item;
        this.setState({image,name,author,edition,can_read_in_library,can_take_home,inventory});
    }

    render (){
        const { image,name,author,edition,can_read_in_library,can_take_home,inventory } = this.state;
        const {index,onAccept,onReject} = this.props;

        return (
            <div>
                <Card
                    hoverable
                    style={{ width: 240,marginLeft: "20px", marginTop: "20px"  }}
                    cover={<img alt="example" src={this.state.image} />}
                    actions={[
                        <CheckOutlined key="check" onClick = {onAccept(index)}/>,
                        <CloseOutlined key = "close" onClick = {onReject(index)}/>
                    ]}
                >
                    <Meta title={this.state.name} description={this.state.author} />
                </Card>
            </div>
        )
    }
}
