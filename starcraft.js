
// tohle je pokus

//class structure
//{{{
class Structure
{
  constructor(x,y)
  {//{{{
    this.progress_2 = 0;
    this.progress = 0;
    this.queue_2 = [];
    this.queue = [];
    this.building = "none";
    this.id = g_id++;
    structures[this.id] = this;
    this.x = x;
    this.y = y;
    this.type = 0;
    this.life = 1000;
    this.rotate = Math.floor(Math.random()*360);
  }//}}}

  draw()
  {//{{{
    if (this.type == "main_house")
    {
      ctx.save();
      ctx.translate(this.x,this.y);

//square(body of house)
      ctx.beginPath();
      ctx.moveTo(-50, -50);
      ctx.lineTo(50, -50);
      ctx.lineTo(50, 50);
      ctx.lineTo(-50, 50);
      ctx.lineTo(-50, -50);
      ctx.closePath();

      ctx.fillStyle = "purple";
      ctx.fill();
      ctx.stroke();

      //spikes
      ctx.beginPath();
      ctx.moveTo(-50, -25);
      ctx.lineTo(-100,0);
      ctx.lineTo(-50, 25);
      ctx.moveTo(-25, 50);
      ctx.lineTo(0,100);
      ctx.lineTo(25, 50);
      ctx.moveTo(50, 25);
      ctx.lineTo(100,0);
      ctx.lineTo(50, -25);
      ctx.moveTo(-25, -50);
      ctx.lineTo(0,-100);
      ctx.lineTo(25, -50);
      ctx.closePath();

      ctx.fillStyle = "grey";
      ctx.fill();
      ctx.stroke();

      //stripes
      ctx.beginPath();
      ctx.moveTo(-10,-10);
      ctx.lineTo(-50,-50);
      ctx.moveTo(10,-10);
      ctx.lineTo(50,-50);
      ctx.moveTo(-10,10)
      ctx.lineTo(-50,50); 
      ctx.moveTo(10,10)                  
      ctx.lineTo(50,50)               
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.fill();
      ctx.stroke();

      //second square
      ctx.beginPath();
      ctx.moveTo(-10,-10);
      ctx.lineTo(10,-10)
      ctx.lineTo(10,10); 
      ctx.lineTo(-10,10)                  
      ctx.lineTo(-10,-10)               
      ctx.closePath();

      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();

      //teeths
      ctx.beginPath();
      ctx.moveTo(-10,0);
      ctx.lineTo(-5,0);
      ctx.moveTo(0,-10);
      ctx.lineTo(0,-5);
      ctx.moveTo(0,10);
      ctx.lineTo(0,5);
      ctx.moveTo(10,0);
      ctx.lineTo(5,0);
      ctx.closePath();

      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
      
      ctx.restore();
    }
    if (this.type == "spawn_pool")
    {
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.moveTo(0,0);
      
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.moveTo(-75,0);
      ctx.lineTo(-45,-50);
      ctx.lineTo(-17,-35);
      ctx.lineTo(18,-48);
      ctx.lineTo(67,2);
      ctx.lineTo(12,35);
      ctx.lineTo(-20,28);
      ctx.closePath();
      ctx.fillStyle = "purple";
      ctx.fill();
      ctx.stroke();
      ctx.scale(0.8,0.8);

      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.moveTo(-75,0);
      ctx.lineTo(-45,-50);
      ctx.lineTo(-17,-35);
      ctx.lineTo(18,-48);
      ctx.lineTo(67,2);
      ctx.lineTo(12,35);
      ctx.lineTo(-20,28);
      ctx.closePath();
      ctx.fillStyle = "green";
      ctx.fill();

      ctx.stroke();

      ctx.restore();
    }
  }//}}}

