//class obstacle 
class Prekazka/*{{{*/
{
  constructor()
  {/*{{{*/
    this.x = 0;
    this.y = 0;
    this.type = 0;
    this.id = g_id++;
    obstancles[this.id] = this;
    this.scale = Math.random() - 0.1;
  }/*}}}*/

  draw()
  {/*{{{*/
    ctx.save();
    ctx.translate((this.x - screen_x),(this.y - screen_y));
    ctx.scale(this.scale,this.scale);
    if (this.type == 1)
    {
      //kamen
      ctx.beginPath();
      ctx.moveTo(-30,0);
      ctx.lineTo(-17,9);
      ctx.lineTo(-5,33);
      ctx.lineTo(1,22);
      ctx.lineTo(28,20);
      ctx.lineTo(29,0);
      ctx.lineTo(34,-4);
      ctx.lineTo(30,-15);
      ctx.lineTo(10,-13);
      ctx.lineTo(-2,-25);
      ctx.lineTo(-10,-20);
      ctx.lineTo(-8,-7);
      ctx.lineTo(-27,-6);
      ctx.lineTo(-18,-8);
      ctx.lineTo(-30,0);
      ctx.closePath();
      ctx.fillStyle = "#4F351D"
      ctx.fill();
      ctx.stroke();
    }
    else if (this.type == 2)
    {
      //strom
      ctx.beginPath();
      ctx.arc(0, 12, 20, 0,2 * Math.PI);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }/*}}}*/

}/*}}}*/

//class shoot 
class Shoot/*{{{*/
{
  constructor(x,y,cil_x,cil_y,odesilatel)
  {/*{{{*/
    this.speed = 12;
    this.x = x;
    this.y = y;
    this.x_cil = cil_x;
    this.y_cil = cil_y;
    this.id = g_id++;
    this.target_id = 0;
    this.type = "shoot";
    this.damage = 8;
    this.odesilatel = odesilatel;
    shoots[this.id] = this;
  }/*}}}*/
  
  akce()
  {/*{{{*/
    const xd = this.x_cil - this.x;
    const yd = this.y_cil - this.y;
    const d = Math.sqrt(xd*xd + yd*yd);
    if (d <= this.speed)
    {
      this.x = this.x_cil;
      this.y = this.y_cil;
      if (this.odesilatel == 1)
      {
        for (let enemy of Object.values(enemy_units))
        {
          if (distance(this.x,this.y,enemy.x,enemy.y,50))
          {
            enemy.life -= this.damage;
          }
        }
        delete shoots[this.id]
        return;
      }
      else
      {
        for (let dron of Object.values(drones))
        {
          if (distance(this.x,this.y,dron.x,dron.y,50))
          {
            dron.life -= (this.damage - 1) ;
          }
        }
        delete shoots[this.id]
        return;
      }
    }
    else
    {  
      this.x += xd/d * this.speed;
      this.y += yd/d * this.speed;
    }
}/*}}}*/
  
  draw()
  {/*{{{*/
    ctx.save();
    ctx.translate((this.x - screen_x),(this.y - screen_y));

    ctx.beginPath();
    ctx.arc(0, 0, 5, 0,2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#68FF00";
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }/*}}}*/

}/*}}}*/

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
    this.angle = 90;
    this.velikost = 0;
    this.id = g_id++;
    this.life = 40;
    this.x_cil = this.x;
    this.y_cil = this.y;
    this.rotate = 0;
    if (rase_of_enemy == 1)
    {
      this.hit_damage = 4;
      this.speed = 7;
    }
    else
    {
      this.speed = 5;
      this.hit_damage = 7
    }
    enemy_units[this.id] = this;
    this.hit_speed = 0;
  }
/*}}}*/

