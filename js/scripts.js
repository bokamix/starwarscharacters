let persons = [];
let SetFilmPersons = [];
const StarWarsContainet = document.getElementById("StarWarsContainer");
let PostWrapper = document.getElementById("PostersWrapper");
let TitleSite = document.getElementById("SiteTitle");

/////////////// Create Characters Container //////////////////
const CharactersWrapper = document.createElement("div");
CharactersWrapper.setAttribute("id", `CharactersWrapper`);
CharactersWrapper.classList.add(
  "CharactersWrapper",
  "DisplayNone",
 
);
AppWrapper.prepend(CharactersWrapper);

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
    console.log(`wczytanio postacie`);
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
  PostWrapper.classList.toggle("OpacityNone");
  TitleSite.innerHTML = `Wybrany Film Star Wars to: ${posterNumber}`;

  /////////////// Get info about choosen film //////////////////
  async function GetFromApi(FilmId) {
    const SwapiUrl = `https://swapi.co/api/`;
    let Url = `films/${FilmId}`;
    let getUrl = `${SwapiUrl}${Url}`;

    try {
      const response = await axios.get(getUrl);
      console.log(`wczytanie filmów`);
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
      const StarTitleEpisode = (document.getElementById(
        "StarTitleEpisode"
      ).innerHTML = `${film.release_date}`);
      const StarTitle = (document.getElementById(
        "StarTitle"
      ).innerHTML = `${film.title}`);
      const StarParagraph1 = (document.getElementById(
        "StarParagraph1"
      ).innerHTML = `${film.opening_crawl}`);
      const StarParagraph2 = (document.getElementById(
        "StarParagraph2"
      ).innerHTML = `Film Director ${film.director}`);
      const StarParagraph3 = (document.getElementById(
        "StarParagraph3"
      ).innerHTML = `Film Producer ${film.producer}`);
    
      /////////////// Create Characters Cards //////////////////
      
     
      SetFilmPersons.forEach(function(person, num) {
        let CharacterCard = document.createElement("div");
        ///Add Title///
        let CharactersName = document.createElement("h3");
        CharactersName.innerHTML = `Name: ${person.name}`;
        CharacterCard.prepend(CharactersName);
        /// Add another Info///
        let CharactersDescription = document.createElement("h3");
        CharactersDescription.innerHTML = `Birth Year: ${person.birth_year}`;
        CharacterCard.append(CharactersDescription);

        CharacterCard.setAttribute("id", `CharacterCard${num}`);
        CharacterCard.setAttribute("class", `CharacterCard`);      
        CharactersWrapper.prepend(CharacterCard);
          
      });

      ////////////////END Create Characters Cards ///////////////////////
   
       
      CharactersWrapper.classList.toggle("DisplayNone");
     
      PostWrapper.classList.toggle("DisplayNone");
      PostWrapper.classList.toggle("OpacityNone");
      TitleSite.classList.toggle("OpacityNone");

      setTimeout(function() {
        TitleSite.classList.toggle("DisplayNone");
        AboutFilmWrapper.classList.toggle("DisplayNone");

        setTimeout(function() {
          StarWarsContainet.classList.toggle("DisplayNone");
        }, 50000);
      }, 1000);

      //////////////////// END add things to chosen film card
    } catch (error) {
      console.error(error);
    }
  }

  GetFromApi(posterNumber);
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";
  setTimeout(function() {
    TitleSite.classList.toggle("OpacityNone");
  }, 3000);
}
//////////////////////////////////////Click on Poster Ends////////////