  build_units()
  {//{{{
    if (this.queue.length)
    {
      document.getElementById("ukazatel_casu").textContent = `Building: ${this.queue[0]}`;

      document.getElementById("ukazatel_velikosti_units").style.display = "block";
      ++this.progress;
      if (build_length[this.queue[0]] <= this.progress)
      {
        if (supply > supplied) 
        {
          switch (this.queue[0])
          {
          case "dron":
            supplied += 1; 
            sounds.dron_wake_up.play();
            let dron = new Dron();
            dron.x = this.x;
            dron.y = this.y;
            dron.move
            let number = Math.floor(Math.random()*mineral_list.length); 
            let trg_mineral = mineral_list[number];
            dron.my_mineral= trg_mineral;  
            dron.work = "mine";
            dron.move(trg_mineral.x,90);
            main_house.building = "none";      
            break;
          default:
            alert("undefined build/unit")
          }

          this.progress = 0;
          this.queue.shift();
          if (this.queue.length < 1)
          {
            document.getElementById("ukazatel_casu").style.display = "none";
            document.getElementById("ukazatel_velikosti_units").style.display = "none";
          }
        }
        else
        {
          this.progress--;
          document.getElementById("no_supply").style.display = "block";
          setTimeout(() => {
          document.getElementById("no_supply").style.display = "none";
          },3500);      
        }
      }
      else
      {
        let cislo = this.progress / build_length[this.queue[0]] * 100;
        let div = document.getElementById("ukazatel_casu");
        div.style.display = "block";
        div.style.width = cislo + "%";
      }
    }
  }//}}}

  upradge_code()
  {
    if (this.queue_2.length)
    {
      document.getElementById("ukazatel_upradgu").textContent = `Building: ${this.queue_2[0]}`;

      document.getElementById("ukazatel_velikosti_upradges").style.display = "block";
      ++this.progress_2;
      if (build_length[this.queue_2[0]] <= this.progress_2)
      {
          switch (this.queue_2[0])
          {
          case "supply_chamber":
            supply += 8; 
            document.getElementById("upradge_complete").style.display = "block";
            sounds.upradge_complete.play();
            setTimeout(() => {
            document.getElementById("upradge_complete").style.display = "none";
            },3500);
            break;
          default:
            alert("undefined build/unit")
          }

          this.progress_2 = 0;
          this.queue_2.shift();
          if (this.queue_2 < 1)
          {
            document.getElementById("ukazatel_upradgu").style.display = "";
            document.getElementById("ukazatel_velikosti_upradges").style.display = "none";
          }
      }
      else
      {
        let cislo = this.progress_2 / build_length[this.queue_2[0]] * 100;
        let div = document.getElementById("ukazatel_upradgu");
        div.style.display = "block";
        div.style.width = cislo + "%";
      }
    }
    
  }
}
//}}}

//class dron
/*{{{*/
class Dron
{
  constructor()
  {//{{{
    this.id = g_id++;
    drones[this.id] = this;
    this.am_I_selected = 0;
    this.my_mineral = 0;
    this.life = 45;
    this.x = 100;
    this.y = 175;
    this.speed = 5;
    this.angle = 0;
    this.work = "none";
    this.action = "none";
    this.mineral = 0;
    this.x_cil = this.x;
    this.y_cil = this.y;
 }//}}}

  draw()
  {//{{{
    var canvas = document.getElementById("plocha");
    var ctx = canvas.getContext("2d");
    
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle/180*Math.PI);

    //console.log(`x: ${x},y: ${y}`)

