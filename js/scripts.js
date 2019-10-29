let persons = [];
let SetFilmPersons = [];
const StarWarsContainet = document.getElementById("StarWarsContainer");
let element = document.getElementById("PostersWrapper");
////////////////Get all persons from API ///////////////////////
axios
  .all([
    axios.get("https://swapi.co/api/people/?page=1"),
    axios.get("https://swapi.co/api/people/?page=2"),
    axios.get("https://swapi.co/api/people/?page=3"),
    axios.get("https://swapi.co/api/people/?page=4"),
    axios.get("https://swapi.co/api/people/?page=5"),
    axios.get("https://swapi.co/api/people/?page=6"),
    axios.get("https://swapi.co/api/people/?page=7"),
    axios.get("https://swapi.co/api/people/?page=8"),
    axios.get("https://swapi.co/api/people/?page=9")
  ])
  .then(responseArr => {
    persons = persons.concat(
      responseArr[0].data.results,
      responseArr[1].data.results,
      responseArr[2].data.results,
      responseArr[3].data.results,
      responseArr[4].data.results,
      responseArr[5].data.results,
      responseArr[6].data.results,
      responseArr[7].data.results,
      responseArr[8].data.results
    );

    ///////////// Create ID's for all persons /////////////////

    persons.forEach(function(person, number) {
      let personId = persons[number].url.replace(
        "https://swapi.co/api/people/",
        ""
      );
      personId = personId.replace("/", "");
      person.id = personId;
    });
  });

///////////////Find persons, and get information ////////////////////////////

function findPerson() {
  let SetFilmPersonsWork = [];
  SetFilmPersons.forEach(function(person) {
    let personId = person.replace("https://swapi.co/api/people/", "");
    personId = personId.replace("/", "");
    SetFilmPersonsWork.push(personId);
  });

  SetFilmPersons = SetFilmPersonsWork;
  SetFilmPersonsWork = [];

  SetFilmPersons.forEach(function(personWork) {
    persons.forEach(function(person) {
      if (personWork == person.id) {
        SetFilmPersonsWork.push(person);
      }
    });
  });
  SetFilmPersons = SetFilmPersonsWork;
  SetFilmPersonsWork = [];
}

////////////Click on poster ////////////////////////////

function ClickOnPoster(posterNumber) {
  console.log(`To jest poster nr: ${posterNumber}`);
 
  element.classList.toggle("OpacityNone");
  let TitleSite = document.getElementById("SiteTitle");
  TitleSite.innerHTML = `Wybrany Film Star Wars to: ${posterNumber}`;

  /////////////// Get info about choosen film //////////////////
  async function GetFromApi(FilmId) {
    const SwapiUrl = `https://swapi.co/api/`;
    let Url = `films/${FilmId}`;
    let getUrl = `${SwapiUrl}${Url}`;

    try {
      const response = await axios.get(getUrl);
      SetFilmPersons = SetFilmPersons.concat(response.data.characters);
      findPerson();
      console.log(SetFilmPersons);
      let film = response.data;
      //////////////////////Add things to chosen film card//////////////////////////

      const AppWrapper = document.getElementById("AppWrapper");
      let AboutFilmWrapper = document.createElement("div");
      AboutFilmWrapper.setAttribute("id", `AboutMovie`);
      AboutFilmWrapper.classList.add("AboutMovie", "DisplayNone");
 
      AppWrapper.prepend(AboutFilmWrapper);
      const StarTitleEpisode = document.getElementById("StarTitleEpisode").innerHTML = `${film.release_date}`;
      const StarTitle = document.getElementById("StarTitle").innerHTML = `${film.title}`;
      const StarParagraph1 = document.getElementById("StarParagraph1").innerHTML = `${film.opening_crawl}`;
      const StarParagraph2 = document.getElementById("StarParagraph2").innerHTML = `Film Director ${film.director}`;
      const StarParagraph3 = document.getElementById("StarParagraph3").innerHTML = `Film Producer ${film.producer}`;
      
      setTimeout(function() {
        TitleSite.classList.toggle("DisplayNone");
        TitleSite.classList.toggle("OpacityNone");
        element.classList.toggle("DisplayNone");
        element.classList.toggle("OpacityNone");
    
        AboutFilmWrapper.classList.toggle("DisplayNone");
        StarWarsContainet.classList.toggle("DisplayNone");
       
      }, 4000);

      //////////////////// END add things to chosen film card
    } catch (error) {
      console.error(error);
    }
  }

  GetFromApi(posterNumber);
  document.body.style.overflow = "hiden";
  setTimeout(function() {
    TitleSite.classList.toggle("OpacityNone");
  }, 2000);
}
//////////////////////////////////////Click on Poster Ends////////////
