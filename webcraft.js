//class enemy_unit
/*{{{*/
class Enemy_unit
{
  constructor()
  /*{{{*/
  {
    this.target_id = 0;
    this.type = "none";
    this.select_drone = 0;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.velikost = 0;
    this.id = g_id++;
    this.life = 40;
    this.x_cil = this.x;
    this.y_cil = this.y;
    this.speed = 7;
    this.hit_damage = 5;
    enemy_units[this.id] = this;
    this.hit_speed = 0;
  }
/*}}}*/

  draw()
  {/*{{{*/
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle/180*Math.PI);
    
    if (this.type == "zergling")
    {
      
      //body
      ctx.beginPath();
      ctx.moveTo(-7,0);
      ctx.lineTo(-6, -4);
      ctx.lineTo(-5, -5);
      ctx.lineTo(-2, -7);
      ctx.lineTo(2, -7);
      ctx.lineTo(5, -5);
      ctx.lineTo(6, -4);
      ctx.lineTo(7, 0);
      ctx.moveTo(-7, 0);
      ctx.lineTo(-5, 25);
      ctx.lineTo(-3, 26);
      ctx.lineTo(-2, 28);
      ctx.lineTo(2, 28);
      ctx.lineTo(3, 27);
      ctx.lineTo(5, 25);
      ctx.lineTo(7, 0);
      ctx.moveTo(4, 26);
      ctx.lineTo(3, 32);
      ctx.lineTo(0, 38);
      ctx.lineTo(-3, 32);
      ctx.lineTo(-4, 26);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "red";
      ctx.fill();

      //arms
      ctx.beginPath();
      ctx.moveTo(-5, -5);
      ctx.lineTo(-5, -11);
      ctx.lineTo(-6, -13);
      ctx.lineTo(-7, -11);
      ctx.lineTo(-7, -6);
      ctx.moveTo(5, -5);
      ctx.lineTo(5, -11);
      ctx.lineTo(6, -13);
      ctx.lineTo(7, -11);
      ctx.lineTo(7, -6);
      ctx.closePath();
      ctx.fillStyle = "red"
      ctx.fill();
      ctx.stroke();
     
      //left wing
      ctx.beginPath();
      ctx.moveTo(-4, -2);
      ctx.lineTo(-11, 10);
      ctx.lineTo(-12, 15);
      ctx.lineTo(-11, 23);
      ctx.lineTo(-5, 17);
      ctx.closePath();
      ctx.fillStyle = "teal"
      ctx.fill();
      ctx.stroke();
      
      //rigth wing
      ctx.beginPath();
      ctx.moveTo(4, -2);
      ctx.lineTo(11, 10);
      ctx.lineTo(12, 15);
      ctx.lineTo(11, 23);
      ctx.lineTo(5, 17);
      ctx.closePath();
      ctx.fillStyle = "teal"
      ctx.fill();
      ctx.stroke();
    }
    