    if (this.am_I_selected == 1) 
    {
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0,2 * Math.PI);
      ctx.strokeStyle = "green";
      ctx.stroke();
      ctx.strokeStyle = "black";
    }

    //body
    ctx.beginPath();
    ctx.moveTo(0,36);
    ctx.lineTo(4,-9);
    ctx.lineTo(1,-14);
    ctx.lineTo(-2,-14);
    ctx.lineTo(-4,-9);
    ctx.lineTo(0,36);
    ctx.closePath();

    ctx.fillStyle = "brown"
    ctx.fill();
    ctx.stroke();

    //first wing
    ctx.beginPath();
    ctx.moveTo(0,26);
    ctx.lineTo(17,-9);
    ctx.lineTo(4,-9);
    ctx.closePath();

    ctx.fillStyle = "purple"
    ctx.fill();
    ctx.stroke();

    //second wing
    ctx.beginPath();
    ctx.moveTo(0,26);
    ctx.lineTo(-17,-9);
    ctx.lineTo(-4,-9);
    ctx.closePath();

    ctx.fillStyle = "purple"
    ctx.fill();
    ctx.stroke();

    //right arm
    ctx.beginPath();
    ctx.lineTo(4,-9);
    ctx.lineTo(6,-14);
    ctx.lineTo(6,-19);
    ctx.lineTo(4,-21);
    ctx.moveTo(6,-19);
    ctx.lineTo(8,-21);
    ctx.closePath();
    ctx.stroke();

    //left arm
    ctx.beginPath();
    ctx.lineTo(-4,-9);
    ctx.lineTo(-6,-14);
    ctx.lineTo(-6,-19);
    ctx.lineTo(-4,-21);
    ctx.moveTo(-6,-19);
    ctx.lineTo(-8,-21);
    ctx.closePath();
    ctx.stroke();
   
    if (this.mineral == 1)
    {
    //mineral
    ctx.beginPath();
    ctx.lineTo(-4,-9);
    ctx.lineTo(-8,-20);
    ctx.lineTo(10,-30);
    ctx.lineTo(0,0);
    ctx.moveTo(6,-14);
    ctx.lineTo(4,-9);
    ctx.closePath();
    ctx.fillStyle = "teal";
    ctx.fill();
    ctx.stroke();
    }
    
    // center cross
    //ctx.moveTo(-10,-10);
    //ctx.lineTo(10,10);
    //ctx.moveTo(10,-10);
    //ctx.lineTo(-10,10);
    //ctx.stroke();

    ctx.restore();
  }//}}}

  akce()
  {//{{{
    switch (this.action)
    {
    case "none":
      break;
    case "move":     
        if (this.work == "go_home")
        {
          this.x_cil = 655;
          this.y_cil = 180;
        }
        const xd = this.x_cil - this.x;
        const yd = this.y_cil - this.y;
        const d = Math.sqrt(xd*xd + yd*yd);
        if (d <= this.speed)
        {
          this.x = this.x_cil;
          this.y = this.y_cil;

          switch (this.work)
          {
          case "mine":
            this.action = "mine";
            sounds.dron_mining.play();
            break;
          case "go_home":
            mineralky += 5;
            this.my_mineral.kapacita -= 5;
            this.mineral = 0;
            this.work = "mine";
            this.move(this.my_mineral.x,90);
            break;
          case "building":    
            build(this.x,this.y);
            delete drones[this.id]
            break;
          default:
            this.action = "none";
            break;
          }
        }
        else
        {  
          this.x += xd/d * this.speed;
          this.y += yd/d * this.speed;

          let rad_angle = Math.atan2(yd,xd);
          let deg_angle = rad_angle * 180 / Math.PI;
          this.angle = 90 + deg_angle;
        }
      break;
    case "mine":
      if (!this.end_time)
      {
        this.end_time = performance.now() + 3500; 
      }
      if (performance.now() >= this.end_time)
      {
        if (this.work == "mine") {
          this.end_time = null;
          this.mineral = 1;
          this.work = "go_home";
          this.action = "move";
        }
      }
      break;
    }
  }//}}}

  move(x,y)
  {//{{{
    this.x_cil = x;
    this.y_cil = y;
    this.action = "move";
  }//}}}

  click_drone(x,y)
//{{{
  { 
    const xd = x - this.x;
    const yd = y - this.y;
    const d = Math.sqrt(xd*xd + yd*yd);
    if (d >= 20) 
    {
      return false;
    }
    else 
    {
      return true;
    }
  }
//}}}
}
/*}}}*/

//class mineral
/*{{{*/
class Mineral
{
  constructor(x,y)
  {//{{{
    this.id = g_id++;
    minerals[this.id] = this;

    this.x = x;
    this.y = y;
    this.typ = Math.floor(Math.random()*2);
    this.kapacita = 5000;
  }//}}}

