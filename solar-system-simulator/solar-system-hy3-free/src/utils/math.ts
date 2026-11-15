import { TWO_PI } from './constants';

/**
 * 周期（秒）から1秒あたりの角速度（ラジアン/秒）を求める。
 *
 * @param periodSeconds 1周にかかる秒数
 * @returns 角速度。periodSeconds が 0 以下の場合は 0 を返す。
 */
export function angularVelocity(periodSeconds: number): number {
  if (periodSeconds <= 0) return 0;
  return TWO_PI / periodSeconds;
}

/**
 * 極座標（半径・角度）を XZ 平面上の直交座標に変換する。
 * 公転運動は Y 軸まわりで行うため XZ 平面を採用している。
 *
 * @param radius 半径
 * @param angle 角度（ラジアン）
 */
export function polarToXZ(radius: number, angle: number): { x: number; z: number } {
  return {
    x: Math.cos(angle) * radius,
    z: Math.sin(angle) * radius,
  };
}
