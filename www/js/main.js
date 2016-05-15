var main = {


    init: function() {
        this.current();
		this.simple();
		this.history();
		this.rotate();
    },

    current: function () {
    //    $(document).on("deviceready", function () {
	        $(document).on("pageshow", function (e) {
				if ($(e.target).attr('id') == 's2') {

					var indexes = ["TWTR", "FB", "GOOGL", "NFLX", "AAPL", "GOOG", "MSFT", "INTC", "CSCO", "QCOM", "TXN", "AVGO", "ADBE", "BIDU"];
					var iLen = indexes.length;
					var idArray = "";
						for (var j = 0; j < iLen; j++) {
							idArray += "'" + indexes[j] + "'";
							if (j != (iLen-1))
								idArray += ", ";
						}
					
					var url = "http://query.yahooapis.com/v1/public/yql";
					$("#tableBody").empty();
					var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in (" + idArray + ")");
					$.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
					.done(function (data) {
						for (let i = 0; i < iLen; i++) {							
							$("#tableBody").append("<tr>" + 
											"<td>" + (i+1) + "</td>" +
											"<td>" + data.query.results.quote[i].symbol + "</td>" +
											"<td>" + data.query.results.quote[i].LastTradePriceOnly + "</td>" +
											"<td>" + data.query.results.quote[i].Change + "</td>" +
											"<td>" + data.query.results.quote[i].ChangeinPercent + "</td>" +
										"</tr>");
						}				
					})
					.fail(function (jqxhr, textStatus, error) {
					var err = textStatus + ", " + error;
						$("#tableBody").text('Sprawdzenie nieudane: ' + err);
					});	
				}
		    });
    //    });
    },
	
    history: function () {
        $(document).on("deviceready", function () {

        });
    },
	
    simple: function() {
        $('body').on('submit', '.simple form', function(e){

		var url = "http://query.yahooapis.com/v1/public/yql";
		var symbol = $("#symbol").val();
		var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('TWTR', 'FB', 'GOOGL', 'NFLX')");

		$.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
			.done(function (data) {
			$("#jsonik").text("json: " + JSON.stringify(data.query.results.quote[2]));
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

		$('body').on('click', '.rotate', function () {
			screen.lockOrientation('landscape');
		});
	});
    },
	
};

$(function() {
  $("#header").hide();
  setTimeout(hideSplash, 2000);
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

