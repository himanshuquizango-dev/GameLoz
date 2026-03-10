const term = "Ludo King®";
const dev = "Gametion";

fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=software&limit=20`)
  .then(res => res.json())
  .then(data => {
    const cleanTarget = term.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanDev = dev.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let bestScore = -1;
    let bestMatch = data.results[0];
    
    for (const res of data.results) {
      let score = 0;
      const cleanTrack = res.trackName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanDevName = (res.artistName || "").toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (cleanTrack === cleanTarget) score += 100;
      else if (cleanTrack.startsWith(cleanTarget)) score += 50;
      else if (cleanTarget.startsWith(cleanTrack)) score += 40;
      else if (cleanTrack.includes(cleanTarget)) score += 20;
      else if (cleanTarget.includes(cleanTrack)) score += 10;
      
      if (cleanDev && cleanDevName) {
         if (cleanDev === cleanDevName) score += 50;
         else if (cleanDevName.includes(cleanDev) || cleanDev.includes(cleanDevName)) score += 20;
      }
      
      console.log(`- ${res.trackName} | ${res.artistName} | Score: ${score}`);
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = res;
      }
    }
    
    console.log(`\nBEST MATCH: ${bestMatch.trackName} (Score: ${bestScore})`);
  });
