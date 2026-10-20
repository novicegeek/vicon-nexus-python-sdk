/* ---------------------------------------------------------------------------
 * Site search index — ENGLISH tree.
 * [title, url, description]
 *
 * The Chinese tree loads assets/search-index.js (same format, 中文).
 * Keep in sync when adding APIs: one entry per method + one per page section.
 * ------------------------------------------------------------------------- */
window.SEARCH_INDEX = [
  /* ---- pages ---- */
  ['Overview', 'index.html', 'Vicon Nexus 2.12 Python SDK — documentation home'],
  ['Quick start', 'getting-started.html', 'Install, connect to Nexus, write your first script'],
  ['Architecture', 'architecture.html', 'Python facade / SWIG / native DLL call chain'],
  ['Example scripts', 'examples.html', 'The 8 official example_scripts, explained'],
  ['FAQ', 'faq.html', 'Connection, versions, threading and deployment issues'],
  ['Errors & methods', 'faq.html#errors', 'GenerateErrors, ViconNexusException, troubleshooting'],

  /* ---- ViconNexus: connection ---- */
  ['ViconNexus', 'api-viconnexus.html', 'Main entry class; constructing it connects'],
  ['__init__', 'api-viconnexus.html#__init__', 'Create the connection to Nexus (host)'],
  ['Connect', 'api-viconnexus.html#Connect', 'Reconnect after a dropped connection'],
  ['Disconnect', 'api-viconnexus.html#Disconnect', 'Close the connection'],
  ['IsConnected', 'api-viconnexus.html#IsConnected', 'Query connection state'],
  ['GetServerInfo', 'api-viconnexus.html#GetServerInfo', 'Program name, major/minor/point version, release type'],

  /* ---- trial & frames ---- */
  ['GetFrameCount', 'api-viconnexus.html#GetFrameCount', 'Total frame count of the loaded trial'],
  ['GetFrameRate', 'api-viconnexus.html#GetFrameRate', 'Base frame rate of the trial'],
  ['GetTrialRange', 'api-viconnexus.html#GetTrialRange', 'Updatable frame range'],
  ['GetTrialRegionOfInterest', 'api-viconnexus.html#GetTrialRegionOfInterest', 'User region of interest'],
  ['SetTrialRegionOfInterest', 'api-viconnexus.html#SetTrialRegionOfInterest', 'Set the region of interest'],
  ['GetTrialName', 'api-viconnexus.html#GetTrialName', 'Trial name and folder path'],

  /* ---- subjects ---- */
  ['GetSubjectNames', 'api-viconnexus.html#GetSubjectNames', 'Names of loaded subjects'],
  ['GetSubjectInfo', 'api-viconnexus.html#GetSubjectInfo', 'Subject names / templates / active flags'],
  ['SetSubjectActive', 'api-viconnexus.html#SetSubjectActive', 'Activate or deactivate a subject (supports Exclusive)'],
  ['GetUnlabeledCount', 'api-viconnexus.html#GetUnlabeledCount', 'Number of unlabeled trajectories'],
  ['GetUnlabeled', 'api-viconnexus.html#GetUnlabeled', 'Read one unlabeled trajectory, all frames'],

  /* ---- markers & trajectories ---- */
  ['GetMarkerNames', 'api-viconnexus.html#GetMarkerNames', 'Marker names defined on a subject'],
  ['HasTrajectory', 'api-viconnexus.html#HasTrajectory', 'Whether a marker has trajectory data'],
  ['GetTrajectory', 'api-viconnexus.html#GetTrajectory', 'Read all frames of x/y/z/exists'],
  ['SetTrajectory', 'api-viconnexus.html#SetTrajectory', 'Write all frames of a trajectory'],
  ['GetTrajectoryAtFrame', 'api-viconnexus.html#GetTrajectoryAtFrame', 'Read a single frame'],
  ['SetTrajectoryAtFrame', 'api-viconnexus.html#SetTrajectoryAtFrame', 'Write a single frame'],

  /* ---- segments & joints ---- */
  ['GetSegmentNames', 'api-viconnexus.html#GetSegmentNames', 'Segment name list'],
  ['GetRootSegment', 'api-viconnexus.html#GetRootSegment', 'Name of the root segment'],
  ['GetSegmentDetails', 'api-viconnexus.html#GetSegmentDetails', 'Parent / children / markers of a segment'],
  ['GetJointNames', 'api-viconnexus.html#GetJointNames', 'Joint name list'],
  ['GetJointDetails', 'api-viconnexus.html#GetJointDetails', 'Parent and child segment of a joint'],

  /* ---- model outputs ---- */
  ['GetModelOutputNames', 'api-viconnexus.html#GetModelOutputNames', 'Model output name list'],
  ['GetModelOutputDetails', 'api-viconnexus.html#GetModelOutputDetails', 'Group, component names and quantity types'],
  ['GetModelOutput', 'api-viconnexus.html#GetModelOutput', 'Read all frames (N×M matrix)'],
  ['SetModelOutput', 'api-viconnexus.html#SetModelOutput', 'Write all frames'],
  ['GetModelOutputAtFrame', 'api-viconnexus.html#GetModelOutputAtFrame', 'Read a single frame'],
  ['SetModelOutputAtFrame', 'api-viconnexus.html#SetModelOutputAtFrame', 'Write a single frame'],
  ['CreateModelOutput', 'api-viconnexus.html#CreateModelOutput', 'Create an output with quantity types'],
  ['CreateModeledMarker', 'api-viconnexus.html#CreateModeledMarker', 'Create a displayable modeled marker'],

  /* ---- subject parameters ---- */
  ['GetSubjectParamNames', 'api-viconnexus.html#GetSubjectParamNames', 'Static subject parameter names'],
  ['GetSubjectParamDetails', 'api-viconnexus.html#GetSubjectParamDetails', 'Value / unit / default / required / has-value'],
  ['GetSubjectParam', 'api-viconnexus.html#GetSubjectParam', 'Read a subject parameter'],
  ['SetSubjectParam', 'api-viconnexus.html#SetSubjectParam', 'Write a subject parameter'],
  ['CreateSubjectParam', 'api-viconnexus.html#CreateSubjectParam', 'Create a parameter (unit limited to none/mm/deg/kg/s)'],

  /* ---- analysis parameters ---- */
  ['GetAnalysisParamNames', 'api-viconnexus.html#GetAnalysisParamNames', 'Analysis parameter names'],
  ['GetAnalysisParamDetails', 'api-viconnexus.html#GetAnalysisParamDetails', 'Value / unit / has-value'],
  ['GetAnalysisParam', 'api-viconnexus.html#GetAnalysisParam', 'Read an analysis parameter'],
  ['SetAnalysisParam', 'api-viconnexus.html#SetAnalysisParam', 'Write an analysis parameter'],
  ['CreateAnalysisParam', 'api-viconnexus.html#CreateAnalysisParam', 'Create an analysis parameter'],

  /* ---- events ---- */
  ['GetEvents', 'api-viconnexus.html#GetEvents', 'Query events by subject / context / type'],
  ['CreateAnEvent', 'api-viconnexus.html#CreateAnEvent', 'Create an event at frame + offset'],
  ['ClearAllEvents', 'api-viconnexus.html#ClearAllEvents', 'Delete every event in the trial'],

  /* ---- devices ---- */
  ['GetDeviceIDs', 'api-viconnexus.html#GetDeviceIDs', 'Analog device ID list'],
  ['GetDeviceNames', 'api-viconnexus.html#GetDeviceNames', 'Device name list'],
  ['GetDeviceIDFromName', 'api-viconnexus.html#GetDeviceIDFromName', 'Look up a device ID by name'],
  ['GetDeviceDetails', 'api-viconnexus.html#GetDeviceDetails', 'Name/type/rate plus force plate and eye tracker info'],
  ['GetDeviceOutputIDFromName', 'api-viconnexus.html#GetDeviceOutputIDFromName', 'Look up an output ID by name'],
  ['GetDeviceOutputDetails', 'api-viconnexus.html#GetDeviceOutputDetails', 'Output name/type/unit/ready/channels'],
  ['GetDeviceChannelIDFromName', 'api-viconnexus.html#GetDeviceChannelIDFromName', 'Look up a channel ID by name'],

  /* ---- channel data ---- */
  ['GetDeviceChannel', 'api-viconnexus.html#GetDeviceChannel', 'Whole channel, local coordinates'],
  ['GetDeviceChannelAtFrame', 'api-viconnexus.html#GetDeviceChannelAtFrame', 'One sample frame, local coordinates'],
  ['GetDeviceChannelForFrame', 'api-viconnexus.html#GetDeviceChannelForFrame', 'Samples aligned to an optical frame'],
  ['GetDeviceChannelGlobal', 'api-viconnexus.html#GetDeviceChannelGlobal', 'Whole channel, global coordinates'],
  ['GetDeviceChannelGlobalAtFrame', 'api-viconnexus.html#GetDeviceChannelGlobalAtFrame', 'Global, one sample frame'],
  ['GetDeviceChannelGlobalForFrame', 'api-viconnexus.html#GetDeviceChannelGlobalForFrame', 'Global, aligned to an optical frame'],
  ['SetDeviceChannel', 'api-viconnexus.html#SetDeviceChannel', 'Write a whole channel (recommended)'],
  ['SetDeviceChannelAtFrame', 'api-viconnexus.html#SetDeviceChannelAtFrame', 'Write a single frame of a channel'],

  /* ---- spline ---- */
  ['SubmitSplineTrajectory', 'api-viconnexus.html#SubmitSplineTrajectory', 'Feed scattered points to the spline'],
  ['GetSplineResults', 'api-viconnexus.html#GetSplineResults', '1st/2nd derivative of the spline'],

  /* ---- trial operations ---- */
  ['OpenTrial', 'api-viconnexus.html#OpenTrial', 'Open a trial in the host application'],
  ['SaveTrial', 'api-viconnexus.html#SaveTrial', 'Save the current trial'],
  ['CloseTrial', 'api-viconnexus.html#CloseTrial', 'Close the current trial without saving'],
  ['RunPipeline', 'api-viconnexus.html#RunPipeline', 'Run a Processing Pipeline'],
  ['ViconNexusException', 'api-viconnexus.html#ViconNexusException', 'Exception type raised by the SDK'],
  ['GenerateErrors', 'api-viconnexus.html#GenerateErrors', 'Whether failures are printed to stderr'],
  ['Client', 'api-viconnexus.html#Client', 'Escape hatch to the low-level client'],

  /* ---- ViconUtils ---- */
  ['CreateViconGaitModelOutputs', 'api-viconutils.html#CreateViconGaitModelOutputs', 'Create the full Plug-in Gait output set'],
  ['Globalise', 'api-viconutils.html#Globalise', 'Local point → world coordinates'],
  ['Localise', 'api-viconutils.html#Localise', 'World point → local coordinates'],
  ['EulerFromMatrix', 'api-viconutils.html#EulerFromMatrix', 'Rotation matrix → Euler angles (6 orders)'],
  ['MatrixFromEuler', 'api-viconutils.html#MatrixFromEuler', 'Euler angles → rotation matrix'],
  ['QuaternionFromMatrix', 'api-viconutils.html#QuaternionFromMatrix', 'Rotation matrix → quaternion'],
  ['AngleAxisFromQuaternion', 'api-viconutils.html#AngleAxisFromQuaternion', 'Quaternion → angle-axis'],
  ['AngleAxisFromMatrix', 'api-viconutils.html#AngleAxisFromMatrix', 'Rotation matrix → angle-axis'],
  ['RotationMatrixFromAngleAxis', 'api-viconutils.html#RotationMatrixFromAngleAxis', 'Angle-axis → rotation matrix'],
  ['Rotation conventions', 'api-viconutils.html#conventions', 'Units and matrix/angle conventions'],

  /* ---- data types ---- */
  ['NexusForcePlate', 'api-datatypes.html#NexusForcePlate', 'Force plate geometry (LocalR/LocalT/WorldR/WorldT/Bounds)'],
  ['NexusEyeTracker', 'api-datatypes.html#NexusEyeTracker', 'Eye tracker info (SubjectName/SegmentName/EyePose/Offset)'],
  ['LocalR', 'api-datatypes.html#NexusForcePlate', 'Force plate local rotation matrix (row-major, 9 values)'],
  ['Output_Result', 'api-lowlevel.html#outputs', 'Base result type with Error()/ResultString()'],

  /* ---- viconnexusutils ---- */
  ['NexusObject', 'api-viconnexusutils.html#NexusObject', 'Abstract base for readable/writable Nexus objects'],
  ['NexusTrajectory', 'api-viconnexusutils.html#NexusTrajectory', '3-D trajectory object (numpy backed)'],
  ['NexusAngles', 'api-viconnexusutils.html#NexusAngles', 'Angle / angle-axis object'],
  ['NexusSegment', 'api-viconnexusutils.html#NexusSegment', 'Segment object (position / orientation / scale)'],
  ['Populate', 'api-viconnexusutils.html#Populate', 'Build a segment from three trajectories'],
  ['AngleBetween', 'api-viconnexusutils.html#AngleBetween', 'Relative angle between two segments'],
  ['GlobalisePoint', 'api-viconnexusutils.html#GlobalisePoint', 'Segment-local point → global'],
  ['LocalisePoint', 'api-viconnexusutils.html#LocalisePoint', 'Global point → segment-local'],
  ['TranslatePointInSegment', 'api-viconnexusutils.html#TranslatePointInSegment', 'Translate a point inside the segment frame'],
  ['Position', 'api-viconnexusutils.html#Position', 'Read positions (optionally per frame)'],
  ['Orientation', 'api-viconnexusutils.html#Orientation', 'Read orientation (Euler, radians)'],
  ['Scale', 'api-viconnexusutils.html#Scale', 'Read scale'],
  ['Read', 'api-viconnexusutils.html#Read', 'Load object data from Nexus'],
  ['Write', 'api-viconnexusutils.html#Write', 'Write object data back to Nexus'],
  ['Create', 'api-viconnexusutils.html#Create', 'Create an empty output in Nexus'],
  ['global_segment', 'api-viconnexusutils.html#global_segment', 'World segment (identity pose)'],

  /* ---- low level ---- */
  ['ViconNexusClient', 'api-lowlevel.html#ViconNexusClient', 'SWIG client; one method per C++ command'],
  ['ProcessRequest', 'api-lowlevel.html#ProcessRequest', 'Generic command channel'],
  ['GetCommandList', 'api-lowlevel.html#GetCommandList', 'Enumerate available commands'],
  ['GetCommandInfo', 'api-lowlevel.html#GetCommandInfo', 'Query a command signature'],
  ['SafeString', 'api-lowlevel.html#containers', 'Native string wrapper (AllocString)'],
  ['map_ui_vd', 'api-lowlevel.html#containers', 'uint → vectord map container'],
  ['vectord', 'api-lowlevel.html#containers', 'Native double vector container'],
  ['Crash', 'api-lowlevel.html#internals', 'For host crash-handling tests only']
];
