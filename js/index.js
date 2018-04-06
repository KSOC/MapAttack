CustomMarker.prototype = new google.maps.OverlayView();
var map;
var myArr = [];
var i;
var gmarkers = [];
jwt = null;
function CustomMarker(opts) {
    this.setValues(opts);
}

CustomMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;
    if (!div) {
        div = this.div = $('' +
            '<div>' +
            '<div class="pulse"></div>' +
            '<div class="pin-wrap">' +
            '</div>' +
            '</div>' +
            '')[0];
        this.pinWrap = this.div.getElementsByClassName('pin-wrap');
        this.pin = this.div.getElementsByClassName('pin');
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }
    var point = this.getProjection().fromLatLngToDivPixel(this.position);
    if (point) {
        div.style.left = (point.x+25) + 'px';
        div.style.top = (point.y+25) + 'px';
    }
};
	var table;
	
function addMarker(p, arr){
	table = document.getElementById("table");  // set this to your table
	setTimeout(function(){
		var tbody = document.createElement("tbody");
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.textContent =  arr[p].date + "\t\t" + arr[p].source  + ":" + arr[p].protocol + "\t\t" + arr[p].geo.city + " " + arr[p].geo.country_name;
		row.appendChild(cell);
		if(table.rows.length > 10){
			gmarkers[0].div.remove();
			table.deleteRow(0);
			gmarkers.shift();	
		}
		table.appendChild(row);
		var marker = new CustomMarker({
        position: new google.maps.LatLng(arr[p].geo.latitude, arr[p].geo.longitude),
        map: map
      });
	  gmarkers.push(marker);
	  //gmarkers.pop();
	  
	  }, p*9000);

	
	
}

var url = "https://netman/api/honeypotlatest.php/";

	// query the api button action
	function honeyPot(){
		
		var method = 'GET';
		var data = {};
		var success = function(response){
			JSON.stringify(response, null, 4);
		}
		var failure = function(error) {
			console.log("FAILED");
			myArr = JSON.parse(error.responseText);
			console.log(myArr.data);
			myArr.data.reverse();
		
			for(i=0, length = myArr.data.length; i < length; i++){
				
				addMarker(i,myArr.data);
				if(i == length-1){
					setTimeout(function(){honeyPot();},9000*myArr.data.length)
				}	
			}
		}
		// run the api call specified and wait for its response
		apicall(url, method, data, success, failure)
		
		
	}

	function apicall(url, method, data, goodcall, badcall) {
		// if we have a JWT set, send it with the request
		if(jwt != null) {
			url = url + '?token=' + jwt;
		}
		
		// call the ajax and wait for it to complete
		var ajaxCall = $.ajax({
			url: url,
			method: method,
			data: data,
			success: function(data) {
				console.log(data);
				// this is some optional code to capture updated auth tokens as we make calls
				var responseHeaders = ajaxCall.getAllResponseHeaders();
				var regex = /authorization: Bearer ([a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-]*)/;
				if(responseHeaders.match(regex)) {
					jwt = responseHeaders.match(regex)[1];
					
				}else{
					
				}
				// invoke the success callback function
				goodcall(data);
			},
			error: function(error, errorThrown) {
				
				// invoke the failure callback function
				badcall(error);
			}
		});
		
	}

$(function() {
    var pos = new google.maps.LatLng(10, 0);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2.78,
        center: pos,
        disableDefaultUI: true,
		styles: [
		  {
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#212121"
			  }
			]
		  },
		  {
			"elementType": "labels.icon",
			"stylers": [
			  {
				"visibility": "off"
			  }
			]
		  },
		  {
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#757575"
			  }
			]
		  },
		  {
			"elementType": "labels.text.stroke",
			"stylers": [
			  {
				"color": "#212121"
			  }
			]
		  },
		  {
			"featureType": "administrative",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#757575"
			  }
			]
		  },
		  {
			"featureType": "administrative.country",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#9e9e9e"
			  }
			]
		  },
		  {
			"featureType": "administrative.locality",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#bdbdbd"
			  }
			]
		  },
		  {
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#757575"
			  }
			]
		  },
		  {
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#181818"
			  }
			]
		  },
		  {
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#616161"
			  }
			]
		  },
		  {
			"featureType": "poi.park",
			"elementType": "labels.text.stroke",
			"stylers": [
			  {
				"color": "#1b1b1b"
			  }
			]
		  },
		  {
			"featureType": "road",
			"stylers": [
			  {
				"visibility": "off"
			  }
			]
		  },
		  {
			"featureType": "road",
			"elementType": "geometry.fill",
			"stylers": [
			  {
				"color": "#2c2c2c"
			  }
			]
		  },
		  {
			"featureType": "road",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#8a8a8a"
			  }
			]
		  },
		  {
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#373737"
			  }
			]
		  },
		  {
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#3c3c3c"
			  }
			]
		  },
		  {
			"featureType": "road.highway.controlled_access",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#4e4e4e"
			  }
			]
		  },
		  {
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#616161"
			  }
			]
		  },
		  {
			"featureType": "transit",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#757575"
			  }
			]
		  },
		  {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
			  {
				"color": "#000000"
			  }
			]
		  },
		  {
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [
			  {
				"color": "#3d3d3d"
			  }
			]
		  }
		]
    });


	var marker, i;
	
	honeyPot();
  
});