const { Readable, Writable, Transform, Duplex } = require('stream');
const fs = require('fs');
const readStream = fs.createReadStream('input.txt', {
    heighWaterMark: 4
});

const writeStream = fs.createWriteStream('output.txt');
const transform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});
readStream.pipe(transform).pipe(writeStream);
// readStream.on('data', (chunk) => {
//     writeStream.write(chunk.toString().toUpperCase());
// });
// class ArrayToStream extends Readable {
//     constructor(array) {
//         super(array);
//         this.index = 0;
//         this.array = array;
//     }
//     _read(chunk) {
//         if (this.index < this.array.length) {
//             this.push(this.array[this.index].toString());
//             this.index++;
//         } else {
//             this.push(null);
//         }

//     }
// }
// const customReadable = new ArrayToStream([1, 2, 3, 4]);
// customReadable.on('data', (item) => {
//     console.log(item.toString());
// });
// customReadable.on('end', () => {
//     console.log('end');
// });