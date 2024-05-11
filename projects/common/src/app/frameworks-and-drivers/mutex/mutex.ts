/**
 * A lock for synchronizing async operations.
 * Use this to protect a critical section
 * from getting modified by multiple async operations
 * at the same time.
 */
export abstract class Mutex {
  /**
   * Wait until the lock is acquired.
   * @returns A function that releases the acquired lock.
   */
  abstract acquire(): Promise<ReleaseFunction>;

  /**
   * Enqueue a function to be run serially.
   *
   * This ensures no other functions will start running
   * until `callback` finishes running.
   * @param callback Function to be run exclusively.
   * @returns The return value of `callback`.
   */
  abstract runExclusive<T>(callback: () => Promise<T>): Promise<T>;
}

type ReleaseFunction = () => void;
