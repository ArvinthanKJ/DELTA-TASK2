

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    function floor(x, height) {
      this.x = x;
      this.width = 860;
      this.height = height;
      this.obstr =1220+(Math.floor(Math.random()*140)*5);
      this.obstr1 =1220+(Math.floor(Math.random()*140)*5);
    }
    var flag0=1
    var world = {
      height: 620,
      width: 840,
      gravity: 10,
      highestFloor: 240,
      speed: 5,
      distanceTravelled: 0,
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
          
          if((tile.obstr1>=65&&tile.obstr1<=185)&&player.y==510){
            console.log("collision")
            flag0=0
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
            flag0=0}  
          
          
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
        ctx.fillStyle = "#00CC99";
        ctx.fillRect(player.x, player.y - player.height, this.height, this.width);
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
      
    };
    function tick() {
      world.tick();
      world.draw();
      world.draw1();
      function tick1() {window.setTimeout("tick()", 1000/60);}
      player.draw();
      if(flag0==1){
      tick1()
      }else{
        var score=world.distanceTravelled%100
        console.log(score) 
        var HighScore = localStorage.getItem("HighScore");
        if(HighScore==null){HighScore=score}
        if(score>HighScore){
        localStorage.setItem("HighScore",score);
        }
        ctx.font = "26px Arial";
        ctx.fillText("HighScore:",200,250)
        ctx.fillText(HighScore, 334, 250);
        ctx.fillText("YourScore:",200,280)
        ctx.fillText(score,334,280)
      }
     
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
    