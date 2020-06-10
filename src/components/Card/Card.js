import React, {Component} from "react";
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';


import { Card,Modal, Button, Input,Switch  } from 'antd';

import './Card.css'

const { Meta } = Card;

export default class BookCard extends Component{
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

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };



    render (){
        const { image,name,author,edition,can_read_in_library,can_take_home,inventory } = this.state;
        const {index,onDelete} = this.props;
        const onInputChange = (key) => (e) => {
            this.setState({[key]:e.target.value})
        } ;

        const onChange = (key) =>(checked) => {
            this.setState({[key]:checked})
        };

        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="image" className="input" value={image} onChange={onInputChange('image')}/>
                    <Input placeholder="name" className="input" value={name} onChange={onInputChange('name')}/>
                    <Input placeholder="author" className="input" value={author} onChange={onInputChange('author')}/>
                    <Input placeholder="edition" className="input" value={edition} onChange={onInputChange('edition')}/>
                    <Input placeholder="inventory" className="input" value={inventory} onChange={onInputChange('inventory')}/>
                    <div className="switch">
                    <label className="label" >{`Can read in library`}</label>
                    <Switch onChange={onChange('can_read_in_library')} checked={JSON.parse(can_read_in_library)}/>
                    </div>
                    <div className="switch">
                    <label className="label" >{`Can take home`}</label>
                    <Switch  onChange={onChange('can_take_home')} checked={JSON.parse(can_take_home)}/>
                    </div>
                </Modal>
                <Card
                    hoverable
                    style={{ width: 240,marginLeft: "20px"  }}
                    cover={<img alt="example" src={this.state.image} />}
                    actions={[
                        <EditOutlined key="edit"  onClick={this.showModal}/>,
                        <DeleteOutlined key = "delete"  onClick = {onDelete(index)}/>
                    ]}
                >
                    <Meta title={this.state.name} description={this.state.author} />
                </Card>
            </div>
        )
    }
}
