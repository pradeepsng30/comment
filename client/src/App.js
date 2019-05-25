import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Comment from './comment'

class App extends Component {

  constructor(){
    super()
    this.state={id:1001};
  }
  onUpdate(){
    this.setState({ key: Math.random() });
  }
  
render(){
  return (
    <div className="App">
     <Comment key= {this.state.key} id={1001} content="SOME_CONTENT" onUpdate={this.onUpdate.bind(this)}/>
    </div>
  );
}
  
}

export default App;
