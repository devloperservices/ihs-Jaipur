import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    constructor() {
    super();
    this.state = {
      initial: null,
      final: null
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }


    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
            <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
                <h1>Hi {user.firstName}!</h1>
                <p>Don't Drink & Drive</p>
                <input type="text" name="initial" placeholder="Your Location" value={ this.state.initial } onChange={ this.handleChange } />      
               <input type="text" name="final" placeholder="Enter Destination" value={ this.state.final } onChange={ this.handleChange } />     
                <button value="Send" onClick={ geocode()}>Search Route</button>
            <p>
                    <Link to="/login">Logout</Link>
            </p>
             <geocode dataFromParent = {this.state.initial} />
              <geocode dataFromParent = {this.state.final} />
            <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-core.js"></script>
            <script type="text/javascript" src="mapsjs-service.js"></script>
            <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-ui.js"></script>
            <script type="text/javascript" src="mapsjs-mapevents.js"></script>
            
            <script src="/__/firebase/7.7.0/firebase-app.js"></script>
            <script src="/__/firebase/7.7.0/firebase-analytics.js"></script>
            <script src="/__/firebase/init.js"></script>

            </div>
        );
    }
};

function geocode(platform) {
  var geocoder = platform.getGeocodingService(),
    geocodingParameters = {
      searchText: '200 S Mathilda Sunnyvale CA',
      jsonattributes : 1
    };

  geocoder.geocode(
    geocodingParameters,
    onSuccess1,
    onError
  );
}

function onSuccess1(result) {
  var locations = result.response.view[0].result;
 }

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

// function calculateRouteFromAtoB (platform) {
//   var router = platform.getRoutingService(),
//     routeRequestParams = {
//       mode: 'fastest;car',
//       representation: 'display',
//       routeattributes : 'waypoints,summary,shape,legs',
//       maneuverattributes: 'direction,action',
//       waypoint0: '52.5160,13.3779', // Brandenburg Gate
//       waypoint1: '52.5206,13.3862'  // Friedrichstraße Railway Station
//     };


//   router.calculateRoute(
//     routeRequestParams,
//     onSuccess,
//     onError
//   );
// }
// /**
//  * This function will be called once the Routing REST API provides a response
//  * @param  {Object} result          A JSONP object representing the calculated route
//  *
//  * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
//  */
// function onSuccess(result) {
//   var route = result.response.route[0];
 /*
  * The styling of the route response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  // addRouteShapeToMap(route);
  // addManueversToMap(route);

  // addWaypointsToPanel(route.waypoint);
  // addManueversToPanel(route);
  // addSummaryToPanel(route.summary);
  // ... etc.
//}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
  alert('Ooops!');
}




/**
 * Boilerplate map initialization code starts below:
 */

// // set up containers for the map  + panel
// var mapContainer = document.getElementById('map'),
//   routeInstructionsContainer = document.getElementById('panel');

// //Step 1: initialize communication with the platform
// var platform = new H.service.Platform({
//   apikey: 'ueqwdUG7FR6Dtxz4ojDyjPl7xPSMEKuzDEPJRqElZQA'
//   //app_code: 'AJKnXv84fjrb0KIHawS0Tg',
//   //useCIT: true,
//   //useHTTPS: true
// });
// var defaultLayers = platform.createDefaultLayers();

// //Step 2: initialize a map - this map is centered over Berlin
// var map = new H.Map(mapContainer, defaultLayers.normal.map,{
//   center: {lat:52.5160, lng:13.3779},
//   zoom: 13
// });

// //Step 3: make the map interactive
// // MapEvents enables the event system
// // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
// var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// // Create the default UI components
// var ui = H.ui.UI.createDefault(map, defaultLayers);

// // Hold a reference to any infobubble opened
// var bubble;

// /**
//  * Opens/Closes a infobubble
//  * @param  {H.geo.Point} position     The location on the map.
//  * @param  {String} text              The contents of the infobubble.
//  */
// function openBubble(position, text){
//  if(!bubble){
//     bubble =  new H.ui.InfoBubble(
//       position,
//       // The FO property holds the province name.
//       {content: text});
//     ui.addBubble(bubble);
//   } else {
//     bubble.setPosition(position);
//     bubble.setContent(text);
//     bubble.open();
//   }
// }


// /**
//  * Creates a H.map.Polyline from the shape of the route and adds it to the map.
//  * @param {Object} route A route as received from the H.service.RoutingService
//  */
// function addRouteShapeToMap(route){
//   var strip = new H.geo.Strip(),
//     routeShape = route.shape,
//     polyline;

