const config = {
  type: Phaser.AUTO,
  width: 600, 
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  // Cargar las imágenes exportadas por LDtk
  this.load.image('level_image', 'NuevoJuego/simplified/level_0/_composite.png'); // Imagen compuesta del nivel
  // Cargar el archivo JSON del nivel
  this.load.json('level_data', 'NuevoJuego/simplified/level_0/data.json');
  // Cargar la imagen del personaje (si está en un sprite sheet)
  this.load.spritesheet('player', 'assets/monochrome-transparent_packed.png', { frameWidth: 16, frameHeight: 16 }); // Ajusta las dimensiones según el tamaño de tu sprite
}

function create() {

  const screenWidth = this.cameras.main.width;
  const screenHeight = this.cameras.main.height;
  
  const levelImage = this.add.image(screenWidth / 2, screenHeight / 2, 'level_image')
    .setOrigin(0.5, 0.5) // Establecer el origen al centro de la imagen
    .setScale(2);

  // Leer el archivo JSON cargado
  const levelData = this.cache.json.get('level_data');

  // Obtener las coordenadas y dimensiones de la entidad
  const playerData = levelData.entities.entity[0]; // Asumiendo que sólo hay un personaje
  const playerX = playerData.x * 2;
  const playerY = playerData.y * 2;

  // Crear el personaje en el escenario
  const player = this.add.sprite(playerX, playerY, 'player', 177)
    .setOrigin(-1, -1) // Centrar la imagen del jugador
    .setDisplaySize(40, 40); // Ajustar tamaño de la entidad

    // Añadir el control de teclas
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // Propiedades del movimiento
    player.speed = 100; // Velocidad de movimiento en píxeles por segundo
  
    // Función de actualización para el movimiento
    this.update = function() {
      // Movimiento hacia la izquierda
      if (this.cursors.left.isDown) {
        player.x -= player.speed * this.game.loop.delta / 1000;
      }
      // Movimiento hacia la derecha
      if (this.cursors.right.isDown) {
        player.x += player.speed * this.game.loop.delta / 1000;
      }
      // Movimiento hacia arriba
      if (this.cursors.up.isDown) {
        player.y -= player.speed * this.game.loop.delta / 1000;
      }
      // Movimiento hacia abajo
      if (this.cursors.down.isDown) {
        player.y += player.speed * this.game.loop.delta / 1000;
      }
    };

}
