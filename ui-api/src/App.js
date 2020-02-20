import React from "react";
import "./App.css";
import Park from "./Park";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      parksObj: {},
      names: [],
      name: "Explore the national parks in Michigan!",
      imgUrl: "",
      description: ""
    };
  }
  fetchParks = () => {
    fetch(
      "https://developer.nps.gov/api/v1/parks?stateCode=MI&fields=images&api_key=KDAvx939Yj9FsDsKrBSHeZi7BMzZHUqpQdLU5tfV"
    )
      .then(res => res.json())
      .then(obj => {
        this.setState({
          parksObj: obj.data
        });
        //get all names from data object
        let names = obj.data.map(park => park.name);
        this.setState({
          names
        });
      });
  };
  handleClick = eve => {
    console.dir(typeof eve.target.tabIndex);
    let parkObj = this.state.parksObj[eve.target.tabIndex];
    this.setState({
      name: parkObj.name,
      description: parkObj.description,
      imgURL: parkObj.images[0].url
    });
  };
  populateMenu = () => {
    return this.state.names.map((name, i) => {
      return (
        <div
          className="menu-item"
          key={name}
          tabIndex={i}
          onClick={this.handleClick}
        >
          {name}
        </div>
      );
    });
  };
  componentDidMount() {
    if (this.state.names.length === 0) {
      this.fetchParks();
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">Hamburger menu</header>
        <main>
          <nav>
            <button>Menu</button>
            <ul>{this.populateMenu()}</ul>
          </nav>
          <div className="display">
            <Park
              name={this.state.name}
              description={this.state.description}
              imgURL={this.state.imgURL}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
