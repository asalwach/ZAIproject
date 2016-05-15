var main = {


    init: function() {

        this.authorPage();
        this.biorythm();

        this.deviceInfo();
        this.connectionInfo();
        this.scanner();
        this.extra();
    },


    authorPage: function() {

        var resizeAuthorImg = function () {
            var size = ~~(window.innerWidth * 0.4) + 'px';
            $('.author .img').css({width: size, height: size})
        };
        $(window).on('resize', resizeAuthorImg);
        $(window).on("pagecreate",resizeAuthorImg)
    },

    biorythm: function() {
        $('body').on('submit', '.biorythm form', function(e){
            e.preventDefault();
            var birth = $('#bday').val();
            if (birth != '') {
                var birthDate = new Date(birth);
                birthDate.setHours(0);
                birthDate.setMilliseconds(0);
                birthDate.setSeconds(0);
                birthDate.setMinutes(0);
                var now = new Date();
                now.setHours(0);
                now.setMilliseconds(0);
                now.setSeconds(0);
                now.setMinutes(0);

                var diff = Math.floor ((now.getTime() - birthDate.getTime()) / (1000 *3600 *24));
                if (diff < 0) {
                    alert('Wybrana data jest nieprawidłowa');
                    return false;
                }

                var fiz,emo,int;
                fiz = Math.ceil(Math.sin( 2 * Math.PI * diff / 23 ) * 100);
                emo = Math.ceil(Math.sin( 2 * Math.PI * diff / 28 ) * 100);
                int = Math.ceil(Math.sin( 2 * Math.PI * diff / 33 ) * 100);

                $('.biorythmData').empty().append($('' +
                    '<h3>Biorytm fizyczny: ' + fiz + '% </h3>' +
                    '<h3>Biorytm emocjonalny: ' + emo + '% </h3>' +
                    '<h3>Biorytm intelektualny: ' + int + '% </h3>' ));


            } else {
                alert('Wybrana data jest nieprawidłowa');
            }


        })
    },

    scanner: function () {
        $(document).on("deviceready", function () {


            $(document).on("pageshow", function (e) {
                if ($(e.target).attr('id') == 's3') {
                    if ( cordova.hasOwnProperty('plugins') &&  cordova.plugins.hasOwnProperty('barcodeScanner')) {
                        cordova.plugins.barcodeScanner.scan(
                            function (result) {
                                alert("We got a barcode\n" +
                                    "Result: " + result.text + "\n" +
                                    "Format: " + result.format + "\n" +
                                    "Cancelled: " + result.cancelled);
                            },
                            function (error) {
                                alert("Scanning failed: " + error);
                            }
                        );
                    }
                    else {
                        $('#s3 .info').text('Wtyczka obsługująca skaner jest niedostępna...')
                    }

                }
            });
        });

    },

    deviceInfo: function () {
        $(document).on("deviceready", function () {
            $('body').on('click','.deviceInfo', function () {
                $('.deviceInfoCont').html(
                    'Wersja Cordovy: ' + device.cordova+ '<br/>' +
                    'Platforma: ' + device.platform+ '<br/>' +
                    'UUID: ' + device.uuid+ '<br/>' +
                    'Model: ' + device.model+ '<br/>' +
                    'Wersja: ' + device.version+ '<br/>');
            });
        });
    },

    connectionInfo: function () {
        $(document).on("deviceready", function () {


            $(document).on("pageshow", function (e) {
                if ($(e.target).attr('id') == 's4') {
                    var networkState = navigator.connection.type;

                    var states = {};
                    states[Connection.UNKNOWN]  = 'Nieznane połączenie';
                    states[Connection.ETHERNET] = 'Połączenie typu ethernet';
                    states[Connection.WIFI]     = 'WIFI';
                    states[Connection.CELL_2G]  = '2G';
                    states[Connection.CELL_3G]  = '3G';
                    states[Connection.CELL_4G]  = '4G';
                    states[Connection.CELL]     = 'Połączenie standardowe';
                    states[Connection.NONE]     = 'Brak połączenia';
                    $('.connName').text(states[networkState]);
                    if (window.google != null) {
                        $('#map').empty();
                        var options = {
                            lat: 50.068548,
                            lng: 19.955087,
                            points: [],
                            mapOptions: {
                                draggable: true,
                                navigationControl: false,
                                center: null,
                                zoom: 16,
                                disableDefaultUI: false
                            },
                            centerPoint: null,
                            container: '#map'
                        };

                        var startCoords = new google.maps.LatLng(options.lat,options.lng);
                        var mapOptions = {};
                        $.extend(true,mapOptions,options.mapOptions);
                        mapOptions.center = startCoords;

                        var mapCont = $(options.container).get(0);
                        var mapInstance = new google.maps.Map(mapCont, mapOptions);

                        var marker = {
                            lat: 50.068548,
                            lng: 19.955087,
                            title: 'UEK'
                        };
                        marker.position = new google.maps.LatLng(marker.lat,marker.lng);
                        marker.map = mapInstance;
                        var markerObj = new google.maps.Marker(marker);
                    }
                }
            });

        });

    },

    extra: function () {
        $(document).on("deviceready", function () {

            $('body').on('click', '.extra', function () {
                navigator.vibrate(3000);
                YoutubeVideoPlayer.openVideo('LDFfSaTTVxw');

            });
        });
    }


};




$(function() {

        $(document).on("pagecreate", function () {
            $("body > [data-role='panel']").panel();
            $("body > [data-role='panel'] [data-role='listview']").listview();
        });
        $(document).one("pageshow", function () {
            $("body > [data-role='header']").toolbar();
            $("body > [data-role='header'] [data-role='navbar']").navbar();
        });
        main.init();
    }
);

