
$(document).ready(function(){
    $('.weather-items').css('visibility','hidden');

        var string = localStorage.getItem("key");
        if(!(string === "")){
            if($('#met').is(':checked')){ 
                MetricFunction(string);
            } else {
                ImperialFunction(string);
            }
            
        } 
    
$('button').click( function(){
    
    if(!$("#myInput").val()){
        $('.sub').css('visibility','visible');
        // alert("error ");
        return;
    }
    $('.sub').css('visibility','hidden');
    
    if($('#met').is(':checked')){ 
        MetricFunction(myInput.value);
    } else {
        ImperialFunction(myInput.value);
    }

});
});

function ClearFunction(){
    $('.sub').css('visibility','visible'); 
    $(".weather-items").css("visibility","hidden")
    $(".info-block").text("");
    $(".time").text("");
    $(".heading").text("");
    $("#lokace").text("");
    $("#descr").text("");
    $(".weather-icon").attr("src","");

}
function MetricFunction(inputtext){
    
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+ inputtext +"&appid=1b63c0223a7ab1449a3a94d246e5ef47&units=metric&lang=cz", function(data){
        //    var lon = data.coord.lon;
        //    var lat = data.coord.lat;
       //  https://api.openweathermap.org/data/2.5/onecall?q=Znojmo&exclude=current,hourly,daily&appid=1b63c0223a7ab1449a3a94d246e5ef47&units=metric
        $('.weather-items').css('visibility','visible');
        var weatherW = data.weather[0].main;
        var weatherD = data.weather[0].description;
        var icon = data.weather[0].icon;

        var temp = data.main.temp;
        var tempFeel = data.main.feels_like;
        var time = new Date(data.dt*1000);
        var loc = data.name;
        var country = data.sys.country;  

        var tempMin = data.main.temp_min;
        var tempMax = data.main.temp_max;
        var pressure = data.main.pressure;
        var humidity = data.main.humidity;
        
        var sunrise = new Date(data.sys.sunrise*1000);
        var sunset = new Date(data.sys.sunset*1000);
        var vis = data.visibility/1000.0;

        var windDeg = data.wind.deg;
        var windSpeed = data.wind.speed;
        var wind;

        if( windDeg >= 23 && windDeg < 68){
            wind = "Severo-Východ";
        }else if(windDeg >= 68 && windDeg < 113){
            wind = "Východ";
        } else if(windDeg >= 113 && windDeg < 158){
            wind = "Jiho-Východ";
        } else if(windDeg >= 158 && windDeg < 203){
            wind = "Jih";
        } else if(windDeg >= 203 && windDeg < 248){
            wind = "Jiho-Západ";
        } else if(windDeg >= 248 && windDeg < 293){
            wind = "Západ";
        } else if(windDeg >= 293 && windDeg < 338){
            wind = "Severo-Západ";
        } else{
            wind = "Sever";
        }

        // console.log(data);

       
        $(".time").text($.format.date(time, "ddd, dd. MMMM yyyy, HH:mm"));
        $(".wind-line").text("Rychlost větru: " + Math.round(windSpeed) + "m/s, Směr: "+ wind);
        $(".weather-icon").attr("src","https://openweathermap.org/img/wn/"+icon+"@2x.png");
        $(".heading").text(Math.round(temp)+ "°C");
        $(".info-block").text("Pocitová teplota: " + Math.round(tempFeel) + "°C, Teplotní maxima: " + Math.round(tempMax) + "°C, Teplotní minima: " + Math.round(tempMin) + "°C");

        $("#pres").text("Tlak vzduchu: " + pressure +"hPa");
        $("#hum").text("Vlhkost: " + humidity + "%" );
        $("#Vis").text("Viditelnost: " + vis.toFixed(1) + "km");
        $('#map-marker').css('visibility','visible'); 
        $("#lokace").text(loc + ", " + country);  
        $("#descr").text( weatherW + ", " + weatherD);
        $("#sunR").text("Úsvit slunce: " + $.format.date(sunrise, "HH:mm"));
        $("#sunS").text("Západ slunce: " + $.format.date(sunset, "HH:mm"));
    
        //console.log("pokus")
        localStorage.setItem("key",inputtext)
   
        })
        .fail(function(event, jqxhr, exception) {
            if (jqxhr == "error") {
                
              ClearFunction();
            }

        })

}
function ImperialFunction(inputtext){
    
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+ inputtext +"&appid=1b63c0223a7ab1449a3a94d246e5ef47&", function(data){
        //    var lon = data.coord.lon;
        //    var lat = data.coord.lat;
    
        $('.weather-items').css('visibility','visible');
        var weatherW = data.weather[0].main;
        var weatherD = data.weather[0].description;
        var icon = data.weather[0].icon;

        var temp = data.main.temp;
        var tempFeel = data.main.feels_like;
        var time = new Date(data.dt*1000);
        var loc = data.name;
        var country = data.sys.country;  

        var tempMin = data.main.temp_min;
        var tempMax = data.main.temp_max;
        var pressure = data.main.pressure;
        var humidity = data.main.humidity;
        
        var sunrise = new Date(data.sys.sunrise*1000);
        var sunset = new Date(data.sys.sunset*1000);
        var vis = data.visibility/1609.34;

        var windDeg = data.wind.deg;
        var windSpeed = data.wind.speed;
        
        if( windDeg >= 23 && windDeg < 68){
            wind = "North-East";
        }else if(windDeg >= 68 && windDeg < 113){
            wind = "East";
        } else if(windDeg >= 113 && windDeg < 158){
            wind = "South-East";
        } else if(windDeg >= 158 && windDeg < 203){
            wind = "South";
        } else if(windDeg >= 203 && windDeg < 248){
            wind = "South-West";
        } else if(windDeg >= 248 && windDeg < 293){
            wind = "West";
        } else if(windDeg >= 293 && windDeg < 338){
            wind = "North-West";
        } else{
            wind = "North";
        }

        // console.log(data);

        $('#map-marker').css('visibility','visible'); 
        $("#lokace").text(loc + ", " + country);  
        $(".time").text($.format.date(time, "h:mm p, ddd, MMMM dd, yyyy"));
        $("#descr").text( weatherW + ", " + weatherD);
        $(".weather-icon").attr("src","https://openweathermap.org/img/wn/"+icon+"@2x.png");
        $(".heading").text(Math.round(temp)+ "°F");
        $(".info-block").text("Feels temperature: " + Math.round(tempFeel) + "°F, Maximum temperature: " + Math.round(tempMax) + "°F, minimum temperature: " + Math.round(tempMin) + "°F");
        $("#pres").text("Pressure: " + pressure +"hPa");
        $("#hum").text("Humidity: " + humidity + "%" );
        $("#Vis").text("Visibility: " + vis.toFixed(1) + "mi");
        $(".wind-line").text("Wind speed: " + Math.round(windSpeed) + "mph, Direction: " + wind);
        $("#sunR").text("Sunrise: " + $.format.date(sunrise, "h:mm p"));
        $("#sunS").text("Sunset: " + $.format.date(sunset, "h:mm p"));
    
        localStorage.setItem("key",inputtext)
        })
        .fail(function(event, jqxhr, exception) {
            if (jqxhr == "error") {
                ClearFunction();
            }   
            
       
        })
}