import { idMaps } from "./idMaps.ts";
import { getMapTextures } from "./map_textures.ts";
import { CONFIG_VERSION } from "./meta.ts";
import type { FteAssets } from "./types.ts";

const FTE_ASSETS_URL =
  "https://raw.githubusercontent.com/vikpe/fte-web-assets/main";
const GENERIC_ASSETS_URL =
  "https://raw.githubusercontent.com/vikpe/qw-assets/main";

export const STREAMBOT_ASSETS_URL =
  "https://raw.githubusercontent.com/vikpe/qw-streambot-ezquake/main";

export function fteAsset(path: string) {
  return `/assets/fte/${path}`;
}

export function getAssets(demoUrl: string, mapName: string): FteAssets {
  const demoFilename = demoUrl.split("/").pop() || "";
  return {
    ...getGeneralAssets(),
    ...getStreambotAssets(),
    [getDemoMountPath(demoFilename)]: demoUrl,
    ...getMapAssets(mapName),
  };
}

function getDemoMountPath(demoFilename: string): string {
  let mountPath: string;

  if (demoFilename.endsWith(".gz")) {
    mountPath = "qw/match.mvd.gz";
  } else if (demoFilename.endsWith(".mvd")) {
    mountPath = "qw/match.mvd";
  } else {
    mountPath = "id1/match.dem";
  }

  return mountPath;
}

function getMapAssets(mapName: string): FteAssets {
  const mapDir = idMaps.includes(mapName) ? "maps_id1_gpl" : "maps";
  const mapBaseUrl = `${GENERIC_ASSETS_URL}/${mapDir}/${mapName}/${mapName}`;
  const locUrl = `${GENERIC_ASSETS_URL}/maps/${mapName}/${mapName}.loc`;

  return {
    [`id1/maps/${mapName}.bsp`]: `${mapBaseUrl}.bsp`,
    [`id1/maps/${mapName}.lit`]: `${mapBaseUrl}.lit`,
    [`id1/locs/${mapName}.loc`]: locUrl,
    ...getMapTextures(mapName),
  };
}

