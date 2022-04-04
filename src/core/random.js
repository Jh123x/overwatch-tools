export function pick_random(players){
    var buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return players[buf[0] % players.length];
}