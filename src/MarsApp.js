import React, { useEffect, useState } from "react";

const API_KEY = "1XT0wLSE6HyidMviha2OgmPVSryzhJPZHy4FQvOW";

const MarsData = () => {
  // cAN DEFINE DEFAULT VALE IN USEsTATE and pass null
  const [data, setData] = useState();

  //   useEffect(() => {
  //   Fetch in itself returns a promise
  //     fetch(
  //       `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`
  //     )
  //       // We get the API response and receive data in JSON format...
  //       .then((response) => response.json())
  //       // ...then we update the users state
  //       .then((dataResponse) => setData(dataResponse))
  //       // Catch any errors we hit and update the app
  //       .catch((error) => console.log(error));
  //   }, []);

  useEffect(() => {
    //   This function will always return a promise
    const loadData = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`
        );

        //   Response json also returns a promise so this is why we have to wait for it - i.e. await
        const dataResponse = response.json();

        setData(dataResponse);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <ImageList {...data} />
    </div>
  );
};

const ImageList = ({ photos }) => {
  return (
    <div>
      {photos.map((photo) => {
        return <img src={photo.img_src} alt={"nasa img"} />;
      })}
    </div>
  );
};

export default MarsData;
