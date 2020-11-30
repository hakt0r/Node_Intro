
const cp = require('child_process');
const fs = require('fs');

function splitVideo (filename) {
    // `ffmpeg -i ${} -ss ${} -t ${} -c copy ${}.p${}.mp4`
}

const [ ,, command, ...args ] = process.argv;

console.log(process.argv)
let name;
switch ( command ){
    case 'record':
        [ name ] = args; 
        cp.spawn('ffmpeg',['-y','-video_size','1680x1050','-framerate',25,
        '-f','x11grab','-i',':0','-f','pulse', '-ac', 2, '-i', 'default',
        '-f', 'pulse', '-ac', 2, '-i', 1,
        `Video/${name}.mp4`],{stdio:'inherit'});
        break;
    case 'split':
        const seconds = 1700;
        [ name ] = args; name = name.replace(/.mp4/,'');
        const [,h,m,s,ms] = cp.execSync(`ffmpeg -i ${name}.mp4 2>&1 | grep "Duration"`).toString().match(`Duration: ([0-9]+):([0-9]+):([0-9]+).([0-9]+)`)
        const totalSeconds = Number(h) * 60 * 60 + Number(m) * 60 + Number(s) + 1
        for ( i = 0; i < Math.ceil(totalSeconds / seconds); i++ ){
            cp.spawnSync('ffmpeg',['-i',`${name}.mp4`,'-ss', i * seconds,
            '-t',seconds,'-c','copy',`${name}.p${i.toString().padStart(2,'0')}.mp4`],{stdio:'inherit'})
        }
        break;
    case 'push':
        process.chdir('./Video');
        // cp.execSync('for i in $(ls *.mp4); do MP4Box -isma -inter 500 $i; done');
        const list = fs.readdirSync('.').filter( f => f.match('.mp4') );
        const html = `<html>
        ${list.map(
            file => `<li/><a href="${file}">${file}</a>`
        ).join('\n')}
        </html>`;
        fs.writeFileSync('index.html',html);
        cp.spawn('rsync',['-avz','.','root@sz.hktr.de:/var/www/lfs/dci/fbw14/'],{stdio:'inherit'})
        
}