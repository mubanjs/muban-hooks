/**
 * Util to easily test delayed callbacks
 *
 * @param duration The duration of the timeout you want to apply
 */
export async function timeout(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
