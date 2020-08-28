inlets = 3;
outlets = 3;

var X, Y, Z;
var lowpassX = 0, lowpassY = 0, lowpassZ = 0;
var k = 0.1;
//var filteredX, filteredY, filteredZ;


function msg_float(v){
	switch(this.inlet){
		case 0:
		X = v;
		lowpassX += (X - lowpassX) * k;
		//filteredX = X - lowpassX;
		//outlet(0, filteredX);
		outlet(0, lowpassX);
		break;
		
		case 1:
		Y = v;
		lowpassY += (Y - lowpassY) * k;
		//filteredY = Y - lowpassY;
		//outlet(1, filteredY);
		outlet(1, lowpassY);
		break;
		
		case 2:
		Z = v;
		lowpassZ += (Z - lowpassZ) * k;
		//filteredZ = Z - lowpassZ;
		//outlet(2, filteredZ);
		outlet(2, lowpassZ);
		break;
		
		default:
		break;
	}
}