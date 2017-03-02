class VFileSystem {
    readdirSync(dirPath) {
        var error = new Error('ENOENT: no such file or directory: ' + dirPath);
        error.code = 'ENOENT';
        throw error;
    }

    statSync(filePath) {
        var error = new Error('ENOENT: no such file or directory, stat ' + JSON.stringify(filePath));
        error.code = 'ENOENT';
        throw error;
    }

    existsSync(filePath) {
        return false;
    }
}


module.exports = new VFileSystem();