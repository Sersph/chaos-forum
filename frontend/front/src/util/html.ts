export default {
  parseHtmlStrToNodeList: (htmlStr: string): any => {
    var div = document.createElement("div");
    if (typeof htmlStr === 'string')
      div.innerHTML = htmlStr;
    return div.childNodes;
  },
  parseHtmlStrToHtmlContent: (htmlStr: string): string => {
    return htmlStr.replace(/<[^>]+>/ig, '');
  }
};
