let persons = [];
let SetFilmPersons = [];


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
    let SetFilmPersonsWork =[]
    SetFilmPersons.forEach(function(person) {
        let personId = person.replace(
          "https://swapi.co/api/people/",
          ""
        );
        personId = personId.replace("/", "");       
      SetFilmPersonsWork.push(personId)         
      });

      SetFilmPersons =  SetFilmPersonsWork;
      SetFilmPersonsWork = [];


SetFilmPersons.forEach(function(personWork){
  
persons.forEach(function(person) {
    if (personWork == person.id) {
        SetFilmPersonsWork.push(person)
    }
  });

});
SetFilmPersons = SetFilmPersonsWork;
SetFilmPersonsWork = [];


}


////////////Click on poster ////////////////////////////

function ClickOnPoster(posterNumber) {
  console.log(`To jest poster nr: ${posterNumber}`);
  let element = document.getElementById("PostersWrapper");
  element.classList.toggle("DisplayNone");
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
      findPerson()
      console.log(SetFilmPersons);
      console.log(response.data)
//////////////////////Add things to chosen film card//////////////////////////










//////////////////// END add things to chosen film card

    } catch (error) {
      console.error(error);
    }
  }

  GetFromApi(posterNumber);

  setTimeout(function() {
    TitleSite.classList.toggle("DisplayNone");
  }, 2000);
}
//////////////////////////////////////Click on Poster Ends////////////