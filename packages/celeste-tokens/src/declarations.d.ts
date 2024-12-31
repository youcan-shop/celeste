declare module 'style-dictionary' {
  declare class StyleDictionary {
    constructor(config: any);
    cleanAllPlatforms(): void;
    buildAllPlatforms(): void;
  }

  export = StyleDictionary;
}

declare module '@tokens-studio/sd-transforms' {
  function register(sd: StyleDictionary): void;
}
