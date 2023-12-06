const gamePin = document.getElementById("gamePin");
const nickName = document.getElementById("nickName");
const enterBtn = document.getElementById("enterBtn");
const newRoomBtn = document.getElementById("newRoomBtn");

const pin = "https://stop-ten.vercel.app/api/room/create"



//websocket
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('d4b2aad7a72bd71e5420', {
  cluster: 'mt1'
});

var channel = pusher.subscribe('join-room');
channel.bind('join-room', function(data) {
  alert(JSON.stringify(data));
});

enterBtn.addEventListener("click", function(){
    let entrar = "https://stop-ten.vercel.app/api/room/join/" + gamePin.value + "/" + nickName.value;
    console.log(entrar);

    fetch(entrar)
    .then(res=>res.json())
    .then(dados => {
        console.log(dados)
        if (!dados.message){
            window.location.href = "./game.html"
            localStorage.setItem("pin", JSON.stringify(gamePin.value));
            localStorage.setItem("name", JSON.stringify(nickName.value));
            console.log(dados)
        }else{
            alert("Sala cheia");
        }
    })
})


newRoomBtn.addEventListener("click", function(){
    fetch(pin)
    .then(res=>res.json())
    .then(dados => {
        console.log(dados.pin);
        gamePin.value = dados.pin;
        newRoomBtn.style.color = "#f38c83";
        newRoomBtn.disabled = true;
    })
})