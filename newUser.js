document.addEventListener("DOMContentLoaded", function () {
  // Button, mis avab/sulgeb vormi
  const createUserButton = document.getElementById("create-user");

  // Vormi konteiner
  const formContainer = document.getElementById("create-user-form-container");

  // Vorm ise
  const form = document.getElementById("create-user-form");

  // Nupu vajutamisel näita/peida vorm
  createUserButton.addEventListener("click", function () {
    if (formContainer.style.display === "none") {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "none";
    }
  });

  // Vormi esitamisel saada andmed ja peida vorm
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Vältida lehe laadimist uuesti

    const newUser = {
      username: document.getElementById("new-username").value,
      firstname: document.getElementById("new-firstname").value,
      lastname: document.getElementById("new-lastname").value,
      newPassword: document.getElementById("new-password").value,
    };

    fetch("http://demo2.z-bit.ee/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Uus kasutaja loodud:", data);

        // Peida vorm
        formContainer.style.display = "none";
      })
      .catch((error) => console.error("Viga kasutaja loomisel:", error));
  });
});

async function createUser(username, firstName, lastName, newPassword) {
  const response = await fetch("http://demo2.z-bit.ee/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kasutajanimi: username,
      eesnimi: firstName,
      perekonnanimi: lastName,
      newPassword: newPassword,
    }),
  });

  return response.json();
} 
