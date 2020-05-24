const app = new Application();

document.body.appendChild(app.view);

Loader.add("res/sprites.json").load(setup);

function setup() {
  let sheet = Loader.resources["res/sprites.json"].spritesheet;
  let animatedSprite = new PIXI.AnimatedSprite(sheet.animations["Satyr"]);
  animatedSprite.x = app.screen.width / 2;
  animatedSprite.y = app.screen.height / 2;
  animatedSprite.anchor.set(0.5);
  animatedSprite.animationSpeed = 0.5;
  animatedSprite.play();

  app.stage.addChild(animatedSprite);
}
