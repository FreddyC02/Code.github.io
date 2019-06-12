// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB4Ni8_EqiLAM_RKO8tWTfx_FxW-TNMwfg",
  authDomain: "freddy-online-web-game.firebaseapp.com",
  databaseURL: "https://freddy-online-web-game.firebaseio.com",
  projectId: "freddy-online-web-game",
  storageBucket: "freddy-online-web-game.appspot.com",
  messagingSenderId: "225558315013",
  appId: "1:225558315013:web:44646c5daaff8da2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()

 let scoreboard = {  }
 let fire= document.getElementById("fire")
 let level=1
 let Time=20
 let z=2
 let x=350
 let y=500
 let a=[100,650,200,220,100,350,550,300,850,680,400,250,370,58,500,870,850,870]
 let b=[100,200,300,400,650,250,600,500,300,350,150,0,720,300,500,350,500,100]
 let c=350
 let d=500
 let direction = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
 let direction2 = 1
 let direction2v = 1
 let fails = 0
 
function setup() {
  createCanvas(windowWidth, windowHeight)
  s = width/958 
}

function draw() {
  if (Time > 0) {
  background(153, 204, 255);
  fill(218, 123, 247)
   circle(x*s, y, 30*s)
  
  if (touches.length == 0)   {
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 10
    }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 10
    }
  if (keyIsDown(UP_ARROW)) {
    y = y - 10
    }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 10
    }
  }
  else { 
  x = touches[0].x
  y = touches[0].y
}

  
  
for (i=0; i<z; i=i+1) { 
     fill(237, 26, 26)
     circle(a[i]*s, b[i], 20*s) 
     a[i] = a[i] + 4 * direction[i]
     b[i] = b[i] + 0 

    if ( a[i]*s > width - 50*s || a[i]*s < 0 + 60*s ) {
      direction[i] = direction[i] * -1
    }
  
  textSize(30)
  text("Score: " + fails, 750*s, 50)
  text("Time: " + Time.toFixed(0) 
, 755*s, 80)
  Time = Time - .005


  if (dist( x*s, y, a[i]*s, b[i]) < 20*s + 40*s) {
      fails = fails - 1.5
  }
}
  
  
 fill(128, 255, 128)
   circle(c*s, d, 30*s) 
   c = c + 5 * direction2
   d = d - 1 * direction2v
  
  if ( c*s > width - 60*s || c*s < 0 + 60*s ) {
    direction2 = direction2 * -1
  }
  if ( d > height - 60 || d < 0 ) {
    direction2v = direction2v * -1
  }


if (dist( x*s, y, c*s, d) < 20*s + 30*s) {
	fails = fails + 1
  }
  
  if (fails > 100 && level == 1) {
 z = z + 2
level = 2
}

 if (fails > 150 && level == 2) {
 z = z + 2
level = 3
}  
if (fails > 200 && level == 3) {
 z = z + 2
level = 4  
  }
  if (fails > 250 && level == 4) {
 z = z + 2
level = 5  
  }
  if (fails > 300 && level == 5) {
 z = z + 2
level = 6 
  }
  if (fails > 350 && level == 6) {
 z = z + 2
level = 7  
  }
    if (fails > 400 && level == 7) {
 z = z + 2
level = 8  
  }
   if (fails > 450 && level == 8) {
 z = z + 2
level = 9  
    }
  }
  else {
    
    fire.innerHTML = "Name? <input id='snow'><button onclick='restart()'>Restart</button><button onclick=generate_alltime_leaderboard()>All-time leaderboard</button>"
noLoop()


}

}


function restart() { 
        let snow = document.getElementById("snow")
		name = snow.value 
		database.ref(name).set(fails)
		if (name != "") { 
			scoreboard[name] = fails
		}
        alert("Scoreboard: " +
JSON.stringify(scoreboard,null,1)) 
		Time = 20
		fails = 0
        z = 2
        level = 1
		loop()
		fire.innerHTML = ""
        generate_leaderboard()
  }

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(5).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
