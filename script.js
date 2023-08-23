const charactersList = document.querySelector('.characters-list');
const charactersDetails = document.querySelector('.characters-details');

async function asyncFetch() {
  try{
      // console.log(value);
      const res = await fetch('https://swapi.dev/api/people/');
      const data = await res.json();
      const characters = data.results;

      // Display character images
      characters.forEach(character => {
          const characterImage = `./Images/${character.name}.png`;
          character.image = characterImage;
      });

      displayCharacters(characters);
    } catch (error) {
      console.error('Error fetching data:', error);
  }
}

//Function to display charaters in the list
function displayCharacters(characters){
    charactersList.innerHTML = '';
    characters.forEach(character => {
        const characterItem = document.createElement('div');
        characterItem.classList.add('character-item');
        characterItem.innerHTML = `
          <img src = "${character.image}" alt = "${character.name}">
          <p> ${character.name}</p>
          <div class="details-section" style="display: none;">
              <!-- Details will be displayed here -->
              <h2>${character.name}</h2>
              <p>Gender: ${character.gender}</p>
              <p>Height: ${character.height} cm</p>
          </div>`;

           characterItem.addEventListener('click', () => toggleDetailsVisibility(characterItem));
           charactersList.appendChild(characterItem);
    })
}

function toggleDetailsVisibility(characterItem) {
  const detailsSection = characterItem.querySelector('.details-section');
  detailsSection.style.display = detailsSection.style.display === 'none' ? 'block' : 'none';
}

// Initialize the web by fetching characters

asyncFetch();



