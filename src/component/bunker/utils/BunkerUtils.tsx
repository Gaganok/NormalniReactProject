class BunkerUtils{

    private static typeColorMap = new Map<string, string>([
        ['job', '#ffffff'],
        ['baggage', '#4287f5'],
        ['health', '#ff5542'],
        ['hobby', '#7bff42'],
        ['biology', '#ffd042'],
    ])

    static getColor(type: string): string{
        const color = this.typeColorMap.get(type)  
        return color ? color! : '#ffffff' ;
    }

    static shadeColor(color: string, percent: number): string {

        // console.log(`${color}`)

        var R = parseInt(color.substring(1,3),16);
        // var R = color.substring(1,3);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);
        // var B = color.substring(5,7);

        // console.log(`${R} ${G} ${B}`)
    
        R = parseInt((R * (100 + percent) / 100).toString());
        G = parseInt((G * (100 + percent) / 100).toString());
        B = parseInt((B * (100 + percent) / 100).toString());
    
        R = (R<255)?R:255;  
        G = (G<255)?G:255;
        B = (B<255)?B:255;  
    
        var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    
        return "#"+RR+GG+BB;
        // return "#"+R+GG+BB;
        // return "#"+R+GG+B;
    }    
    
    static shadeColorV2(col: string, amt: number): string {
        col = col.replace(/^#/, '')
        if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
      
        let [r, g, b] = col.match(/.{2}/g)!;
        const [r1, g1, b1] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt]
      
        r = Math.max(Math.min(255, r1), 0).toString(16)
        g = Math.max(Math.min(255, g1), 0).toString(16)
        b = Math.max(Math.min(255, b1), 0).toString(16)
      
        const rr = (r.length < 2 ? '0' : '') + r
        const gg = (g.length < 2 ? '0' : '') + g
        const bb = (b.length < 2 ? '0' : '') + b
      
        return `#${rr}${gg}${bb}`
    }
}

export default BunkerUtils