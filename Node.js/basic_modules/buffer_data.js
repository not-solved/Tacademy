console.log('endian : ', require('os').endianness());

//  buffer
var buffer = new Buffer(6);

// 버퍼에 입력
buffer.writeInt8(1, 0); // 01
buffer.writeUInt8(0xFF, 1); // FF
buffer.writeUInt16LE(0xFF, 2); // FF 00
buffer.writeUInt16BE(0xFF, 4); // 00 FF

console.log('HEX : ', buffer.toString('hex'));

// 입력한 값 읽기
console.log(buffer.readInt8(0)); // 1
console.log(buffer.readUInt8(1)); // 255
console.log(buffer.readUInt16LE(2)); // 255
console.log(buffer.readUInt16BE(4)); // 255