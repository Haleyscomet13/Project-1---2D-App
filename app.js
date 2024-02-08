require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/Color",
  "esri/widgets/LayerList"
], function(Map, MapView, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, Color, LayerList) {
  // Create a map instance
  const map = new Map({
    basemap: "topo" // Basemap to use
  });

  // Create a map view
  const view = new MapView({
    container: "map", // Reference to the map div in HTML
    map: map,
    center: [-90.1994, 38.6270], // Initial map center coordinates
    zoom: 12 // Initial zoom level
  });

  // Define the school symbol
  const schoolSymbol = {
    type: "simple-marker", // Use a simple marker symbol
    style: "circle", // Circle symbol style
    color: "#0000FF", // Blue color
    outline: { // Outline settings
      color: "#000000", // Black color
      width: 1 // Outline width
    }
  };

  // Add feature layers
  const schoolLayer = new FeatureLayer({
    url: "https://services5.arcgis.com/vElyTHUSDMtSHSgT/arcgis/rest/services/St_Louis_Public_Schools/FeatureServer/0",
    outFields: ["*"], // Include all fields
    renderer: {
      type: "simple", // Use a simple renderer
      symbol: schoolSymbol // Set the symbol for the school layer
    },
    popupTemplate: {
      title: "{SCHOOL_NAM}", // Popup title
      content: "School Name: {SCHOOL_NAM}<br>Address: {ADDRESS}" // Popup content
    }
  });

  // Define the park symbol
  const parkSymbol = {
    type: "simple-fill", // Use a simple fill symbol
    color: new Color([0, 100, 0, 0.5]), // Dark green color with transparency
    outline: { // Outline settings
      color: new Color([0, 50, 0]), // Dark green color
      width: 1 // Outline width
    }
  };

  const parkLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/STL_parks_TBP/FeatureServer/0",
    outFields: ["*"], // Include all fields
    renderer: {
      type: "simple", // Use a simple renderer
      symbol: parkSymbol // Set the symbol for the park layer
    },
    popupTemplate: {
      title: "{TEXT_}", // Popup title using TEXT_ field for park name
      content: "Park Name: {TEXT_}<br>Area: {ACRES} acres" // Popup content
    }
  });

  map.addMany([schoolLayer, parkLayer]);

  // Add LayerList widget
  const layerList = new LayerList({
    view: view
  });
  view.ui.add(layerList, "top-right");
});
