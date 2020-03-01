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
      description: "",
      menuClicked: false
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
  handleParkClick = eve => {
    let parkObj = this.state.parksObj[eve.target.tabIndex];
    this.setState({
      name: parkObj.name,
      description: parkObj.description,
      imgURL: parkObj.images[0].url,
      menuClicked: !this.state.menuClicked
    });
  };
  handleMenuClick = () => {
    this.setState({ menuClicked: !this.state.menuClicked });
  };
  populateMenu = () => {
    if (this.state.menuClicked) {
      return this.state.names.map((name, i) => {
        return (
          <div
            className="menu-item"
            key={name}
            tabIndex={i}
            onClick={this.handleParkClick}
          >
            {name}
          </div>
        );
      });
    } else {
      return null;
    }
  };
  componentDidMount() {
    if (this.state.names.length === 0) {
      this.fetchParks();
    }
  }
  render() {
    return (
      <div className="App">
        <div className="hamburger" onClick={this.handleMenuClick}>
          <div className="hotdog"></div>
          <div className="hotdog"></div>
          <div className="hotdog"></div>
        </div>
        <nav>
          <ul>{this.populateMenu()}</ul>
        </nav>
        <header className="App-header">Hamburger menu</header>
        <main>
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
