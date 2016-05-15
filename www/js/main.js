var main = {


    init: function() {
        this.current();
		this.simple();
		this.history();
		this.rotate();
    },

    current: function () {
        $(document).on("deviceready", function () {

        });
    },
	
    history: function () {
        $(document).on("deviceready", function () {

        });
    },
	
    simple: function() {
        $('body').on('submit', '.simple form', function(e){

		var url = "http://query.yahooapis.com/v1/public/yql";
		var symbol = $("#symbol").val();
		var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

		$.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
			.done(function (data) {
			$("#result").text("" + data.query.results.quote.LastTradePriceOnly);
		})
			.fail(function (jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
				$("#result").text('Sprawdzenie nieudane: ' + err);
		});
	
        })
    },
	
	rotate: function () {
	$(document).on("deviceready", function () {

		$('body').on('click', '.extra', function () {
			screen.lockOrientation('landscape');
		});
		
		$('body').on('click', '.extra_r', function () {
			screen.lockOrientation('portrait');
		});
		
	});
    },
	
};

$(function() {
  $("#header").hide();
  setTimeout(hideSplash, 4000);
});

function hideSplash() {
  $("#header").show();
  $.mobile.changePage("#s1", "fade");
}

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

