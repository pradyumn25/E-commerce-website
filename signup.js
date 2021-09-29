const firebaseConfig = {
    apiKey: "AIzaSyCHmiTfYwJRzInIFu9_CrbymmZWyGQUnms",
    authDomain: "test-form-74606.firebaseapp.com",
    databaseURL: "https://test-form-74606.firebaseio.com",
    projectId: "test-form-74606",
    storageBucket: "test-form-74606.appspot.com",
    messagingSenderId: "963292298293",
    appId: "1:963292298293:web:e5ea12f12f61e2d27b857c"
  };

firebase.initializeApp(firebaseConfig);

function register(){
    
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var pass = document.getElementById("pass").value
    var temp = 0


    firebase.database().ref("users").once("value", function(snapshot){
        snapshot.forEach(function(childsnapshot){
            if(childsnapshot.val().email == email){
                alert("Your Email is Already Registered")
                temp = temp+1
            }
        });
    })

    alert(temp)

    if (temp != 0){
        var cred = {
            name: name,
            email: email,
            pass: pass
        }

        firebase.database().ref("users").push(cred)
        alert("You are now Registered Please Login!")    
    }
}

