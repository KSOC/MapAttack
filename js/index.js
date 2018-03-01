CustomMarker.prototype = new google.maps.OverlayView();

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
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};



$(function() {
    var pos = new google.maps.LatLng(42.9837, -81.2497);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: pos,
        disableDefaultUI: true,
    });

    var marker = new CustomMarker({
        position: pos,
        map: map,
    });


    
});