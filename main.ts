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
}
function StateMachine () {
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SStandR`,
    200,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SStandL`,
    200,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SWalkR`,
    100,
    characterAnimations.rule(Predicate.Moving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SWalkL`,
    100,
    characterAnimations.rule(Predicate.Moving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SSprintR`,
    100,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SSprintL`,
    100,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SRoll_Jump`,
    75,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SCrouchR`,
    200,
    characterAnimations.rule(characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight, Predicate.FacingDown))
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SCrouchL`,
    200,
    characterAnimations.rule(characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft, Predicate.FacingDown))
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SSpindashR`,
    75,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SSpindashL`,
    75,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SImpatientR`,
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SImpatientL`,
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SSkidR`,
    200,
    characterAnimations.rule(Predicate.MovingRight, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    Sonic,
    assets.animation`SSkidL`,
    200,
    characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingRight)
    )
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
function PlayerHurt (enemyX: number) {
    if (Hurt == false) {
        Hurt = true
        Sonic.vy = -125
        if (enemyX > Sonic.x) {
            Sonic.vx = -100
        } else if (enemyX < Sonic.x) {
            Sonic.vx = 100
        }
        RingFly(info.score())
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PlayerControl == true) {
        if (!(controller.down.isPressed())) {
            if (Sonic.vy == 0) {
                SpindashMultiplier = 1
                Rolling = false
                Sonic.vy = -425
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
            if (Sonic.vy == 0) {
                music.play(music.createSoundEffect(WaveShape.Noise, 1822, 4309, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
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
    if (Math.abs(Sonic.vx) < 10 && Math.abs(Sonic.vx) >= 0 && SpindashMultiplier > 1) {
        Sonic.vx = SpindashMultiplier * (Direction * 100)
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
        assets.animation`Destroyed`,
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
        screen2.drawLine(160 - (scene.cameraProperty(CameraProperty.X) - GrabVines.x), 112 - (scene.cameraProperty(CameraProperty.Y) - GrabVines.y), 160 - (scene.cameraProperty(CameraProperty.X) - sprites.readDataNumber(GrabVines, "SpawnX")), 112 - (scene.cameraProperty(CameraProperty.Y) - sprites.readDataNumber(GrabVines, "SpawnY")), 5)
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
    if (Sonic.vy == 0 && Math.abs(Sonic.vx) > 19) {
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
            GibbletSprite.setPosition(Sonic.x, Sonic.y)
            GibbletSprite.vy = randint(-150, -100)
            GibbletSprite.ay = 400
            GibbletSprite.vx = randint(-35, 35)
            animation.runImageAnimation(
            GibbletSprite,
            assets.animation`Ring0`,
            75,
            true
            )
        }
        pauseUntil(() => Sonic.vy == 0)
        Hurt = false
    } else if (info.score() < 1) {
        PlayerControl = true
        characterAnimations.clearCharacterState(Sonic)
        Sonic.setFlag(SpriteFlag.Ghost, true)
        Sonic.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    timer.after(1000, function () {
        characterAnimations.setCharacterAnimationsEnabled(Sonic, false)
        music.stopAllSounds()
        PlayerControl = true
        Direction = 1
        animation.runImageAnimation(
        Sonic,
        assets.animation`SVictoryR`,
        100,
        false
        )
        Sonic.vx = 0
        Sonic.vy = 0
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
    Sonic.vx = -375
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
let Sonic: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 224
}
Sonic = sprites.create(assets.image`Sonic Stand`, SpriteKind.Player)
characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
scene.setBackgroundImage(assets.image`BG`)
tiles.setCurrentTilemap(tilemap`level1`)
Sonic.ay = 1250
Sonic.z = 0
Rolling = false
Direction = 1
SpindashMultiplier = 1
scene.setBackgroundColor(7)
tiles.placeOnTile(Sonic, tiles.getTileLocation(1, 51))
characterAnimations.setCharacterAnimationsEnabled(Sonic, true)
StateMachine()
spriteutils.setConsoleOverlay(false)
GrabberList = []
HandleList = []
for (let RingBoxes of tiles.getTilesByType(assets.tile`myTile2`)) {
    RingBox = sprites.create(assets.image`blank 16-16`, SpriteKind.ItemBox)
    animation.runImageAnimation(
    RingBox,
    assets.animation`Ring`,
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
let BossStart = false
Hurt = false
PlayerControl = true
let BossPattern = 0
let BossHealth = 8
music.play(music.createSong(assets.song`Sky-High Isle Act 1`), music.PlaybackMode.LoopingInBackground)
scroller.setCameraScrollingMultipliers(0.35, 0.2)
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
scroller.setBackgroundScrollOffset(0, -118)
game.onUpdate(function () {
    if (PlayerControl == true) {
        if (Rolling == false) {
            if (controller.right.isPressed()) {
                Direction = 1
                Sonic.vx += 5
            } else if (controller.left.isPressed()) {
                Direction = -1
                Sonic.vx += -5
            } else {
                Sonic.vx += Sonic.vx * -0.1
            }
            if (controller.right.isPressed() && Sonic.vx < 0) {
                Sonic.vx += 10
            } else if (controller.left.isPressed() && Sonic.vx > 0) {
                Sonic.vx += -10
            }
            if (Sonic.vx > 250) {
                Sonic.vx = 250
            } else if (Sonic.vx < -250) {
                Sonic.vx = -250
            }
        } else {
            Sonic.vx += Sonic.vx * -0.02
        }
        if (Sonic.vy == 0 || Rolling == false) {
            if (Sonic.vy == 0 && Rolling == false) {
                InstaUp = false
                if (Math.abs(Sonic.vx) < 10 && Math.abs(Sonic.vx) >= 0) {
                    if (controller.down.isPressed()) {
                        if (Direction == 1) {
                            characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight, Predicate.FacingDown))
                        } else if (Direction == -1) {
                            characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft, Predicate.FacingDown))
                        }
                    } else {
                        if (Direction == 1) {
                            characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
                        } else if (Direction == -1) {
                            characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft))
                        }
                    }
                } else if (Sonic.vx > 9 && Sonic.vx < 200) {
                    characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.Moving, Predicate.FacingRight))
                } else if (Sonic.vx < -9 && Sonic.vx > -200) {
                    characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.Moving, Predicate.FacingLeft))
                } else if (Sonic.vx > 199) {
                    characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingRight, Predicate.FacingRight))
                } else if (Sonic.vx < -199) {
                    characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingLeft))
                } else if (controller.right.isPressed() && Sonic.vx < 0) {
                    characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingRight, Predicate.FacingLeft))
                } else if (controller.left.isPressed() && Sonic.vx > 0) {
                    characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingRight))
                }
            } else {
                characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingUp))
            }
        } else {
            characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingUp))
        }
        if (Math.abs(Sonic.vx) < 20) {
            Rolling = false
        }
        if (Sonic.vy != 0) {
            SpindashMultiplier = 1
        }
        if (SpindashMultiplier > 1) {
            Rolling = true
            if (Direction == 1) {
                characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingRight, Predicate.FacingDown))
            } else if (Direction == -1) {
                characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingDown))
            }
        }
        if (!(Math.abs(Sonic.vx) < 10 && Math.abs(Sonic.vx) >= 0) || controller.anyButton.isPressed() || Sonic.vy != 0) {
            WaitTimer = 0
        } else {
            WaitTimer += 1
            if (WaitTimer > 240) {
                WaitTimer = 240
                if (Direction == 1) {
                    characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.FacingRight, Predicate.FacingUp))
                } else if (Direction == -1) {
                    characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.FacingLeft, Predicate.FacingUp))
                }
            }
        }
    }
    if (Sonic.tilemapLocation().column > 22) {
        Sonic.z = -10
        scene.centerCameraAt(Sonic.x, Sonic.y - 0)
    } else {
        Sonic.z = 0
        scene.centerCameraAt(Sonic.x, 800)
    }
    for (let InstaPostion of sprites.allOfKind(SpriteKind.Attack)) {
        InstaPostion.setPosition(Sonic.x, Sonic.y + 7)
        InstaPostion.z = Sonic.z
    }
    for (let Slopes of sprites.allOfKind(SpriteKind.Slope)) {
        if (!(Sonic.overlapsWith(Slopes))) {
            Sonic.ay = 1250
        } else {
            Sonic.ay = 0
            Sonic.vy = 0
            Sonic.y += Math.abs(Sonic.vx) / -50 - 1
        }
    }
    for (let GrabVines of sprites.allOfKind(SpriteKind.Grab)) {
        if (Sonic.overlapsWith(GrabVines)) {
            PlayerControl = false
            Sonic.ay = 0
            Sonic.vx = 0
            Sonic.vy = 0
            Sonic.setPosition(GrabVines.x, GrabVines.y)
            Sonic.y += -5
            if (Direction == 1) {
                characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingRight, Predicate.FacingLeft))
            } else if (Direction == -1) {
                characterAnimations.setCharacterState(Sonic, characterAnimations.rule(Predicate.MovingLeft, Predicate.FacingRight))
            }
            if (controller.A.isPressed()) {
                Sonic.ay = 1250
                PlayerControl = true
                Sonic.vy = -300
                Sonic.vx = Direction * 200
                GrabVines.setKind(SpriteKind.InVal)
                timer.after(500, function () {
                    GrabVines.setKind(SpriteKind.Grab)
                })
            }
        } else {
            Sonic.ay = 1250
            PlayerControl = true
        }
    }
})
