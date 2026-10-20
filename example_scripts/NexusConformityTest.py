#Usage 

#For installation  engineer to perform measurement test for declaration of conformity at installation

#Instructions

#Create new session and ensure no subject files are present in the session
#Capture trial of > 1000 samples of 5 marker calibration wand (Active or Passive) placed on the floor
#Load trial and load corresponding wand VSK file from <install directory>\CalibrationObjects
#e.g. C:\Program Files (x86)\Vicon\Nexus2.7\CalibrationObjects\Active Wand v2.vsk 
#Reconstruct and label trial
#Run this script by using 'Run Python Operation' in the pipeline
#Output is printed to the Nexus Log  as well as two text files will be created
#All the information should be copied into the installation document

#version 1.1 (2019-03-07)

import viconnexusapi
from viconnexusapi import ViconNexus
import csv
import re
v = ViconNexus.ViconNexus()

class Trajectory:

	def __init__(self, marker_name, length):
		self.name = marker_name
		self.x = range(length)
		self.y = range(length)
		self.z = range(length)
		self.occluded = range(length)

	def GetData(self, subject_name):
		self.x, self.y, self.z, self.occluded = v.GetTrajectory(subject_name,self.name)
				
def GetDistance(marker_1,marker_2, frame):
	return ((marker_1.x[frame] - marker_2.x[frame])**2 +(marker_1.y[frame] - marker_2.y[frame])**2 +(marker_1.z[frame] - marker_2.z[frame])**2 )**0.5

def PrintMeanAndSD(marker_1,marker_2,frames):
	count = 0
	sum = 0.0000
	samples = []
	for i in range(frames):
		if marker_1.occluded[i] and marker_2.occluded[i]:
			distance_between = GetDistance(marker_1,marker_2,i)
			samples.append(distance_between)
			sum += distance_between
			count+=1
			
	mean = sum/count
	
	sum = 0.0000
	for sample in samples:
		sum += (sample - mean)**2
		
	SD = (sum/count)**0.5
		
	return marker_1.name + "-" + marker_2.name + "          Mean: " + str(mean) + "     SD: " + str(SD) + "  (" + str(count) + " samples)"

def conformity():
	framecount = v.GetFrameCount()
	SessionLoc = v.GetTrialName()[0]
	foutput = (SessionLoc + r'Conformity_Test_Results.txt')

	subject_names = v.GetSubjectNames()
	wand = subject_names[0]

	MarkerA = Trajectory('MarkerA', framecount)
	MarkerB = Trajectory('MarkerB',framecount)
	MarkerC = Trajectory('MarkerC',framecount)
	MarkerD = Trajectory('MarkerD',framecount)
	MarkerE = Trajectory('MarkerE',framecount)

	MarkerA.GetData(wand)
	MarkerB.GetData(wand)
	MarkerC.GetData(wand)
	MarkerD.GetData(wand)
	MarkerE.GetData(wand)

	AB = PrintMeanAndSD(MarkerA,MarkerB,framecount)
	AC = PrintMeanAndSD(MarkerA,MarkerC,framecount)
	BC = PrintMeanAndSD(MarkerB,MarkerC,framecount)
	BD = PrintMeanAndSD(MarkerB,MarkerD,framecount)
	BE = PrintMeanAndSD(MarkerB,MarkerE,framecount)
	DE = PrintMeanAndSD(MarkerD,MarkerE,framecount)

	print AB
	print AC
	print BC
	print BD
	print BE
	print DE

	with open(foutput, 'w') as out:
		print("I'm going to write these to the file.")
		out.write('{}\n{}\n{}\n{}\n{}\n{}\n'.format(AB, AC, BC, BD, BE, DE))

def SNr_FWv_Number():
    SessionLoc = v.GetTrialName()[0]
    SystemTrialName = SessionLoc + v.GetTrialName()[1] + ".system"
    foutput = (SessionLoc + r'SerialNR_and_Firmware.txt')
    systemFile = open(SystemTrialName)
    systemFileString = systemFile.read()
    
    SN = r"(?<=SerialNumber\" value=\").{2,4}-[a-zA-Z0-9]{1,2}-\d{4}|VL\d{0,6}"  # https://regex101.com/r/NwjGK9/1
    FW = r"(?<=FirmwareVersion\" value=\")\d{3}"
    
    SN_list = re.findall(SN, systemFileString, re.MULTILINE)
    FW_list = re.findall(FW, systemFileString, re.MULTILINE)

    headings = ["Serial Number", "Firmware Version"]

    data = [headings] + list(zip(SN_list, FW_list))

    for i, d in enumerate(data):
        line = '  |  '.join(str(x).ljust(12) for x in d)
        print(line)
        if i == 0:
            print('-' * len(line))

    with open(foutput, 'w') as f:  # note that with open() closes itself
        writer = csv.writer(f, delimiter=',')
        writer.writerows(data)

if __name__ == "__main__":
	conformity()
	SNr_FWv_Number()