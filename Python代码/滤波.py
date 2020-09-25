import pandas as pd
import matplotlib.pyplot as plt
from math import sqrt
from math import ceil
from math import log10
from math import pow
from math import cos
from math import pi
from detecta import detect_peaks
from scipy.signal import butter
az=[]
bz=[]
df=pd.read_csv('./all_backup.csv')

act=20
accx=df['accXs'][act][1:len(df['accXs'][act])-1]
accy=df['accYs'][act][1:len(df['accYs'][act])-1]
accz=df['accZs'][act][1:len(df['accZs'][act])-1]
times=df['timeSs'][act][1:len(df['timeSs'][act])-1]

accx=accx.split(',')
accy=accy.split(',')
accz=accz.split(',')
times=times.split(',')
accx=list(map(float,accx))
accy=list(map(float,accy))
accz=list(map(float,accz))
times=list(map(float,times))


def medfit(vector, n_odd):
    odd=int((n_odd-1)/2)
    fitted=[0]*len(vector)
    for i in range(0,odd):
        fitted[i]=vector[i]
    for i in range(len(vector)-odd,len(vector)):
        fitted[i]=vector[i]
    for i in range(odd,len(vector)-odd):
        obj=vector[i-odd:i+odd+1]
        obj=sorted(obj)
        fitted[i]=obj[odd]
    return fitted


def getRank(Stopband_attenuation, Passband_attenuation, Stopband, Passband):
    A=(pow(10,Stopband_attenuation*0.1)-1)/(pow(10,Passband_attenuation*0.1)-1)
    B=Stopband/Passband
    N=ceil(0.5*(log10(A)/log10(B)))
    return N


def butterworth(vector):
    global bz, az
    b, a = butter(4, 0.5, 'lowpass')
    v_new = [0]*len(vector)
    M=len(b)
    N=len(a)
    A=0
    B=0
    for i in range(0,N):
        v_new[i]=vector[i]
    for i in range(N,len(vector)):
        for j in range(1,N):
            A+=v_new[i-j]*a[j]
        for k in range(0,M):
            if i-k>=0:
                B+=vector[i-k]*b[k]
        v_new[i]=A+B
        A=0
        B=0
    print('b:',b)
    print('a:',a)
    bz=b
    az=a
    return v_new





#minlen=min(len(accx),len(accy),len(accz),len(times))
minlen=200
accx=accx[0:minlen]
accy=accy[0:minlen]
accz=accz[0:minlen]
times=times[0:minlen]
acc_all=[]
for i in range(minlen):
    acc=sqrt(accx[i]*accx[i]+accy[i]*accy[i]+accz[i]*accz[i])
    acc_all.append(acc)
plt.plot(times,accx,label='accx')
plt.plot(times,accy,label='accy')
plt.plot(times,accz,label='accz')
plt.plot(times,acc_all,label='acc_all')
plt.legend(loc='lower right', fontsize=8)
plt.show()
accx=medfit(accx,5)
accy=medfit(accy,5)
accz=medfit(accz,5)
accx=butterworth(accx)
accy=butterworth(accy)
accz=butterworth(accz)
acc_all=[]
for i in range(minlen):
    acc=sqrt(accx[i]*accx[i]+accy[i]*accy[i]+accz[i]*accz[i])
    acc_all.append(acc)
plt.plot(times,accx,label='accx')
plt.plot(times,accy,label='accy')
plt.plot(times,accz,label='accz')
plt.plot(times,acc_all,label='acc_all')
plt.legend(loc='lower right', fontsize=8)
plt.show()
print('*'*100)
with open("./BZ.txt", "w") as output:
    output.write(str(bz))
with open("./AZ.txt", "w") as output:
    output.write(str(az))

