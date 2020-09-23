//move the hero
//display hero
//display enemies
//make enemies move
//make shoot bullet
//make bullets move
//make bullets kill dude
// (easy) Get the hero to move up/down/left/right
//  (easy) Change the background of the game
//  (easy) Get 7 enemies to show up instead of 4 at a time
//  (intermediate) Get another type of enemy airplane to show up
//  (advanced) Collision Detection for the airplanes – when the hero collides with the enemy, have your score go down by 500.
//  (advanced) Collision Detection for the bullet – Have the score go up by 10 when an enemy is struck down.
//  (advanced) Get the enemy to explode when it is hit
//  (advanced) When the bullet hits, make a sound.

var hero = {
    x: 300,
    y: 500,
    ratex: 0,
    ratey: 0,
    z: 0,
};

var enemies = [
    { x: 50, y: 50, z: 180, hp: 1, type: 1 },
    { x: 250, y: 50, z: 180, hp: 1, type: 1 },
    { x: 450, y: 50, z: 180, hp: 1, type: 1 },
    { x: 130, y: 130, z: 90, hp: 1, type: 2 },
    { x: 140, y: 150, z: 90, hp: 1, type: 2 },
    { x: 150, y: 170, z: 90, hp: 1, type: 2 },
    { x: 50, y: 100, z: 270, hp: 1, type: 3 },
    { x: 250, y: 100, z: 270, hp: 1, type: 3 },
    { x: 450, y: 100, z: 270, hp: 1, type: 3 },
];

var explosions = [{ x: 50, y: 50, size: 0 }];

var bullets = [
    { x: 0, y: 0, ratey: 1, z: 0 }
];

function displayEnemies() {
    var output = "";
    for (i = 0; i < enemies.length; i++) {
        output +=
            "<div class='enemy" +
            enemies[i].type +
            "' style='top: " +
            enemies[i].y +
            "px; left: " +
            enemies[i].x +
            "px; transform: rotate(" +
            enemies[i].z +
            "deg);'></div>";
    }
    document.getElementById("enemies").innerHTML = output;
    // console.log(output);
}

function explosion() {
    var output = "";
    for (i = 0; i < explosions.length; i++) {
        output +=
            "<div class='explosion' style='top: " +
            explosions[i].y +
            "px; left: " +
            explosions[i].x +
            "px; transform: scale( " +
            explosions[i].size +
            ", " +
            explosions[i].size +
            " );'></div>";
    }
    document.getElementById("explosions").innerHTML = output;
}

function displayBullets() {
    var output = "";
    for (i = 0; i < bullets.length; i++) {
        output +=
            "<div class='bullet' style='top: " +
            bullets[i].y +
            "px; left: " +
            bullets[i].x +
            "px;'></div>";
    }
    document.getElementById("bullets").innerHTML = output;
    // console.log(output);
}

function displayHero() {
    if (hero.y <= 530 && hero.y >= 15) {
        hero.y += hero.ratey;
    } else if (hero.y <= 15) {
        hero.y = 16;
    } else {
        hero.y = 529;
    }

    if (hero.x <= 980 && hero.x >= 15) {
        hero.x += hero.ratex;
    } else if (hero.x <= 15) {
        hero.x = 16;
    } else {
        hero.x = 979;
    }

    document.getElementById("hero").style.top = hero.y + "px";
    document.getElementById("hero").style.left = hero.x + "px";
}

function moveEnemies() {
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].z == 0) {
            enemies[i].y -= 2;
        } else if (enemies[i].z == 180) {
            enemies[i].y += 2;
        } else if (enemies[i].z == 90) {
            enemies[i].x += 2;
        } else if (enemies[i].z == 270) {
            enemies[i].x -= 2;
        }
        if (enemies[i].y <= enemies[i].type * 20) {
            enemies[i].z = 90;
            enemies[i].y = enemies[i].type * 20 + 1;
        } else if (enemies[i].y >= enemies[i].type * 100 + 200) {
            enemies[i].z = 270;
            enemies[i].y = enemies[i].type * 100 + 199;
        } else if (enemies[i].x >= enemies[i].type * 100 + 500) {
            enemies[i].z = 180;
            enemies[i].x = enemies[i].type * 100 + 499;
        } else if (enemies[i].x <= enemies[i].type * 30) {
            enemies[i].z = 0;
            enemies[i].x = enemies[i].type * 30 + 1;
        }
        if (enemies[i].hp <= 0) {
            explosions.push({x: enemies[i].x, y: enemies[i].y, size: enemies[i].type});
            enemies.splice(i, 1);
        }
    }
}

function moveBullets() {
    for (i = 0; i < bullets.length; i++) {
        if (bullets[i].z == 0) {
            bullets[i].y -= 2 - bullets[i].ratey / 3;
        } else if (bullets[i].z == 180) {
            bullets[i].y += 2;
        } else if (bullets[i].z == 90) {
            bullets[i].x += 2;
        } else if (bullets[i].z == 270) {
            bullets[i].x -= 2;
        }
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}
var score = 0;
function detectCollision() {
    for (i = 0; i < enemies.length; i++) {
        if (
            hero.x >= enemies[i].x - 20 &&
            hero.x <= enemies[i].x + 20 &&
            hero.y >= enemies[i].y - 20 &&
            hero.y <= enemies[i].y + 20
        ) {
            // console.log("GOTCHA CRASH BOOM");
            score -= 5;
        }
    }
}

function detectBulletCollision() {
    for (i = 0; i < enemies.length; i++) {
        for (j = 0; j < bullets.length; j++) {
            if (
                bullets[j].x >= enemies[i].x - 20 &&
                bullets[j].x <= enemies[i].x + 20 &&
                bullets[j].y >= enemies[i].y - 20 &&
                bullets[j].y <= enemies[i].y + 20
            ) {
                // console.log("GOTCHA CRASH BOOM");
                score += 500;
                enemies[i].hp -=1
            }
        }
    }
}

function updateScore() {
    document.getElementById("score").innerHTML = score;
}

// bulletMovement{ }

displayHero();
displayEnemies();
displayBullets();

function gameLoop() {
    moveEnemies();
    moveBullets();
    displayHero();
    displayBullets();
    displayEnemies();
    detectCollision();
    updateScore();
    detectBulletCollision();
    explosion();
}

setInterval(gameLoop, 10);

function spawnBullet() {
    bullets.push({ x: hero.x, y: hero.y, ratey: hero.ratey, z: hero.z });
}

// 1000 x 563

document.onkeydown = function (e) {
    if (e.keyCode == 39 && hero.ratex <= 3) {
        hero.ratex += 1;
    }
    if (e.keyCode == 38 && hero.ratey >= -3) {
        hero.ratey -= 1;
    }
    if (e.keyCode == 37 && hero.ratex >= -3) {
        hero.ratex -= 1;
    }
    if (e.keyCode == 40 && hero.ratey <= 3) {
        hero.ratey += 1;
    }
    if (e.keyCode == 32) {
        // hero.ratey += 1;
        console.log("BANG");
        spawnBullet();
    }
    // console.log(e);
};
