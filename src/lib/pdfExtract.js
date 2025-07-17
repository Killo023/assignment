// Standalone PDF text extraction script for Node.js
const pdf = require('pdf-parse');

async function main() {
  let input = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) {
    input += chunk;
  }
  try {
    const buffer = Buffer.from(input, 'base64');
    const data = await pdf(buffer);
    process.stdout.write(JSON.stringify({ text: data.text }));
  } catch (err) {
    process.stderr.write(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main(); 