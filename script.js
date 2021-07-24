

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    function floor(x, height) {
      this.x = x;
      this.width = 860;
      this.height = height;
      this.obstr =1220+(Math.floor(Math.random()*140)*5);
      this.obstr1 =1220+(Math.floor(Math.random()*140)*5);
      this.random1=Math.floor(Math.random()*100)
      this.l=0
    }
    var flag0=1
    var l=0
    var bad=450
    var flagBad=1
    var flagColl=0
    var boost=100
    var world = {
      height: 620,
      width: 840,
      gravity: 4,
      highestFloor: 240,
      speed: 5,
      distanceTravelled: 0,
      points:0,
      floorTiles: [
        new floor(0, 110)
      ],
      moveFloor: function() {
        for(index in this.floorTiles) {
          var tile = this.floorTiles[index];
          tile.x -= this.speed;
          tile.obstr -= this.speed;
          tile.obstr1 -= this.speed;
          this.distanceTravelled += this.speed;
          
          if(bad!=110&&flagBad==1){
          bad=bad-0.5}else{
            bad=bad+0.5
            flagBad=0
            if(bad==510){flagBad=1}
          }
        }
        },
      addFutureTiles: function() {
        if(this.floorTiles.length >= 3) {
          return;
        }
        var previousTile = this.floorTiles[this.floorTiles.length - 1];
        var randomHeight = 110;
        var leftValue = (previousTile.x + previousTile.width);
        var next = new floor(leftValue, randomHeight);
        this.floorTiles.push(next);
      },
      cleanOldTiles: function() {
        for(index in this.floorTiles) {
          if(this.floorTiles[index].x <= -this.floorTiles[index].width) {
            this.floorTiles.splice(index, 1);
          }
          
        }
      },
      tick: function() {
        this.cleanOldTiles();
        this.addFutureTiles();
        this.moveFloor();
      },
      
      draw: function() {
        ctx.fillStyle = "#FFB6C1";
        ctx.fillRect (0, 0, this.width, this.height);
        for(index in this.floorTiles) {
          var tile = this.floorTiles[index];
          var y = world.height - tile.height;
          
          ctx.fillStyle = "#B0E0E6";
          ctx.fillRect(tile.x, y, tile.width, tile.height);
          
          ctx.fillStyle = "#FFB6C1";
          ctx.fillRect(tile.obstr1, y, 120, tile.height);
          
          ctx.fillStyle = "grey";
          if((tile.obstr1+tile.random1>148&&tile.obstr1+tile.random1<210)&&(player.y<250+tile.random1&&player.y>200+tile.random1)){
            world.points=world.points+25
            flag0=500
            tile.l=1
            document.getElementById("life").innerHTML="INVISIBLE"
            //powerup
            function time(){
              flag0=1
              document.getElementById("life").innerHTML=""
            }
            setTimeout(time,2500)

          }else
          if(tile.l==0){
            ctx.fillRect(tile.obstr1+tile.random1,200+tile.random1,12,12);

          }
          ctx.fillStyle = "#F08080";
          ctx.fillRect(tile.obstr1+35, bad, 50, tile.height-70);
          
          if(flagColl=0){
            if((tile.obstr1>75)&&(tile.obstr1<175)&&(((player.y>bad-50)&&(player.y<bad)))){flag0--}
          }else{
            if((tile.obstr1>75)&&(tile.obstr1<175)&&(((player.y>bad)&&(player.y<bad+90)))){flag0--}
          }
          
          if((tile.obstr1>=65&&tile.obstr1<=185)&&player.y==510){
            console.log("collision")
            flag0--
          }
          
        }
      },draw1: function() {
        
        for(index in this.floorTiles) {
          var tile = this.floorTiles[index];
          var y = world.height - tile.height;
         ctx.fillStyle = "#B0E0E6";
          ctx.fillRect(tile.x, 0, tile.width, tile.height);
            ctx.fillStyle = "#FFB6C1";
          ctx.fillRect(tile.obstr, 0, 120, tile.height);
          
            if((tile.obstr>=65&&tile.obstr<=185)&&player.y==160){console.log("cccc")
            flag0--} 
           //speed boost after some distance
            if(world.distanceTravelled/100>boost){
              world.speed=world.speed+0.5
              world.gravity=world.gravity+0.5
              boost=boost+100
            } 
          
          
        }
      }
    };
    var player = {
      x: 160,
      y: 510,
      height: 50,
      width: 50,
      gravity1:0,
      draw: function() {
      if(this.gravity1!=-5&&player.y!=160){    
      ctx.beginPath();
      ctx.moveTo(player.x+25, player.y - player.height);
      ctx.lineTo(player.x, player.y);
      ctx.lineTo(player.x+50, player.y);
      ctx.closePath();
      ctx.fillStyle = "#00CC99";
      ctx.fill();
      flagColl=0       
      player.y=player.y+player.gravity1
      if(player.y==160){player.gravity1=0
        flag=1
      }
      if(player.gravity1==5){
        if(player.y==510){player.gravity1=0
          flag=1
        }
      }}else{
        ctx.beginPath();
      ctx.moveTo(player.x+25, player.y);
      ctx.lineTo(player.x,player.y - player.height);
      ctx.lineTo(player.x+50, player.y - player.height);
      ctx.closePath();
      ctx.fillStyle = "#00CC99";
      ctx.fill();
      flagColl=1       
      player.y=player.y+player.gravity1
      if(player.y==160){player.gravity1=0
        flag=1
      }
      if(player.gravity1==5){
        if(player.y==510){player.gravity1=0
          flag=1
        }
      }

      }
      
      }
      
    };
    function tick() {
      world.tick();
      world.draw();
      world.draw1();
      function tick1() {window.setTimeout("tick()", 1000/60);}
      player.draw();
      if(flag0>=1){
      tick1()
      }else{
        var score=world.points+Math.floor(Math.round(world.distanceTravelled/100))
        console.log(score) 
        var HighScore = localStorage.getItem("HighScore");
        if(HighScore==null){HighScore=score}
        if(score>=HighScore){
        localStorage.setItem("HighScore",score);
        }
        ctx.font = "26px Arial";
        ctx.fillText("HighScore:",200,250)
        ctx.fillText(HighScore, 334, 250);
        ctx.fillText("YourScore:",200,280)
        ctx.fillText(score,334,280)
      }
    // document.getElementById("life").innerHTML="Life Points:"+flag0
    }
    
    tick();
    var count=1
    var flag=1
    
    window.addEventListener("click",function(){
      if(flag==1){
      if(count%2==0){
      player.gravity1=5
      flag=0
      }else{
        player.gravity1=-5
        flag=0
      }
      count++
    }})
    