function getStreambotAssets(): FteAssets {
  const filePaths = [
    "textures/charsets/povo5f_xtm.png",
    "crosshairs/xtm01.png",
    "skins/ctf_blue.jpg",
    "skins/ctf_red.jpg",
    "gfx/sb_armor1.png",
    "gfx/sb_armor2.png",
    "gfx/sb_armor3.png",
    "gfx/sb_cells.png",
    "gfx/sb_invis.png",
    "gfx/sb_invuln.png",
    "gfx/sb_nails.png",
    "gfx/sb_quad.png",
    "gfx/sb_rocket.png",
    "gfx/sb_shells.png",
    "gfx/anum_0.png",
    "gfx/anum_1.png",
    "gfx/anum_2.png",
    "gfx/anum_3.png",
    "gfx/anum_4.png",
    "gfx/anum_5.png",
    "gfx/anum_6.png",
    "gfx/anum_7.png",
    "gfx/anum_8.png",
    "gfx/anum_9.png",
    "gfx/anum_colon.png",
    "gfx/anum_minus.png",
    "gfx/face1.png",
    "gfx/face2.png",
    "gfx/face3.png",
    "gfx/face4.png",
    "gfx/face5.png",
    "gfx/face_inv2.png",
    "gfx/face_invis.png",
    // "gfx/face_invul1.png",
    "gfx/face_invul2.png",
    "gfx/face_p1.png",
    "gfx/face_p2.png",
    "gfx/face_p3.png",
    "gfx/face_p4.png",
    "gfx/face_p5.png",
    "gfx/face_quad.png",
    "gfx/ibar.png",
    "gfx/inv2_lightng.png",
    "gfx/inv2_nailgun.png",
    "gfx/inv2_rlaunch.png",
    "gfx/inv2_shotgun.png",
    "gfx/inv2_snailgun.png",
    "gfx/inv2_srlaunch.png",
    "gfx/inv2_sshotgun.png",
    "gfx/inva1_lightng.png",
    "gfx/inva1_nailgun.png",
    "gfx/inva1_rlaunch.png",
    "gfx/inva1_shotgun.png",
    "gfx/inva1_snailgun.png",
    "gfx/inva1_srlaunch.png",
    "gfx/inva1_sshotgun.png",
    "gfx/inva2_lightng.png",
    "gfx/inva2_nailgun.png",
    "gfx/inva2_rlaunch.png",
    "gfx/inva2_shotgun.png",
    "gfx/inva2_snailgun.png",
    "gfx/inva2_srlaunch.png",
    "gfx/inva2_sshotgun.png",
    "gfx/inva3_lightng.png",
    "gfx/inva3_nailgun.png",
    "gfx/inva3_rlaunch.png",
    "gfx/inva3_shotgun.png",
    "gfx/inva3_snailgun.png",
    "gfx/inva3_srlaunch.png",
    "gfx/inva3_sshotgun.png",
    "gfx/inva4_lightng.png",
    "gfx/inva4_nailgun.png",
    "gfx/inva4_rlaunch.png",
    "gfx/inva4_shotgun.png",
    "gfx/inva4_snailgun.png",
    "gfx/inva4_srlaunch.png",
    "gfx/inva4_sshotgun.png",
    "gfx/inva5_lightng.png",
    "gfx/inva5_nailgun.png",
    "gfx/inva5_rlaunch.png",
    "gfx/inva5_shotgun.png",
    "gfx/inva5_snailgun.png",
    "gfx/inva5_srlaunch.png",
    "gfx/inva5_sshotgun.png",
    "gfx/inv_lightng.png",
    "gfx/inv_nailgun.png",
    "gfx/inv_rlaunch.png",
    "gfx/inv_shotgun.png",
    "gfx/inv_snailgun.png",
    "gfx/inv_srlaunch.png",
    "gfx/inv_sshotgun.png",
    "gfx/num_0.png",
    "gfx/num_1.png",
    "gfx/num_2.png",
    "gfx/num_3.png",
    "gfx/num_4.png",
    "gfx/num_5.png",
    "gfx/num_6.png",
    "gfx/num_7.png",
    "gfx/num_8.png",
    "gfx/num_9.png",
    "gfx/num_colon.png",
    "gfx/num_minus.png",
    "gfx/sb_key1.png",
    "gfx/sb_key2.png",
    "gfx/sb_sigil1.png",
    "gfx/sb_sigil2.png",
    "gfx/sb_sigil3.png",
    "gfx/sb_sigil4.png",
    "gfx/sb_suit.png",

    "textures/bmodels/+0_med100.jpg",
    "textures/bmodels/+0_med25.jpg",
    "textures/bmodels/+0_med25s.jpg",
    "textures/bmodels/+1_med100.jpg",
    "textures/bmodels/+1_med25.jpg",
    "textures/bmodels/+1_med25s.jpg",
    "textures/bmodels/+2_med100.jpg",
    "textures/bmodels/+2_med25.jpg",
    "textures/bmodels/+3_med100.jpg",
    "textures/bmodels/+3_med25.jpg",
    "textures/bmodels/med100.jpg",
    "textures/bmodels/med3_0.jpg",
    "textures/bmodels/med3_1.jpg",
    "textures/bmodels/batt0sid.jpg",
    "textures/bmodels/batt0top.jpg",
    "textures/bmodels/batt1sid.jpg",
    "textures/bmodels/batt1top.jpg",
    "textures/bmodels/nail0sid.jpg",
    "textures/bmodels/nail0top.jpg",
    "textures/bmodels/nail1sid.jpg",
    "textures/bmodels/nail1top.jpg",
    "textures/bmodels/rock0sid.jpg",
    "textures/bmodels/rock1sid.jpg",
    "textures/bmodels/rockettop.jpg",
    "textures/bmodels/shot0sid.jpg",
    "textures/bmodels/shot0top.jpg",
    "textures/bmodels/shot1sid.jpg",
    "textures/bmodels/shot1top.jpg",

    "textures/models/armor.mdl_0.png",
    "textures/models/armor.mdl_1.png",
    "textures/models/armor.mdl_2.png",
    "textures/models/backpack.mdl_0.jpg",
    "textures/models/end1.mdl_0.png",
    "textures/models/end2.mdl_0.png",
    "textures/models/end3.mdl_0.png",
    "textures/models/end4.mdl_0.png",
    "textures/models/flag.mdl_0.jpg",
    "textures/models/flag.mdl_1.jpg",
    "textures/models/quaddama.mdl_0.png",

    "textures/tracker/axe.png",
    "textures/tracker/coil.png",
    "textures/tracker/discharge.png",
    "textures/tracker/drown.png",
    "textures/tracker/fall.png",
    "textures/tracker/gl.png",
    "textures/tracker/lava.png",
    "textures/tracker/lg.png",
    "textures/tracker/ng.png",
    "textures/tracker/q.png",
    "textures/tracker/rail.png",
    "textures/tracker/rl.png",
    "textures/tracker/sg.png",
    "textures/tracker/slime.png",
    "textures/tracker/sng.png",
    "textures/tracker/squish.png",
    "textures/tracker/ssg.png",
    "textures/tracker/stomp.png",
    "textures/tracker/tele.png",
    "textures/tracker/tkills.png",
    "textures/tracker/trap.png",

    /*
    "textures/bmodels/med3_0_luma.png",
    "textures/bmodels/nail1top_luma.png",
    "textures/bmodels/shot1top_luma.png",
    "textures/bmodels/+0_med25_luma.png",
    "textures/bmodels/+1_med25_luma.png",
    "textures/bmodels/+2_med25_luma.png",
    "textures/bmodels/+3_med25_luma.png",
    "textures/bmodels/+2_med25s.png",
    "textures/bmodels/+3_med25s.png",
    */
  ];

  const assets: FteAssets = {};

  for (const path of filePaths) {
    const localPath: string = `id1/${path}`;
    const srcPath: string = path
      .replace(".mdl", "")
      .replace("gfx/", "textures/wad/")
      .replace("#", "%23");
    assets[localPath] = `${STREAMBOT_ASSETS_URL}/qw/${srcPath}`;
  }

  return assets;
}