  draw()
  {//{{{
    ctx.save();
    ctx.translate(this.x,this.y);  
    ctx.beginPath();

    if (this.typ == 1)
    {
      ctx.moveTo(-21,65);
      ctx.lineTo(1,35);
      ctx.lineTo(25,48);
      ctx.lineTo(39,38);
      ctx.lineTo(48,45);
      ctx.lineTo(62,58);
    }
    else
    {
      ctx.moveTo(-5,65);
      ctx.lineTo(3,10);
      ctx.lineTo(20,49);
      ctx.lineTo(55,22);
      ctx.lineTo(70,46);
      ctx.lineTo(73,12);
      ctx.lineTo(80,67);
    }
    
    ctx.fillStyle = "teal";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }//}}}

  touch(x,y)
//{{{
  { 
    const xd = x - this.x;
    const yd = y - this.y;
    const d = Math.sqrt(xd*xd + yd*yd);
    if (d >= 100) 
    {
      return false;
    }
    else 
    {
      return true;
    }
  }
//}}}
}/*}}}*/

function distance(x,y,x1,y1,v)
//{{{
  { 
    const xd = x - x1;
    const yd = y - y1;
    const d = Math.sqrt(xd*xd + yd*yd);
    if (d >= v) 
    {
      return false;
    }
    else 
    {
      return true;
    }
  }
//}}}

build_length = {
  "dron": 120,
  "supply_chamber": 200,
}

function load_sounds()
{
  sounds = {
    "dron_select" : new Audio("res/dron_chrchlon.wav"),
    "dron_command1" : new Audio("res/dron_sound1.wav"),
    "dron_command2" : new Audio("res/dron_sound2.wav"),
    "dron_mining" : new Audio("res/mine.wav"),
    "dron_wake_up" : new Audio("res/dron_wakeup.wav"), 
    "upradge_complete" : new Audio("res/upradge_complete.wav"),
  }
}

///variables,data and constants
const canvas = document.getElementById("plocha");
const ctx = canvas.getContext("2d");

const new_drone_button = document.getElementById("new_drone_button");

const sirka = screen.availWidth*3/4+55;
const vyska = screen.availHeight;
canvas.setAttribute("width", sirka);
canvas.setAttribute("height",vyska);
let sounds = {};
load_sounds();
let supplied = 12;
let supply = 15;
let g_id = 0;
let structures = {};
let main_house = new Structure();
main_house.type = "main_house";
main_house.x = 655;
main_house.y = 300;
let mineralky = 50; 
let num_of_drones = 0;
let x_drone = 450;
let main_house_lifes = 1250;
let ukol = "none";
let building = "none";

// INIT

drones = {};
for (let i = 0;i < 12;i++)
{
  let dron = new Dron();
  dron.x = 50*i;
}

for (let dron of Object.values(drones))
{
  dron.x += 350;
}

minerals = {};

for (let i = 0;i < 4;i++)
{
  let position_x;
  let ok;

  do
  {
    position_x = Math.floor(Math.random()*525)+400;
    ok = true;

    for (mineral of Object.values(minerals))
    {
      if (mineral.touch(position_x,0))
      {
        ok = false;
      }
    }
  } while(!ok);

  new Mineral(position_x,0);
}

const mineral_list = Object.values(minerals);

//go to work at start
//{{{
for (let dron of Object.values(drones)) 
{
  let number = Math.floor(Math.random()*mineral_list.length); 
  let trg_mineral = mineral_list[number];
  dron.my_mineral= trg_mineral;  
  dron.work = "mine";
  dron.move(trg_mineral.x,90);
}
//}}}

function akce()
{
  for (let structure of Object.values(structures))
  {
    structure.build_units();
    structure.upradge_code();
  }

  for (let dron of Object.values(drones))
  {
    dron.akce();
  }
  draw();
}

