/**
 * シミュレーションで使用する定数群。
 *
 * 実際の天体は距離・サイズ比が極端すぎて可視化に向かないため、
 * 「見た目の説得力」と「軌道関係の正しさ」を両立させた
 * 独自スケール（arbitrary unit）を採用している。
 */

/** 太陽の半径（シーン単位）。全ての天体サイズの基準。 */
export const SUN_RADIUS = 6;

/** 地球の半径。 */
export const EARTH_RADIUS = 1.4;

/** 月の半径。 */
export const MOON_RADIUS = 0.38;

/** 太陽中心から地球までの公転半径。 */
export const EARTH_ORBIT_RADIUS = 22;

/** 地球中心から月までの公転半径。 */
export const MOON_ORBIT_RADIUS = 3.2;

/** 地球の公転周期（秒）。他の周期はこれを基準に相対決定する。 */
export const EARTH_ORBIT_PERIOD = 24;

/** 月の公転周期（秒）。地球の約1/12。 */
export const MOON_ORBIT_PERIOD = 2;

/** 太陽の自転周期（秒）。 */
export const SUN_ROTATION_PERIOD = 20;

/** 地球の自転周期（秒）。 */
export const EARTH_ROTATION_PERIOD = 4;

/** 月の自転周期（秒）。潮汐ロックを模し公転と同期させる。 */
export const MOON_ROTATION_PERIOD = MOON_ORBIT_PERIOD;

/** 地球の地軸傾斜（ラジアン, 約23.4度）。 */
export const EARTH_AXIAL_TILT = 0.409;

/** 月軌道の傾斜（ラジアン, 約5.1度）。 */
export const MOON_ORBIT_TILT = 0.089;

/** 星空を配置する球体の半径。カメラ最遠より十分外側に置く。 */
export const STARFIELD_RADIUS = 900;

/** 星の数。 */
export const STAR_COUNT = 12000;

/** 1回転あたりのラジアン。 */
export const TWO_PI = Math.PI * 2;
