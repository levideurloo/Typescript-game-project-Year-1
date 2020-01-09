import { config } from '../config/preload';

export class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloader',
            pack: {
                files: [
                    { type: 'image', key: 'bar', url: './assets/images/loadBar.png' },
                    { type: 'image', key: 'barBg', url: './assets/images/barBg.png' }
                ]
            }
        });
    }

    public preload() {
        // add the loading bar to use as a display for the loading progress of the remainder of the assets
        const barBg = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'barBg');
        const bar = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'bar');

        const mask = this.make.graphics({
            x: bar.x - (bar.width / 2),
            y: bar.y - (bar.height / 2),
            add: false
        });

        mask.fillRect(0, 0, 0, bar.height);

        bar.mask = new Phaser.Display.Masks.GeometryMask(this, mask);

        this.load.on('progress', (progress: number) => {
            mask.clear();
            mask.fillRect(0, 0, bar.width * progress, bar.height);
        });

        // load assets declared in the preload config
        this.loadMaps();
        this.loadSpeechBubbles();
        this.loadSprites();
        this.loadImages();
        this.loadAtlas();
        this.loadAudio();
    }

    create() {
        this.scene.start('main');
    }

    private loadMaps() {
        // Street Map
        this.load.image('map', './assets/images/map.png');

        // Bon Bon Cafe Map
        this.load.image('cafe', './assets/images/cafe.png');

        // Night Street Map
        this.load.image('map-night', './assets/images/map-night.png');
    }

    private loadSpeechBubbles() {
        // // Global
        this.load.image('notification-textbubble', './assets/images/notification-textbubble.png');

        // Game Scene
        this.load.image('bully-text', './assets/images/bully-text.gif');

        // EnterBuilding Scene
        this.load.image('enterbuilding-bubble', './assets/images/enterbuilding-bubble.gif');

        // BonBon Cafe Scene
        this.load.image('bullied-bubble', './assets/images/onlinegepest-bubble.gif');

        // Night Scene
        this.load.image('flits-bubble', './assets/images/flits-bubble.png');
        this.load.image('bully-bubble', './assets/images/bully-bubble.png');
        this.load.image('sexting-bubble', './assets/images/sexting-bubble.png');
        this.load.image('sexting-thanks', './assets/images/sexting-thanks.png');
    }

    private loadSprites() {
        // Bullied boy
        this.load.spritesheet('bulliedBoy', './assets/spritesheets/boy.png', { frameWidth: 64, frameHeight: 64 });

        // Bully
        this.load.spritesheet('bully', './assets/spritesheets/boy_3.png', { frameWidth: 64, frameHeight: 64 });

        // Bully Girl
        this.load.spritesheet('bullyGirl', './assets/spritesheets/girl_3.png', { frameWidth: 64, frameHeight: 64 });

        // Snapchat Girl
        this.load.spritesheet('snapchatGirl', './assets/spritesheets/girl.png', { frameWidth: 64, frameHeight: 64 });

        // Old boyfriend
        this.load.spritesheet('oldBoyFriend', './assets/spritesheets/boy.png', { frameWidth: 64, frameHeight: 64 });

        // Pointing arrow
        this.load.spritesheet('arrow', './assets/spritesheets/arrow.png', { frameWidth: 28, frameHeight: 21 });
    }

    private loadImages() {
        this.load.image('lifes-all', './assets/images/lifes-all.png');
        this.load.image('lifes-1', './assets/images/life-1.png');
        this.load.image('phone', './assets/images/phone.png');
        this.load.image('phone_message', './assets/images/phone_message.png');
        this.load.image('classchat', './assets/images/classchat.png');
        this.load.image('whatsapp', './assets/images/whatsapp.png');
        this.load.image('next-btn', './assets/images/volgende-button.png');
        this.load.image('msg-background', './assets/images/msg-background.jpg');
    }

    private loadAtlas() {
        const sheetPath = config.ssPath;
        const sheets = config.sheets;

        this.load.setPath(sheetPath);

        for (let i = 0; i < sheets.length; i++)
            this.load.atlas(sheets[i], `${sheets[i]}.png`, `${sheets[i]}.json`);
    }

    private loadAudio() {
        const audioPath = config.audioPath;
        const audioFiles = config.audioFiles;

        this.load.setPath(audioPath);

        for (let i = 0; i < audioFiles.length; i++)
            this.load.audio(audioFiles[i].key, audioFiles[i].mp3, audioFiles[i].ogg);
    }
}