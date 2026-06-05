import * as fs from 'fs';

async function dumpAllToTxt() {
  const host = "https://www.notion.so";
  const startPageId = "2a30d409-e729-442a-b71a-98668d73b634";
  
  const blockMap: Record<string, any> = {};
  const processedPageIds = new Set<string>();
  const pageQueue = [startPageId];

  while (pageQueue.length > 0) {
    const pageId = pageQueue.shift()!;
    if (processedPageIds.has(pageId)) continue;
    processedPageIds.add(pageId);
    
    try {
      const url = `${host}/api/v3/loadPageChunk`;
      const body = {
        pageId: pageId,
        limit: 100,
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false
      };
      
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        body: JSON.stringify(body)
      });
      
      if (!res.ok) continue;
      
      const data = await res.json() as any;
      if (data && data.recordMap && data.recordMap.block) {
        const blocks = data.recordMap.block;
        for (const [key, container] of Object.entries(blocks)) {
          const b = (container as any).value?.value || (container as any).val?.value || (container as any).value || (container as any).val;
          if (b) {
            blockMap[key] = b;
            if (b.type === 'page' && key !== pageId && !processedPageIds.has(key)) {
              pageQueue.push(key);
            }
          }
        }
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  let outputText = "";

  function renderBlockTree(blockId: string, depth: number = 0): string {
    const block = blockMap[blockId];
    if (!block) return "";

    let text = "";
    const indent = "  ".repeat(depth);
    
    let titleStr = "";
    if (block.properties && block.properties.title) {
      titleStr = block.properties.title.map((chunk: any) => chunk[0]).join("");
    }

    const type = block.type;
    
    switch (type) {
      case 'page':
        text += `\n${indent}# [Page: ${titleStr}]\n`;
        break;
      case 'header':
        text += `\n${indent}## ${titleStr}\n`;
        break;
      case 'sub_header':
        text += `\n${indent}### ${titleStr}\n`;
        break;
      case 'sub_sub_header':
        text += `\n${indent}#### ${titleStr}\n`;
        break;
      case 'text':
        if (titleStr) {
          text += `${indent}${titleStr}\n`;
        }
        break;
      case 'bulleted_list':
        text += `${indent}- ${titleStr}\n`;
        break;
      case 'numbered_list':
        text += `${indent}1. ${titleStr}\n`;
        break;
      case 'quote':
        text += `${indent}> ${titleStr}\n`;
        break;
      case 'callout':
        text += `\n${indent}[CALLOUT] ${titleStr}\n`;
        break;
      case 'divider':
        text += `${indent}--- \n`;
        break;
      case 'code':
        text += `\n${indent}\`\`\`\n${indent}${titleStr}\n${indent}\`\`\`\n`;
        break;
      default:
        if (titleStr) {
          text += `${indent}[${type}] ${titleStr}\n`;
        }
        break;
    }

    if (block.content) {
      for (const childId of block.content) {
        const childBlock = blockMap[childId];
        if (childBlock && childBlock.type === 'page') {
          text += `${indent}- Subpage: ${childBlock.properties?.title?.[0]?.[0] || 'Untitled'} (${childId})\n`;
        } else {
          text += renderBlockTree(childId, type === 'page' ? depth : depth + 1);
        }
      }
    }

    return text;
  }

  // Render starting page and all individual subpages
  for (const pageId of processedPageIds) {
    const pTitle = blockMap[pageId]?.properties?.title?.[0]?.[0] || "Untitled";
    outputText += `\n\n==================================================\n`;
    outputText += `PAGE ID: ${pageId}\n`;
    outputText += `PAGE TITLE: ${pTitle}\n`;
    outputText += `==================================================\n`;
    outputText += renderBlockTree(pageId, 0);
  }

  fs.writeFileSync("./notion-content-sender-restricted.txt", outputText, "utf-8");
  console.log("Dumped everything to ./notion-content-sender-restricted.txt successfully!");
}

dumpAllToTxt();
