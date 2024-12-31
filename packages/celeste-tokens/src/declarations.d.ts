declare module 'style-dictionary' {
  class StyleDictionary {
    constructor(config: any);
    cleanAllPlatforms(): void;
    buildAllPlatforms(): void;
  }

  export default StyleDictionary;
}

declare module '@tokens-studio/sd-transforms' {
  function register(sd: any): void;
}
