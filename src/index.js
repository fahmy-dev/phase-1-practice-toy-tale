let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    const toyCollection = document.getElementById("toy-collection")
    
    toys.forEach(toy => {
      const toyDiv = document.createElement("div");
      const h2 = document.createElement("h2");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const btn = document.createElement("button");

      h2.textContent = toy.name;
      img.src = toy.image;
      img.classList.add("toy-avatar")
      p.textContent = `${toy.likes} Likes`;
      btn.classList.add("like-btn");
      btn.id = toy.id;
      btn.textContent = "Like ❤️";
      
      toyDiv.classList.add("card");
      
      toyDiv.appendChild(h2);
      toyDiv.appendChild(img);
      toyDiv.appendChild(p);
      toyDiv.appendChild(btn);
      toyCollection.appendChild(toyDiv);
    });
    likeToy();
  })
  .catch(error => {
    console.error("Error fetching toys:", error)
  });
};

fetchToys();

function renderToy() {
  const createToyForm = document.querySelector(".add-toy-form");
  createToyForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.querySelector(".input-text[name='name']").value
    const image = document.querySelector(".input-text[name='image']").value
    
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          "name": name,
          "image": image,
          "likes": 0  
      }),
  })
  .then(response => response.json())
  .then(newToy => {
    const toyCollection = document.getElementById("toy-collection")
    const toyDiv = document.createElement("div");
      const h2 = document.createElement("h2");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const btn = document.createElement("button");

      h2.textContent = newToy.name;
      img.src = newToy.image;
      img.classList.add("toy-avatar")
      p.textContent = `${newToy.likes} Likes`;
      btn.classList.add("like-btn");
      btn.id = newToy.id;
      btn.textContent = "Like ❤️";
      
      toyDiv.classList.add("card");
      
      toyDiv.appendChild(h2);
      toyDiv.appendChild(img);
      toyDiv.appendChild(p);
      toyDiv.appendChild(btn);
      toyCollection.appendChild(toyDiv);
  })
  .error(error => {
    console.error("Error adding Toy:", error)
  })
  });
};
renderToy();

function likeToy() {
  const likeBtns = document.querySelectorAll(".like-btn")
  
  likeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const toyId = btn.id;
      console.log(toyId);
      const p = btn.previousElementSibling;
      let currentLikes = parseInt(p.textContent.split(" ")[0]);
      currentLikes++;

      p.textContent = `${currentLikes} Likes`
      
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "likes": currentLikes  
        })
      })
      .catch(error => {
        console.error("Error updating likes:", error);
      })
    });
  }); 
};


});
