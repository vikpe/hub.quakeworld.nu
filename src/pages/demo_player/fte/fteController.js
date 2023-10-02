export function fteEvent(name, detail) {
  const event = new CustomEvent(`fte.${name}`, { detail });
  window.dispatchEvent(event);
}

export class FteController {
  _module = null;
  _isPaused = false;
  _isMuted = false;
  _volume = 0.1;
  _speed = 100;
  _playerCache = [];
  _autotrack = true;

  static _instance = null;

  static getInstance(module) {
    if (FteController._instance === null) {
      FteController._instance = new FteController(module);
    }

    console.log("#################### FteController SINGLETON");
    return FteController._instance;
  }

  constructor(module) {
    if (FteController._instance) {
      return FteController._instance;
    }

    console.log("#################### FteController.new");
    this._module = module;

    return this;
  }

  get module() {
    return this._module;
  }

  command(command) {
    try {
      this.module.execute(command);
      fteEvent("command", { value: command });
    } catch (e) {
      console.log("fte command error: " + e);
    }
  }

  captureCommandOutput(command) {
    const originalLog = console.log;
    const messages = [];

    function captureLog() {
      messages.push(arguments[0]);
    }

    console.log = captureLog;

    try {
      this.command(command);
    } catch (e) {
      // ignore
    }

    console.log = originalLog;
    return messages;
  }

  // exposed functions from fte
  getPlayers() {
    if (this._playerCache.length > 0) {
      return this._playerCache;
    }

    try {
      this._playerCache = this.module.player_info();
      return this._playerCache;
    } catch (e) {
      return [];
    }
  }

  getGametime() {
    try {
      return this.module.gametime();
    } catch (e) {
      return 0;
    }
  }

  getTrackUserid() {
    try {
      const seatIndex = 0; // index of screen in splitscreen
      return this.module.track_userid(seatIndex);
    } catch (e) {
      return -1;
    }
  }

  // demo playback
  speed() {
    return this._speed;
  }

  setSpeed(speed) {
    this._speed = parseFloat(speed);
    this.command("demo_setspeed " + this._speed);
    fteEvent("demo_setspeed", { value: this._speed });
  }

  demoJump(gametime) {
    const currentGametime = this.getGametime();
    const currentUserid = this.getTrackUserid();

    const newGametime = Math.floor(gametime);
    this.command("demo_jump " + newGametime);

    // restore track on backwards jump
    if (newGametime < currentGametime) {
      const restoreTrack = () => {
        if (this._autotrack) {
          this.enableAutotrack();
        } else {
          this.track(currentUserid);
        }
      };

      setTimeout(restoreTrack, 20);
    }

    fteEvent("demo_jump", { value: newGametime });
  }

  play() {
    this._isPaused = false;
    this.command("demo_setspeed " + this._speed);
    fteEvent("play");
  }

  isPlaying() {
    return !this.isPaused();
  }

  isPaused() {
    return this._isPaused;
  }

  pause() {
    this._isPaused = true;
    this.command("demo_setspeed 0");
    fteEvent("pause");
  }

  togglePlay() {
    this._isPaused ? this.play() : this.pause();
  }

  // track
  autotrack() {
    return this._autotrack;
  }

  enableAutotrack() {
    this.command("autotrack");
    this._autotrack = true;
    fteEvent("autotrack", { value: this._autotrack });
  }

  disableAutotrack() {
    this.track(this.getTrackUserid());
    fteEvent("autotrack", { value: this._autotrack });
  }

  toggleAutotrack() {
    if (this.autotrack()) {
      this.disableAutotrack();
    } else {
      this.enableAutotrack();
    }
  }

  track(userid) {
    this._autotrack = false;
    this.command("track " + userid);
    fteEvent("track", { value: userid });
  }

  // volume
  mute() {
    this._isMuted = true;
    this.command("volume 0");
    fteEvent("mute");
  }

  isMuted() {
    return this._isMuted;
  }

  unmute() {
    this._isMuted = false;
    this.command("volume " + this._volume);
    fteEvent("unmute");
  }

  toggleMute() {
    if (this.isMuted()) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  volume() {
    return this._volume;
  }

  setVolume(value) {
    this._volume = parseFloat(value);
    this.command("volume " + this._volume);
    fteEvent("volume", { value: this._volume });
  }
}
