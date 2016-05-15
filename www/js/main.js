var main = {


    init: function() {
        this.current();
		this.simple();
		this.history();
		this.rotate();
		this.favorite();
    },

    current: function () {
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
											"<td>" + data.query.results.quote[i].LastTradeDate + "</td>" +
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
    },
	
    history: function () {
        $(document).on("deviceready", function () {

        });
    },
	
    simple: function() {
        $('body').on('submit', '.simple form', function(e){
		$("#result").empty();
		var url = "http://query.yahooapis.com/v1/public/yql";
		var symbol = $("#symbol").val();
		var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
		$.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
			.done(function (data) {
			$("#result").append("Nazwa: " + data.query.results.quote.symbol.toUpperCase() + "<br>" +
								 "Cena w USD: " + data.query.results.quote.LastTradePriceOnly + "<br>" +
								 "Data ostatniego notowania: " + data.query.results.quote.LastTradeDate.toString() + "<br>" +
								 "Zmiana: " + data.query.results.quote.Change.toString() + "<br>" +
								 "Zmiana w %: " + data.query.results.quote.ChangeinPercent.toString() + "<br>"
			);
		})
			.fail(function (jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
				$("#result").append('Sprawdzenie nieudane: ' + err);
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

	favorite: function () {
		
		$('body').on('click', '.favorite', function () {
				var fav_val = $('#favorite').val(); 
				var add_storgade = localStorage.getItem("myfavorite");
				
				if(add_storgade.value != ''){
				add_storgade = add_storgade + ";" + fav_val;
				} else {
					alert('test1');
					add_storgade = fav_val;
				}
				
				localStorage.setItem("myfavorite", add_storgade);
            });
			
		$('body').on('click', '.del_favorite', function () {
				localStorage.setItem("myfavorite", ' ');
				fav_table = [];
				$("#fav_results").empty();
				alert("Wyczyszczone");
            });
		
        $(document).on("pageshow", function (e) {
			
			var fav_val_read = '';
			fav_val_read = localStorage.getItem("myfavorite");
			
			$("#fav_results").empty();
			var fav_table = [];
			fav_table = fav_val_read.split(';');
			
			//$('#favorite').val(fav_val_read).change();
			$('#favorite').empty();
			$('#favorite').change();
			
			fav_table.forEach(function(item){
				
				$("#fav_results").append(item.toString());
				$("#fav_results").append("<P>");
				
			})
			
					
        });
    },	
	
	
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

