const firebaseConfig = {
    apiKey: "***********your api key*********",
    authDomain: "**** your auth domain******",
    databaseURL: "******",
    projectId: "******",
    storageBucket: "********",
    messagingSenderId: "******",
    appId: "*******"
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

