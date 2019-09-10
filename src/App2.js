import React, { useState, useEffect } from 'react';

export default function App(props){

    const [ nasaData, setNasaData ] = useState(null)

    // By default the useEffect works like componentDidUpdate but adding an empty array makes 
    // it operate like componentDidMount
    useEffect(() => {
        fetch("https://images-api.nasa.gov/search?q=apollo%2011")
        .then(res => res.json())
        .then(
            (result) => {
                setNasaData(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                // Can add a usestate to handle the error
            }
        )
    }, [])

    return (
      <div>
        {nasaData && nasaData.collection.items.map(item => {
          if(!item.links) return null;
          const imageLink = item.links.find((link) => link.render === "image")
          return <img src={imageLink.href} alt={item.data[0].description}/>
        })}
      </div>
    );
}