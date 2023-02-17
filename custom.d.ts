/* eslint-disable no-undef */
declare module '*.svg' {
  const content: string | undefined;
  export default content;
}
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
