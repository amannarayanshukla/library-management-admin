import React, {Component} from "react";
import {Card, Input, Modal, Switch} from "antd";
import {PlusOutlined} from '@ant-design/icons';

import BookCard from "../Card/Card";

const { Meta } = Card;

export default class CardList extends Component{
    state = {
        cardList :[],
        visible: false,
        image :``,
        name: ``,
        author: ``,
        edition: ``,
        can_read_in_library: false,
        can_take_home:false,
        inventory:``,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        let newCard =  this.state.cardList;
        const {image,name,author,edition,can_read_in_library,can_take_home,inventory} = this.state;

        newCard.push({
            image,name,author,edition,can_read_in_library,can_take_home,inventory
        })

        this.setState({
            visible: false,
            image :``,
            name: ``,
            author: ``,
            edition: ``,
            can_read_in_library: false,
            can_take_home:false,
            inventory:``,
        });

        //TODO: save in DB
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onDelete = (deleteIndex) => () => {
        //TODO: remove from database
        let newCardList = this.state.cardList.filter((item,index) => {
            return index !== deleteIndex;
        })
        this.setState({cardList :newCardList})
    };

    componentDidMount() {
        fetch('http://localhost:3001/api/user/get-all-books')
            .then(data => data.json())
            .then(data => {
                const cardList = data.data.books;
                this.setState({cardList})
            })
            .catch(err => console.log(err,"Error"));
    }

    render (){
        const {cardList,image,name,author,edition,can_read_in_library,can_take_home,inventory} = this.state;

        const onInputChange = (key) => (e) => {
            this.setState({[key]:e.target.value})
        } ;

        const onChange = (key) =>(checked) => {
            this.setState({[key]:checked})
        };

        return (
            <div className="container">
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
                {
                    cardList.length > 0 ?
                        cardList.map((item,index) => {
                            return (
                                <BookCard item ={item} key={index} onDelete={this.onDelete} index={index}/>
                            )
                        })
                        :
                        ``
                }
                <Card
                    hoverable
                    style={{ width: 240, marginLeft: "20px" , display:"flex", justifyContent:"center", alignItems: "center"}}
                    onChange={this.addCard}
                >
                    <PlusOutlined style={{fontSize : "30px"}} onClick={this.showModal}/>
                </Card>,
            </div>
        )
    }
}
