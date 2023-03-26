// 配置文件名称
const configFileName = ".config.dat";

// 历史对话文件名称
// const historyFileName = ".history.dat";

// get file path
function getFilePath(fileName) {
	return `openai_ass_history/${fileName}`;
}

// allow multiple history files
function historyFileName() {
	id = 1;
	fileName = `.history_${id}.dat`;
	while ($file.exists(getFilePath(fileName))) {
		id++;
		fileName = `.history_${id}.dat`;
	}
	fileName = `.history_${id-1}.dat`;
	return fileName;
}

// read file and return parsed json
function readFile(fileName = configFileName) {
	const filePath = getFilePath(fileName);

	const exists = $file.exists(filePath);

	if (!exists) {
		return fileName === configFileName ? { openConversation: false } : [];
	}

	return JSON.parse($file.read(filePath).toUTF8());
}

// write file with stringified value
function writeFile({ value, fileName = configFileName }) {
	$file.write({
		data: $data.fromUTF8(JSON.stringify(value)),
		path: getFilePath(fileName),
	});
}

// create a new history file and provide the file path
function newFile() {
	id = 0;
	fileName = `.history_${id}.dat`;
	while ($file.exists(getFilePath(fileName))) {
		id++;
		fileName = `.history_${id}.dat`;
	}
	$file.write({
		data: $data.fromUTF8("[]"),
		path: getFilePath(fileName),
	});
	return fileName;
}




module.exports = {
	configFileName,
	historyFileName,
	readFile,
	writeFile,
	newFile,
	getFilePath
};
