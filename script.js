let griglia = [];
let celle = [];

// funzione per creare la griglia
function creaGriglia() {
  for (let i = 0; i < 4; i++) {
    griglia[i] = [];
    for (let j = 0; j < 4; j++) {
      griglia[i][j] = 0;
      celle.push(document.createElement("div"));
      celle[celle.length - 1].classList.add("cella");
      document.querySelector(".griglia").appendChild(celle[celle.length - 1]);
    }
  }
}

// funzione per aggiornare la griglia
function aggiornaGriglia() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (griglia[i][j]!== 0) {
        celle[i * 4 + j].innerHTML = griglia[i][j];
      } else {
        celle[i * 4 + j].innerHTML = "";
      }
    }
  }
}
// funzione per generare numeri casuali
function generaNumeroCasuale() {
    let numero = Math.floor(Math.random() * 2) + 1;
    return numero * 2;
  }

  // aggiunta di numeri casuali alla griglia
  for (let i = 0; i < 2; i++) {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    griglia[x][y] = generaNumeroCasuale();
  }
// funzione per muovere le celle
function muoviCelle(direzione) {
    switch (direzione) {
      case "su":
        muoviSu();
        break;
      case "giù":
        muoviGiu();
        break;
      case "sinistra":
        muoviSinistra();
        break;
      case "destra":
        muoviDestra();
        break;
    }
    aggiornaGriglia();
  }

  // funzione per muovere le celle su
  function muoviSu() {
    for (let j = 0; j < 4; j++) {
      let colonne = [];
      for (let i = 0; i < 4; i++) {
        colonne.push(griglia[i][j]);
      }
      colonne = unisciColonne(colonne);
      for (let i = 0; i < 4; i++) {
        griglia[i][j] = colonne[i];
      }
    }
  }

  // funzione per muovere le celle giù
  function muoviGiu() {
    for (let j = 0; j < 4; j++) {
      let colonne = [];
      for (let i = 3; i >= 0; i--) {
        colonne.push(griglia[i][j]);
      }
      colonne = unisciColonne(colonne);
      for (let i = 3; i >= 0; i--) {
        griglia[i][j] = colonne[3 - i];
      }
    }
  }

  // funzione per muovere le celle sinistra
  function muoviSinistra() {
    for (let i = 0; i < 4; i++) {
      let righe = [];
      for (let j = 0; j < 4; j++) {
        righe.push(griglia[i][j]);
      }
      righe = unisciRighe(righe);
      for (let j = 0; j < 4; j++) {
        griglia[i][j] = righe[j];
      }
    }
  }

  // funzione per muovere le celle destra
  function muoviDestra() {
    for (let i = 0; i < 4; i++) {
      let righe = [];
      for (let j = 3; j >= 0; j--) {
        righe.push(griglia[i][j]);
      }
      righe = unisciRighe(righe);
      for (let j = 3; j >= 0; j--) {
        griglia[i][j] = righe[3 - j];
      }
    }
  }

  // funzione per unire le colonne
  function unisciColonne(colonne) {
    let nuoveColonne = [];
    for (let i = 0; i < colonne.length; i++) {
      if (colonne[i]!== 0) {
        nuoveColonne.push(colonne[i]);
      }
    }
    for (let i = 0; i < nuoveColonne.length - 1; i++) {
      if (nuoveColonne[i] === nuoveColonne[i + 1]) {
        nuoveColonne[i] *= 2;
        nuoveColonne[i + 1] = 0;
      }
    }
    nuoveColonne = nuoveColonne.filter(x => x!== 0);
    while (nuoveColonne.length < 4) {
      nuoveColonne.push(0);
    }
    return nuoveColonne;
  }

  // funzione per unire le righe
  function unisciRighe(righe) {
    let nuoveRighe = [];
    for (let i = 0; i < righe.length; i++) {
      if (righe[i]!== 0) {
        nuoveRighe.push(righe[i]);
      }
    }
    for (let i = 0; i < nuoveRighe.length - 1; i++) {
      if (nuoveRighe[i] === nuoveRighe[i + 1]) {
        nuoveRighe[i] *= 2;
        nuoveRighe[i + 1] = 0;
    }
  }
  nuoveRighe = nuoveRighe.filter(x => x!== 0);
  while (nuoveRighe.length < 4) {
    nuoveRighe.push(0);
  }
  return nuoveRighe;
}

// ascolta gli eventi di tastiera
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      muoviCelle("su");
      break;
    case "ArrowDown":
      muoviCelle("giù");
      break;
    case "ArrowLeft":
      muoviCelle("sinistra");
      break;
    case "ArrowRight":
      muoviCelle("destra");
      break;
  }
  aggiornaGriglia();
});

function controllaFineGioco() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (griglia[i][j] === 2048) {
          alert("Hai vinto!");
          return true;
        }
      }
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (griglia[i][j] === griglia[i][j + 1] || griglia[i][j] === 0 || griglia[i][j + 1] === 0) {
          return false;
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (griglia[i][j] === griglia[i + 1][j] || griglia[i][j] === 0 || griglia[i + 1][j] === 0) {
          return false;
        }
      }
    }
    alert("Hai perso!");
    return true;
  }

// inizializza la griglia
creaGriglia();

// aggiorna la griglia
aggiornaGriglia();

// ascolta gli eventi di movimento
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    muoviCelle("su");
  } else if (e.key === "ArrowDown") {
    muoviCelle("giù");
  } else if (e.key === "ArrowLeft") {
    muoviCelle("sinistra");
  } else if (e.key === "ArrowRight") {
    muoviCelle("destra");
  }
});

