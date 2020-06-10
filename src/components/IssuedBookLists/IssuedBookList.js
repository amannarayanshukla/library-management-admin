import React, {Component} from "react";

import IssuedBookCard from '../IssuedBookCard/IssuedBookCard'

export default class IssuedBookList extends Component{
    state = {
        issuedCardList :[],
        image :``,
        name: ``,
        author: ``,
        edition: ``,
        can_read_in_library: false,
        can_take_home:false,
        inventory:``,
    };

    componentDidMount() {
        fetch('http://localhost:3001/api/admin/get-issued-books')
            .then(data => data.json())
            .then(data => {
                const issuedCardList = data.data;
                console.log(issuedCardList,"issuedCardList");
                this.setState({issuedCardList})
            })
            .catch(err => console.log(err,"Error"));
    }

    onReject = (cardIndex) => () => {
        //TODO: API call reject
        let newIssuedCardList = this.state.issuedCardList.filter((item,index) => {
            return index != cardIndex;
        })
        this.setState({issuedCardList:newIssuedCardList})
        console.log(cardIndex,"INDEX REJECT")
    };

    onAccept = (cardIndex) => () => {
        //TODO: API call accept
        let newIssuedCardList = this.state.issuedCardList.filter((item,index) => {
            return index != cardIndex;
        })
        this.setState({issuedCardList:newIssuedCardList})
        console.log(cardIndex,"INDEX ACCPET")
    };

    render (){
        const {issuedCardList} = this.state;

        return (
            <div className="container" style={{"display":"flex", "flexWrap": "wrap"}}>
                {
                    issuedCardList && issuedCardList.length > 0 ?
                        issuedCardList.map((item,index) => {
                            return (
                                <IssuedBookCard
                                    item ={item}
                                    key={index}
                                    index = {index}
                                    onAccept = {this.onAccept}
                                    onReject = {this.onReject}
                                />
                            )
                        })
                        :
                        ``
                }
            </div>
        )
    }
}
