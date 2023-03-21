
var cardContainer = document.getElementById('cardContainer');
var dayDisplay =document.getElementById('Day0');
var part1 = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var part2 = '&cnt=40&units=imperial&appid=a842e4fb8b3e05b9ed611924287b14a1';
var button1=document.getElementById('searchButton');
var cityVal=document.getElementById('cityName');
var search = document.getElementById('allbutton');
var getCity = localStorage.getItem("usercity");
var parCity = JSON.parse((getCity)) || [];
var savCity = parCity;

button1.addEventListener('click', searchCity);

//Saves search result into a array and then localstorage then run the function of the input search value.
function searchCity(){
    var saveCity = savCity;
    saveCity.push(cityVal.value);
    localStorage.setItem("usercity", JSON.stringify(saveCity));

    getWeather(cityVal.value);

}
//Function that fetches the data from the url and creates a display of all the weather data in the 5 day period of city.
function getWeather(input){
    var fetchUrl1 = part1+input+part2;

    fetch(fetchUrl1)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //makes sure that display is clear before creating new elements
        dayDisplay.textContent="";
        var day0Date=document.createElement("h1");
        var day0Img=document.createElement("img");
        var day0Temp=document.createElement("h5");
        var day0Wind=document.createElement("h5");
        var day0Humi=document.createElement("h5");
        //Set display for the present day in the large box
        day0Date.textContent=input+"\xa0"+dayjs(data.list[0].dt_txt).format("M/DD/YYYY");
        day0Img.setAttribute("src","http://openweathermap.org/img/wn/"+ data.list[0].weather[0].icon+".png");
        day0Temp.textContent="Temp: " +data.list[0].main.temp+ " F";
        day0Wind.textContent="Wind: " +data.list[0].wind.speed + " MPH";
        day0Humi.textContent="Humidity: " +data.list[0].main.humidity + " %";

        dayDisplay.appendChild(day0Date);
        dayDisplay.appendChild(day0Img);
        dayDisplay.appendChild(day0Temp);
        dayDisplay.appendChild(day0Wind);
        dayDisplay.appendChild(day0Humi)
        var count = 7
        // Set display for the 5 day forcast box
        for(i=0; i<=4; i++){
            cardContainer.children[i].children[0].textContent = "";
            var dayDate=document.createElement("h5");
            var dayImg=document.createElement("img");
            var dayTemp=document.createElement("p");
            var dayWind=document.createElement("p");
            var dayHumi=document.createElement("p");
            dayDate.textContent=dayjs(data.list[count].dt_txt).format("M/DD/YYYY");
            dayImg.setAttribute("src","http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+".png");
            dayTemp.textContent="Temp: " +data.list[count].main.temp+ " F";
            dayWind.textContent="Wind: " +data.list[count].wind.speed + " MPH";
            dayHumi.textContent="Humidity: " +data.list[count].main.humidity + " %";
            cardContainer.children[i].children[0].appendChild(dayDate);
            cardContainer.children[i].children[0].appendChild(dayImg);
            cardContainer.children[i].children[0].appendChild(dayTemp);
            cardContainer.children[i].children[0].appendChild(dayWind);
            cardContainer.children[i].children[0].appendChild(dayHumi);
            count = count + 7
    }
    addsaveButton();
    });
    

}

//Creates a button with previous search history.
function addsaveButton(){
    search.textContent="";
    for(i=0; i<savCity.length; i++){
    var newbutton=document.createElement("button");
    newbutton.textContent=savCity[i];
    newbutton.setAttribute('class','btn btn-block btn-warning w-100 border-dark')
    newbutton.setAttribute('id','button');
    search.appendChild(newbutton);
    urlData= part1+savCity[i]+part2;
    }
}

addsaveButton();
//When button is click the value(city) of the search button will run in the display function.
var allButton = document.getElementById('button');
search.addEventListener('click',function(event){
    getWeather(event.target.textContent);

});

