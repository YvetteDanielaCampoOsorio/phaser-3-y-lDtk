const config = {
  type: Phaser.AUTO,
  width: 600, 
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update // Mover la lógica de movimiento aquí
  }
};

const game = new Phaser.Game(config);

// Configuración del mapa
const tileSize = 40; // Tamaño de cada tile en píxeles
const collisionMap = [ // Matriz del mapa (0 = transitable, 1 = colisión)
  0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1,
  // Resto de tu mapa...
];
const mapWidth = 16; // Número de tiles por fila

let player;
let cursors;

function preload() {
  this.load.image('level_image', 'NuevoJuego/simplified/level_0/_composite.png'); 
  this.load.spritesheet('player', 'assets/monochrome-transparent_packed.png', { frameWidth: 16, frameHeight: 16 });
}

function create() {
  // Dibujar el nivel
  const levelImage = this.add.image(300, 300, 'level_image').setScale(2);

  // Crear el jugador
  player = this.add.sprite(80, 80, 'player', 177)
    .setDisplaySize(tileSize, tileSize); // Ajustar tamaño del jugador

  // Habilitar teclas
  cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  const speed = 200; // Velocidad en píxeles por segundo
  const moveDistance = (speed * delta) / 1000; // Distancia a mover por frame
  let newX = player.x;
  let newY = player.y;

  // Movimiento y detección de colisiones
  if (cursors.left.isDown) {
    newX -= moveDistance;
    if (!canMoveTo(newX, player.y)) newX = player.x; // Bloquear si hay colisión
  }
  if (cursors.right.isDown) {
    newX += moveDistance;
    if (!canMoveTo(newX, player.y)) newX = player.x;
  }
  if (cursors.up.isDown) {
    newY -= moveDistance;
    if (!canMoveTo(player.x, newY)) newY = player.y;
  }
  if (cursors.down.isDown) {
    newY += moveDistance;
    if (!canMoveTo(player.x, newY)) newY = player.y;
  }

  player.x = newX;
  player.y = newY;

  console.log(`Jugador en posición: (${newX}, ${newY})`);
}

// Función para verificar si el jugador puede moverse a una posición
function canMoveTo(x, y) {
  const tileX = Math.floor(x / tileSize);
  const tileY = Math.floor(y / tileSize);
  const index = tileY * mapWidth + tileX;

  // Validar si el índice está dentro del rango y si el tile es transitable
  return collisionMap[index] === 0;
}


// const player = this.add.sprite(playerX, playerY, 'player', 177)
//     .setOrigin(-1, -1) // Centrar la imagen del jugador
//     .setDisplaySize(40, 40); // Ajustar tamaño de la entidad

//   0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0,
//   0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1,
//   0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
//   0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
//   0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 
//   1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 
//   0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
//   1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
//   0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 
//   0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 
//   0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
//   1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1