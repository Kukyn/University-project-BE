export const Type = Function;

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export const Extends = Function;

export interface Extends<T> extends Function {}