  draw()
  {/*{{{*/
    ctx.save();
    ctx.translate((this.x - screen_x),(this.y - screen_y));
    ctx.rotate(this.angle/180*Math.PI);
    
    if (this.type == "zergling" && rase_of_enemy == 1)
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
    else if (this.type == "zergling" && rase_of_enemy == 2)
    {
      //body
      ctx.beginPath();
      ctx.lineTo(15,-7);
      ctx.lineTo(-15,-7);
      ctx.lineTo(-15,7);
      ctx.lineTo(15,7);
      ctx.closePath();
      ctx.fillStyle = "yellow"
      ctx.fill();

      //blades
      ctx.beginPath();
      ctx.lineTo(-13,-7);
      ctx.lineTo(-11,-12);
      ctx.lineTo(-9,-7);
      ctx.moveTo(13,-7);
      ctx.lineTo(13,-7);
      ctx.lineTo(11,-12);
      ctx.lineTo(9,-7);
      ctx.closePath();
      ctx.fillStyle = "teal"
      ctx.fill();
    
      ctx.stroke();
    }
    else if (this.type == "aciling")
    { 
      //body
      ctx.beginPath();
      ctx.moveTo(0,-20);
      ctx.lineTo(-5,-18);
      ctx.lineTo(-8,0);
      ctx.moveTo(0,-20);
      ctx.lineTo(5,-18);
      ctx.lineTo(8,0);
      ctx.lineTo(-8,0);
      ctx.stroke();
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();

      //arms
      ctx.beginPath();
      ctx.moveTo(-5,-18);
      ctx.lineTo(-7,-21);
      ctx.lineTo(-7,-24);
      ctx.moveTo(5,-18);
      ctx.lineTo(7,-21);
      ctx.lineTo(7,-24);
      ctx.closePath();
      ctx.stroke();
    
      //acid bagg
      ctx.beginPath();
      ctx.arc(0, 13, 20, 0,2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = "#68FF00";
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
      }
      break;
    case "move":     
        let drone_ids = Object.keys(drones);
        if (!drones.hasOwnProperty(this.target_id) && Object.keys(drones).length > 0)
        {
          this.target_id = 0;
          this.target = 0;
          let id_idx = Math.floor(Math.random() * drone_ids.length);
          let target = drone_ids[id_idx];
          this.target_id = drones[target].id;
          this.target = drones[target];
          this.action = "move";
        }
        if (this.life <= 0)
        {
          delete enemy_units[this.id]
          break;
        }
        const xd = this.x_cil - this.x;
        const yd = this.y_cil - this.y;
        const d = Math.sqrt(xd*xd + yd*yd);
        if (d <= this.speed)
        {
          if (this.hit_speed == 0 && this.type == "zergling")
          {
            for (let dron of Object.values(all_your_units))
            {
              let drone_num = Object.keys(drones);
              if (dron.id == this.target_id && drone_num != 0)
              {
                if (rase_of_enemy == 1)
                {
                  sounds.zergling_fight.play();
                }
                else
                {
                  sounds.zealots_blades.play();
                }
                dron.life -= this.hit_damage;
                this.hit_speed = 1;
                
              }
            }
          }
          else
          {
            this.hit_speed += 1;
            this.rotate = 0;
            if (this.hit_speed == 5)
            {
              this.rotate = 50;
              }
            if (this.hit_speed == 10)
            {
              this.rotate = -50;
            }
            if (this.hit_speed == 15)
            {
              this.hit_speed = 0;
            }
          }
        }
        else
        {  
          if (this.type == "aciling" && this.target_id != 0)
          {
            if (this.type == "aciling" && d <= 450 && this.target_id != 0 && lenght_of_drones >= 1)
            {
              if (this.hit_speed == 0)
              {
                for (let dron of Object.values(drones))
                {
                  if (dron.id == this.target_id)
                  {
                    let shoot_x_cil = dron.x;
                    let shoot_y_cil = dron.y;
                    new Shoot(this.x,this.y,shoot_x_cil,shoot_y_cil,0);
                    this.hit_speed = 1;
                    sounds.aciling_fight.play();
                    break;
                  }
                }
              }
              else
              {
                this.hit_speed += 1;
                if (this.hit_speed == 25)
                {
                  this.hit_speed = 0;
                }
              }
            }
            else
            {
              this.x += xd/d * this.speed;
              this.y += yd/d * this.speed;
            }
          }
          else
          {
            this.x += xd/d * this.speed;
            this.y += yd/d * this.speed;
          }  
          let rad_angle = (Math.atan2(yd,xd) + this.rotate);
          let deg_angle = rad_angle * 180 / Math.PI;
          this.angle = 90 + deg_angle;
          break;
      }
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
{/*{{{*/
    this.figth = 0;
    this.hit_speed = 0;
    this.target_id = 0;
    this.target = 0;
    this.hit_damage = 5;
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
    this.normal_life = 0;
    units[this.id] = this;
    all_your_units[this.id] = this;
  }/*}}}*/

  draw()
  {/*{{{*/
    ctx.save();
    ctx.translate((this.x - screen_x),(this.y - screen_y));
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
    else if (this.type == "aciling")
    {
      if (this.am_I_selected == 1) 
      {
        ctx.beginPath();
        ctx.arc(0, 5, 20, 0,2 * Math.PI);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.strokeStyle = "black";
      }
      
      //body
      ctx.beginPath();
      ctx.moveTo(0,-20);
      ctx.lineTo(-5,-18);
      ctx.lineTo(-8,0);
      ctx.moveTo(0,-20);
      ctx.lineTo(5,-18);
      ctx.lineTo(8,0);
      ctx.lineTo(-8,0);
      ctx.stroke();
      ctx.fillStyle = "purple";
      ctx.fill();
      ctx.stroke();

      //arms
      ctx.beginPath();
      ctx.moveTo(-5,-18);
      ctx.lineTo(-7,-21);
      ctx.lineTo(-7,-24);
      ctx.moveTo(5,-18);
      ctx.lineTo(7,-21);
      ctx.lineTo(7,-24);
      ctx.closePath();
      ctx.stroke();
    
      //acid bagg
      ctx.beginPath();
      ctx.arc(0, 13, 20, 0,2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = "#68FF00";
      ctx.fill();
      ctx.stroke();
    }
    
    ctx.restore();
  }/*}}}i*/

  akce()
  {//{{{
    if (this.type == "aciling")
    {
      this.speed = 3;
    }
    switch (this.action)
    {
      case "none":
        if (this.life <= 0)
        {
          supplied -= 1;
          delete units[this.id]
          delete all_your_units[this.id]
        }
        return;
      case "move":     
        const xd = this.x_cil - this.x;
        const yd = this.y_cil - this.y;
        const d = Math.sqrt(xd*xd + yd*yd);
        if (d <= 3) return;
        if (d <= this.speed && this.type != "aciling")
        {
          if (this.figth == 0)
          {
            this.x = this.x_cil;
            this.y = this.y_cil;
          }
          else if (this.type == "zergling")
          {
            if (this.hit_speed == 0)
            {
              for (let enemy of Object.values(enemy_units))
              {
                if (enemy.id == this.target_id)
                {
                  sounds.zergling_fight.play();
                  enemy.life -= this.hit_damage;
                  if (enemy.life <= 0)
                  {
                    this.figth = 0;
                  }
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
          if (this.type == "aciling" && d <= 450)
          {
            if (this.type == "aciling" && this.figth == 1)
            {
              if (this.hit_speed == 0)
              {
                for (let enemy of Object.values(enemy_units))
                {
                  if (enemy.id == this.target_id)
                  {
                    let shoot_x_cil = enemy.x;
                    let shoot_y_cil = enemy.y;
                    new Shoot(this.x,this.y,shoot_x_cil,shoot_y_cil,1);
                    this.hit_speed = 1;
                    sounds.aciling_fight.play();
                  }
                }
              }
              else
              {
                this.hit_speed += 1;
                if (this.hit_speed == 25)
                {
                  this.hit_speed = 0;
                }
              }
            }
            else
            {
              this.x += xd/d * this.speed;
              this.y += yd/d * this.speed;
            }
          }
          else
          {
            this.x += xd/d * this.speed;
            this.y += yd/d * this.speed;
          }
        }
        let rad_angle = Math.atan2(yd,xd);
        let deg_angle = rad_angle * 180 / Math.PI;
        this.angle = 90 + deg_angle;
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
    const xd = x - (this.x - screen_x);
    const yd = y - (this.y - screen_y);
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

  new_aciling()
  {/*{{{*/
    this.type = "aciling";
    this.life = 60;
    this.speed = 4;
    this.x = this.x;
    this.y = this.y;
  }/*}}}*/

  detect_enemy()
  {/*{{{*/
    for (let enemy of Object.values(enemy_units))
    {
      if (this.figth == 0 && this.action != "move")
      {
        if (distance(this.x,this.y,enemy.x,enemy.y,200))
        {
          this.figth = 1;
          this.target_id = enemy.id;
          if (this.type == "zergling")
          {
            sounds.zergling_sound.play();
          }
        }
      }
      else if (!enemy_units.hasOwnProperty(this.target_id))
      {
        this.figth = 0;
      }
    }
  }/*}}}*/
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
      if (this.type == "sligen")
      {
        this.number_of_tentacles = 1;
        this.type_slime = 0;
      }
      if (this.type == "mintow")
      {
        this.timer_of_move = 0;
      }
  }//}}}

  draw()
  {//{{{
//main house
    if (this.type == "main_house")/*{{{*/
    {
      ctx.save();
      ctx.translate((this.x - screen_x),(this.y - screen_y));
      

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
    }/*}}}*/
//spawning pool
if (this.type == "spawn_pool")/*{{{*/
    {
      if (this.stadium == 100)
      {
        spawn_pool_exist = 1;

        ctx.save();
        ctx.translate((this.x - screen_x),(this.y - screen_y));
        
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
        ctx.translate((this.x - screen_x),(this.y - screen_y));
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
          
          let velikost = ((50) / 50) * 0.8;
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
          ctx.fillStyle = "grey";
          ctx.fill();

          ctx.stroke();


          velikost = ((this.stadium - 50) / 50) * 0.8;
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
    }/*}}}*/
//evolution chamber
    if (this.type == "evo_cham")/*{{{*/
    {
      if (this.stadium == 100)
      {
        ctx.save();
        ctx.translate((this.x - screen_x),(this.y - screen_y));
        
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
          ctx.translate((this.x - screen_x),(this.y - screen_y));
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
    }/*}}}*/
//slime_generator   
    if (this.type == "sligen")/*{{{*/
    {
      ctx.save();
      ctx.translate((this.x - screen_x),(this.y - screen_y));
      if (this.stadium < 50)
      {
        if (this.stadium == 5 || this.stadium == 15 || this.stadium == 25 || this.stadium == 35 || this.stadium == 45)
        {
          ctx.scale(0.7,0.7);
        }
        else if  (this.stadium == 0 || this.stadium == 10 || this.stadium == 20 || this.stadium == 30 || this.stadium == 40 || this.stadium == 50)
        {
          ctx.scale(0.4,0.4);
        }
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
        ctx.restore();
      }
      else if (this.stadium >= 50 && this.stadium < 65)
      {
        ctx.beginPath();
        ctx.arc(0,0, 45, 0,2 * Math.PI);
        ctx.fillStyle = "#741B47";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
      }
      else if (this.stadium >= 65 && this.stadium < 80)
      {
        ctx.beginPath();
        ctx.arc(0,0, 45, 0,2 * Math.PI);
        ctx.fillStyle = "#741B47";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-15,15);
        ctx.lineTo(-15,-15);
        ctx.lineTo(15,-15);
        ctx.lineTo(15,15);
        ctx.lineTo(-15,15);
        ctx.fillStyle = "#741B47";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
      }
      else if (this.stadium > 79)
      {
        ctx.beginPath();
        ctx.arc(0,0, 45, 0,2 * Math.PI);
        ctx.fillStyle = "#741B47";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-15,15);
        ctx.lineTo(-15,-15);
        ctx.lineTo(15,-15);
        ctx.lineTo(15,15);
        ctx.lineTo(-15,15);
        ctx.fillStyle = "#741B47";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-5,15);
        ctx.lineTo(-5,50);
        ctx.lineTo(5,50);
        ctx.lineTo(5,15);
        ctx.lineTo(-5,15);
        ctx.closePath();
        ctx.fillStyle = "741B48"
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-5,-15);
        ctx.lineTo(-5,-50);
        ctx.lineTo(5,-50);
        ctx.lineTo(5,-15);
        ctx.lineTo(-5,-15);
        ctx.closePath();
        ctx.fillStyle = "741B48"
        ctx.fill();
        ctx.stroke();  
      }
      ctx.restore();
    }/*}}}*/
//mining tower
      if (this.type == "mintow")/*{{{*/
      {
        ctx.save();
        ctx.translate((this.x - screen_x),(this.y - screen_y));
        if (this.stadium < 50)
        {
          if (this.stadium == 5 || this.stadium == 15 || this.stadium == 25 || this.stadium == 35 || this.stadium == 45)
          {
            ctx.scale(0.7,0.7);
          }
          else if  (this.stadium == 0 || this.stadium == 10 || this.stadium == 20 || this.stadium == 30 || this.stadium == 40 || this.stadium == 50)
          {
            ctx.scale(0.4,0.4);
          }
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
          
          ctx.restore();
        }
        else if (this.stadium >= 50 && this.stadium < 65)
        {
          ctx.beginPath();
          ctx.arc(0,0, 45, 0,2 * Math.PI);
          ctx.fillStyle = "#741B47";
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
        }
        else if (this.stadium >= 65 && this.stadium < 80)
        {
          ctx.beginPath();
          ctx.arc(0,0, 45, 0,2 * Math.PI);
          ctx.fillStyle = "#741B47";
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(-15,15);
          ctx.lineTo(-15,-15);
          ctx.lineTo(15,-15);
          ctx.lineTo(15,15);
          ctx.lineTo(-15,15);
          ctx.fillStyle = "#741B47";
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
        }
        else 
        {
          ctx.beginPath();
          ctx.arc(0,0, 45, 0,2 * Math.PI);
          ctx.fillStyle = "#741B47";
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(-15,15);
          ctx.lineTo(-15,-15);
          ctx.lineTo(15,-15);
          ctx.lineTo(15,15);
          ctx.lineTo(-15,15);
          ctx.fillStyle = "#741B47";
          ctx.fill();
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0,0, 7.5, 0,2 * Math.PI);
          if (this.timer_of_move > 109 && this.timer_of_move < 124)
          {
            ctx.fillStyle = "#2A93D4";
          }
          else
          {
            ctx.fillStyle = "#2AD4C4";
          }
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      }/*}}}*/
  }//}}}

  build_units()
  {//{{{
    if (this.queue.length)
    {
      document.getElementById("ukazatel_casu").textContent = `Building: ${this.queue[0]}`;

      if (something_is_building >= 1)
      {
        ++this.progress;
      }
      else
      {
        this.progress = 0;
      }
      if (build_length[this.queue[0]] <= this.progress)
      {
        if (supply > supplied) 
        {
          switch (this.queue[0])
          {
          case "dron":
            something_is_building -= 1
            supplied += 1; 
            sounds.dron_wake_up.play();
            let dron = new Dron();
            dron.x = this.x;
            dron.y = this.y;
            dron.move();
            dron.normal_life = 45;
            let number = Math.floor(Math.random()*mineral_list.length); 
            let trg_mineral = mineral_list[number];
            dron.my_mineral= trg_mineral;  
            dron.work = "mine";
            dron.move(trg_mineral.x,90);
            main_house.building = "none";      
            break;
          case "zergling":
            something_is_building -= 1;
            supplied += 1; 
            let zergling = new Unit();
            zergling.velikost = 25;
            zergling.type = "zergling";
            zergling.x = this.x;
            zergling.y = this.y;
            zergling.move(this.rally_point_x,this.rally_point_y);
            zergling.life = 40;
            zergling.normal_life = 40;
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
      document.getElementById("ukazatel_upradgu").textContent = `Upgrading: ${this.queue_2[0]}`;

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
              if (unit.type == "zergling")
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
          case "can_aciling":
            can_build_aciling = 1;
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
    this.building_thing = "none";
    this.arm_move = 0;
 }//}}}

  draw()
  {//{{{
    
    ctx.save();
    ctx.translate((this.x - screen_x),(this.y - screen_y));
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
        supplied -= 1;
        delete drones[this.id]
        delete all_your_units[this.id]
        if (this.am_I_selected == 1)
        {
          document.getElementById("build_spool").style.display = "none";
          document.getElementById("build_evocham").style.display = "none";
          document.getElementById("build_sligen").style.display = "none";
          document.getElementById("drone_name").style.display = "none"
          document.getElementById("drone_lifes").style.display = "none";
        }
      }
      return;
    case "move":     
        if (this.life <= 0)
        {
          if (this.am_I_selected == 1)
          {
            document.getElementById("build_spool").style.display = "none";
            document.getElementById("build_evocham").style.display = "none";
            document.getElementById("build_sligen").style.display = "none";
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
            build(this.x,this.y,this.building_thing);
            if (this.am_I_selected == 1)
            {
              document.getElementById("build_spool").style.display = "none";
              document.getElementById("build_evocham").style.display = "none";
              document.getElementById("build_sligen").style.display = "none";
              document.getElementById("build_mintow").style.display = "none";
              document.getElementById("drone_name").style.display = "none"
              document.getElementById("drone_lifes").style.display = "none";
            }
            supplied -= 1;
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
    const xd = x - (this.x - screen_x);
    const yd = y - (this.y - screen_y);
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
    ctx.translate((this.x - screen_x),(this.y - screen_y));
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
    const xd = x - (this.x - screen_x);
    const yd = y - (this.y - screen_y);
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

function draw_sligen_slime(x,y,id)
{/*{{{*/
  ctx.beginPath();
  ctx.arc((x - screen_x),(y - screen_y), 225, 0,2 * Math.PI);
  ctx.closePath();
  for (let sligen of Object.values(structures))
  {     
    if (sligen.id == id)
    {
      if (sligen.type_slime == 0)
      {
        ctx.fillStyle = "#990099";
      }
      else
      {
        ctx.fillStyle = "#13AD18";
      }
    }
  }
  ctx.fill();
  ctx.stroke();
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
  ctx.translate((x - screen_x),(y - screen_y))
  
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
  "can_aciling": 205,
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
    "zerglings_incoming" : new Audio("res/zerglings_incoming.wav"),
    "zergling_sound" : new Audio("res/zergling_sound.wav"),
    "zergling_fight" : new Audio("res/zerglings_fight_sound.wav"),
    "zealots_blades" : new Audio("res/zealots_blades_sound.wav"),
    "aciling_command1" : new Audio("res/aciling_command_sound.wav"),
    "aciling_command2" : new Audio("res/aciling_command_sound2.wav"),
    "aciling_fight" : new Audio("res/aciling_fire_sound.wav"),
  }
}/*}}}*/

//INIT
//variables, values and dictionaries
//{{{
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
let shoots = {};
let keys = {};
let obstancles = {};

let enemy_units = {};

// sounds
let sounds = {};
load_sounds();

let g_id = 0;

let main_house = new Structure();
main_house.type = "main_house";
main_house.x = 655;
main_house.y = 300;

let screen_width = (window.outerWidth - (window.outerWidth / 6));
let screen_height = window.outerHeight;
canvas.width = screen_width;
let number_of_drones = 0;
let zergling_rush = 0;
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
let rase_of_enemy = Math.floor(Math.random() * 2) + 1;
let znaceni = 0;
let damega_upgrading = 0;
let screen_x = 0;
let screen_y = 0;
let can_build_aciling = 0;
let lenght_of_drones = 0;
let pauza = 0;
let number_of_mintow = 0;
let something_is_building = 0;
let number_of_obstancles = 0;
/*}}}*/

//drones made and position 
/*{{{*/
for (let i = 0;i < 12;i++)
{
  let dron = new Dron();
  dron.x = 50*i;
  dron.normal_life = 45;
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

//make obstancles
/*{{{*/

number_of_obstancles = Math.floor(Math.random() * 76) + 100

for (let i = 0;i < number_of_obstancles;i++)
{
  let obstancle = new Prekazka();
  obstancle.x = Math.floor(Math.random()*1545);
  obstancle.y = Math.floor(Math.random()*1080);
  obstancle.type = Math.floor(Math.random()*2) +1;
}
/*}}}*/

function akce()
/*{{{*/
{
  if (pauza == 0)
  {
    lenght_of_drones = Object.keys(drones).length;
    for (let structure of Object.values(structures))
    {
      structure.build_units();
      structure.upradge_code();
      if (structure.stadium != 1 && structure.stadium < 100)
      {
        structure.stadium += 1;
      }
    }
    for (let shoot of Object.values(shoots))
    {
      shoot.akce();
    }
    for (let dron of Object.values(drones))
    {
      for (let struct of Object.values(structures))
      {
        if (distance(dron.x,dron.y,struct.x,struct.y,225) && struct.type == "sligen" && struct.stadium >= 100)
        {
          if (struct.type_slime == 0)
          {
            if (dron.speed == 4)
            {
              dron.speed = 8;
            }
            if (dron.life > dron.normal_life)
            {
              dron.life = dron.normal_life;
            }
          }
          else if (dron.life == dron.normal_life && struct.type_slime == 1)
          {
            dron.life += 5;
          }
          break;
        }
        else
        {
          if (struct.type_slime == 0)
          {
            if (dron.type == "zergling")
            {
              if (zergling_speed == 1)
              {
                dron.speed = 9.5;  
              }
              else
              {
                dron.speed = 7;  
              }
            }
            else
            {
              dron.speed = 4;
            }
          }
          else if (struct.type_slime == 1)
          {
            dron.life = dron.normal_life;
          }
        }
      }
      dron.akce();
    }
    for (let unit of Object.values(units))
    {
      for (let struct of Object.values(structures))
      {
        if (distance(unit.x,unit.y,struct.x,struct.y,225) && struct.type == "sligen" && struct.stadium >= 100)
        {
          if (struct.type_slime == 0)
          {
            unit.speed += 3;
            if (unit.life != unit.normal_life)
            {
              unit.life = unit.normal_life;
            }
          }
          else if (unit.life == unit.normal_life)
          {
            unit.life += 5;
          }
          break;
        }
        else
        {
          if (struct.type_slime == 0)
          {
            if (unit.type == "zergling")
            {
              if (zergling_speed == 1)
              {
                unit.speed = 9.5;  
              }
              else
              {
                unit.speed = 7;  
              }
            }
            else
            {
              unit.speed = 4;
            }
          }
          else if (struct.type_slime == 1)
          {
            unit.life = unit.normal_life;
          }
        }
      }
      unit.akce();
      unit.detect_enemy();
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
    if (select.hasOwnProperty(main_house.id) && something_is_building != 0)
    {
      document.getElementById("cancel_building").style.display = "block" 
    }
    if (document.getElementById("drone_name").style.display == "block")
    {
      document.getElementById("minerals_name").style.display = "none"
      document.getElementById("minerals_kapacita").style.display = "none"
    }
    move_the_screen();
    draw();
  }
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
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,screen_height);
  ctx.lineTo(screen_width,screen_height);
  ctx.lineTo(screen_width,0);
  ctx.closePath();
  ctx.fillStyle = "#8C4949";
  ctx.fill();
  ctx.stroke();
  document.getElementById("miner.").textContent = "Minerals:" + mineralky;
  document.getElementById("minerals_kapacita").textContent = "Capacity:" + mineral.kapacita;
  document.getElementById("supply").textContent = "Supply:" + supplied + "/" + supply;
  for (let structure of Object.values(structures))
  {
    if (structure.type == "sligen" && structure.stadium == 100)
    {
      draw_sligen_slime(structure.x,structure.y,structure.id);
    }
  }  
  for (let obstancle of Object.values(obstancles))
  {
    if (obstancle.type == 1)
    {
      obstancle.draw();
    }
  }
  for (let shoot of Object.values(shoots))
  {
    shoot.draw();
  }
  for (let unit of Object.values(units))
  {
    unit.draw();
  }   
  for (let dron of Object.values(drones))
  {
    dron.draw();
  }
  for (let obstancle of Object.values(obstancles))
  {
    if (obstancle.type == 2)
    {
      obstancle.draw();
    }
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

//function call
setInterval(akce,50);/*{{{*/
setInterval(get_minerals,25000);

let waiting_time = Math.floor(Math.random()*60100)+75000;
setInterval(check_can_call_rush,waiting_time);

function mousebutton(event)
{
  return(event.button)
}

function check_can_call_rush()
{
  if (pauza == 0)
  {
    rush_call();
  }
}

/*}}}*/

//selecting
//{{{
canvas.addEventListener("mousedown", function(event)
{
  const rect = canvas.getBoundingClientRect();
  let x_click = event.clientX - rect.left;
  let y_click = event.clientY - rect.top;
  if (ukol == "none")
{//{{{
    if (mousebutton(event) == 0) {
      if (Object.keys(all_your_units).length > 0)
      {
        for (let unit of Object.values(all_your_units)) {
          unit.am_I_selected = 0;
        }
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
      document.getElementById("sligen_name").style.display = "none";
      document.getElementById("sligen_life").style.display = "none";
      document.getElementById("zergling_button").style.display = "none";
      document.getElementById("zergling_lifes").style.display = "none";
      document.getElementById("zergling_name").style.display = "none";
      document.getElementById("fast_zergling_button").style.display = "none";
      document.getElementById("ukazatel_velikosti_upradges").style.display = "none";
      document.getElementById("build_sligen").style.display = "none";
      document.getElementById("build_mintow").style.display = "none";
      document.getElementById("can_aciling").style.display = "none";
      document.getElementById("evolve_to_aciling").style.display = "none";
      document.getElementById("aciling_lifes").style.display = "none";
      document.getElementById("aciling_name").style.display = "none";
      document.getElementById("sligen_slime_type").style.display = "none";
      document.getElementById("change_sligen_efect").style.display = "none";
      document.getElementById("mintow_name").style.display = "none";
      document.getElementById("mintow_life").style.display = "none";

      if (Object.keys(drones).length > 0)
      {
        for (let dron of Object.values(drones)) {
          if (dron.click_drone(x_click,y_click)) {
            dron.am_I_selected = 1;
            document.getElementById("drone_name").style.display = "block";
            document.getElementById("drone_lifes").textContent = "Lifes:" + dron.life;
            document.getElementById("drone_lifes").style.display = "block";
            document.getElementById("build_spool").style.display = "block";
            document.getElementById("build_evocham").style.display = "block";
            document.getElementById("build_sligen").style.display = "block";
            document.getElementById("build_mintow").style.display = "block";
            document.getElementById("minerals_name").style.display = "none" 
            document.getElementById("minerals_kapacita").style.display = "none";
            sounds.dron_select.play();
            select[dron.id] = dron;
            break;
          }
        }
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
        if (distance((structure.x - screen_x),(structure.y - screen_y),x_click,y_click,50))
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
            if (something_is_building >= 1)
            {
              document.getElementById("ukazatel_velikosti_units").style.display = "block";
            }
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
            if (structure.stadium >= 100 && can_build_aciling == 0)
            {
              document.getElementById("can_aciling").style.display = "block";
            }
            break;
          }
          else if (structure.type == "evo_cham")
          {
            select[structure.id] = structure.type;
            document.getElementById("evocham_name").style.display = "block";
            document.getElementById("evocham_life").style.display = "block";
            document.getElementById("evocham_life").textContent = "Lifes:" + structure.life;
            if (structure.stadium >= 100 && damega_upgrade == 0 && damega_upgrading == 0)
            {
              document.getElementById("more_damega").style.display = "block";
            }
          }
          else if (structure.type == "sligen")
          {
            structure.am_I_selected = 1;
            select[structure.id] = structure.type;
            document.getElementById("sligen_name").style.display = "block";
            document.getElementById("sligen_life").style.display = "block";
            document.getElementById("sligen_life").textContent = "Lifes:" + structure.life;
            document.getElementById("sligen_slime_type").style.display = "block";
            document.getElementById("sligen_slime_type").textContent = "Slime type:" + structure.type_slime;
            document.getElementById("change_sligen_efect").style.display = "block";
          }
          else if (structure.type == "mintow")
          {
            structure.am_I_selected = 1;
            select[structure.id] = structure.type;
            document.getElementById("mintow_name").style.display = "block";
            document.getElementById("mintow_life").style.display = "block";
            document.getElementById("mintow_life").textContent = "Lifes:" + structure.life;
          }
        }
      }
      for (let unit of Object.values(units))
      {
        if (unit.click_zergling(x_click,y_click) && unit.type == "zergling")
        {
          unit.am_I_selected = 1;
          select[unit.id] = "zergling";
          document.getElementById("zergling_lifes").textContent = "Lifes:" + unit.life;
          document.getElementById("zergling_lifes").style.display = "block";
          document.getElementById("zergling_name").style.display = "block";
          if (can_build_aciling)
          {
            document.getElementById("evolve_to_aciling").style.display = "block";
          }
          break;
        }
        else if (unit.click_zergling(x_click,y_click) && unit.type == "aciling")
        {
          unit.am_I_selected = 1;
          select[unit.id] = "aciling";
          document.getElementById("aciling_lifes").textContent = "Lifes:" + unit.life;
          document.getElementById("aciling_lifes").style.display = "block";
          document.getElementById("aciling_name").style.display = "block";
          break;
        }
      }
    }
  }//}}}
  else if (ukol == "building")
  { 
    x_click += screen_x;
    y_click += screen_y;
    let mozno = true;
    for (let dron of Object.values(drones))
    {
     
      if (dron.am_I_selected == 1 && dron.building == 1) 
      {
        for (let structure of Object.values(structures))
        {
          if (distance(structure.x,structure.y,x_click,y_click,175))
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
          delete select[dron.id]

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
    const x = ((event.clientX - rect2.left) + screen_x);
    const y = ((event.clientY - rect2.top) + screen_y);
    for (let dron of Object.values(drones))
    {
      if (dron.am_I_selected == 1)
      {
        //set values
        let kliknuto = 0;
        
        //am I go to the minerals?
        for (let mineral of Object.values(minerals)) {
          if (distance((mineral.x - screen_x),(mineral.y - screen_y),x,y,100)) {
            kliknuto = 1;
            trg_mineral = mineral;
            break;
          }
        }
        if (distance((655 - screen_x),(300 - screen_y),x,y,100)) {
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
        if (unit.type == "zergling")
        {
          if (sound == 1)
          {
            sounds.zergling_command1.play();
          }
          else
          {
            sounds.zergling_command2.play();
          }
        }
        else if (unit.type == "aciling")
        {
          if (sound == 1)
          {
            sounds.aciling_command1.play();
          }
          else
          {
            sounds.aciling_command2.play();
          }
        }
        if (Object.keys(enemy_units).length > 0)
        {
          for (let enemy of Object.values(enemy_units))
          {
            if (distance(enemy.x,enemy.y,x,y,80))
            {
              unit.figth = 1;
              unit.target_id = enemy.id;
              unit.move(enemy.x,enemy.y)
              if (unit.type == "zergling")
              {
                sounds.zergling_sound.play();
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

//key control
/*{{{*/
if (pauza == 0)
{
  document.addEventListener("keyup", function(event)
  /*{{{*/
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
      case "m":
        if (damega_upgrade == 0 && damega_upgrading == 0)
        {
          u_damega();
        }
        break;
      case "q":
        if (can_build_aciling == 0)
        {
          u_aciling();
        }
        break;
      case "a":
        if (Object.keys(select).length == 1 && can_build_aciling == 1)
        {
          for (let unit of Object.values(units))
          {
            if (unit.am_I_selected == 1 && unit.type == "zergling")
            {
              morf_to_aciling(unit.id);
            }
          }
        }
        break;
      case "t":
        new_sligen();
        break;
      case "p":
        if (pauza == 0)
        {
          pauza = 1;
        }
        else
        {
          pauza = 0;
        }
        break;
      case "x":
        new_mintow();
        break;
      case "c":
        if (select.hasOwnProperty(main_house.id))
        {
          if (select.hasOwnProperty(main_house.id))
          {
            something_is_building -= 1;
            main_house.queue.pop();  
            if (main_house.queue.length == 0)
            {
              main_house.progress = 0;
              document.getElementById("ukazatel_velikosti_units").style.display = " none";
              document.getElementById("cancel_building").style.display = " none";
            }
          }  
        }
      case "ArrowRight":
        keys.right = 0;
        break;
      case "ArrowLeft":
        keys.left = 0;
        break;
      case "ArrowUp":
        keys.up = 0;
        break;
      case "ArrowDown":
        keys.down = 0;
        break;
     }
  });/*}}}*/

  document.addEventListener("keydown", function(event)
  {/*{{{*/
      switch(event.key)
      {
      case "ArrowRight":
        keys.right = 1;
        break;
      case "ArrowLeft":
        keys.left = 1;
        break;
      case "ArrowUp":
        keys.up = 1;
        break;
      case "ArrowDown":
        keys.down = 1;
        break;
      }
  });/*}}}*/
}
/*}}}*/

function move_the_screen()
{/*{{{*/
  if (keys.left == 1 && (screen_x + 5 ) >= 0)
  {
    screen_x -= 10;
  }
  if (keys.right == 1 && (screen_x - 5) <= 500)
  {
    screen_x += 10;
  }
  if (keys.up == 1 && (screen_y + 5) >= 0)
  {
    screen_y -= 10;
  }
  if (keys.down == 1 && (screen_y - 5) <= 500)
  {
    screen_y += 10;
  }
}/*}}}*/

function new_dron()
{/*{{{*/
  if (main_house.queue.length < 5 && supply > supplied && mineralky >= 50)
  {
    mineralky -= 50;
    main_house.queue.push("dron");
    something_is_building += 1;
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
  if (main_house.queue_2.length < 5 && mineralky >= 100 && spawn_pool_exist == 1)
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
    damega_upgrading = 1;
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

function u_aciling()
{/*{{{*/
  if (main_house.queue_2.length < 5 && mineralky >= 100 && spawn_pool_exist == 1)
  {
    mineralky -= 100;
    main_house.queue_2.push("can_aciling");
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
  if (mineralky >= 150 && Object.values(select).length >= 1)
  {  
    let dron = Object.values(select)[0];
    dron.building = 1;
    dron.building_thing = "spawn_pool";
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
  if (mineralky >= 100 && Object.values(select).length >= 1)
  {  
    let dron = Object.values(select)[0];
    dron.building = 1;
    dron.building_thing = "evo_cham";
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

function new_sligen()
{/*{{{*/
  if (mineralky >= 125 && Object.values(select).length >= 1)
  {  
    let dron = Object.values(select)[0];
    dron.building = 1;
    dron.building_thing = "sligen";
    building = "sligen";
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

function new_mintow()
{/*{{{*/
  if (mineralky >= 100 && Object.values(select).length >= 1)
  {  
    let dron = Object.values(select)[0];
    dron.building = 1;
    dron.building_thing = "mintow";
    building = "moitow";
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

function build(x,y,type)
{/*{{{*/
  if (type == "spawn_pool")
  {
    supplied -= 1;
    mineralky -= 150;
    structure = new Structure();
    structure.type = type;
    structure.life = 900;
    structure.x = x;
    structure.y = y;
  }
  else if (type == "evo_cham")
  {
    mineralky -= 100;
    structure = new Structure();
    structure.type = type;
    structure.life = 500;
    structure.x = x;
    structure.y = y;
  }
  else if (type == "sligen")
  {
    mineralky -= 125;
    structure = new Structure();
    structure.type = type;
    structure.life = 400;
    structure.x = x;
    structure.y = y;
  }
  else if (type == "mintow")
  {    
    mineralky -= 100;
    structure = new Structure();
    structure.type = type;
    structure.life = 250;
    structure.x = x;
    structure.y = y;
    number_of_mintow += 1;
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
    something_is_building += 1;
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

function morf_to_aciling(select_unit_id)
{/*{{{*/
  if (mineralky >= 50 && can_build_aciling == 1)
  {
    mineralky -= 50;
    for (let unit of Object.values(units))
    {
      if (unit.id == select_unit_id)
      {
        unit.new_aciling();
      }
    }
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
          document.getElementById("need_upgrade").style.display = "block";
          setTimeout(() => {
          document.getElementById("need_upgrade").style.display = "none";
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
    maxX = Math.max((x_select_start + screen_x), (end_select_x + screen_x));
    maxY = Math.max((y_select_start + screen_y), (end_select_y + screen_y));
    minX = Math.min((x_select_start + screen_x), (end_select_x + screen_x));
    minY = Math.min((y_select_start + screen_y), (end_select_y + screen_y));
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
      if (unit.x > minX && unit.x < maxX && unit.y > minY && unit.y < maxY)
      {
        unit.am_I_selected = 1;
        if (unit.type == "aciling")
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
      document.getElementById("sligen_name").style.display = "none";
      document.getElementById("sligen_life").style.display = "none";
      document.getElementById("zergling_button").style.display = "none";
      document.getElementById("zergling_lifes").style.display = "none";
      document.getElementById("zergling_name").style.display = "none";
      document.getElementById("fast_zergling_button").style.display = "none";
      document.getElementById("ukazatel_velikosti_upradges").style.display = "none";
      document.getElementById("build_sligen").style.display = "none";
      document.getElementById("can_aciling").style.display = "none";
      document.getElementById("evolve_to_aciling").style.display = "none";
      document.getElementById("aciling_lifes").style.display = "none";
      document.getElementById("aciling_name").style.display = "none";
        for (let key2 in select)
        {
          if (select[key2].type == "zergling")
          {
            if (select[key2].type == "dron")
            {
              document.getElementById("drone_name").style.display = "block";
              document.getElementById("build_spool").style.display = "block";
              document.getElementById("build_evocham").style.display = "block";
              document.getElementById("build_sligen").style.display = "block";
              document.getElementById("minerals_name").style.display = "none" 
              document.getElementById("minerals_kapacita").style.display = "none";
            }
            else if (select[key2].type == "zergling")
            {
              document.getElementById("zergling_name").style.display = "block";
            }
          }
          else if (select[key2].type == "dron")
          {
            document.getElementById("drone_name").style.display = "block";
            document.getElementById("build_spool").style.display = "block";
            document.getElementById("build_evocham").style.display = "block";
            document.getElementById("build_sligen").style.display = "block";
            document.getElementById("minerals_name").style.display = "none" 
            document.getElementById("minerals_kapacita").style.display = "none";          
          }
          else
          {
            document.getElementById("aciling_name").style.display = "block";
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

function rush()
{/*{{{*/
    if (lenght_of_drones >= 1)
    {
      enemy = new Enemy_unit();
      let enemy_type = Math.round(Math.random() * 1) + 1;
      let attacker_y = Math.floor(Math.random()*500);
      let drone_ids = Object.keys(drones);
      let id_idx = Math.floor(Math.random() * drone_ids.length);
      let target = drone_ids[id_idx];
      zergling_rush = 1;
      enemy.target_id = drones[target].id;
      enemy.target = drones[target];
      if (enemy_type == 1)
      {
        enemy.type = "aciling";  
      }
      else
      {
        enemy.type = "zergling";
      }
      enemy.x = 25;
      enemy.y = attacker_y;
      enemy.action = "move";
    }
}/*}}}*/

function rush_call()
{/*{{{*/
  let i = 0;
  let enemy_number = Math.floor(Math.random() * 5) + 5;
  while (i <= enemy_number)
  {
    rush();
    i += 1;
  }
}/*}}}*/

function stop_all_sounds()
{/*{{{*/
  Object.values(sounds).forEach(sound => {
    sound.pause();
  });
}/*}}}*/

function get_minerals()
{/*{{{*/
  if (number_of_mintow > 0 && pauza != 1)
  {
    mineralky += (5 * number_of_mintow)
  }
}/*}}}*/

//buttons code
/*{{{*/

//new drone
new_drone_button.addEventListener("click", function() {
  new_dron();
});

//build spawn_pool
document.getElementById("build_spool").addEventListener("click", function() {
  new_spool();
});

//more supply
document.getElementById("more_supply_button").addEventListener("click", function() {
  new_supply_chamber();
});

//zergling 
document.getElementById("zergling_button").addEventListener("click", function() {
  new_zergling();
});

//speed zergling
document.getElementById("fast_zergling_button").addEventListener("click", function() {
  u_zergling_speed();
});

//evo_cham
document.getElementById("build_evocham").addEventListener("click", function() {
  new_evocham();
});

//more_damage
document.getElementById("more_damega").addEventListener("click", function() {
    if (damega_upgrade == 0 && damega_upgrading == 0)
    {
      u_damega();
    }
});

//slime generator
document.getElementById("build_sligen").addEventListener("click", function() {
  new_sligen();
});

//upgrade aciling can build
document.getElementById("can_aciling").addEventListener("click", function() {
  if (can_build_aciling == 0)
  {
    u_aciling();
  }
});

//change sligen type of slime
document.getElementById("change_sligen_efect").addEventListener("click", function() {
  let lenght_of_selected_things = Object.keys(select).length;
  if (lenght_of_selected_things == 1)
  {
    for (let struct of Object.values(structures))
    {
      if (struct.am_I_selected == 1)
      {
        if (struct.type_slime == 0)
        {
          struct.type_slime = 1;
        }
        else
        {
          struct.type_slime = 0;
        }
      }
    }
  }
});

//evolve to aciling
document.getElementById("evolve_to_aciling").addEventListener("click", function() {
  if (can_build_aciling == 1)
  {
    let lenght_of_selected_things = Object.keys(select).length;
    if (lenght_of_selected_things == 1)
    {
      for (let unit of Object.values(units))
      {
        if (unit.am_I_selected == 1)
        {
          morf_to_aciling(unit.id);
        }
      }
    }
  }
});

//pause button code
document.getElementById("pause").addEventListener("click" ,function() {
  if (pauza == 0)
  {
    pauza = 1;
    stop_all_sounds();  
  }
  else
  {
    pauza = 0;
  }
});

//build mining tower
document.getElementById("build_mintow").addEventListener("click", function() {
  new_mintow();
});

//cancel building
document.getElementById("cancel_building").addEventListener("click", function() {
  if (select.hasOwnProperty(main_house.id))
  {
    something_is_building -= 1;
    let poped_unit = main_house.queue.pop();  
    if (poped_unit == 'dron')
    {
      mineralky += 50;
    }
    else if (poped_unit == 'zergling')
    {
      mineralky += 50;
    }
    if (main_house.queue.length == 0)
    {
      main_house.progress = 0;
      document.getElementById("ukazatel_velikosti_units").style.display = " none";
      document.getElementById("cancel_building").style.display = " none";
    }
    console.log(poped_unit);
  }
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
               if (unit.type == "zergling")
               {
                 unit.am_I_selected = 1;
                 select[unit.id] = unit;
               }
             }
             document.getElementById("zergling_lifes").textContent = "Lifes:" + unit.life;
             document.getElementById("zergling_lifes").style.display = "block";
             document.getElementById("zergling_name").style.display = "block";
             sounds.dron_select.play();
             clicks = 0;
           }
           else if (unit.click_zergling(x_click,y_click) && unit.type == "aciling")
           {
             for (let unit of Object.values(units))
             {
               if (unit.type == "aciling")
               {
                 unit.am_I_selected = 1;
                 select[unit.id] = unit;
               }
             }
             document.getElementById("aciling_lifes").textContent = "Lifes:" + unit.life;
             document.getElementById("aciling_lifes").style.display = "block";
             document.getElementById("aciling_name").style.display = "block";
             sounds.dron_select.play();
             clicks = 0;
           }
        }
      }
      clicks = 0;
    }, 200);
  }
});/*}}}*/

