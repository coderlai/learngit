const cluster = require('cluster');

const http = require('http');

const cpuNums = require('os').cpus().length;

console.log(cpuNums);

if(cluster.isMaster){
	console.log(`master ${process.pid} is running`);

	for(let i = 0;i<cpuNums;i++){
		cluster.fork();
	}

	cluster.on('exit',(work,code,single) => {
		console.log(`worker ${worker.process.pid} died`);
	})
}else{
	http.createServer((req,res) => {
		res.writeHead(200);
		res.end('hello world \n');		
	}).listen(3000);

	console.log(`worker ${process.pid} started`);
}