// draw all 
function draw()
//{{{
{
  ctx.clearRect(0,0,1823,1004);
  document.getElementById("miner.").textContent = "Minerals:" + mineralky;
  document.getElementById("minerals_kapacita").textContent = "Capacity:" + mineral.kapacita;
  document.getElementById("supply").textContent = "Supply:" + supplied + "/" + supply;
  for (let dron of Object.values(drones))
  {
    dron.draw();
  }   
  for (let mineral of Object.values(minerals))
  {
    mineral.draw();
  }    
  main_house.draw();
  for (let structure of Object.values(structures))
  {
    structure.draw();
  }
}
//}}}

//action call
setInterval(akce,50);

function mousebutton(event)
{
  return(event.button)
}

//selecting
//{{{
  canvas.addEventListener("click", function(event)
  {
   const rect = canvas.getBoundingClientRect();
   const x_click = event.clientX - rect.left;
   const y_click = event.clientY - rect.top;
 
   if (ukol == "none")
   {//{{{
     if (mousebutton(event) == 0) {
       for (let dron of Object.values(drones)) {
         dron.am_I_selected = 0;
       }
       document.getElementById("main_house_name").style.display = "none";
       document.getElementById("Hatchery_lifes").style.display = "none";
       document.getElementById("minerals_name").style.display = "none" 
       document.getElementById("minerals_kapacita").style.display = "none";
       document.getElementById("new_drone_button").style.display = "none";           
       document.getElementById("build_spool").style.display = "none";
       document.getElementById("drone_name").style.display = "none"
       document.getElementById("drone_lifes").style.display = "none";
       document.getElementById("more_supply_button").style.display = "none";
       document.getElementById("spool_name").style.display = "none";
       document.getElementById("spool_life").style.display = "none";
       
       for (let dron of Object.values(drones)) {
         if (dron.click_drone(x_click,y_click)) {
           dron.am_I_selected = 1;
           document.getElementById("drone_name").style.display = "block";
           document.getElementById("drone_lifes").textContent = "Lifes:" + dron.life;
           document.getElementById("drone_lifes").style.display = "block";
           document.getElementById("build_spool").style.display = "block";
           document.getElementById("minerals_name").style.display = "none" 
           document.getElementById("minerals_kapacita").style.display = "none";
           sounds.dron_select.play();
           break;
         }
       for (let mineral of Object.values(minerals)) {
         if (mineral.touch(x_click,y_click)) { 
           document.getElementById("minerals_name").style.display = "block";
           document.getElementById("minerals_kapacita").textContent = "Capacity:" + mineral.kapacita;
           document.getElementById("minerals_kapacita").style.display = "block";
           break;
         }
       }
       for (let structure of Object.values(structures))
       {
         if (distance(structure.x,structure.y,x_click,y_click,100))
         {
           if (structure.type == "main_house")
           {
             document.getElementById("Hatchery_lifes").textContent = "Lifes:" + main_house_lifes;
             document.getElementById("main_house_name").style.display = "block"
             document.getElementById("Hatchery_lifes").style.display = "block";
             document.getElementById("new_drone_button").style.display = "block"; 
             document.getElementById("more_supply_button").style.display = "block";
             break;
           }
           else if (structure.type == "spawn_pool")
           {
             document.getElementById("spool_name").style.display = "block";
             document.getElementById("spool_life").style.display = "block";
             document.getElementById("spool_life").textContent = "Lifes:" + structure.life;
             break;
           }
         }
       }
       }
     }
   }//}}}
   else if (ukol == "building")
   {
     let mozno = true;
     for (let dron of Object.values(drones))
     {
       if (dron.am_I_selected == 1) 
       {
         for (let structure of Object.values(structures))
         {
           if (distance(structure.x,structure.y,x_click,y_click,150))
           {
             mozno = false;
             break;
           }
         }
         if (mozno)
         {
           for (let dron of Object.values(drones))
           {
             if (distance(dron.x,dron.y,x_click,y_click,100))
             {
               if (dron.am_I_selected == 0)
               {
                 mozno = false;
                 break;
               }
             }
           }
         }
         if (mozno)
         {
           for (let mineral of Object.values(minerals))
           {
             if (distance(mineral.x,mineral.y,x_click,y_click,120))
             {
               mozno = false;
               break;
             }
           }
         }
         if (mozno)
         {
           dron.work = "building";
           dron.move(x_click,y_click);

          let sound = Math.floor(Math.random()*2);
          if (sound == 1)
          {
            sounds.dron_command1.play();
          }
          else
          {
            sounds.dron_command2.play();
           }
         }
         else 
         {
           document.getElementById("no_space").style.display = "block";
           setTimeout(() => {
           document.getElementById("no_space").style.display = "none";
           },3500);      
         }
       }
     }

    ukol = "none";
   }
  });
