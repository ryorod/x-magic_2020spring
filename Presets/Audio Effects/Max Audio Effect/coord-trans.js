inlets = 6;
outlets = 3;

var X, Y, Z;
var lowpassX = 0, lowpassY = 0, lowpassZ = 0;
var k = 0.1;
var pitch, roll, azimuth;
var nPitchRad, sinNPitch, cosNPitch, nRollRad, sinNRoll, cosNRoll, nAzimuthRad, sinNAzimuth, cosNAzimuth, bx, by;
var ax, ay, az;


function msg_float(v){
	switch(this.inlet){
		case 0:
		X = v;
		lowpassX += (X - lowpassX) * k;
		break;
		
		case 1:
		Y = v;
		lowpassY += (Y - lowpassY) * k;
		break;
		
		case 2:
		Z = v;
		lowpassZ += (Z - lowpassZ) * k;
		break;
		
		case 3:
		pitch = v;
		nPitchRad = -pitch * (Math.PI / 180);
		sinNPitch = Math.sin(nPitchRad);
		cosNPitch = Math.cos(nPitchRad);
		break;
		
		case 4:
		roll = v;
		nRollRad = -roll * (Math.PI / 180);
		sinNRoll = Math.sin(nRollRad);
		cosNRoll = Math.cos(nRollRad);
		break;
		
		case 5:
		azimuth = v;
		nAzimuthRad = -azimuth * (Math.PI / 180);
		sinNAzimuth = Math.sin(nAzimuthRad);
		cosNAzimuth = Math.cos(nAzimuthRad);
		break;
		
		default:
		break;
	}
	
	bx = lowpassX * cosNRoll + lowpassZ * sinNRoll;
	by = lowpassX * sinNPitch * sinNRoll + lowpassY * cosNPitch - lowpassZ * sinNPitch * cosNRoll;
	az = -lowpassX * cosNPitch * sinNRoll + lowpassY * sinNPitch * cosNRoll + lowpassZ * cosNPitch * cosNRoll;
	ax = bx * cosNAzimuth - by * sinNAzimuth;
	ay = bx * sinNAzimuth + by * cosNAzimuth;
	
	outlet(0, ax);
	outlet(1, ay);
	outlet(2, az);
}	