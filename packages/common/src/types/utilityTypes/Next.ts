import { Head } from ".";

/**
 * Helper type used to describe the next function passed to a plugin.
 * The next function is expected to take all arguments other than Next
 * For example
 * function foo(arg1: number, arg2: string: next: (arg1: number, arg2: string) => void) => void
 */
export type Next<T extends (...args: any) => any> = (
  ...args: Head<Parameters<T>>
) => ReturnType<T>;
