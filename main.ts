namespace SpriteKind {
    export const Attack = SpriteKind.create()
    export const ItemBox = SpriteKind.create()
    export const NA = SpriteKind.create()
    export const Rocket = SpriteKind.create()
    export const InVal = SpriteKind.create()
    export const DropRing = SpriteKind.create()
    export const Explode = SpriteKind.create()
    export const CutBoss = SpriteKind.create()
    export const Slope = SpriteKind.create()
    export const YellowLeftSpring = SpriteKind.create()
    export const Grab = SpriteKind.create()
    export const animOverlay = SpriteKind.create()
}
function StateMachine () {
    idleLeft = createFlipped(assets.animation`SStandR`)
    walkLeft = createFlipped(assets.animation`SWalkR`)
    runLeft = createFlipped(assets.animation`SSprintR`)
    crouchLeft = createFlipped(assets.animation`SCrouchR`)
    revLeft = createFlipped(assets.animation`SSpindashR`)
    waitLeft = createFlipped(assets.animation`SImpatientR`)
    skidLeft = createFlipped(assets.animation`SSkidR`)
    characterAnimations.loopFrames(
    sonicOverlay,
    assets.animation`SStandR`,
    200,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    idleLeft,
    200,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    assets.animation`SWalkR`,
    100,
    characterAnimations.rule(Predicate.Moving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    walkLeft,
    100,
    characterAnimations.rule(Predicate.Moving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    assets.animation`SSprintR`,
    100,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    runLeft,
    100,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    assets.animation`SRoll_Jump`,
    75,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    assets.animation`SCrouchR`,
    200,
    characterAnimations.rule(characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight, Predicate.FacingDown))
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    crouchLeft,
    200,
    characterAnimations.rule(characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft, Predicate.FacingDown))
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    assets.animation`SSpindashR`,
    75,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    revLeft,
    75,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    assets.animation`SImpatientR`,
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    waitLeft,
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    assets.animation`SSkidR`,
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.MovingLeft, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    sonicOverlay,
    skidLeft,
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingRight, Predicate.Moving)
    )
}
function createFlipped (anim: Image[]) {
    tempList = []
    for (let Frame = 0; Frame <= anim.length - 1; Frame++) {
        tempImage = anim[Frame]
        tempImage.flipX()
        tempList.push(tempImage)
    }
    return tempList
}
function Camera () {
    if (PlayerControl == true) {
        if (Direction == 1) {
            CameraTargetX = sonicHitbox.x + 35
        } else if (Direction == -1) {
            CameraTargetX = sonicHitbox.x - 35
        } else {
            CameraTargetX = sonicHitbox.x
        }
        if (Math.abs(scene.cameraProperty(CameraProperty.X) - CameraTargetX) > 2 || Math.abs(scene.cameraProperty(CameraProperty.Y) - CurrentCameraY) > 0) {
            if (CurrentCameraY < sonicHitbox.y) {
                CurrentCameraY = scene.cameraProperty(CameraProperty.Y) + (Math.abs(sonicHitbox.y) - CurrentCameraY) * gamma
            }
            if (CurrentCameraY > sonicHitbox.y) {
                CurrentCameraY = scene.cameraProperty(CameraProperty.Y) - (CurrentCameraY - Math.abs(sonicHitbox.y)) * gamma
            }
            if (scene.cameraProperty(CameraProperty.X) < CameraTargetX) {
                CurrentCameraX = scene.cameraProperty(CameraProperty.X) + (CameraTargetX - scene.cameraProperty(CameraProperty.X)) * alpha
            } else if (scene.cameraProperty(CameraProperty.X) > CameraTargetX) {
                CurrentCameraX = scene.cameraProperty(CameraProperty.X) - (scene.cameraProperty(CameraProperty.X) - CameraTargetX) * alpha
            }
        }
        scene.centerCameraAt(CurrentCameraX, CurrentCameraY)
    }
}
scene.onHitWall(SpriteKind.DropRing, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        sprite.vy = sprite.vy * -0.85
        sprite.vx += sprite.vx * -0.25
    }
    if (sprite.isHittingTile(CollisionDirection.Right)) {
        sprite.vx = sprite.vx * -1
    } else if (sprite.isHittingTile(CollisionDirection.Left)) {
        sprite.vx = sprite.vx * -1
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sonicHitbox.vy != 0 && !(sonicSuperForm)) {
        sonicSuperForm = true
        transforming = true
        sonicHitbox.vx = 0
        sonicHitbox.vy = 0
        sonicHitbox.ay = 0
        characterAnimations.clearCharacterState(sonicOverlay)
        characterAnimations.setCharacterAnimationsEnabled(sonicOverlay, false)
        animation.runImageAnimation(
        sonicOverlay,
        assets.animation`STransformR`,
        100,
        true
        )
        color.setColor(6, color.parseColorString("#fcfc00"))
        timer.background(function () {
            color.setColor(8, color.parseColorString("#b4b400"), 200)
        })
        timer.after(500, function () {
            transforming = false
            animation.stopAnimation(animation.AnimationTypes.All, sonicOverlay)
            characterAnimations.setCharacterAnimationsEnabled(sonicOverlay, true)
        })
    } else if (sonicHitbox.vy != 0 && sonicSuperForm) {
        sonicSuperForm = true
        transforming = true
        sonicHitbox.vx = 0
        sonicHitbox.vy = 0
        sonicHitbox.ay = 0
        characterAnimations.clearCharacterState(sonicOverlay)
        characterAnimations.setCharacterAnimationsEnabled(sonicOverlay, false)
        animation.runImageAnimation(
        sonicOverlay,
        assets.animation`STransformR`,
        100,
        false
        )
        color.setColor(6, color.parseColorString("#0040FF"))
        timer.background(function () {
            color.setColor(8, color.parseColorString("#00348F"), 500)
        })
        timer.after(500, function () {
            sonicSuperForm = false
            transforming = false
            animation.stopAnimation(animation.AnimationTypes.All, sonicOverlay)
            characterAnimations.setCharacterAnimationsEnabled(sonicOverlay, true)
        })
    }
})
function PlayerHurt (enemyX: number) {
    if (Hurt == false) {
        Hurt = true
        sonicHitbox.vy = -125
        if (enemyX > sonicHitbox.x) {
            sonicHitbox.vx = -100
        } else if (enemyX < sonicHitbox.x) {
            sonicHitbox.vx = 100
        }
        RingFly(info.score())
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PlayerControl == true) {
        if (!(controller.down.isPressed())) {
            if (sonicHitbox.vy == 0) {
                SpindashMultiplier = 1
                Rolling = false
                sonicHitbox.vy = -425
                music.play(music.createSoundEffect(WaveShape.Square, 642, 2015, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            } else if (InstaUp == false) {
                InstaUp = true
                InstaShield = sprites.create(assets.image`blank_32-32`, SpriteKind.Attack)
                animation.runImageAnimation(
                InstaShield,
                assets.animation`InstaShield`,
                50,
                false
                )
                timer.after(250, function () {
                    sprites.destroy(InstaShield)
                })
                music.play(music.createSoundEffect(WaveShape.Noise, 3520, 3748, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            }
        } else {
            if (sonicHitbox.vy == 0) {
                music.play(music.createSoundEffect(WaveShape.Square, 446, 1071, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                SpindashMultiplier = SpindashMultiplier * 1.5
                if (SpindashMultiplier > 15) {
                    SpindashMultiplier = 15
                }
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.DropRing, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.setKind(SpriteKind.InVal)
    animation.runImageAnimation(
    otherSprite,
    assets.animation`FLASHBANG`,
    50,
    false
    )
    music.play(music.stringPlayable("C6:1~2 E6:1~2 G6:1~2 C7:1~2", 540), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite)
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (Math.abs(sonicHitbox.vx) < 10 && Math.abs(sonicHitbox.vx) >= 0 && SpindashMultiplier > 1) {
        sonicHitbox.vx = SpindashMultiplier * (Direction * 100)
        SpindashMultiplier = 1
        Rolling = true
        music.play(music.createSoundEffect(WaveShape.Noise, 2388, 5000, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ItemBox, function (sprite, otherSprite) {
    if (Rolling == true || sprite.vy != 0) {
        sprite.vy = -125
        otherSprite.setKind(SpriteKind.NA)
        animation.runImageAnimation(
        otherSprite,
        assets.animation`RBDestroyed`,
        50,
        true
        )
        info.changeScoreBy(10)
    }
})
function SetHandlePosition (CenterX: number, CenterY: number, Handle: Sprite) {
    sprites.setDataNumber(Handle, "X", CenterX + Radius * Math.cos(BallCurrentRadi))
    sprites.setDataNumber(Handle, "Y", CenterY + Radius * Math.sin(BallCurrentRadi))
    Handle.setPosition(sprites.readDataNumber(Handle, "X"), sprites.readDataNumber(Handle, "Y"))
    if (BallCurrentRadi < 0) {
        BallVelocity = 0.025
    } else if (BallCurrentRadi > 3) {
        BallVelocity = -0.025
    }
    BallCurrentRadi += BallVelocity
}
spriteutils.createRenderable(0, function (screen2) {
    for (let GrabVines of sprites.allOfKind(SpriteKind.Grab)) {
        screen2.drawLine(120 - (scene.cameraProperty(CameraProperty.X) - GrabVines.x), 84 - (scene.cameraProperty(CameraProperty.Y) - GrabVines.y), 120 - (scene.cameraProperty(CameraProperty.X) - sprites.readDataNumber(GrabVines, "SpawnX")), 84 - (scene.cameraProperty(CameraProperty.Y) - sprites.readDataNumber(GrabVines, "SpawnY")), 5)
        screen2.drawLine(120 - (scene.cameraProperty(CameraProperty.X) - (GrabVines.x - 1)), 84 - (scene.cameraProperty(CameraProperty.Y) - GrabVines.y), 120 - (scene.cameraProperty(CameraProperty.X) - (sprites.readDataNumber(GrabVines, "SpawnX") - 1)), 84 - (scene.cameraProperty(CameraProperty.Y) - sprites.readDataNumber(GrabVines, "SpawnY")), 5)
        screen2.drawLine(120 - (scene.cameraProperty(CameraProperty.X) - (GrabVines.x + 1)), 84 - (scene.cameraProperty(CameraProperty.Y) - GrabVines.y), 120 - (scene.cameraProperty(CameraProperty.X) - (sprites.readDataNumber(GrabVines, "SpawnX") + 1)), 84 - (scene.cameraProperty(CameraProperty.Y) - sprites.readDataNumber(GrabVines, "SpawnY")), 5)
    }
})
spriteutils.createRenderable(0, function (screen2) {
    for (let tempGrabber = 0; tempGrabber <= GrabberList.length; tempGrabber++) {
        if (HandleList[tempGrabber]) {
            SetHandlePosition(GrabberList[tempGrabber].x, GrabberList[tempGrabber].y, HandleList[tempGrabber])
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sonicHitbox.vy == 0 && Math.abs(sonicHitbox.vx) > 19) {
        Rolling = true
        music.play(music.createSoundEffect(WaveShape.Noise, 2388, 5000, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    }
})
function InitVine (X: number, Y: number, Grabber: tiles.Location) {
    GrabberList.push(Grabber)
    Radius = 60
    tempHandle = sprites.create(assets.image`Grabber`, SpriteKind.Grab)
    tempHandle.setPosition(X + 8, Y + Radius)
    sprites.setDataNumber(tempHandle, "SpawnX", X + 8)
    sprites.setDataNumber(tempHandle, "SpawnY", Y)
    BallCurrentRadi = 0
    BallVelocity = 0.025
    HandleList.push(tempHandle)
}
function RingFly (amountOfRings: number) {
    if (info.score() > 0) {
        AmountOfRings = amountOfRings
        if (AmountOfRings > 30) {
            AmountOfRings = 30
        }
        info.setScore(info.score() - amountOfRings)
        music.play(music.createSoundEffect(WaveShape.Noise, 301, 286, 255, 255, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        Gibblets = [sprites.create(assets.image`Gibble`, SpriteKind.InVal)]
        for (let index = 0; index <= AmountOfRings - 2; index++) {
            Gibblets.unshift(sprites.create(assets.image`Gibble`, SpriteKind.InVal))
        }
        for (let GibbletSprite of Gibblets) {
            GibbletSprite.setPosition(sonicHitbox.x, sonicHitbox.y)
            GibbletSprite.vy = randint(-150, -100)
            GibbletSprite.ay = 400
            GibbletSprite.vx = randint(-35, 35)
            animation.runImageAnimation(
            GibbletSprite,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            75,
            true
            )
        }
        pauseUntil(() => sonicHitbox.vy == 0)
        Hurt = false
    } else if (info.score() < 1) {
        PlayerControl = true
        characterAnimations.clearCharacterState(sonicHitbox)
        sonicHitbox.setFlag(SpriteFlag.Ghost, true)
        sonicHitbox.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    timer.after(1000, function () {
        characterAnimations.setCharacterAnimationsEnabled(sonicHitbox, false)
        music.stopAllSounds()
        PlayerControl = true
        Direction = 1
        animation.runImageAnimation(
        sonicHitbox,
        assets.animation`SVictoryR`,
        100,
        false
        )
        sonicHitbox.vx = 0
        sonicHitbox.vy = 0
        music.play(music.createSong(assets.song`Act Complete`), music.PlaybackMode.UntilDone)
        timer.after(1000, function () {
            game.reset()
        })
    })
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    timer.after(1000, function () {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`Game Over`), music.PlaybackMode.UntilDone)
        timer.after(1000, function () {
            game.reset()
        })
    })
})
sprites.onCreated(SpriteKind.InVal, function (sprite) {
    timer.after(500, function () {
        if (!(spriteutils.isDestroyed(sprite))) {
            sprite.setKind(SpriteKind.DropRing)
        }
        timer.after(3000, function () {
            if (!(spriteutils.isDestroyed(sprite))) {
                sprites.destroy(sprite)
            }
        })
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.YellowLeftSpring, function (sprite, otherSprite) {
    Direction = -1
    sonicHitbox.vx = -375
    Rolling = true
    animation.runImageAnimation(
    Springs,
    assets.animation`YSpringLBounce`,
    50,
    false
    )
    timer.after(250, function () {
        pauseUntil(() => controller.anyButton.isPressed())
        Rolling = false
    })
})
let WaitTimer = 0
let Gibblets: Sprite[] = []
let AmountOfRings = 0
let tempHandle: Sprite = null
let BallVelocity = 0
let BallCurrentRadi = 0
let Radius = 0
let InstaShield: Sprite = null
let InstaUp = false
let CurrentCameraX = 0
let CurrentCameraY = 0
let CameraTargetX = 0
let tempImage: Image = null
let tempList: Image[] = []
let skidLeft: Image[] = []
let waitLeft: Image[] = []
let revLeft: Image[] = []
let crouchLeft: Image[] = []
let runLeft: Image[] = []
let walkLeft: Image[] = []
let idleLeft: Image[] = []
let PlayerControl = false
let Hurt = false
let Springs: Sprite = null
let SlopeSprite: Sprite = null
let RingBox: Sprite = null
let HandleList: Sprite[] = []
let GrabberList: tiles.Location[] = []
let SpindashMultiplier = 0
let Direction = 0
let Rolling = false
let sonicOverlay: Sprite = null
let sonicHitbox: Sprite = null
let gamma = 0
let alpha = 0
let transforming = false
let sonicSuperForm = false
let BossPattern = 0
let BossStart = false
sonicSuperForm = false
transforming = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 240
    export const ARCADE_SCREEN_HEIGHT = 168
}
alpha = 0.2
gamma = 0.4
sonicHitbox = sprites.create(assets.image`Sonic Standhitbox`, SpriteKind.Player)
sonicOverlay = sprites.create(assets.image`Sonic Stand`, SpriteKind.animOverlay)
characterAnimations.setCharacterState(sonicHitbox, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
scene.setBackgroundImage(assets.image`BG`)
tiles.setCurrentTilemap(tilemap`level1`)
sonicHitbox.ay = 1250
sonicHitbox.z = 0
Rolling = false
Direction = 1
SpindashMultiplier = 1
scene.setBackgroundColor(7)
tiles.placeOnTile(sonicHitbox, tiles.getTileLocation(1, 51))
characterAnimations.setCharacterAnimationsEnabled(sonicHitbox, true)
StateMachine()
Camera()
spriteutils.setConsoleOverlay(false)
GrabberList = []
HandleList = []
for (let RingBoxes of tiles.getTilesByType(assets.tile`myTile2`)) {
    RingBox = sprites.create(assets.image`blank 16-16`, SpriteKind.ItemBox)
    animation.runImageAnimation(
    RingBox,
    assets.animation`RingBox`,
    50,
    true
    )
    tiles.placeOnTile(RingBox, RingBoxes)
    tiles.setTileAt(RingBoxes, assets.tile`myTile5`)
    RingBox.z = -10
}
for (let SlopeRightPlaces of tiles.getTilesByType(assets.tile`myTile`)) {
    SlopeSprite = sprites.create(assets.image`SlopeUpRight`, SpriteKind.Slope)
    tiles.placeOnTile(SlopeSprite, SlopeRightPlaces)
    tiles.setTileAt(SlopeRightPlaces, assets.tile`transparency16`)
    SlopeSprite = sprites.create(assets.image`SlopeTop`, SpriteKind.Slope)
    tiles.placeOnTile(SlopeSprite, tiles.getTileLocation(SlopeRightPlaces.column + 1, SlopeRightPlaces.row))
    if (!(SlopeSprite.tileKindAt(TileDirection.Center, assets.tile`transparency16`) || SlopeSprite.tileKindAt(TileDirection.Center, assets.tile`myTile1`))) {
        sprites.destroy(SlopeSprite)
    }
}
for (let SlopeLeftPlaces of tiles.getTilesByType(assets.tile`myTile6`)) {
    SlopeSprite = sprites.create(assets.image`SlopeUpLeft`, SpriteKind.Slope)
    tiles.placeOnTile(SlopeSprite, SlopeLeftPlaces)
    tiles.setTileAt(SlopeLeftPlaces, assets.tile`transparency16`)
    SlopeSprite = sprites.create(assets.image`SlopeTop`, SpriteKind.Slope)
    tiles.placeOnTile(SlopeSprite, tiles.getTileLocation(SlopeLeftPlaces.column - 1, SlopeLeftPlaces.row))
    if (!(SlopeSprite.tileKindAt(TileDirection.Center, assets.tile`transparency16`) || SlopeSprite.tileKindAt(TileDirection.Center, assets.tile`myTile1`))) {
        sprites.destroy(SlopeSprite)
    }
}
for (let VineSwings of tiles.getTilesByType(assets.tile`myTile22`)) {
    InitVine(VineSwings.column * 16, VineSwings.row * 16, VineSwings)
    tiles.setTileAt(VineSwings, assets.tile`transparency16`)
}
for (let LeftFacingYellowSprings of tiles.getTilesByType(assets.tile`myTile19`)) {
    Springs = sprites.create(assets.image`YSpringL`, SpriteKind.YellowLeftSpring)
    tiles.placeOnTile(Springs, LeftFacingYellowSprings)
    tiles.setTileAt(LeftFacingYellowSprings, assets.tile`myTile5`)
}
for (let overlayGhost of sprites.allOfKind(SpriteKind.animOverlay)) {
    overlayGhost.setFlag(SpriteFlag.Ghost, true)
}
Hurt = false
PlayerControl = true
let BossHealth = 8
music.play(music.createSong(assets.song`Sky-High Isle Act 1`), music.PlaybackMode.LoopingInBackground)
scroller.setCameraScrollingMultipliers(0.35, 0.2)
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
scroller.setBackgroundScrollOffset(0, -118)
color.setColor(9, color.parseColorString("#4542FF"))
game.onUpdate(function () {
    if (PlayerControl && !(transforming)) {
        if (Rolling == false) {
            if (controller.right.isPressed()) {
                Direction = 1
                sonicHitbox.vx += 5
            } else if (controller.left.isPressed()) {
                Direction = -1
                sonicHitbox.vx += -5
            } else {
                sonicHitbox.vx += sonicHitbox.vx * -0.1
            }
            if (controller.right.isPressed() && sonicHitbox.vx < 0) {
                sonicHitbox.vx += 10
            } else if (controller.left.isPressed() && sonicHitbox.vx > 0) {
                sonicHitbox.vx += -10
            }
            if (sonicHitbox.vx > 250) {
                sonicHitbox.vx = 250
            } else if (sonicHitbox.vx < -250) {
                sonicHitbox.vx = -250
            }
        } else {
            sonicHitbox.vx += sonicHitbox.vx * -0.02
        }
        if (sonicHitbox.vy == 0 || Rolling == false) {
            if (sonicHitbox.vy == 0 && Rolling == false) {
                InstaUp = false
                if (Math.abs(sonicHitbox.vx) < 10 && Math.abs(sonicHitbox.vx) >= 0) {
                    if (controller.down.isPressed()) {
                        if (Direction == 1) {
                            characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight, Predicate.FacingDown))
                        } else if (Direction == -1) {
                            characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft, Predicate.FacingDown))
                        }
                    } else {
                        if (Direction == 1) {
                            characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
                        } else if (Direction == -1) {
                            characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft))
                        }
                    }
                } else if (sonicHitbox.vx > 9 && sonicHitbox.vx < 200) {
                    characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.Moving, Predicate.FacingRight))
                } else if (sonicHitbox.vx < -9 && sonicHitbox.vx > -200) {
                    characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.Moving, Predicate.FacingLeft))
                } else if (sonicHitbox.vx > 199) {
                    characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight))
                } else if (sonicHitbox.vx < -199) {
                    characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft))
                } else if (controller.right.isPressed() && sonicHitbox.vx < 0) {
                    characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.MovingRight, Predicate.FacingLeft))
                } else if (controller.left.isPressed() && sonicHitbox.vx > 0) {
                    characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingRight))
                }
            } else {
                characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.MovingUp))
            }
        } else {
            characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.MovingUp))
        }
        if (Math.abs(sonicHitbox.vx) < 20) {
            Rolling = false
        }
        if (sonicHitbox.vy != 0) {
            SpindashMultiplier = 1
        }
        if (SpindashMultiplier > 1) {
            Rolling = true
            if (Direction == 1) {
                characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.MovingRight, Predicate.FacingDown))
            } else if (Direction == -1) {
                characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingDown))
            }
        }
        if (!(Math.abs(sonicHitbox.vx) < 10 && Math.abs(sonicHitbox.vx) >= 0) || controller.anyButton.isPressed() || sonicHitbox.vy != 0) {
            WaitTimer = 0
        } else {
            WaitTimer += 1
            if (WaitTimer > 240) {
                WaitTimer = 240
                if (Direction == 1) {
                    characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.FacingRight, Predicate.FacingUp))
                } else if (Direction == -1) {
                    characterAnimations.setCharacterState(sonicOverlay, characterAnimations.rule(Predicate.FacingLeft, Predicate.FacingUp))
                }
            }
        }
    }
    if (sonicHitbox.tilemapLocation().column > 22) {
        sonicHitbox.z = -10
        Camera()
    } else {
        sonicHitbox.z = 0
        scene.centerCameraAt(sonicHitbox.x, 800)
    }
    for (let InstaPostion of sprites.allOfKind(SpriteKind.Attack)) {
        InstaPostion.setPosition(sonicHitbox.x, sonicHitbox.y + 7)
        InstaPostion.z = sonicHitbox.z
    }
    for (let Slopes of sprites.allOfKind(SpriteKind.Slope)) {
        if (!(transforming)) {
            if (!(sonicHitbox.overlapsWith(Slopes))) {
                sonicHitbox.ay = 1250
            } else {
                sonicHitbox.ay = 0
                sonicHitbox.vy = 0
                sonicHitbox.y += Math.abs(sonicHitbox.vx) / -50 - 0.25
            }
        }
    }
    for (let GrabVines2 of sprites.allOfKind(SpriteKind.Grab)) {
        if (!(transforming)) {
            if (sonicHitbox.overlapsWith(GrabVines2)) {
                PlayerControl = false
                characterAnimations.clearCharacterState(sonicOverlay)
                if (Direction == 1) {
                    animation.runImageAnimation(
                    sonicOverlay,
                    assets.animation`SHangR`,
                    200,
                    false
                    )
                } else if (Direction == -1) {
                    animation.runImageAnimation(
                    sonicOverlay,
                    assets.animation`SHangL`,
                    200,
                    false
                    )
                }
                sonicHitbox.ay = 0
                sonicHitbox.vx = 0
                sonicHitbox.vy = 0
                sonicHitbox.setPosition(GrabVines2.x, GrabVines2.y)
                Direction = Math.abs(BallVelocity) / BallVelocity * -1
                if (controller.A.isPressed()) {
                    sonicHitbox.ay = 1250
                    PlayerControl = true
                    sonicHitbox.vy = -300
                    sonicHitbox.vx = Direction * 200
                    GrabVines2.setKind(SpriteKind.InVal)
                    animation.stopAnimation(animation.AnimationTypes.All, sonicOverlay)
                    timer.after(500, function () {
                        GrabVines2.setKind(SpriteKind.Grab)
                    })
                }
            } else {
                sonicHitbox.ay = 1250
                PlayerControl = true
            }
        }
    }
    if (sonicOverlay) {
        sonicOverlay.setPosition(sonicHitbox.x, sonicHitbox.y)
    }
})