function getGeneralAssets(): FteAssets {
  const filePaths = [
    "default.fmf",
    "qw/fragfile.dat",
    "ctf/fragfile.dat",
    "id1/gfx.wad",
    "id1/maps/b_batt0.bsp",
    "id1/maps/b_batt1.bsp",
    "id1/maps/b_bh100.bsp",
    "id1/maps/b_bh10.bsp",
    "id1/maps/b_bh25.bsp",
    "id1/maps/b_explob.bsp",
    "id1/maps/b_nail0.bsp",
    "id1/maps/b_nail1.bsp",
    "id1/maps/b_rock0.bsp",
    "id1/maps/b_rock1.bsp",
    "id1/maps/b_shell0.bsp",
    "id1/maps/b_shell1.bsp",
    "id1/particles/blood.cfg",
    "id1/particles/bubble-trail.cfg",
    "id1/particles/explosion.cfg",
    "id1/particles/flame.cfg",
    "id1/particles/grenade.cfg",
    "id1/particles/rocket.cfg",
    "id1/particles/runes.cfg",
    "id1/particles/teleport.cfg",
    "id1/particles/torch.cfg",
    "id1/particles/particlefont.png",
    "id1/progs/armor.mdl",
    "id1/progs/backpack.mdl",
    "id1/progs/bit.mdl",
    "id1/progs/bolt.mdl",
    "id1/progs/bolt2.mdl",
    "id1/progs/bolt3.mdl",
    "id1/progs/end1.mdl",
    "id1/progs/end2.mdl",
    "id1/progs/end3.mdl",
    "id1/progs/end4.mdl",
    "id1/progs/eyes.mdl",
    "id1/progs/flag.mdl",
    "id1/progs/flame.mdl",
    "id1/progs/flame2.mdl",
    "id1/progs/g_light.mdl",
    "id1/progs/g_nail.mdl",
    "id1/progs/g_nail2.mdl",
    "id1/progs/g_rock.mdl",
    "id1/progs/g_rock2.mdl",
    "id1/progs/g_shot.mdl",
    "id1/progs/gib1.mdl",
    "id1/progs/gib2.mdl",
    "id1/progs/gib3.mdl",
    "id1/progs/grenade.md3",
    "id1/progs/grenade_0.skin",
    "id1/progs/h_player.mdl",
    "id1/progs/invisibl.mdl",
    "id1/progs/invulner.mdl",
    "id1/progs/lavaball.mdl",
    "id1/progs/missile.md3",
    "id1/progs/missile_0.skin",
    "id1/progs/player.mdl",
    "id1/progs/quaddama.mdl",
    "id1/progs/s_bubble.spr",
    "id1/progs/s_explod.spr",
    "id1/progs/s_spike.mdl",
    "id1/progs/spawn.mdl",
    "id1/progs/spike.mdl",
    "id1/progs/star.mdl",
    "id1/progs/suit.mdl",
    "id1/progs/v_axe.mdl",
    "id1/progs/v_coil.mdl",
    "id1/progs/v_light.mdl",
    "id1/progs/v_nail.mdl",
    "id1/progs/v_nail2.mdl",
    "id1/progs/v_rock.mdl",
    "id1/progs/v_rock2.mdl",
    "id1/progs/v_shot.mdl",
    "id1/progs/v_shot1.mdl",
    "id1/progs/v_shot2.mdl",
    "id1/progs/v_spike.mdl",
    "id1/progs/v_star.mdl",
    "id1/progs/vwplayer.mdl",
    "id1/progs/w_axe.mdl",
    "id1/progs/w_g_key.mdl",
    "id1/progs/w_light.mdl",
    "id1/progs/w_nail.mdl",
    "id1/progs/w_nail2.mdl",
    "id1/progs/w_rock.mdl",
    "id1/progs/w_rock2.mdl",
    "id1/progs/w_s_key.mdl",
    "id1/progs/w_shot.mdl",
    "id1/progs/w_shot2.mdl",
    "id1/progs/wizard.mdl",
    "id1/progs/zom_gib.mdl",
    "id1/scripts/shell.shader",
    "id1/skins/enemy.jpg",
    "id1/skins/team.jpg",
    "id1/skins/blue.jpg",
    "id1/skins/cyan.jpg",
    "id1/skins/enemy.jpg",
    "id1/skins/green.jpg",
    "id1/skins/pink.jpg",
    "id1/skins/red.jpg",
    "id1/skins/team.jpg",
    "id1/skins/white.jpg",
    "id1/skins/yellow.jpg",
    "id1/sound/ambience/buzz1.wav",
    "id1/sound/ambience/comp1.wav",
    "id1/sound/ambience/drip1.wav",
    "id1/sound/ambience/drone6.wav",
    "id1/sound/ambience/fire1.wav",
    "id1/sound/ambience/fl_hum1.wav",
    "id1/sound/ambience/hum1.wav",
    "id1/sound/ambience/suck1.wav",
    "id1/sound/ambience/swamp1.wav",
    "id1/sound/ambience/swamp2.wav",
    "id1/sound/ambience/thunder1.wav",
    "id1/sound/ambience/water1.wav",
    "id1/sound/ambience/wind2.wav",
    "id1/sound/ambience/windfly.wav",
    "id1/sound/buttons/airbut1.wav",
    "id1/sound/buttons/switch02.wav",
    "id1/sound/buttons/switch04.wav",
    "id1/sound/buttons/switch21.wav",
    "id1/sound/doors/airdoor1.wav",
    "id1/sound/doors/airdoor2.wav",
    "id1/sound/doors/basesec1.wav",
    "id1/sound/doors/basesec2.wav",
    "id1/sound/doors/basetry.wav",
    "id1/sound/doors/baseuse.wav",
    "id1/sound/doors/ddoor1.wav",
    "id1/sound/doors/ddoor2.wav",
    "id1/sound/doors/doormv1.wav",
    "id1/sound/doors/drclos4.wav",
    "id1/sound/doors/hydro1.wav",
    "id1/sound/doors/hydro2.wav",
    "id1/sound/doors/latch2.wav",
    "id1/sound/doors/medtry.wav",
    "id1/sound/doors/meduse.wav",
    "id1/sound/doors/runetry.wav",
    "id1/sound/doors/runeuse.wav",
    "id1/sound/doors/stndr1.wav",
    "id1/sound/doors/stndr2.wav",
    "id1/sound/doors/winch2.wav",
    "id1/sound/items/armor1.wav",
    "id1/sound/items/damage2.wav",
    "id1/sound/items/damage3.wav",
    "id1/sound/items/damage.wav",
    "id1/sound/items/health1.wav",
    "id1/sound/items/inv1.wav",
    "id1/sound/items/inv2.wav",
    "id1/sound/items/inv3.wav",
    "id1/sound/items/itembk2.wav",
    "id1/sound/items/protect2.wav",
    "id1/sound/items/protect3.wav",
    "id1/sound/items/protect.wav",
    "id1/sound/items/r_item1.wav",
    "id1/sound/items/r_item2.wav",
    "id1/sound/items/suit2.wav",
    "id1/sound/items/suit.wav",
    "id1/sound/misc/flagcap.wav",
    "id1/sound/misc/flagtk.wav",
    "id1/sound/misc/h2ohit1.wav",
    "id1/sound/misc/medkey.wav",
    "id1/sound/misc/menu1.wav",
    "id1/sound/misc/menu2.wav",
    "id1/sound/misc/menu3.wav",
    "id1/sound/misc/null.wav",
    "id1/sound/misc/outwater.wav",
    "id1/sound/misc/power.wav",
    "id1/sound/misc/r_tele1.wav",
    "id1/sound/misc/r_tele2.wav",
    "id1/sound/misc/r_tele3.wav",
    "id1/sound/misc/r_tele4.wav",
    "id1/sound/misc/r_tele5.wav",
    "id1/sound/misc/runekey.wav",
    "id1/sound/misc/secret.wav",
    "id1/sound/misc/talk.wav",
    "id1/sound/misc/trigger1.wav",
    "id1/sound/misc/water1.wav",
    "id1/sound/misc/water2.wav",
    "id1/sound/plats/medplat1.wav",
    "id1/sound/plats/medplat2.wav",
    "id1/sound/plats/plat1.wav",
    "id1/sound/plats/plat2.wav",
    "id1/sound/plats/train1.wav",
    "id1/sound/plats/train2.wav",
    "id1/sound/player/axhit1.wav",
    "id1/sound/player/axhit2.wav",
    "id1/sound/player/death1.wav",
    "id1/sound/player/death2.wav",
    "id1/sound/player/death3.wav",
    "id1/sound/player/death4.wav",
    "id1/sound/player/death5.wav",
    "id1/sound/player/drown1.wav",
    "id1/sound/player/drown2.wav",
    "id1/sound/player/gasp1.wav",
    "id1/sound/player/gasp2.wav",
    "id1/sound/player/gib.wav",
    "id1/sound/player/h2odeath.wav",
    "id1/sound/player/h2ojump.wav",
    "id1/sound/player/inh2o.wav",
    "id1/sound/player/inlava.wav",
    "id1/sound/player/land2.wav",
    "id1/sound/player/land.wav",
    "id1/sound/player/lburn1.wav",
    "id1/sound/player/lburn2.wav",
    "id1/sound/player/pain1.wav",
    "id1/sound/player/pain2.wav",
    "id1/sound/player/pain3.wav",
    "id1/sound/player/pain4.wav",
    "id1/sound/player/pain5.wav",
    "id1/sound/player/pain6.wav",
    "id1/sound/player/plyrjmp8.wav",
    "id1/sound/player/slimbrn2.wav",
    "id1/sound/player/teledth1.wav",
    "id1/sound/player/tornoff2.wav",
    "id1/sound/player/udeath.wav",
    "id1/sound/ra/1.wav",
    "id1/sound/ra/2.wav",
    "id1/sound/ra/3.wav",
    "id1/sound/ra/fight.wav",
    "id1/sound/rune/rune1.wav",
    "id1/sound/rune/rune22.wav",
    "id1/sound/rune/rune2.wav",
    "id1/sound/rune/rune3.wav",
    "id1/sound/rune/rune4.wav",
    "id1/sound/weapons/ax1.wav",
    "id1/sound/weapons/bounce2.wav",
    "id1/sound/weapons/bounce.wav",
    "id1/sound/weapons/chain1.wav",
    "id1/sound/weapons/chain2.wav",
    "id1/sound/weapons/chain3.wav",
    "id1/sound/weapons/grenade.wav",
    "id1/sound/weapons/guncock.wav",
    "id1/sound/weapons/lhit.wav",
    "id1/sound/weapons/lock4.wav",
    "id1/sound/weapons/lstart.wav",
    "id1/sound/weapons/pkup.wav",
    "id1/sound/weapons/r_exp3.wav",
    "id1/sound/weapons/ric1.wav",
    "id1/sound/weapons/ric2.wav",
    "id1/sound/weapons/ric3.wav",
    "id1/sound/weapons/rocket1i.wav",
    "id1/sound/weapons/sgun1.wav",
    "id1/sound/weapons/shotgn2.wav",
    "id1/sound/weapons/spike2.wav",
    "id1/sound/weapons/tink1.wav",
    "id1/textures/#lava1.jpg",
    "id1/textures/#lava1_luma.jpg",
    "id1/textures/#teleport.jpg",
    "id1/textures/grenade.png",
    "id1/textures/grenade_glow.png",
    "id1/textures/missile.png",
    "id1/textures/missile_glow.png",
    "id1/textures/models/gib1.mdl_0.jpg",
    "id1/textures/models/gib2.mdl_0.jpg",
    "id1/textures/models/h_player.mdl_0.jpg",
    "id1/textures/models/v_axe.mdl_0.jpg",
    "id1/textures/sfx/quad.png",
    "id1/textures/particles/bubble.png",
    "id1/textures/particles/flame.png",
    "id1/textures/particles/generic.png",
    "id1/textures/particles/rfire.png",
    "id1/textures/particles/smoke.png",
    "id1/textures/particles/v_rock2_flash.png",
    "id1/textures/particles/v_shot2_flash.png",
    /*
    "id1/textures/models/g_light.mdl_0.jpg",
    "id1/textures/models/g_nail2.mdl_0.jpg",
    "id1/textures/models/g_rock.mdl_0.jpg",
    "id1/textures/models/g_rock2.mdl_0.jpg",
    "id1/textures/models/g_shot.mdl_0.jpg",
    "id1/textures/models/v_light.mdl_0.jpg",
    "id1/textures/models/v_nail.mdl_0.jpg",
    "id1/textures/models/v_nail2.mdl_0.jpg",
    "id1/textures/models/v_rock.mdl_0.jpg",
    "id1/textures/models/v_rock2.mdl_0.jpg",
    "id1/textures/models/v_shot.mdl_0.jpg",
    "id1/textures/models/v_shot2.mdl_0.jpg",
    */

    "id1/gfx/inv_nails.png",
    "id1/gfx/inv_rocket.png",
    "id1/gfx/inv_shells.png",
    "id1/gfx/sba1_key1.png",
    "id1/gfx/sba1_key2.png",
    "id1/gfx/sba2_key1.png",
    "id1/gfx/sba2_key2.png",
    "id1/gfx/sba3_key1.png",
    "id1/gfx/sba3_key2.png",
    "id1/gfx/sba4_key1.png",
    "id1/gfx/sba4_key2.png",
    "id1/gfx/sba5_key1.png",
    "id1/gfx/sba5_key2.png",
  ];

  const assets: FteAssets = {
    "id1/config.cfg": fteAsset(`config.cfg?v=${CONFIG_VERSION}`),
    "id1/hud.cfg": fteAsset(`hud.cfg?v=${CONFIG_VERSION}`),
  };

  for (const path of filePaths) {
    const sourcePath = path.replace("id1/gfx/", "id1/textures/wad/");
    assets[path] = `${FTE_ASSETS_URL}/${sourcePath.replace("#", "%23")}`;
  }

  return assets;
}