//   routeShape.forEach(function(point) {
//     var parts = point.split(',');
//     strip.pushLatLngAlt(parts[0], parts[1]);
//   });

//   polyline = new H.map.Polyline(strip, {
//     style: {
//       lineWidth: 4,
//       strokeColor: 'rgba(0, 128, 255, 0.7)'
//     }
//   });
//   // Add the polyline to the map
//   map.addObject(polyline);
//   // And zoom to its bounding rectangle
//   map.setViewBounds(polyline.getBounds(), true);
// }


// /**
//  * Creates a series of H.map.Marker points from the route and adds them to the map.
//  * @param {Object} route  A route as received from the H.service.RoutingService
//  */
// function addManueversToMap(route){
//   var svgMarkup = '<svg width="18" height="18" ' +
//     'xmlns="http://www.w3.org/2000/svg">' +
//     '<circle cx="8" cy="8" r="8" ' +
//       'fill="#1b468d" stroke="white" stroke-width="1"  />' +
//     '</svg>',
//     dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
//     group = new  H.map.Group(),
//     i,
//     j;

//   // Add a marker for each maneuver
//   for (i = 0;  i < route.leg.length; i += 1) {
//     for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
//       // Get the next maneuver.
//       maneuver = route.leg[i].maneuver[j];
//       // Add a marker to the maneuvers group
//       var marker =  new H.map.Marker({
//         lat: maneuver.position.latitude,
//         lng: maneuver.position.longitude} ,
//         {icon: dotIcon});
//       marker.instruction = maneuver.instruction;
//       group.addObject(marker);
//     }
//   }

//   group.addEventListener('tap', function (evt) {
//     map.setCenter(evt.target.getPosition());
//     openBubble(
//        evt.target.getPosition(), evt.target.instruction);
//   }, false);

//   // Add the maneuvers group to the map
//   map.addObject(group);
// }


// /**
//  * Creates a series of H.map.Marker points from the route and adds them to the map.
//  * @param {Object} route  A route as received from the H.service.RoutingService
//  */
// function addWaypointsToPanel(waypoints){



//   var nodeH3 = document.createElement('h3'),
//     waypointLabels = [],
//     i;


//    for (i = 0;  i < waypoints.length; i += 1) {
//     waypointLabels.push(waypoints[i].label)
//    }

//    nodeH3.textContent = waypointLabels.join(' - ');

//   routeInstructionsContainer.innerHTML = '';
//   routeInstructionsContainer.appendChild(nodeH3);
// }

// /**
//  * Creates a series of H.map.Marker points from the route and adds them to the map.
//  * @param {Object} route  A route as received from the H.service.RoutingService
//  */
// function addSummaryToPanel(summary){
//   var summaryDiv = document.createElement('div'),
//    content = '';
//    content += '<b>Total distance</b>: ' + summary.distance  + 'm. <br/>';
//    content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';


//   summaryDiv.style.fontSize = 'small';
//   summaryDiv.style.marginLeft ='5%';
//   summaryDiv.style.marginRight ='5%';
//   summaryDiv.innerHTML = content;
//   routeInstructionsContainer.appendChild(summaryDiv);
// }

// /**
//  * Creates a series of H.map.Marker points from the route and adds them to the map.
//  * @param {Object} route  A route as received from the H.service.RoutingService
//  */
// function addManueversToPanel(route){



//   var nodeOL = document.createElement('ol'),
//     i,
//     j;

//   nodeOL.style.fontSize = 'small';
//   nodeOL.style.marginLeft ='5%';
//   nodeOL.style.marginRight ='5%';
//   nodeOL.className = 'directions';

//      // Add a marker for each maneuver
//   for (i = 0;  i < route.leg.length; i += 1) {
//     for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
//       // Get the next maneuver.
//       maneuver = route.leg[i].maneuver[j];

//       var li = document.createElement('li'),
//         spanArrow = document.createElement('span'),
//         spanInstruction = document.createElement('span');

//       spanArrow.className = 'arrow '  + maneuver.action;
//       spanInstruction.innerHTML = maneuver.instruction;
//       li.appendChild(spanArrow);
//       li.appendChild(spanInstruction);

//       nodeOL.appendChild(li);
//     }
//   }

//   routeInstructionsContainer.appendChild(nodeOL);
// }


// Number.prototype.toMMSS = function () {
//   return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
// }

// // Now use the map as required...
// calculateRouteFromAtoB (platform);

// $('head').append('<link rel="stylesheet" href="https://js.api.here.com/v3/3.0/mapsjs-ui.css" type="text/css" />');

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };