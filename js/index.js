CustomMarker.prototype = new google.maps.OverlayView();
var map;
var myArr;
var i;
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
function addMarker(p, arr){
	setTimeout(function(){var marker = new CustomMarker({
        position: new google.maps.LatLng(myArr.data[p].geo.latitude, myArr.data[p].geo.longitude),
        map: map
      });}, i*1000);
}
var xmlhttp = new XMLHttpRequest();
var url = "https://netman/api/honeypotlatest.php";


function getHoney(){
	xmlhttp.onreadystatechange = function() {
	
	
    if (this.readyState == 4 && this.status == 302) {
        myArr = JSON.parse(this.responseText);
		console.log(xmlhttp);
	
		for(i=0, length = myArr.data.length; i<length;i++){
			addMarker(i,myArr);
		}
	}
	};
	
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
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
	
	getHoney();
  
});