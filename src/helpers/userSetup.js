export function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js


    // shiki 설정을 나중에 적용
    // import('@shikijs/markdown-it').then(async ({ default: shiki }) => {
    //     await md.use(await shiki({
    //         theme: 'catppuccin-mocha', // 또는 원하는 테마
    //         langs: ['javascript', 'typescript', 'shellscript', 'latex', 'templ', 'typespec', 'typst','yaml', 'postcss','regexp','sql','terraform', 'haskell', "bash", 'nix', 'elixir', 'erlang', 'gleam', 'rust', 'markdown', 'css', 'sass', 'html', 'toml', 'docker', 'dotenv', 'dart', 'ini', 'json', 'jsonc', 'make', 'mdx', 'mermaid', 'ocaml', 'jsx', 'tsx', 'xml'] // 지원하고 싶은 언어들
    //     }));
    // });
}
export function userEleventySetup(eleventyConfig) {
  // The eleventyConfig parameter stands for the the config instantiated in /.eleventy.js.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
