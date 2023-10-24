const keys = 'ts=1670913383902&apikey=edc9531ea872c74a2855ed93a5903229&hash=bbb581dcf34e4752243b361daa960fb1';
let getCharacterDetails = 'https://gateway.marvel.com:443/v1/public/characters/';

let key_values = window.location.search;

const urlParams = new URLSearchParams(key_values);
const char_id = urlParams.get('ch_id');
let URL = `${getCharacterDetails}${char_id}?${keys}`;

function fetchMater(URL) {
  fetch(URL) 
  .then((response) => response.json())
  .then((data) => print_character(data));
}

fetchMater(URL);


let master_container = document.getElementById('master_container');
let thumb_container = document.getElementsByClassName('thumb_container')[0];
let right_container = document.getElementsByClassName('right_container')[0];


function print_character(ch_data) {
  let data = ch_data.data.results;
  if(data.length != 0) {
    data = ch_data.data.results[0];
    thumb_container.innerHTML = '';
    right_container.innerHTML = '';
    let thumb_link = `${data.thumbnail.path}.${data.thumbnail.extension}`.replace('http', 'https');

    let character_thumb = `<div class='character_thumb_container'><img src='${thumb_link}' class='character_thumb' alt='' srcset='' ></div> `
    thumb_container.innerHTML = character_thumb;


    let char_name = data.name;
    let name_h1 = `<div id='name_align'><h1 id='char_name'>${char_name}</h1></div> `;

    let comics = data.comics.items;
    let comics_li = `<h3>comics</h3></ul>`;
    for (c of comics) {
      let li_ele = `<li>${c.name}</li>`;
      comics_li += li_ele;
    }
    comics_li += `</ul>`;

    let series = data.series.items;
    let series_li = `<h3>series</h3></ul>`;
      for(s of series) {
        let li_ele = `<li>${s.name}</li>`;
        series_li += li_ele;
      }
      series_li += `</ul>`;

      let stories = data.stories.items;
      let stories_li = `<h3>stories</h3></ul>`;
      for(c of stories) {
        let li_ele = `<li>${c.name}</li>`;
        stories_li += li_ele;
      }
      stories_li += `</ul>`;


      let events = data.events.items;
      let events_li = `<h3>events</h3></ul>`;
      for(c of comics) {
        let li_ele = `<li>${c.name}</li>`;
        events_li += li_ele;
      }
      events_li += `</ul>`;


 right_container.innerHTML = `${name_h1}${comics_li}${series_li}${stories_li}${events_li}`

  }
}


