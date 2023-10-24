const keys = 'ts=1670913383902&apikey=edc9531ea872c74a2855ed93a5903229&hash=bbb581dcf34e4752243b361daa960fb1';
const limit10 = 'limit=10&';
const offset = `offset=${Math.round(Math.random() * 100)}&`;
const notfav_icon = 'https://raw.githubusercontent.com/9Yogesh9/Marvel-API/main/assests/images/heart-unselected.svg';

let getCharacters = 'https://gateway.marvel.com/v1/public/characters?';
let getFilteredCharacters = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=';

let listHolder = document.getElementById('listHolder');


function listAppend(inside_list) {
  listHolder.appendChild(inside_list);
}

function fetchMaster(URL = (getCharacters + limit10 + offset + keys)) {
  fetch(URL) 
  .then((response) => response.json())
  .then((data) => print_characters(data));

 
}


fetchMaster();

function print_characters(fetch_caracters) {
  let results = fetch_caracters.data.results;


  if(results.length != 0) {
    listHolder.innerHTML = "";
    for (r of results) {
      let ele_link = `details.html?ch_id=${r.id}`;
      let li_item = document.createElement('div');
      let thumb_link = `${r.thumbnail.path}.${r.thumbnail.extension}`.replace('http', 'https');

      let character_thumb = `<div class="character_thumb_container"><img src="${thumb_link}" class="character_thumb" alt="" srcset=""></div>`
      let character_name = `<div class="label_container"><p class="character_name">${r.name}</p>`;
      let fav_button = `<div class="fav_thumb" id="fav_thumb_${r.id}">
      <img src="${notfav_icon}" alt="" srcset="" onclick="addToFav(${r.id},'${r.name}','${thumb_link}')">
  </div></div>`

      let character_div = `<div class="individual_character"> 
  ${character_thumb}
  <a href="${ele_link}" target="_blank" >${character_name}</a>
  ${fav_button}
  </div>`;

      li_item.innerHTML = character_div;
      listAppend(li_item);
    }
  } else {
    listHolder.innerHTML = '<h1>not results</h1>'
  }

  for(a in localStorage) {
    let ele = document.getElementById(`fav_thumb_${a}`);
    if(ele) {
      ele.classList.add('fav_container_selected');
    }
  }
}

let search_text = document.getElementById('search_text');

let previous_search_value = '';


function show_results() {
  if(previous_search_value != search_text.value) {
     let search_value = search_text.value;
     if(search_value) {
       fetchMaster(`${getFilteredCharacters}${search_value}&${keys}`);
       previous_search_value = search_value;
     } else 
       alert('enter value')
     }
  }

  function addToFav(charac_id, charac_name, charac_thumb) {

    let grab_fav_container = document.getElementById(`fav_thumb_${charac_id}`);
    // grab_fav_container.classList.toggle('fav_container_selected');

    if (!localStorage.getItem(charac_id)) {
        let obj = {
            "id": charac_id,
            "name": charac_name,
            "thumb": charac_thumb
        }
        localStorage.setItem(charac_id, JSON.stringify(obj));
        grab_fav_container.classList.add('fav_container_selected');

    } else {
        localStorage.removeItem(charac_id);
        grab_fav_container.classList.remove('fav_container_selected');

    }
}


