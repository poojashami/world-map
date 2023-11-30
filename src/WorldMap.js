import React, { useState } from "react";
import axios from "axios";
import { Menubar } from "primereact/menubar";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryData, setSelectedCountryData] = useState(null);
  console.log("datttttttt", selectedCountryData);

  //   raw.githubusercontent.com << -- ye URL humko kisi b public repository ke raw file ko access krata hai .. jaise ki ab tum apni is repo ko apne github account pr dalogi toh iss file ka link bnega kuch aissa -----  "https://raw.githubusercontent.com/poojashami/world-map-main/public/world-countries.json";

  // =========== url for geographical data of all countries ==============

  //   <<-- Humne direct purane wale link pr jakr jason file hi utha li poori or usko public folder me rkh diya, kuki react-script directly sari cheezein public folder me hi search krta hai , jaise ki image, json file, font file EventCounts, isiliye humne direct path use kiya hai
  const geoUrl = "world-countries.json";

  // === get country list =====
  const countryList = async (geoCountry) => {
    await axios
      .get(`https://restcountries.com/v3.1/name/${geoCountry.properties.name}`)
      .then(
        (res) => {
          const dt = res.data.filter((item) => item.cca3 === geoCountry.id);
          setSelectedCountryData(dt[0]);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  // ===== handlecoutry click =============
  const handleCountryClick = (geo) => {
    setSelectedCountry(geo);
    countryList(geo);
    setSelectedCountryData(null);
  };

  // =========== nav bar item ========
  const items = [
    {
      label: "World Map",
      icon: "pi pi-globe",
    },
  ];

  // ======= company logo ===================
  const start = (
    <img alt="logo" src="logo1.jpeg" height="40" className="mr-2"></img>
  );

  const sdata = selectedCountryData?.languages;
  console.log("sdata", sdata);

  return (
    <div className="">
      <div
        className=""
        style={{ width: "100%", position: "fixed", top: "0", zIndex: "5" }}
      >
        <Menubar model={items} start={start} />
      </div>
      <div className="row" style={{ position: "relative", top: "1.5rem" }}>
        <div className="col-lg-9">
          {/* <<-- ye ComposableMap ek component hai jo baki ke dono components ko ek sath render krne ka kaam kr rrha hai hai */}
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 100 }}
          >
            {/* Ye groURL jo hai jo ki(world-countries.json file ka url hai), ye specifically isi Geographies component me pass krne ke liye json format me bna hua hai, toh isko humne as it is download krke use kr liya hai */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    // upr jo geoURL se jitni bhi countries render ho rhi hn wo is Geography Component ki help se render ho rhi hn
                    //  Mtlb ko geography={geoUrl} <<-- ye humko convert hokar geographies<<- isme mil rha hai , fir hum usko geo <<-- isme ek ek krke utha rhe hn or niche render kr rhe hn
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: {
                        fill: selectedCountry === geo ? "#F53" : "#a4dae7c2",
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
        <div className="col-lg-3" style={{ position: "relative", top: "5rem" }}>
          {selectedCountryData !== null ? (
            <div className="mx-5">
              <h3>{selectedCountryData?.name?.common}</h3>
              <div>
                <i className="text-muted">
                  {selectedCountryData?.name?.official}
                </i>
              </div>
              <img
                src={selectedCountryData?.flags?.png}
                alt="countryImg"
                width={100}
                className="border"
              />
              {console.log("selected countery data", selectedCountryData)}
              <div className="mt-2">
                <strong>Capital</strong>:{" "}
                {selectedCountryData?.capital &&
                  selectedCountryData?.capital[0]}
              </div>

              <div>
                <strong>Population</strong>: {selectedCountryData?.population}
              </div>
              <div>
                <strong>Latlng</strong>:{" "}
                {selectedCountryData?.latlng[0] +
                  "," +
                  selectedCountryData?.latlng[1]}
              </div>
              <div>
                <strong>Area</strong>: {selectedCountryData?.area}
              </div>
              <div>
                <strong>Time Zones</strong>: {selectedCountryData?.timezones[0]}
              </div>
              <div className="d-flex">
                <strong>Language</strong>:
                {/* <span
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "2px",
                    marginLeft: "3px",
                    borderRadius: "10px",
                  }}
                >
                  {selectedCountryData?.languages.eng}
                </span>
                <label
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "2px",
                    marginLeft: "3px",
                    borderRadius: "10px",
                  }}
                >
                  {selectedCountryData?.languages.hin}
                </label>
                <label
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "2px",
                    marginLeft: "3px",
                    borderRadius: "10px",
                  }}
                >
                  {selectedCountryData?.languages.tam}
                </label> */}
                {/* {selectedCountryData?.languages} */}
              </div>
              <div>
                <strong>Region</strong>: {selectedCountryData?.subregion}
              </div>
              <div>
                <strong>Continent</strong>: {selectedCountryData?.continents[0]}
              </div>
            </div>
          ) : (
            <p>Select country to see the their information.</p>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default WorldMap;
