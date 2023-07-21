
 const socket = io.connect()


para = [
    "his css code will remove the border and outline from a textbox of type text when it is focused You can modify the selector to target a specific textbox by using an id class or other attribute selectors Note that removing the border and outline from a focused element can make it harder for users to see which element is currently focused so use this technique with caution",
     "the dinosaur game is a browser game developed by google and built into the google Chrome web browser the player guides a pixelated  rex across a sidescrolling landscape avoiding obstacles to achieve a higher score the game was created by members of the chrome ux team in",
     "pacman originally called puck man in japan is a  maze action video game developed and released by namco for arcades in north america the game was released by midway manufacturing as part of its licensing agreement with namco america",    
     "in computer networking localhost is a hostname that refers to the current device used to access it it is used to access the network services that are running on the host via the loopback network interface using the loopback interface bypasses any local network interface hardware",
    "a pyramid is a structure whose outer surfaces are triangular and converge to a single step at the top making the shape roughly a pyramid in the geometric sense The base of a pyramid can be trilateral quadrilateral or of any polygon shape As such a pyramid has at least three outer triangular surfaces",
    "into she after know possible life part another when might this still at it before also down system from there home interest a also before old other plan what change move at consider set so home such over she turn any here to know present come before a pyramid has at least three outer triangular",
    "english last all hold world own when but school leave last hand number person early make first way around take a school become public after not well then it into know person last about never fact same and a just many how way order want long bypasses any local network interface",
    "over there consider call if group both to it fact could only life mean how do give from he man plan small off there day good develop before eye keep so even who head increase develop home find by most last present as think tell this first capable of total reusability of total palace words taken here",
    "up number while again more or seem write little seem become have both number call after if late around get could on he than right interest mean what too mean world how old it who could around more state run to all need that problem total problem here and there every where who knows as it is total paradise",
    "school not play well never state be program fact have develop more again set many may lead same from this around school work run than man might any all change house who there between program through eye large most find during to in we are sadden to see who can code on the road limca juice test when kan"
]

var username = ""
var startGame = false ;
var Music = document.getElementById("music")
var Music2 = document.getElementById("music2")



do{
    username = prompt("Enter your name : ")
}while(!username)

if(username)
{
    $('#username').html(username)
}


var currentText
var lettersArray = []
var currentIndex = 0 ;
var changeId = ['A', 'B', 'C', 'D'] ;
changeIdIndex = 0 ;
wordCount = 0
wordComplete = true ;
var characterArray 
var setTime = 60
initialTime = setTime
var wpm = 0
var accuracy = 0
var actualWords = 0
startTimer = true ;


 startGame = confirm("Are you ready ?  (START TYPING TO BEGIN :") ;




 var giveId = "GUPT" + (new Date()).getTime() ;
 console.log(giveId);

 playerData = {
    name : username,
    id : giveId
 }

 if(startGame)
 {
    socket.emit('player-ready', playerData ) ;
  
}


socket.on('player-ready',(x)=>{
    console.log( "play");
    $('#num').html(x + '')
 })



function setContent()
{
    randomIndex = Math.floor(Math.random()* para.length) ;
    console.log(randomIndex);

   
    // currentText = para[0]
    currentText = para[randomIndex]
}

setContent()

function giveSpan()
{
    characterArray = currentText.split('') ;

    // characterArray.forEach(character => {
    //     character =   `<span>${character}</span>`
    // });

    lettersArray = [] 

    for(i = 0 ; i< characterArray.length; i++)
    {
        lettersArray.push( `<span>${characterArray[i]}</span>`) 
        // lettersArray.push( `<span id= ${changeId[changeIdIndex] + i}>${characterArray[i]}</span>`) 
    }

    $('#inputBox').html(lettersArray)
    // console.log(lettersArray);
}

var setWidth = 0

window.addEventListener('keydown',(e)=>{
  c =   String.fromCharCode(event.keyCode)

   
   if(startTimer)
   {
    startTimer = false ;
    timer()
    Music.play() ;
   }

   if(characterArray[currentIndex] == ' ')
   actualWords++ ;

  if (!event.shiftKey) {
    c = c.toLowerCase();
    }
    // console.log("button pressed" +  c);
    // console.log("button pressed" +  (event.keyCode));


    if(event.keyCode == 8)
    {
        currentIndex-- ;
        lettersArray[currentIndex] = `<span>${characterArray[currentIndex]}</span>`
        wordComplete = true; 
    }
    else if(event.keyCode == 16)
    {
        // do nothing
      


    }
    else if(characterArray[currentIndex] ==  c)
    {
        if(event.keyCode == 32 )
        {
            if(wordComplete == true)
            {
                wordCount++ ;
                
            //   document.getElementById('one').style.width =` ${setWidth}%`
                // console.log("width "  + x);
               

                $('#wordCount').text(wordCount)
            }

            wordComplete = true ;
        }
        lettersArray[currentIndex] = `<span class="correct" >${characterArray[currentIndex]}</span>`
        console.log("Matched");

        currentIndex++ ;
    }
    else
    {
        lettersArray[currentIndex] = `<span class="wrong" >${characterArray[currentIndex]}</span>`
        // console.log(" not Matched " + characterArray[currentIndex]);
        wordComplete = false ;

        currentIndex++ ;

    }

    $('#inputBox').html(lettersArray)

    if(currentIndex == characterArray.length)
    {
        currentIndex = 0 ;
        setContent()
        giveSpan()
       

    }
})

var loadTimer

var startMusic = true 
function timer()
{
  
    loadTimer = setInterval(() => {

        if(startMusic)
        {
            Music.play()
            startMusic = false ;
        }
      $('#timer').html(initialTime + '')
      wpm =  Math.floor((wordCount*60)/(setTime - initialTime || 1))
      
      $('#speed').html(wpm + '')

      accuracy = Math.floor((( wordCount)/actualWords)*100)
      $('#accuracy').html(accuracy + '')


      if(initialTime >0)
      initialTime--
      else
      {
          clearInterval(loadTimer)
          alert('Time Over...')
          Music.stop() ;

      }


      socket.on('update-detail', (details)=>
      {
        
        // console.log(details);

        for( let i = 0 ; i< details.length; i++)
        {
            if(details[i].clientId == giveId)
            {
                $('#rank').html( i + 1+ '')  
               
                // document.getElementById("A"+i+1).style.width = `${details[i].words*2}%`
            }
            
            if(i < 5)
            {
                var A = "A" + (i + 1)
                B = details[i].words*1.75 + 5 + "%"
                C = "#p" + (i + 1)
                colorCode = details[i].color
                NAME = details[i].name + " " + details[i].speed + " wpm" ;
                document.getElementById(A).style.width = B
                document.getElementById(A).style.backgroundColor = colorCode ;
                $(C).html(NAME)

            }
           
          
           
        }

        
      })

      socket.emit('update-detail',({
          parameter : wordCount*100 + accuracy ,
         clientId : giveId ,
         words : wordCount,
         speed : wpm
      }))
      
        
    }, 1000);
}

// timer();

giveSpan() ;