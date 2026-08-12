/**
 * Dinamik route parametrelerinin şekli tek yerde tanımlanır.
 *
 * Next.js 15 ile birlikte `params` bir Promise'e dönüştü. Tip burada merkezî olduğu
 * için sürüm yükseltmesinde tek satır değişmesi yeterli oluyor; çağrı yerleri zaten
 * `await` ediyor.
 */
export type RoomRouteContext = { params: Promise<{ id: string }> }

export async function roomIdFrom(context: RoomRouteContext): Promise<string> {
  return (await context.params).id
}
