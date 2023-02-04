const students = [];
const darkSide = [];
const houses = ["Ravenclaw", "Hufflepuff", "Gryffindor", "Slytherin"];

//displays form when sort hat button is clicked
function displayForm() {
  document.getElementById("studentForm").innerHTML = `
        <p>
        You may enter a first year's name and submit.<br />
        Good luck on being sorted into your favorite house!
        </p>
        <label for="name" class="form-label">
        <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="I solemnly swear that I am up to no good" >
        <button class="btn btn-warning onclick=renderStudent()" type="submit">Submit</button>
        </label>;`;
  displayFilterMenu();
}

// display filter menu selection
function displayFilterMenu() {
  document.getElementById("studentForm").innerHTML += `
  <div id=filterId class="filterMenu">
      <label for="type" class="form-label"></label>
      <select class="form-select" id="type" aria-label="House Type">
          <option selected>Filter by house</option>
          <option value="All">All</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Darkside">The Dark Side</option>
        </select>
    </div>`;

  const typeDropDown = document.getElementById("type");

  typeDropDown.addEventListener("change", () =>
    renderFilterdStudents(typeDropDown.value)
  );
}

const form = document.querySelector("#studentForm");

let newStudentId = 0;

function renderToDom(divId, htmlText) {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlText;
}
// delete student
const deleteStudent = (id, side) => {
  if (side === "student") {
    const studentIndex = students.findIndex((x) => x.id === id);
    students.splice(studentIndex, 1);
    renderStudent(students);
  } else {
    const studentIndex = darkSide.findIndex((x) => x.id === id);
    darkSide.splice(studentIndex, 1);
    renderExpelledStudents(darkSide);
  }
};
// adds text input to student array
const displayDom = (e) => {
  e.preventDefault();
  if (!document.getElementById("name").value) {
    alert("Please enter a name");
    return;
  }

  const firstYear = {
    id: newStudentId,
    name: document.getElementById("name").value,
    house: houses[Math.floor(Math.random() * houses.length)],
  };

  newStudentId += 1;
  students.push(firstYear);
  renderStudent(students);
  renderExpelledStudents(darkSide);
  form.reset();
};

//filters student based on house
const renderFilterdStudents = (filter) => {
  const filteredStudents = students.filter((x) => x.house === filter);
  filter === "All" ? renderStudent(students) : renderStudent(filteredStudents); //ternary operator
  console.log(filter);
};

// moves student to the dark side when expelled
const expelStudent = (id) => {
  const studentIndex = students.findIndex((x) => x.id === id);
  const removedStudent = students.splice(studentIndex, 1);
  darkSide.push(...removedStudent);  //Spread Syntax or Spread Operator
  renderExpelledStudents(darkSide);
  renderStudent(students);
};

// adds student when text is entered and after submit has been clicked
function renderStudent(arr) {
  let domString = "";
  for (const student of arr) {
    domString += `<div class="card" id="cardId" style="width: 18rem;">
        <img src="image/hpSymbol.png" class="card-img-top" alt="...">
        <div class="card-body ${student.house.toLowerCase()}">
          <h5 class="card-title">${student.name}</h5>
          <p class="card-text">${student.house}</p>
          <a href="#" class="btn btn-primary" onclick="expelStudent(${
            student.id
          })">Expel</a><br>
          <br>
          <a href="#" class="btn btn-primary" onclick="deleteStudent(${
            student.id
          }, 'student')">Delete</a>
        </div>
      </div>`;
  }

  renderToDom("#isSorted", domString);
}

// voldys army
function renderExpelledStudents(arr) {
  let domString = "";
  for (const student of arr) {
    domString += `<div class="card" id="cardId" style="width: 18rem;">
        <img src="image/deathEater.png" class="card-img-top" alt="...">
        <div class="card-body dark-side">
          <h5 class="card-title">${student.name}</h5>
          <p class="card-text">${student.name} has been recruited by the Death Eaters</p>
          <a href="#" class="btn btn-primary" onclick="deleteStudent(${student.id}, 'darkSide')">Delete</a>
        </div>
      </div>`;
  }

  renderToDom("#darkSide", domString);
}

// handles submit
form.addEventListener("submit", (e) => displayDom(e));
