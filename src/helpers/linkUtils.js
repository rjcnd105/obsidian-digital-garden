import {inspect} from "node:util";

export const wikiLinkRegex = /\[\[(.*?\|.*?)\]\]/g;
export const internalLinkRegex = /href="\/(.*?)"/g;

function caselessCompare(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

export function extractLinks(content) {
  return [
    ...(content.match(wikiLinkRegex) || []).map(
        (link) =>
            link
                .slice(2, -2)
                .split("|")[0]
                .replace(/.(md|markdown)\s?$/i, "")
                .replace("\\", "")
                .trim()
                .split("#")[0]
    ),
    ...(content.match(internalLinkRegex) || []).map(
        (link) =>
            link
                .slice(6, -1)
                .split("|")[0]
                .replace(/.(md|markdown)\s?$/i, "")
                .replace("\\", "")
                .trim()
                .split("#")[0]
    ),
  ];
}

export function getGraph(data) {
  let nodes = {};
  let links = [];
  let stemURLs = {};
  let homeAlias = "/";
      
      
  (data.collections.note || []).forEach(async (v, idx) => {
    let fpath = v.filePathStem.replace("/notes/", "");
    
    // console.log(inspect(v.template.templateData, {
    //   depth: 1,  // 모든 중첩 레벨을 보여줌
    //   colors: true, // 색상 강조
    //   maxArrayLength: null, // 배열 전체를 보여줌
    //   showHidden: true, // non-enumerable 속성도 보여줌
    //   // getters: true,
    //  
    // }), )
    let parts = fpath.split("/");
    let group = "none";
    if (parts.length >= 3) {
      group = parts[parts.length - 2];
    }
    nodes[v.url] = {
      id: idx,
      title: v.data.title || v.fileSlug,
      url: v.url,
      group,
      home:
          v.data["dg-home"] ||
          (v.data.tags && v.data.tags.indexOf("gardenEntry") > -1) ||
          false,
      outBound: extractLinks(await v.template.inputContent),
      neighbors: new Set(),
      backLinks: new Set(),
      noteIcon: v.data.noteIcon || process.env.NOTE_ICON_DEFAULT,
      hide: v.data.hideInGraph || false,
    };
    stemURLs[fpath] = v.url;
    if (
        v.data["dg-home"] ||
        (v.data.tags && v.data.tags.indexOf("gardenEntry") > -1)
    ) {
      homeAlias = v.url;
    }
  });
  Object.values(nodes).forEach((node) => {
    let outBound = new Set();
    node.outBound.forEach((olink) => {
      let link = (stemURLs[olink] || olink).split("#")[0];
      outBound.add(link);
    });
    node.outBound = Array.from(outBound);
    node.outBound.forEach((link) => {
      let n = nodes[link];
      if (n) {
        n.neighbors.add(node.url);
        n.backLinks.add(node.url);
        node.neighbors.add(n.url);
        links.push({ source: node.id, target: n.id });
      }
    });
  });
  Object.keys(nodes).map((k) => {
    nodes[k].neighbors = Array.from(nodes[k].neighbors);
    nodes[k].backLinks = Array.from(nodes[k].backLinks);
    nodes[k].size = nodes[k].neighbors.length;
  });
  
  // console.log("homeAlias, nodes, links", data.collections, homeAlias, nodes, links)
  return {
    homeAlias,
    nodes,
    links,
  };
}