import React, {
    Component
} from 'react';
import logo from './logo.svg';
import './App.css';

class Comment extends Component {
    constructor(props) {
        console.log("POPP", props);
        super();
        this.props = props;
        this.state = {
            id: props.id,
            content: props.content,
            user: props.user,
            children: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        fetch('/get-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id
            })
        }).then(result => result.json()).then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                this.setState({
                    children: data
                })
            }
        });
    };

    onClick() {
        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.state.user,
                id: this.state.id
            })
        }).then(result => result.json()).then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                this.setState({
                    children: data
                })
            }
            this.props.onUpdate();
        });
    }

    onReply() {
        fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.state.user,
                content: this.state.reply,
                parentId: this.state.id
            })
        }).then(result => result.json()).then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                this.setState({
                    children: data
                })
            }
            this.props.onUpdate();
        });
    }

    onUpdatee() {
        fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.state.user,
                id: this.state.id,
                content: this.state.reply
            })
        }).then(result => result.json()).then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                this.setState({
                    children: data
                })
            }
            this.props.onUpdate();
        });
    }

    textUpdate(ev){
        //console.log('PPPPPP',ev.target.value);
        this.setState({reply:ev.target.value});
    }
    render() {
            console.log(this.state.id);

            let children = [];
            this.state.children.forEach(child => {
                    children.push( < Comment id = {
                            child.id
                        }
                        content = {
                            child.content
                        }
                        user = {child.userId}
                        onUpdate={this.props.onUpdate}
                        />)
                    })

                return ( < div key = {
                        this.state.id
                    }
                    className = 'comment' >
                    <p> {
                        this.state.content
                    } </p> 
                    <p className='username'> {
                       '- by  ' + this.state.user
                    } </p> 
                    <input onChange={this.textUpdate.bind(this)}/> 
                    <button onClick = {
                        this.onReply.bind(this)
                    }> reply </button>

                    <button onClick = {
                        this.onUpdatee.bind(this)
                    }> update </button>
                    <button onClick = {
                        this.onClick.bind(this)
                    }> delete </button> 
                    { children} </div>)
                }
            }
            export default Comment;