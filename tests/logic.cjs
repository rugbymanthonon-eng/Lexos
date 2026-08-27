const fs=require('fs');
for(const f of ['App.js','src/poker.js','app.json','package.json']){if(!fs.existsSync(f))throw new Error('Missing '+f)}
const app=JSON.parse(fs.readFileSync('app.json','utf8'));const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
if(app.expo.android.package!=='com.lexos.pokeranalyzer')throw new Error('Android package invalid');
if(!pkg.dependencies['expo-camera'])throw new Error('Camera dependency missing');
console.log('Lexos source checks: OK');
