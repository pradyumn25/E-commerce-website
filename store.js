const firebaseConfig = {
    apiKey: "AIzaSyCHmiTfYwJRzInIFu9_CrbymmZWyGQUnms",
    authDomain: "test-form-74606.firebaseapp.com",
    databaseURL: "https://test-form-74606.firebaseio.com",
    projectId: "test-form-74606",
    storageBucket: "test-form-74606.appspot.com",
    messagingSenderId: "963292298293",
    appId: "1:963292298293:web:e5ea12f12f61e2d27b857c"
  };

  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);

  function create(){
        var price = document.getElementById("price").value;
        var brandname = document.getElementById("brandname").value;

        let data = {
            price: price,
            brandname: brandname
        }

        firebase.database().ref("items").child("display").push(data,
            err => console.log(err ? 'error while pushing' : 'succesful push'));
  }

  function makeEle(filter){
    var el = document.getElementById("product")
    el.remove()

    firebase.database().ref("items").child("display").once("value", function(snapshot){
          snapshot.forEach(
              function(childsnapshot){

                if (filter == "all"){

                    var main_div = document.createElement("div")
                    main_div.setAttribute("class", "row row-cols-1 row-cols-md-3 g-4")
                    main_div.setAttribute("id", "product")
                    document.getElementById("main-product").appendChild(main_div)

                    var div_first = document.createElement("div")
                    div_first.setAttribute("class", "card")
                    div_first.setAttribute("style", "width: 18rem;")
                    div_first.setAttribute("id", childsnapshot.key)
                    document.getElementById("product").appendChild(div_first)

                    var icon = document.createElement("ion-icon")
                    icon.setAttribute("name", "headset")
                    if (childsnapshot.val().brandname == "Brand A"){
                        icon.style.color = "Red"
                    }
                    if (childsnapshot.val().brandname == "Brand B"){
                        icon.style.color = "Blue"
                    }
                    if (childsnapshot.val().brandname == "Brand C"){
                        icon.style.color = "Green"
                    }
                    icon.style.margin = "25%"
                    icon.style.fontSize = "50px"
                    document.getElementById(childsnapshot.key).appendChild(icon)

                    var div_second = document.createElement("div")
                    div_second.setAttribute("class", "card-body")
                    div_second.setAttribute("id", childsnapshot.key+childsnapshot.val().price)
                    document.getElementById(childsnapshot.key).appendChild(div_second)

                    var h5 = document.createElement("h5")
                    h5.setAttribute("class", "card-title")
                    h5.innerHTML = childsnapshot.val().brandname

                    var id_name = childsnapshot.key+childsnapshot.val().price

                    document.getElementById(id_name).appendChild(h5)

                    var p = document.createElement("p")
                    p.setAttribute("class", "class-text")
                    p.innerHTML = "Price (Rs.) "+childsnapshot.val().price
                    document.getElementById(id_name).appendChild(p)

                    var but = document.createElement("button")
                    but.setAttribute("class", childsnapshot.val().brandname)
                    but.setAttribute("id", childsnapshot.key)
                    but.setAttribute("value", childsnapshot.val().price)
                    but.innerHTML = "Add to cart"
                    but.addEventListener("click", cart)
                    document.getElementById(id_name).appendChild(but)
                }

                else{
                    if (childsnapshot.val().brandname == filter)
                    {
                        var main_div = document.createElement("div")
                        main_div.setAttribute("class", "row row-cols-1 row-cols-md-3 g-4")
                        main_div.setAttribute("id", "product")
                        document.getElementById("main-product").appendChild(main_div)
    
                        var div_first = document.createElement("div")
                        div_first.setAttribute("class", "card")
                        div_first.setAttribute("style", "width: 18rem;")
                        div_first.setAttribute("id", childsnapshot.key)
                        document.getElementById("product").appendChild(div_first)
    
                        var icon = document.createElement("ion-icon")
                        icon.setAttribute("name", "headset")
                        if (childsnapshot.val().brandname == "Brand A"){
                            icon.style.color = "Red"
                        }
                        if (childsnapshot.val().brandname == "Brand B"){
                            icon.style.color = "Blue"
                        }
                        if (childsnapshot.val().brandname == "Brand C"){
                            icon.style.color = "Green"
                        }
                        icon.style.margin = "25%"
                        icon.style.fontSize = "50px"
                        document.getElementById(childsnapshot.key).appendChild(icon)
                        document.getElementById(childsnapshot.key).appendChild(icon)
    
                        var div_second = document.createElement("div")
                        div_second.setAttribute("class", "card-body")
                        div_second.setAttribute("id", childsnapshot.key+childsnapshot.val().price)
                        document.getElementById(childsnapshot.key).appendChild(div_second)
    
                        var h5 = document.createElement("h5")
                        h5.setAttribute("class", "card-title")
                        h5.innerHTML = childsnapshot.val().brandname
    
                        var id_name = childsnapshot.key+childsnapshot.val().price
    
                        document.getElementById(id_name).appendChild(h5)
    
                        var p = document.createElement("p")
                        p.setAttribute("class", "class-text")
                        p.innerHTML = "Price (Rs.) "+childsnapshot.val().price
                        document.getElementById(id_name).appendChild(p)
    
                        var but = document.createElement("button")
                        but.setAttribute("class", childsnapshot.val().brandname)
                        but.setAttribute("value", childsnapshot.val().price)
                        but.innerHTML = "Add to cart"
                        but.addEventListener("click", cart)
                        document.getElementById(id_name).appendChild(but) 
                    }
                }
          });
      })
  }


function cart(){
    var cart_brandname = this.className
    var cart_price = this.value

    if (cart_brandname == "Brand A"){
        var cart_color = "Red"
    }
    if (cart_brandname == "Brand B"){
        var cart_color = "Blue"
    }
    if (cart_brandname == "Brand C"){
        var cart_color = "Green"
    }

    addItemToCart(cart_brandname, cart_price, cart_color)
    updateCartTotal()
}

function addItemToCart(cart_brandname, cart_price, cart_color){
    var cartRow = document.createElement("tr")
    cartRow.setAttribute("class", "items")
    // cartRow.setAttribute("id", "cat-box")

    var content = `
    <td><ion-icon name="headset"></ion-icon><br>${cart_brandname}</td>
    <td class="cart_price">Rs. ${cart_price}</td>
    <td><input type="number" value="1" style="width: 40px;" class ="cart-quantity-input"></td>
    
    <td><button onclick = "removeItem()">Remove</button></td>
    `
    cartRow.innerHTML = content
    document.getElementById("cart-table").appendChild(cartRow)

    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function removeItem(){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal(event) {

    var cartRows = document.getElementsByClassName('items')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart_price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs. ', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total')[0].innerText = 'Rs. ' + total
}