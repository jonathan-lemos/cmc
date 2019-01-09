import fs from "fs";

const punctuation = new Set<string>(["(", ")", "{", "}", ","]);
const tokens = new Set<string>(["else", "if", "int", "return", "void", "while"]);

export const lexer = (lines: string[]): string[] => {
	const ret: string[] = [];
	lines.forEach(line => {
		while (line !== "") {
			line = line.trim();
			const re = /(\(|\)|\{|\}|,|[A-Za-z]+)(.*)$/;
			const match = line.match(re);
			if (match === null) {
				break;
			}
			ret.push(match[1]);
			line = match[2];
		}
	});
	return ret;
};

if (process.argv.length !== 3) {
	console.log(`Usage: ${process.argv[0]} ${process.argv[1]} file`);
	process.exit();
}

const fileContents = fs.readFileSync(process.argv[2], "utf8");
const l = fileContents.split("\n");
const lex = lexer(l);
lex.forEach(s => {
	if (punctuation.has(s)) {
		console.log(`Punctuation: ${s}`);
	}
	else if (tokens.has(s)) {
		console.log(`Token: ${s}`);
	}
	else {
		console.log(`Identifier: ${s}`);
	}
});
