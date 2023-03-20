// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAafQ6dOgUcA6UZUzE6IfKruCjstPs8QHk",
    authDomain: "la-liga-b7a10.firebaseapp.com",
    projectId: "la-liga-b7a10",
    storageBucket: "la-liga-b7a10.appspot.com",
    messagingSenderId: "59003805398",
    appId: "1:59003805398:web:2b053f522054e6c5fbb377"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const db = getFirestore(app);



var modal = `

<!-- Button trigger modal -->
.<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn ajout rounded-pill text-light px-3 mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Ajouter Club
                </button>
            </div>
        </div>
    </div>
</div>



<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content" >
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">La Liga</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            
            <form class="row g-3 needs-validation" novalidate>
                <div class="container my-3">
                    <div class="row"  >
                        <div class="col-md-6">
                            
                            <select class="form-select form-select-lg mb-3 py-1" aria-label=".form-select-sm example" id="clubs" required>
                                <option selected>Selectionner un club</option>
                                <option value="Barcelone" id='club1'>Barcelone</option>
                                <option value="Real Madrid" id='club2'>Real Madrid</option>
                                <option value="Real Sociedad" id='club3'>Real Sociedad</option>
                                <option value="Atletico Madrid" id='club4'>Atletico Madrid</option>
                                <option value="Betis" id='club5'>Betis</option>
                                <option value="Rayo" id='club6'>Rayo</option>
                                <option value="Ath. Bilbao" id='club7'>Ath. Bilbao</option>
                                <option value="Majorque" id='club8'>Majorque</option>
                            </select>
                            <input type="text" class="form-control py-2 mb-3" placeholder="Journée" id="MJ" required>
                            <input type="text" class="form-control py-2 mb-3"  placeholder="Match Gagné" id="G" required>
                            <input type="text" class="form-control py-2 mb-3"  placeholder="Match Null" id="N" required>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control py-2 mb-3"  placeholder="Match Perdu" id="P" required>
                            <input type="text" class="form-control py-2 mb-3"  placeholder="Resultal Match" id="resultats" required>
                            <input type="text" class="form-control py-2 mb-3"  placeholder="Difference But" id="DB" required>
                            <input type="text" class="form-control py-2 mb-3"  placeholder="Points" id="Pts" required>
                        </div>
                        
                    </div>
                </div>

                <div class="modal-footer">
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn save rounded-pill" type="submit" id='saves' onclick="save()">Enregistrer</button>
                    <button class="btn annuler rounded-pill" type="button" data-bs-dismiss="modal">Annuler</button>
                </div>
                </div>

            </form>
        </div>
        
        
    </div>
</div>
</div>

`

let clubsExistants = [];
function table() {
    let table = `<table class="table table-hover table-striped table-dark ">
    <thead>
      <tr>
        <th scope="col">no</th>
        <th scope="col">clubs</th>
        <th scope="col">MJ</th>
        <th scope="col">G</th>
        <th scope="col">N</th>
        <th scope="col">P</th>
        <th scope="col">resultats</th>
        <th scope="col">DB</th>
        <th scope="col">Pts</th>
      </tr>
    </thead>
    <tbody>`;

    for (let i = 0; i < details.length; i++) {
        table =
            table +
            `<tr>
        <th scope="row">${i + 1}</th>
        <td>${details[i].clubs}</td>
        <td>${details[i].MJ}</td>
        <td>${details[i].G}</td>
        <td>${details[i].N}</td>
        <td>${details[i].P}</td>
        <td>${details[i].resultats}</td>
        <td>${details[i].DB}</td>
        <td>${details[i].Pts}</td>
      </tr>`;
    }
    table =
        table + `</tbody>
  </table>`;
    document.getElementById("table").innerHTML = table;
}





const details = [];
table();
function save() {
    let clubs = document.getElementById('clubs')
    let MJ = document.getElementById("MJ")
    let G = document.getElementById("G");
    let N = document.getElementById("N");
    let P = document.getElementById("P");
    let resultat = document.getElementById("resultats");
    let DB = document.getElementById("DB");
    let Pts = document.getElementById("Pts");


    let data = {
        clubs: clubs.value,
        MJ: MJ.value,
        G: G.value,
        N: N.value,
        P: P.value,
        resultats: resultat.value,
        DB: DB.value,
        Pts: Pts.value,
    };



    //funtion club existant

    function existe(){
    
        // récupérer le nom du club saisi dans l'input
        let nomClub = document.getElementById("clubs").value;

        // vérifier si le nom du club existe déjà dans le tableau des clubs existants
        if (clubsExistants.includes(nomClub)) {

            document.getElementById("clubs").value = "";
            document.getElementById("MJ").value = "";
            document.getElementById("G").value = "";
            document.getElementById("N").value = "";
            document.getElementById("P").value = "";
            document.getElementById("resultats").value = "";
            document.getElementById("DB").value = "";
            document.getElementById("Pts").value = "";

        
            // afficher un message d'erreur
            alert("Le club " + nomClub + " existe déjà dans la table.");

            
            // sortir de la fonction sans ajouter le club dans la table
            return;

        } else {
            // ajouter le nom du club dans le tableau des clubs existants
            clubsExistants.push(nomClub);

            details.push(data)
            console.log(details);
            table();

            document.getElementById("clubs").value = "";
            document.getElementById("MJ").value = "";
            document.getElementById("G").value = "";
            document.getElementById("N").value = "";
            document.getElementById("P").value = "";
            document.getElementById("resultats").value = "";
            document.getElementById("DB").value = "";
            document.getElementById("Pts").value = "";

            // le reste du code pour sauvegarder les informations du club
            // ...

        }


    }



    // validateForm();
    existe();
    // Add a new document with a generated id.

    // console.log("Document written with ID: ", docRef.id);


}
document.getElementById("modal").innerHTML = modal;



function add(e) {
    ///e.preventDefault();
    

    let clubs = document.getElementById('clubs')
    let MJ = document.getElementById("MJ")
    let G = document.getElementById("G");
    let N = document.getElementById("N");
    let P = document.getElementById("P");
    let resultat = document.getElementById("resultats");
    let DB = document.getElementById("DB");
    let Pts = document.getElementById("Pts");

    addDoc(collection(db, "liga"), {
        clubs: clubs.value,
        MJ: MJ.value,
        G: G.value,
        N: N.value,
        P: P.value,
        resultats: resultat.value,
        DB: DB.value,
        Pts: Pts.value,

    });

    save();
    
}
document.getElementById('saves').addEventListener('click', ()=> add());
console.log(db);





// validation du form

// Example starter JavaScript for disabling form submissions if there are invalid fields
// (() => {
//     'use strict'
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//    const forms = document.querySelectorAll('.needs-validation')
  
//     // Loop over them and prevent submission
//     Array.from(forms).forEach(form => {
//       form.addEventListener('submit', event => {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
  
//         form.classList.add('was-validated')
        
//       }, false)
//     })
// })()






