import React, {Component} from 'react';
import ButtonAppBar from './header';
import TitlebarGridList from './photos';    

class App extends Component {
  render() {
    return (
      <div>
        <ButtonAppBar />
       <TitlebarGridList/>
      </div>
    );
  }
}

export default App;