    ctx.restore();
  }/*}}}*/

  akce()
  {//{{{
    switch (this.action)
    {
    case "none":
      if (this.life <= 0)
      {
        delete enemy_units[this.id]
        console.log("smrt");
      }
      break;
    case "move":     
        if (!drones.hasOwnProperty(this.target_id) && Object.keys(drones).length > 0)
        {
          this.target_id = 0;
          this.target = 0;
          let drone_ids = Object.keys(drones);
          let id_idx = Math.floor(Math.random() * drone_ids.length);
          let target = drone_ids[id_idx];
          this.target_id = drones[target].id;
          this.target = drones[target];
          this.action = "move";
        }
        if (this.life <= 0)
        {
          delete enemy_units[this.id]
          console.log("smrt");
          break;
        }
        const xd = this.x_cil - this.x;
        const yd = this.y_cil - this.y;
        const d = Math.sqrt(xd*xd + yd*yd);
        if (d <= this.speed)
        {
          if (this.hit_speed == 0)
          {
            for (let dron of Object.values(drones))
            {
              if (dron.id == this.target_id)
              {
                dron.life -= this.hit_damage;
                this.hit_speed = 1;
              }
            }
          }
          else
          { 
            this.hit_speed += 1;
            if (this.hit_speed == 15)
            {
              this.hit_speed = 0;
            }
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
    }
  }//}}}

  move(x,y)
  {//{{{
    this.x_cil = x;
    this.y_cil = y;
    this.action = "move";
  }//}}}
}
/*}}}*/

//class units
/*{{{*/
class Unit
{
  constructor()
  {/*zc{{{*/
    this.figth = 0;
    this.hit_speed = 0;
    this.target_id = 0;
    this.target = 0;
    this.nhit_damage = 5;
    this.velikost = 0;
    this.x = 0;
    this.y = 0;
    this.life = 0;
    this.id = g_id++;
    this.am_I_selected = 0;
    this.speed = 5;
    this.angle = 0;
    this.work = "none";
    this.action = "none";
    this.x_cil = this.x;
    this.y_cil = this.y;
    this.type = "none";
    units[this.id] = this;
    all_your_units[this.id] = this;
  }/*}}}*/

  draw()
  {/*{{{*/
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle/180*Math.PI);
    
    if (this.type == "zergling")
    {
      if (this.am_I_selected == 1) 
      {
        ctx.beginPath();
        ctx.arc(0, 12, 20, 0,2 * Math.PI);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.strokeStyle = "black";
      }
      
      //body
      ctx.beginPath();
      ctx.moveTo(-7,0);
      ctx.lineTo(-6, -4);
      ctx.lineTo(-5, -5);
      ctx.lineTo(-2, -7);
      ctx.lineTo(2, -7);
      ctx.lineTo(5, -5);
      ctx.lineTo(6, -4);
      ctx.lineTo(7, 0);
      ctx.moveTo(-7, 0);
      ctx.lineTo(-5, 25);
      ctx.lineTo(-3, 26);
      ctx.lineTo(-2, 28);
      ctx.lineTo(2, 28);
      ctx.lineTo(3, 27);
      ctx.lineTo(5, 25);
      ctx.lineTo(7, 0);
      ctx.moveTo(4, 26);
      ctx.lineTo(3, 32);
      ctx.lineTo(0, 38);
      ctx.lineTo(-3, 32);
      ctx.lineTo(-4, 26);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "purple";
      ctx.fill();

      //arms
      ctx.beginPath();
      ctx.moveTo(-5, -5);
      ctx.lineTo(-5, -11);
      ctx.lineTo(-6, -13);
      ctx.lineTo(-7, -11);
      ctx.lineTo(-7, -6);
      ctx.moveTo(5, -5);
      ctx.lineTo(5, -11);
      ctx.lineTo(6, -13);
      ctx.lineTo(7, -11);
      ctx.lineTo(7, -6);
      ctx.closePath();
      ctx.fillStyle = "purple"
      ctx.fill();
      ctx.stroke();
     
      //left wing
      ctx.beginPath();
      ctx.moveTo(-4, -2);
      ctx.lineTo(-11, 10);
      ctx.lineTo(-12, 15);
      ctx.lineTo(-11, 23);
      ctx.lineTo(-5, 17);
      ctx.closePath();
      ctx.fillStyle = "teal"
      ctx.fill();
      ctx.stroke();
      
      //rigth wing
      ctx.beginPath();
      ctx.moveTo(4, -2);
      ctx.lineTo(11, 10);
      ctx.lineTo(12, 15);
      ctx.lineTo(11, 23);
      ctx.lineTo(5, 17);
      ctx.closePath();
      ctx.fillStyle = "teal"
      ctx.fill();
      ctx.stroke();
    }
    
    ctx.restore();
  }/*}}}*/

  akce()
  {//{{{
    switch (this.action)
    {
    case "none":
      if (this.life <= 0)
      {
        supplied -= 1;
        delete units[this.id]
        delete all_your_units[this.id]
      }
      break;
    case "move":     
        const xd = this.x_cil - this.x;
        const yd = this.y_cil - this.y;
        const d = Math.sqrt(xd*xd + yd*yd);
        if (d <= this.speed)
        {
          if (this.figth == 0)
          {
            this.x = this.x_cil;
            this.y = this.y_cil;
          }
          else
          {
          if (this.hit_speed == 0)
          {
            for (let enemy of Object.values(enemy_units))
            {
              if (enemy.id == this.target_id)
              {
                enemy.life -= this.hit_damage;
                if (enemy.life <= 0)
                {
                  this.figth = 0;
                }
                console.log(enemy.life);
                this.hit_speed = 1;
              }
            }
          }
          else
          { 
            this.hit_speed += 1;
            if (this.hit_speed == 13)
            {
              this.hit_speed = 0;
            }
          }
            
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
    }
  }//}}}

  move(x,y)
  {//{{{
    this.x_cil = x;
    this.y_cil = y;
    this.action = "move";
  }//}}}

  click_zergling(x,y)
//{{{
  { 
    const xd = x - this.x;
    const yd = y - this.y;
    const d = Math.sqrt(xd*xd + yd*yd);
    if (d >= this.velikost) 
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

//class structure
//{{{
class Structure
{
  constructor(x,y)
  {//{{{
    this.am_i_selected = 0;
    this.rally_point_x = 655;
    this.rally_point_y = 500;
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
    this.stadium = 5;
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
      if (this.stadium == 100)
      {
        spawn_pool_exist = 1;

        ctx.save();
        ctx.translate(this.x,this.y);
        
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

        const scale = this.stadium / 100 * 0.8;
        ctx.scale(scale,scale);

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
      if (this.stadium != 100)
      {
        ctx.save();
        ctx.translate(this.x,this.y);
        if (this.stadium <= 50)
        {
          if (this.stadium == 5 || this.stadium == 15 || this.stadium == 25 || this.stadium == 35 || this.stadium == 45)
          {
            ctx.scale(1,1);
          }
          else if  (this.stadium == 0 || this.stadium == 10 || this.stadium == 20 || this.stadium == 30 || this.stadium == 40 || this.stadium == 50)
          {
            ctx.scale(0.8,0.8);
          }
        }
        if (this.stadium <= 50)
        {
          ctx.beginPath();
          ctx.moveTo(0,0);
          ctx.moveTo(-70,0);
          ctx.lineTo(-50,-45);
          ctx.lineTo(-21,-60);
          ctx.lineTo(-10,-55);
          ctx.lineTo(20,-47);
          ctx.lineTo(40,-30);
          ctx.lineTo(72,3);
          ctx.lineTo(55,20);
          ctx.lineTo(30,30);
          ctx.lineTo(-2,33);
          ctx.lineTo(-35,36);
          ctx.lineTo(-70,0);
          ctx.closePath();
          ctx.fillStyle = "#741B47";
          ctx.fill();
          ctx.stroke();
        }
        else if (this.stadium > 50 && this.stadium < 100)
        {
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

          let velikost = ((this.stadium - 50) / 50) * 0.8;
          ctx.scale(velikost,velikost);

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
        }
        ctx.restore();
      
    }
    }
    if (this.type == "evo_cham")
    {
      if (this.stadium == 100)
      {
        ctx.save();
        ctx.translate(this.x,this.y);
        
        //body of house
        ctx.beginPath();
        ctx.moveTo(-70,0);
        ctx.lineTo(-60,-25);
        ctx.lineTo(-30,-35);
        ctx.lineTo(30,-35);
        ctx.lineTo(60,-25);
        ctx.lineTo(70,0);
        ctx.lineTo(60,25);
        ctx.lineTo(30,35);
        ctx.lineTo(-30,35);
        ctx.lineTo(-60,25);
        ctx.lineTo(-70,0);
        ctx.closePath();
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(15,12, 20, 0,2 * Math.PI);
        ctx.fillStyle = "#e3b6cc";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(-45,-10, 15, 0,2 * Math.PI);
        ctx.fillStyle = "#e3b6cc";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(20,-17, 7, 0,2 * Math.PI);
        ctx.fillStyle = "#e3b6cc";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(-20,10, 7, 0,2 * Math.PI);
        ctx.fillStyle = "#e3b6cc";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(-5,-15, 7, 0,2 * Math.PI);
        ctx.fillStyle = "#e3b6cc";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        ctx.restore();
      }
      if (this.stadium != 100)
        {
          ctx.save();
          ctx.translate(this.x,this.y);
          if (this.stadium == 5 || this.stadium == 15 || this.stadium == 25 || this.stadium == 35 || this.stadium == 45 || this.stadium == 55 || this.stadium == 65 || this.stadium == 75 || this.stadium == 85 || this.stadium == 95)
          {
            ctx.scale(1,1);
          }
          else if  (this.stadium == 0 || this.stadium == 10 || this.stadium == 20 || this.stadium == 30 || this.stadium == 40 || this.stadium == 50 || this.stadium == 60 || this.stadium == 70 || this.stadium == 80 || this.stadium == 90)
          {
            ctx.scale(0.8,0.8);
          }
          if (this.stadium <= 99)
          {
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.moveTo(-70,0);
            ctx.lineTo(-50,-45);
            ctx.lineTo(-21,-60);
            ctx.lineTo(-10,-55);
            ctx.lineTo(20,-47);
            ctx.lineTo(40,-30);
            ctx.lineTo(72,3);
            ctx.lineTo(55,20);
            ctx.lineTo(30,30);
            ctx.lineTo(-2,33);
            ctx.lineTo(-35,36);
            ctx.lineTo(-70,0);
            ctx.closePath();
            ctx.fillStyle = "#741B47";
            ctx.fill();
            ctx.stroke();
          }
          ctx.restore();
        
      }
    }
  }//}}}

  build_units()
  {//{{{
    if (this.queue.length)
    {
      document.getElementById("ukazatel_casu").textContent = `Building: ${this.queue[0]}`;

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
          case "zergling":
            supplied += 1; 
            let zergling = new Unit();
            zergling.velikost = 25;
            zergling.type = "zergling";
            zergling.x = this.x;
            zergling.y = this.y;
            zergling.move(this.rally_point_x,this.rally_point_y);
            zergling.life = 40;
            main_house.building = "none";      
            sounds.zergling_morph.play();
            if (zergling_speed == 1)
            {
              zergling.speed = 9.5;
            }
            else
            {
              zergling.speed = 7;
            }
            if (damega_upgrade == 1)
            {
              zergling.hit_damage = 6;
            }
            else
            {
              zergling.hit_damage= 5;
            }
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
        if (main_house.am_i_selected == 1)
        {
        document.getElementById("ukazatel_velikosti_units").style.display = "block";
        }
        div.style.display = "block";
        div.style.width = cislo + "%";
      }
    }
  }//}}}
 
  upradge_code()
  {/*{{{*/
    if (this.queue_2.length)
    {
      document.getElementById("ukazatel_upradgu").textContent = `Building: ${this.queue_2[0]}`;

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
          case "zergling_speed":
            zergling_speed = 1;
            for (let unit of Object.values(units))
            {
              if (unit.type = "zergling")
              {
                unit.speed = 9.5;
              }
            }
            document.getElementById("upradge_complete").style.display = "block";
            sounds.upradge_complete.play();
            setTimeout(() => {
            document.getElementById("upradge_complete").style.display = "none";
            },3500);
            break;
          case "damega":
            damega_upgrade = 1;
            for (let unit of Object.values(units))
            {
              unit.hit_damage += 1;
            }
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
/*}}}*/
}
//}}}

//class dron
/*{{{*/
class Dron
{
  constructor()
  {//{{{
    this.find_number = number_of_drones++;
    this.building = 0;
    this.id = g_id++;
    drones[this.id] = this;
    all_your_units[this.id] = this;
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
    this.type = "dron";
 }//}}}

  draw()
  {//{{{
    
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle/180*Math.PI);


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
      if (this.life <= 0)
      {
        if (this.am_I_selected == 1)
        {
          document.getElementById("build_spool").style.display = "none";
          document.getElementById("drone_name").style.display = "none"
          document.getElementById("drone_lifes").style.display = "none";
        }
        supplied -= 1;
        delete drones[this.id]
        delete all_your_units[this.id]
      }
      break;
    case "move":     
        if (this.life <= 0)
        {
          if (this.am_I_selected == 1)
          {
            document.getElementById("build_spool").style.display = "none";
            document.getElementById("build_evocham").style.display = "none";
            document.getElementById("drone_name").style.display = "none"
            document.getElementById("drone_lifes").style.display = "none";
          }
          delete drones[this.id]
        }
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
            if (this.am_I_selected == 1)
            {
              document.getElementById("build_spool").style.display = "none";
              document.getElementById("drone_name").style.display = "none"
              document.getElementById("drone_lifes").style.display = "none";
            }
            supplied - 1;
            delete drones[this.id]
            delete all_your_units[this.id]
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

function rally_point_draw(x,y)
{/*{{{*/
  ctx.save();
  ctx.translate(x,y)
  
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,-15);
  ctx.lineTo(-9,-15);
  ctx.lineTo(-9,-10);
  ctx.lineTo(0,-10);
  ctx.closePath();
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}/*}}}*/

//build length of some things
build_length = {/*{{{*/
  "dron": 150,
  "supply_chamber": 200,
  "zergling": 125,
  "zergling_speed": 210,
  "damega": 225,
}/*}}}*/

function load_sounds()
{/*{{{*/
  sounds = {
    "dron_select" : new Audio("res/dron_chrchlon.wav"),
    "dron_command1" : new Audio("res/dron_sound1.wav"),
    "dron_command2" : new Audio("res/dron_sound2.wav"),
    "dron_mining" : new Audio("res/mine.wav"),
    "dron_wake_up" : new Audio("res/dron_wakeup.wav"), 
    "upradge_complete" : new Audio("res/upradge_complete.wav"),
    "zergling_command1" : new Audio("res/zergling1.wav"),
    "zergling_command2" : new Audio("res/zergling2.wav"),
    "zergling_command3" : new Audio("res/zergling3.wav"),
    "zergling_morph" : new Audio("res/zergling4.wav"),
  }
}/*}}}*/

//Initialize

//variables, values and dictionaries
///variables,data and constants{{{
const canvas = document.getElementById("plocha");
const ctx = canvas.getContext("2d");

const new_drone_button = document.getElementById("new_drone_button");
const sirka = screen.availWidth*3/4+55;
const vyska = screen.availHeight;
canvas.setAttribute("width", sirka);
canvas.setAttribute("height",vyska);

// object dictionaries
let all_your_units = {};
let units = {};
let minerals = {};
let drones = {};
let structures = {};
let select = {};

let enemy_units = {};

// sounds
let sounds = {};
load_sounds();

let g_id = 0;

let main_house = new Structure();
main_house.type = "main_house";
main_house.x = 655;
main_house.y = 300;

let number_of_drones = 0;
let zergling_rush = 0;
let x_screen = 0;
let y_screen = 0;
let mousedown = false;
let end_select_y = 0;
let end_select_x = 0;
let x_select_start = 0;
let y_select_start = 0;
let big_select = 0;
let zergling_speed = 0;
let building_mode = "none";
let spawn_pool_exist = 0;
let supplied = 12;
let supply = 15;
let mineralky = 50; 
let num_of_drones = 0;
let x_drone = 450;
let main_house_lifes = 1250;
let ukol = "none";
let building = "none";
let clicks = 0;
let damega_upgrade = 0;
let znaceni = 0;/*}}}*/

//function called in start
/*{{{*/
wait_for_more_rush();
/*}}}*/

//drones made and position 
/*{{{*/
for (let i = 0;i < 12;i++)
{
  let dron = new Dron();
  dron.x = 50*i;
}

for (let dron of Object.values(drones))
{
  dron.x += 350;
}
/*}}}*/

//minerals made and position
/*{{{*/
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
/*}}}*/

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
/*{{{*/
{
  
  for (let structure of Object.values(structures))
  {
    structure.build_units();
    structure.upradge_code();
    if (structure.stadium != 1 && structure.stadium < 100)
    {
      structure.stadium += 1
    }
  }

  for (let dron of Object.values(drones))
  {
    dron.akce();
  }
  
  for (let unit of Object.values(units))
  {
    unit.akce();
  }
  for (let enemy of Object.values(enemy_units))
  {
    let select_x = 0;
    let select_y = 0;
    for (let dron of Object.values(drones))
    {
      if (dron.id == enemy.target_id)
      {
        select_y = dron.y;
        select_x = dron.x;
      }
    } 
    enemy.move(select_x,select_y);
    enemy.akce();
  }
  for (let unit of Object.values(units))
  {
    if (unit.figth == 1)
    {
      for (let enemy of Object.values(enemy_units))
      {
        if (enemy.id == unit.target_id)
        {
          unit.move(enemy.x,enemy.y);
        }
      }
    }
  }
  draw();
}
/*}}}*/

function draw()
//{{{
{
  if (main_house.queue > 0 && main_house.am_I_selected == 1)
  {
      document.getElementById("ukazatel_velikosti_units").style.display = "block";
  }
  ctx.clearRect(0,0,1823,1004);
  document.getElementById("miner.").textContent = "Minerals:" + mineralky;
  document.getElementById("minerals_kapacita").textContent = "Capacity:" + mineral.kapacita;
  document.getElementById("supply").textContent = "Supply:" + supplied + "/" + supply;
  for (let unit of Object.values(units))
  {
    unit.draw();
  }   
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
  for (let structure of Object.values(structures))
  {
    if (structure.type == "main_house" && structure.am_I_selected == 1)
    {
      rally_point_draw(structure.rally_point_x,structure.rally_point_y);
    }
  }
  if (big_select == 1)
  {
    draw_select_square(x_select_start,y_select_start,end_select_x,end_select_y);
  }
  if (zergling_rush == 1)
  {
    for (let enemy of Object.values(enemy_units))
    {
      enemy.draw();
    }
  }
}
//}}}

//action call
setInterval(akce,50);/*{{{*/

function mousebutton(event)
{
  return(event.button)
}/*}}}*/

//selecting
//{{{
  canvas.addEventListener("mousedown", function(event)
  {
   const rect = canvas.getBoundingClientRect();
   const x_click = event.clientX - rect.left;
   const y_click = event.clientY - rect.top;
 
   if (ukol == "none")
   {//{{{
     if (mousebutton(event) == 0) {
       for (let unit of Object.values(all_your_units)) {
         unit.am_I_selected = 0;
       }
       for (let structure of Object.values(structures)) {
         structure.am_I_selected = 0;
       }
       select = {};
       document.getElementById("ukazatel_velikosti_units").style.display = "none";
       document.getElementById("main_house_name").style.display = "none";
       document.getElementById("evocham_name").style.display = "none";
       document.getElementById("evocham_life").style.display = "none";
       document.getElementById("Hatchery_lifes").style.display = "none";
       document.getElementById("minerals_name").style.display = "none" 
       document.getElementById("minerals_kapacita").style.display = "none";
       document.getElementById("new_drone_button").style.display = "none";           
       document.getElementById("build_spool").style.display = "none";
       document.getElementById("build_evocham").style.display = "none";
       document.getElementById("more_damega").style.display = "none";
       document.getElementById("drone_name").style.display = "none"
       document.getElementById("drone_lifes").style.display = "none";
       document.getElementById("more_supply_button").style.display = "none";
       document.getElementById("spool_name").style.display = "none";
       document.getElementById("spool_life").style.display = "none";
       document.getElementById("zergling_button").style.display = "none";
       document.getElementById("zergling_lifes").style.display = "none";
       document.getElementById("zergling_name").style.display = "none";
       document.getElementById("fast_zergling_button").style.display = "none";
       document.getElementById("ukazatel_velikosti_upradges").style.display = "none";

       for (let dron of Object.values(drones)) {
         if (dron.click_drone(x_click,y_click)) {
           dron.am_I_selected = 1;
           document.getElementById("drone_name").style.display = "block";
           document.getElementById("drone_lifes").textContent = "Lifes:" + dron.life;
           document.getElementById("drone_lifes").style.display = "block";
           document.getElementById("build_spool").style.display = "block";
           document.getElementById("build_evocham").style.display = "block";
           document.getElementById("minerals_name").style.display = "none" 
           document.getElementById("minerals_kapacita").style.display = "none";
           sounds.dron_select.play();
           select[dron.id] = dron;
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
             select[structure.id] = structure.type;
             document.getElementById("Hatchery_lifes").textContent = "Lifes:" + main_house_lifes;
             document.getElementById("main_house_name").style.display = "block"
             document.getElementById("Hatchery_lifes").style.display = "block";
             document.getElementById("new_drone_button").style.display = "block"; 
             document.getElementById("zergling_button").style.display = "block";
             document.getElementById("more_supply_button").style.display = "block";
             document.getElementById("ukazatel_velikosti_units").style.display = "block";
             document.getElementById("ukazatel_velikosti_upradges").style.display = "block";
             structure.am_I_selected = 1;
             break;
           }
           else if (structure.type == "spawn_pool")
           {
             select[structure.id] = structure.type;
             document.getElementById("spool_name").style.display = "block";
             document.getElementById("spool_life").style.display = "block";
             document.getElementById("spool_life").textContent = "Lifes:" + structure.life;
             document.getElementById("ukazatel_velikosti_units").style.display = "block";
             document.getElementById("ukazatel_velikosti_upradges").style.display = "block";
             if (structure.stadium >= 100 && zergling_speed == 0)
             {
               document.getElementById("fast_zergling_button").style.display = "block";
             }
             break;
           }
           else if (structure.type == "evo_cham")
           {
             select[structure.id] = structure.type;
             document.getElementById("evocham_name").style.display = "block";
             document.getElementById("evocham_life").style.display = "block";
             document.getElementById("evocham_life").textContent = "Lifes:" + structure.life;
             document.getElementById("more_damega").style.display = "block";
           }
         }
       }
       for (let unit of Object.values(units))
       {
         if (unit.click_zergling(x_click,y_click) && unit.type == "zergling")
         {
           unit.am_I_selected = 1;
           select[unit.id] = unit.type;
           document.getElementById("zergling_lifes").textContent = "Lifes:" + unit.life;
           document.getElementById("zergling_lifes").style.display = "block";
           document.getElementById("zergling_name").style.display = "block";
           break;
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
      
       if (dron.am_I_selected == 1 && dron.building == 1) 
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
           for (let unit of Object.values(units))
           {
             if (distance(unit.x,unit.y,x_click,y_click,100))
             {
               mozno = false;
               break;
             }
           }
         }
         if (mozno)
         {
           dron.building = 0;
           dron.work = "building";
           dron.move(x_click,y_click);
           delete select[dron.id];

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
  
//action after click to right button of mouse
//{{{
canvas.addEventListener("mouseup", function(event)
{
  if (mousebutton(event) == 2) 
  {
    const rect2 = canvas.getBoundingClientRect();
    const x = event.clientX - rect2.left;
    const y = event.clientY - rect2.top;
    for (let dron of Object.values(drones))
    {
      if (dron.am_I_selected == 1)
      {
        //set values
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
    for (let unit of Object.values(units))
    {
      if (unit.am_I_selected == 1)
      {
        
        //moving to the position of mouse  
        let sound = Math.floor(Math.random()*2);
        if (sound == 1)
        {
          sounds.zergling_command1.play();
        }
        else
        {
          sounds.zergling_command2.play();
        }
        if (Object.keys(enemy_units).length > 0)
        {
          for (let enemy of Object.values(enemy_units))
          {
            if (distance(enemy.x,enemy.y,x,y,40))
            {
              unit.figth = 1;
              unit.target_id = enemy.id;
              unit.move(enemy.x,enemy.y)
            }
            else
            {
              unit.figth = 0;
              unit.action = "move";
              unit.move(x,y)
            }
          }
        }
        else
        {
          unit.figth = 0;
          unit.action = "move";
          unit.move(x,y)
        }
      }
    }
    for (let structure of Object.values(structures))
    {
      if (structure.am_I_selected == 1 && structure.type == "main_house")
      {
        let mozno2 = true;
        for (let structure of Object.values(structures))
        {
          if (mozno2)
          {
            if (distance(structure.x,structure.y,x,y,125))
            {
              mozno2 = false;
            }
          }
        }
        if (mozno2)
        {
          structure.rally_point_x = x;
          structure.rally_point_y = y;
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

//keysdown control
document.addEventListener("keyup", function(event)/*{{{*/
{

    switch (event.key)
    {
    case "d":
      new_dron();
      break;
    case "z":
      new_zergling();
      break;
    case "v":
      new_supply_chamber();
      break;
    case "s":
      new_spool();
      break;
    case "e":
      new_evocham();
      break;
    case "w":
      if (zergling_speed == 0)
      {
        u_zergling_speed();
      }
      break;
   }
});/*}}}*/

function new_dron()
{/*{{{*/
  if (main_house.queue.length < 5 && supply > supplied && mineralky >= 50)
  {
    mineralky -= 50;
    main_house.queue.push("dron");
    document.getElementById("ukazatel_casu").style.display = "block";
    document.getElementById("ukazatel_velikosti_units").style.display = "block";
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
}/*}}}*/

function u_zergling_speed()
{/*{{{*/
  if (main_house.queue_2.length < 5 && mineralky >= 100)
  {
    mineralky -= 100;
    main_house.queue_2.push("zergling_speed");
  }
  else
  {
    if (mineralky < 100)
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
}/*}}}*/

function u_damega()
{/*{{{*/
  if (main_house.queue_2.length < 5 && mineralky >= 100)
  {
    mineralky -= 100;
    main_house.queue_2.push("damega");
  }
  else
  {
    if (mineralky < 100)
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
}/*}}}*/

function new_spool()
{/*{{{*/
  
  if (Object.values(select).length >= 1)
  {
      let dron = Object.values(select)[0];
      dron.building = 1;
  }

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
}/*}}}*/

function new_evocham()
{/*{{{*/
  
  if (Object.values(select).length >= 1)
  {
      let dron = Object.values(select)[0];
      dron.building = 1;
  }

  if (mineralky >= 100)
  {  
    building = "evo_cham";
    ukol = "building";
  }
  else
  {
    document.getElementById("no_minerals").style.display = "block";
    setTimeout(() => {
    document.getElementById("no_minerals").style.display = "none";
    },3500);
  }
}/*}}}*/

function build(x,y)
{/*{{{*/
  if (building == "spawn_pool")
  {
    supplied -= 1;
    mineralky -= 150;
    structure = new Structure();
    structure.type = building;
    structure.life = 900;
    structure.x = x;
    structure.y = y;
  }
  else if (building == "evo_cham")
  {
    mineralky -= 100;
    structure = new Structure();
    structure.type = building;
    structure.life = 500;
    structure.x = x;
    structure.y = y;
  }
}/*}}}*/

function new_supply_chamber()
{/*{{{*/
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
}/*}}}*/

function new_zergling()
{/*{{{*/
  if (mineralky >= 50 && main_house.queue.length < 5 && spawn_pool_exist == 1)
  {
    mineralky -= 50;
    main_house.queue.push("zergling");
    document.getElementById("ukazatel_casu").style.display = "block";
    document.getElementById("ukazatel_velikosti_units").style.display = "block";
  }
  else
  {
    if (mineralky >= 50)
    {
      if (supply <= supplied)
      { 
        document.getElementById("no_supply").style.display = "block";
        setTimeout(() => {
        document.getElementById("no_supply").style.display = "none";
        },3500);  
      }
      else
      {
        if (main_house.queue.length < 5)
        {
          document.getElementById("need_spool").style.display = "block";
          setTimeout(() => {
          document.getElementById("need_spool").style.display = "none";
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
    }
    else
    {
      document.getElementById("no_minerals").style.display = "block";
      setTimeout(() => {
      document.getElementById("no_minerals").style.display = "none";
      },3500);  
    }
  }
}/*}}}*/

//multiple select code
document.addEventListener("mousedown", function(event)/*{{{*/
{/*{{{*/
  if (event.button == 0)
  {
    mousedown = true;
    end_select_x = event.clientX;
    end_select_y = event.clientY;
    x_select_start = event.clientX;
    y_select_start = event.clientY;
    setTimeout(() => {
      if (mousedown === true)
      {
        big_select = 1;
        znaceni = 1;
      }
    }, 100);
  }
});/*}}}*/

document.addEventListener("mouseup", function(event)
{/*{{{*/
  big_select = 0;
  if (znaceni == 0) 
  {
    mousedown = false;
    y_select_start = 0;
    x_select_start = 0;
  }
  else if (moousedown = true)
  {
    mousedown = false;
    maxX = Math.max(x_select_start, end_select_x);
    maxY = Math.max(y_select_start, end_select_y);
    minX = Math.min(x_select_start, end_select_x);
    minY = Math.min(y_select_start, end_select_y);
    for (let dron of Object.values(drones))
    {
      if (dron.x > minX && dron.x < maxX && dron.y > minY && dron.y < maxY)
      {
        dron.am_I_selected = 1;
        select[dron.id] = dron;
      }
    }
    for (let unit of Object.values(units))
    {
      if (unit.x > minX && unit.x < maxX && unit.y > minY && unit.y < maxY)
      {
        unit.am_I_selected = 1;
        if (unit.type == "zergling")
        {
          select[unit.id] = unit;
        }
      }
    }
    if (Object.keys(select).length >= 2)
    {
      for (let key in select)
      {
        document.getElementById("ukazatel_velikosti_units").style.display = "none";
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
        document.getElementById("zergling_button").style.display = "none";
        document.getElementById("zergling_lifes").style.display = "none";
        document.getElementById("zergling_name").style.display = "none";
        document.getElementById("fast_zergling_button").style.display = "none";
        document.getElementById("ukazatel_velikosti_upradges").style.display = "none";
        document.getElementById("build_evocham").style.display = "none";
        for (let key2 in select)
        {
          if (select[key2].type == "zergling")
          {
            if (select[key2].type == "dron")
            {
              document.getElementById("drone_name").style.display = "block";
              for (let dron of Object.values(drones))
              {
              document.getElementById("drone_lifes").textContent = "Lifes:" + dron.life;
              }
              document.getElementById("drone_lifes").style.display = "block";
              document.getElementById("build_spool").style.display = "block";
              document.getElementById("build_evocham").style.display = "block";
              document.getElementById("minerals_name").style.display = "none" 
              document.getElementById("minerals_kapacita").style.display = "none";
            }
            else if (select[key2].type == "zergling")
            {
              for (let unit of Object.values(units))
              {
              document.getElementById("zergling_lifes").textContent = "Lifes:" + unit.life;
              }
              document.getElementById("zergling_lifes").style.display = "block";
              document.getElementById("zergling_name").style.display = "block";
            }
          }
          else
          {
            document.getElementById("drone_name").style.display = "block";
            for (let dron of Object.values(drones))
            {
            document.getElementById("drone_lifes").textContent = "Lifes:" + dron.life;
            }
            document.getElementById("drone_lifes").style.display = "block";
            document.getElementById("build_spool").style.display = "block";
            document.getElementById("build_evocham").style.display = "block";
            document.getElementById("minerals_name").style.display = "none" 
            document.getElementById("minerals_kapacita").style.display = "none";          
          }
        }
      }
    }
  }
});/*}}}*/

document.addEventListener("mousemove", function(event)
{/*{{{*/
  if (mousedown && big_select === 1 && x_select_start != 0 && y_select_start != 0)
  {
    end_select_x = event.clientX;
    end_select_y = event.clientY;
  }
});/*}}}*//*}}}*/

function draw_select_square(x_s,y_s,x_e,y_e)
{/*{{{*/
    ctx.save();
    ctx.beginPath();

    ctx.moveTo(x_s,y_s);
    ctx.lineTo(x_s,y_e);
    ctx.lineTo(x_e,y_e);
    ctx.lineTo(x_e,y_s);
        
    ctx.fillStyle = "rgba(0, 200, 0, 0.3)";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}/*}}}*/

//testing place all is comented
/*{{{*/
//canvas.addEventListener("mousedown", function(event)
//{
//  if (event.button === 1) 
//  {
//    event.preventDefault();
//    console.log("156");
//    let move_screen_x = event.clientX;
//    let move_screen_y = event.clientY;
//    x_screen += move_screen_x; 
//    y_screen += move_screen_y;  
//  }
//});
/*}}}*/

function rush()
{/*{{{*/
    enemy = new Enemy_unit();
    let attacker_y = Math.floor(Math.random()*500);
    let drone_ids = Object.keys(drones);
    let id_idx = Math.floor(Math.random() * drone_ids.length);
    let target = drone_ids[id_idx];
    zergling_rush = 1;
    enemy.target_id = drones[target].id;
    enemy.target = drones[target];
    enemy.type = "zergling";  
    enemy.x = 25;
    enemy.y = attacker_y;
    enemy.action = "move";
}/*}}}*/

function wait_for_more_rush()
{/*{{{*/
  setTimeout (() => {
  let i = -1;
  let number_f_r = Math.floor(Math.random()*4)+2;
  while (i <= number_f_r)
  {
    rush();
    i++
  }
  }, 20000);
}/*}}}*/

//buttons code
/*{{{*/
new_drone_button.addEventListener("click", function() {
  new_dron();
});

document.getElementById("build_spool").addEventListener("click", function() {
  new_spool();
});

document.getElementById("more_supply_button").addEventListener("click", function() {
  new_supply_chamber();
});

document.getElementById("zergling_button").addEventListener("click", function() {
  new_zergling();
});

document.getElementById("fast_zergling_button").addEventListener("click", function() {
  u_zergling_speed();
});

document.getElementById("build_evocham").addEventListener("click", function() {
  new_evocham();
});

document.getElementById("more_damega").addEventListener("click", function() {
  u_damega();
});
/*}}}*/

//dolble click select
document.addEventListener("mousedown", function(event)
{/*{{{*/
  if (event.button == 0)
  {
    clicks += 1;
    setTimeout(() => {
      if (clicks == 2)
      {
         const rect = canvas.getBoundingClientRect();
         const x_click = event.clientX - rect.left;
         const y_click = event.clientY - rect.top;
         for (let dron of Object.values(drones))
         {
           if (dron.click_drone(x_click,y_click)) 
           {
             for (let dron of Object.values(drones))
             {
               dron.am_I_selected = 1;
               select[dron.id] = dron;
             }
             document.getElementById("drone_name").style.display = "block";
             document.getElementById("drone_lifes").textContent = "Lifes:" + dron.life;
             document.getElementById("drone_lifes").style.display = "block";
             document.getElementById("build_spool").style.display = "block";
             document.getElementById("minerals_name").style.display = "none" 
             document.getElementById("minerals_kapacita").style.display = "none";
             sounds.dron_select.play();
             clicks = 0;
           }
         }
         for (let unit of Object.values(units))
         {
           if (unit.click_zergling(x_click,y_click) && unit.type == "zergling")
           {
             for (let unit of Object.values(units))
             {
               unit.am_I_selected = 1;
               select[unit.id] = unit;
             }
             document.getElementById("zergling_lifes").textContent = "Lifes:" + unit.life;
             document.getElementById("zergling_lifes").style.display = "block";
             document.getElementById("zergling_name").style.display = "block";
             sounds.dron_select.play();
             clicks = 0;
           }
         }
      }
      clicks = 0;
    }, 200);
  }
});/*}}}*/