//}}}
  
//move after click to right button of mouse
//{{{
canvas.addEventListener("mousedown", function(event)
{
    if (mousebutton(event) == 2) 
  {
    for (let dron of Object.values(drones))
    {
      if (dron.am_I_selected == 1)
      {
        //set values
        const rect2 = canvas.getBoundingClientRect();
        const x = event.clientX - rect2.left;
        const y = event.clientY - rect2.top;
        let kliknuto = 0;
        
        //am I go to the minerals?
        for (let mineral of Object.values(minerals)) {
          if (distance(mineral.x,mineral.y,x,y,100)) {
            kliknuto = 1;
            trg_mineral = mineral;
            break;
          }
        }
        if (distance(655,300,x,y,100)) {
          kliknuto = 1;
          break;
        }
        //moving to the position of mouse  
        let sound = Math.floor(Math.random()*2);
        if (sound == 1)
        {
          sounds.dron_command1.play();
        }
        else
        {
          sounds.dron_command2.play();
        }
        if (kliknuto == 1) {
          dron.my_mineral = trg_mineral;
          if (dron.mineral == 0)
          {
            dron.work = "mine";
            dron.move(dron.my_mineral.x,90);  
          }
          else 
          {
            dron.work = "go_home";
            dron.move(655,180);  
          }
        }
        else
        {
          dron.work = "move";
          dron.move(x,y)
        }
      }
    }
  }
});

canvas.addEventListener("contextmenu", function(event)
{  
  event.preventDefault();
});
//}}}

new_drone_button.addEventListener("click", function() {
  if (main_house.queue.length < 5 && supply > supplied && mineralky >= 50)
  {
    mineralky -= 50;
    main_house.queue.push("dron");
  }
  else
  {
    if (supply <= supplied)
    {
    document.getElementById("no_supply").style.display = "block";
    setTimeout(() => {
    document.getElementById("no_supply").style.display = "none";
    },3500);      
    }
    else if (mineralky < 50)
    {
    document.getElementById("no_minerals").style.display = "block";
    setTimeout(() => {
    document.getElementById("no_minerals").style.display = "none";
    },3500);      
    }
    else
    {
      document.getElementById("full_queue").style.display = "block";
      setTimeout(() => {
      document.getElementById("full_queue").style.display = "none";
      },3500);      
    }
  }
});

document.getElementById("build_spool").addEventListener("click", function() {
  if (mineralky >= 150)
  {  
    building = "spawn_pool";
    ukol = "building";
  }
  else
  {
    document.getElementById("no_minerals").style.display = "block";
    setTimeout(() => {
    document.getElementById("no_minerals").style.display = "none";
    },3500);
  }
});

function build(x,y)
{
  if (building == "spawn_pool")
  {
    mineralky -= 150;
    structure = new Structure();
    structure.type = building;
    structure.life = 850;
    structure.x = x;
    structure.y = y;
  }
}

document.getElementById("more_supply_button").addEventListener("click", function() {
  if (mineralky >= 100 && main_house.queue_2.length < 5)
  {
    mineralky -= 100;
    main_house.queue_2.push("supply_chamber");
  }
  else
  {
    if (mineralky >= 50)
    {
      document.getElementById("full_queue").style.display = "block";
      setTimeout(() => {
      document.getElementById("full_queue").style.display = "none";
      },3500);  
    }
    else
    {
      document.getElementById("no_minerals").style.display = "block";
      setTimeout(() => {
      document.getElementById("no_minerals").style.display = "none";
      },3500);  
    }
  }
});

