//Capturando os elementos do navBar
const display = document.getElementById('display');
const letter = document.getElementById("letter");
const round = document.getElementById("round");
// Capturando os usuários
const user1 = document.getElementById("user1");
const user2 = document.getElementById("user2");
const user3 = document.getElementById("user3");
const user4 = document.getElementById("user4");
const user5 = document.getElementById("user5");
//capturando o placar dos usuários
const placarUser1 = document.getElementById("placarUser1");
const placarUser2 = document.getElementById("placarUser2");
const placarUser3 = document.getElementById("placarUser3");
const placarUser4 = document.getElementById("placarUser4");
const placarUser5 = document.getElementById("placarUser5");
//capturando os inputs
const inputObject = document.getElementById("inputObject");
const inputVerb = document.getElementById("inputVerb");
const inputAnimal = document.getElementById("inputAnimal");
const inputFruit = document.getElementById("inputFruit");
const inputCountry = document.getElementById("inputCountry");
const inputProfession = document.getElementById("inputProfession");
const inputBodyPart = document.getElementById("inputBodyPart");
const inputCelebrity = document.getElementById("inputCelebrity");
//capturando o botão stop
const stopBtn = document.getElementById("stopBtn");
const startBtn = document.getElementById("startBtn");
//capturando o pin da tela
const pinNum = document.getElementById("pinNum");
// capturando a API
const randomLetter = "https://stop-ten.vercel.app/api/categories/random"
const eventoStop = "https://stop-ten.vercel.app/api/room/stop"
const pin = "https://stop-ten.vercel.app/api/room/users/" + recuperarDoLocalStorage("pin")
const calcResult = "https://stop-ten.vercel.app/api/categories/calculate/" + recuperarDoLocalStorage("pin");



/*fetch(calcResult)
.then(res=>res.json())
.then(dados => {
   console.log(dados)
})*/

Pusher.logToConsole = true;

var pusher = new Pusher('d4b2aad7a72bd71e5420', {
  cluster: 'mt1'
});
//pusher.signin()
const channel = pusher.subscribe('join-room');
const letterRandon = pusher.subscribe('letter');
const stopEve = pusher.subscribe('stop');

letterRandon.bind('letter', function(data){
   console.log('Evento recebido:', data);
   letter.innerHTML = data.letter;
   round.innerHTML = "Round 1"
   timer(300, display);
   stopBtn.style.display = "block"
   startBtn.style.display = "none"
})
stopEve.bind('stop', function(data){
   console.log('Evento recebido:', data);
})

fetch(pin)
   .then(res=>res.json())
   .then(dados => {
      if(dados[0].name!=undefined)user1.innerHTML = dados[0].name;
      if(dados[1].name!=undefined)user2.innerHTML = dados[1].name;
      if(dados[2].name!=undefined)user3.innerHTML = dados[2].name;
      if(dados[3].name!=undefined)user4.innerHTML = dados[3].name;
      if(dados[4].name!=undefined)user5.innerHTML = dados[4].name;
      console.log("entrada na sala " + dados)
})

channel.bind('join-room', function(data) {
            fetch(pin)
            .then(res=>res.json())
            .then(dados => {
               if(dados[0].name!=undefined)user1.innerHTML = dados[0].name;
               if(dados[1].name!=undefined)user2.innerHTML = dados[1].name;
               if(dados[2].name!=undefined)user3.innerHTML = dados[2].name;
               if(dados[3].name!=undefined)user4.innerHTML = dados[3].name;
               if(dados[4].name!=undefined)user5.innerHTML = dados[4].name;
               console.log("entrada na sala socket" + dados)
            })
            console.log('Evento recebido:', data);
});

fetch(pin)
.then(res=>res.json())
.then(dados => {
   //console.log(dados);
   pinNum.innerHTML = "pin: " + recuperarDoLocalStorage("pin");
})

function recuperarDoLocalStorage(chave) {
   try {
       const valor = localStorage.getItem(chave);
       return valor ? JSON.parse(valor) : null;
   } catch (erro) {
       console.error('Erro ao recuperar dados do localStorage:', erro);
       return null;
   }
}

//configurando o timer
const timer = (duration, display) =>{
   let timer = duration;
   let minutes, seconds;
   setInterval(() => {
      minutes = Math.floor(timer/60);
      seconds = Math.floor(timer % 60);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds <10 ? '0' + seconds : seconds;

      display.innerHTML = `${minutes} : ${seconds}`;

      timer -= 1;
      if(timer <= 180){
         stopBtn.disabled = false;
         stopBtn.style.color = "var(--tom1)";
         console.log("passou o tempo")
      }
      if(timer<0){
         display.innerHTML = 'TIME OUT';
      }
   }, 1000)
}

   startBtn.addEventListener('click', function(){
      fetch(eventoStop)
      .then(res=>res.json())
      .then(dados => {
         //console.log(dados)
         if(user5.innerHTML != "user5"){
            gameStart()
         }else{
            alert("A sala não está cheia")
         }
      })
   })
   stopBtn.addEventListener('click', function(){
      fetch(eventoStop)
      .then(res=>res.json())
      .then(dados => {
            alert("Alguém apertou o botão de stop!")
            stopBtn.disabled = true;
      })

   })
function gameStart(){
   fetch(randomLetter)
   .then(res=>res.json())
   .then(dados => {
      console.log(dados.letter)
   })
   fetch(eventoStop)
   .then(res=>res.json())
   .then(dados => {
   })
}

function enviarDados(){
   let name = recuperarDoLocalStorage("name");
   console.log("name: " + name + "\nobject: " + inputObject.innerHTML); 

}