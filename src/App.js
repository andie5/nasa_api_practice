import React from 'react';

class App extends React.Component {

  state = { 
    nasaData: null,
    error: null
   }

  componentDidMount() {
    fetch("https://images-api.nasa.gov/search?q=apollo%2011")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            nasaData: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {

    return (
      <div>
        {this.state.nasaData && this.state.nasaData.collection.items.map(item => {
          if(!item.links) return null;
          const imageLink = item.links.find((link) => link.render === "image")
          return <img src={imageLink.href} alt={item.data[0].description}/>
        })}
      </div>
    );
  }
}

export default App;
