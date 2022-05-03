/**
 * A helper method that allows you to easily create a timeout with the async/await notation
 *
 * ```ts
 *   async function someFunction(){
 *     await timeout(100);
 *     console.log('This is delayed by 100ms');
 *   }
 * ```
 *
 * @param duration The duration that you want to create the timeout for.
 */
export async function timeout(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
