/* ---------------------------------------------------------------------------
 * 全站搜索索引：[标题, 链接, 描述]
 * 手工维护，与各页面 id 一一对应。新增 API 时请同步补充。
 * ------------------------------------------------------------------------- */
window.SEARCH_INDEX = [
  /* ---- 页面 ---- */
  ['概览', 'index.html', 'Vicon Nexus 2.12 Python SDK · 文档首页'],
  ['快速开始', 'getting-started.html', '安装、连接 Nexus、编写第一个脚本'],
  ['架构与分层', 'architecture.html', 'Python 封装层 / SWIG / C++ DLL 的调用链'],
  ['示例脚本', 'examples.html', '官方 example_scripts 逐行解析'],
  ['常见问题', 'faq.html', '连接失败、版本、线程与部署问题'],
  ['错误码与方法表', 'faq.html#errors', 'GenerateErrors、ViconNexusException 与排查思路'],

  /* ---- ViconNexus：连接 ---- */
  ['ViconNexus', 'api-viconnexus.html', '对外主入口类，构造即建立连接'],
  ['ViconNexus.', 'api-viconnexus.html#__init__', '__init__(host) 建立到 Nexus 的连接'],
  ['Connect', 'api-viconnexus.html#Connect', '断线后重新连接'],
  ['Disconnect', 'api-viconnexus.html#Disconnect', '断开连接'],
  ['IsConnected', 'api-viconnexus.html#IsConnected', '查询连接状态'],
  ['GetServerInfo', 'api-viconnexus.html#GetServerInfo', '服务器程序名、主/次版本、点版本、发行类型'],

  /* ---- 试次与帧 ---- */
  ['GetFrameCount', 'api-viconnexus.html#GetFrameCount', '试次总帧数'],
  ['GetFrameRate', 'api-viconnexus.html#GetFrameRate', '试次基础采样率'],
  ['GetTrialRange', 'api-viconnexus.html#GetTrialRange', '可更新帧范围'],
  ['GetTrialRegionOfInterest', 'api-viconnexus.html#GetTrialRegionOfInterest', '用户设置的感兴趣区间'],
  ['SetTrialRegionOfInterest', 'api-viconnexus.html#SetTrialRegionOfInterest', '设置感兴趣区间'],
  ['GetTrialName', 'api-viconnexus.html#GetTrialName', '试次名称与磁盘路径'],

  /* ---- 受试者 ---- */
  ['GetSubjectNames', 'api-viconnexus.html#GetSubjectNames', '已加载受试者名称列表'],
  ['GetSubjectInfo', 'api-viconnexus.html#GetSubjectInfo', '受试者名称 / 模板 / 激活状态'],
  ['SetSubjectActive', 'api-viconnexus.html#SetSubjectActive', '激活或停用受试者（支持 Exclusive）'],
  ['GetUnlabeledCount', 'api-viconnexus.html#GetUnlabeledCount', '未标注轨迹数量'],
  ['GetUnlabeled', 'api-viconnexus.html#GetUnlabeled', '按索引读取未标注轨迹全部帧'],

  /* ---- 标记点与轨迹 ---- */
  ['GetMarkerNames', 'api-viconnexus.html#GetMarkerNames', '受试者标记点名称列表'],
  ['HasTrajectory', 'api-viconnexus.html#HasTrajectory', '标记点是否存在轨迹'],
  ['GetTrajectory', 'api-viconnexus.html#GetTrajectory', '读取标记点全部帧 x/y/z/存在性'],
  ['SetTrajectory', 'api-viconnexus.html#SetTrajectory', '写入标记点全部帧数据'],
  ['GetTrajectoryAtFrame', 'api-viconnexus.html#GetTrajectoryAtFrame', '读取单帧标记点数据'],
  ['SetTrajectoryAtFrame', 'api-viconnexus.html#SetTrajectoryAtFrame', '写入单帧标记点数据'],

  /* ---- 骨骼段与关节 ---- */
  ['GetSegmentNames', 'api-viconnexus.html#GetSegmentNames', '骨骼段名称列表'],
  ['GetRootSegment', 'api-viconnexus.html#GetRootSegment', '根骨骼段名称'],
  ['GetSegmentDetails', 'api-viconnexus.html#GetSegmentDetails', '父段 / 子段 / 关联标记点'],
  ['GetJointNames', 'api-viconnexus.html#GetJointNames', '关节名称列表'],
  ['GetJointDetails', 'api-viconnexus.html#GetJointDetails', '关节的父段与子段'],

  /* ---- 模型输出 ---- */
  ['GetModelOutputNames', 'api-viconnexus.html#GetModelOutputNames', '模型输出名称列表'],
  ['GetModelOutputDetails', 'api-viconnexus.html#GetModelOutputDetails', '模型输出分组、分量名与量纲'],
  ['GetModelOutput', 'api-viconnexus.html#GetModelOutput', '读取模型输出全部帧（N×M 矩阵）'],
  ['SetModelOutput', 'api-viconnexus.html#SetModelOutput', '写入模型输出全部帧'],
  ['GetModelOutputAtFrame', 'api-viconnexus.html#GetModelOutputAtFrame', '读取单帧模型输出'],
  ['SetModelOutputAtFrame', 'api-viconnexus.html#SetModelOutputAtFrame', '写入单帧模型输出'],
  ['CreateModelOutput', 'api-viconnexus.html#CreateModelOutput', '新建模型输出并指定量纲'],
  ['CreateModeledMarker', 'api-viconnexus.html#CreateModeledMarker', '新建可显示的“建模标记点”'],

  /* ---- 受试者参数 ---- */
  ['GetSubjectParamNames', 'api-viconnexus.html#GetSubjectParamNames', '静态受试者参数名称'],
  ['GetSubjectParamDetails', 'api-viconnexus.html#GetSubjectParamDetails', '参数值 / 单位 / 默认值 / 是否必填'],
  ['GetSubjectParam', 'api-viconnexus.html#GetSubjectParam', '读取受试者参数值'],
  ['SetSubjectParam', 'api-viconnexus.html#SetSubjectParam', '写入受试者参数值'],
  ['CreateSubjectParam', 'api-viconnexus.html#CreateSubjectParam', '新建受试者参数（单位限 none/mm/deg/kg/s）'],

  /* ---- 分析参数 ---- */
  ['GetAnalysisParamNames', 'api-viconnexus.html#GetAnalysisParamNames', '分析参数名称'],
  ['GetAnalysisParamDetails', 'api-viconnexus.html#GetAnalysisParamDetails', '分析参数值 / 单位 / 有无值'],
  ['GetAnalysisParam', 'api-viconnexus.html#GetAnalysisParam', '读取分析参数值'],
  ['SetAnalysisParam', 'api-viconnexus.html#SetAnalysisParam', '写入分析参数值'],
  ['CreateAnalysisParam', 'api-viconnexus.html#CreateAnalysisParam', '新建分析参数'],

  /* ---- 事件 ---- */
  ['GetEvents', 'api-viconnexus.html#GetEvents', '按受试者 / 上下文 / 事件类型读取事件'],
  ['CreateAnEvent', 'api-viconnexus.html#CreateAnEvent', '在 frame+offset 处创建事件'],
  ['ClearAllEvents', 'api-viconnexus.html#ClearAllEvents', '删除试次内全部事件'],

  /* ---- 设备 ---- */
  ['GetDeviceIDs', 'api-viconnexus.html#GetDeviceIDs', '模拟设备 ID 列表'],
  ['GetDeviceNames', 'api-viconnexus.html#GetDeviceNames', '设备名称列表'],
  ['GetDeviceIDFromName', 'api-viconnexus.html#GetDeviceIDFromName', '按名称查设备 ID'],
  ['GetDeviceDetails', 'api-viconnexus.html#GetDeviceDetails', '设备名称/类型/速率、测力台与眼动仪信息'],
  ['GetDeviceOutputIDFromName', 'api-viconnexus.html#GetDeviceOutputIDFromName', '按名称查设备输出 ID'],
  ['GetDeviceOutputDetails', 'api-viconnexus.html#GetDeviceOutputDetails', '输出名称/类型/单位/通道'],
  ['GetDeviceChannelIDFromName', 'api-viconnexus.html#GetDeviceChannelIDFromName', '按名称查通道 ID'],

  /* ---- 通道数据 ---- */
  ['GetDeviceChannel', 'api-viconnexus.html#GetDeviceChannel', '读取通道全部采样（局部坐标）'],
  ['GetDeviceChannelAtFrame', 'api-viconnexus.html#GetDeviceChannelAtFrame', '读取单帧通道采样（局部坐标）'],
  ['GetDeviceChannelForFrame', 'api-viconnexus.html#GetDeviceChannelForFrame', '按光学帧读取通道采样'],
  ['GetDeviceChannelGlobal', 'api-viconnexus.html#GetDeviceChannelGlobal', '读取通道全部采样（全局坐标）'],
  ['GetDeviceChannelGlobalAtFrame', 'api-viconnexus.html#GetDeviceChannelGlobalAtFrame', '单帧全局通道采样'],
  ['GetDeviceChannelGlobalForFrame', 'api-viconnexus.html#GetDeviceChannelGlobalForFrame', '按光学帧读取全局通道采样'],
  ['SetDeviceChannel', 'api-viconnexus.html#SetDeviceChannel', '写入整条通道数据（推荐）'],
  ['SetDeviceChannelAtFrame', 'api-viconnexus.html#SetDeviceChannelAtFrame', '写入单帧通道数据'],

  /* ---- 样条 ---- */
  ['SubmitSplineTrajectory', 'api-viconnexus.html#SubmitSplineTrajectory', '提交轨迹点到样条对象'],
  ['GetSplineResults', 'api-viconnexus.html#GetSplineResults', '取样条指定阶导数（速度/加速度）'],

  /* ---- 试次操作 ---- */
  ['OpenTrial', 'api-viconnexus.html#OpenTrial', '在宿主中打开试次'],
  ['SaveTrial', 'api-viconnexus.html#SaveTrial', '保存当前试次'],
  ['CloseTrial', 'api-viconnexus.html#CloseTrial', '关闭当前试次（不保存）'],
  ['RunPipeline', 'api-viconnexus.html#RunPipeline', '运行 Processing Pipeline'],
  ['ViconNexusException', 'api-viconnexus.html#ViconNexusException', 'SDK 抛出的异常类型'],
  ['GenerateErrors', 'api-viconnexus.html#GenerateErrors', '控制是否把错误打印到 stderr'],

  /* ---- ViconUtils ---- */
  ['CreateViconGaitModelOutputs', 'api-viconutils.html#CreateViconGaitModelOutputs', '批量创建 Plug-in Gait 模型输出'],
  ['Globalise', 'api-viconutils.html#Globalise', '局部点 → 全局坐标'],
  ['Localise', 'api-viconutils.html#Localise', '全局点 → 局部坐标'],
  ['EulerFromMatrix', 'api-viconutils.html#EulerFromMatrix', '旋转矩阵 → 欧拉角（6 种轴序）'],
  ['MatrixFromEuler', 'api-viconutils.html#MatrixFromEuler', '欧拉角 → 旋转矩阵'],
  ['QuaternionFromMatrix', 'api-viconutils.html#QuaternionFromMatrix', '旋转矩阵 → 四元数'],
  ['AngleAxisFromQuaternion', 'api-viconutils.html#AngleAxisFromQuaternion', '四元数 → 角轴'],
  ['AngleAxisFromMatrix', 'api-viconutils.html#AngleAxisFromMatrix', '旋转矩阵 → 角轴'],
  ['RotationMatrixFromAngleAxis', 'api-viconutils.html#RotationMatrixFromAngleAxis', '角轴 → 旋转矩阵'],
  ['数学基础', 'api-viconutils.html#math', '旋转表示之间的换算关系与约定'],

  /* ---- 数据类型 ---- */
  ['NexusForcePlate', 'api-datatypes.html#NexusForcePlate', '测力台几何信息（LocalR/LocalT/WorldR/WorldT/Bounds）'],
  ['NexusEyeTracker', 'api-datatypes.html#NexusEyeTracker', '眼动仪信息（SubjectName/SegmentName/EyePose/Offset）'],
  ['FP_LocalR', 'api-datatypes.html#NexusForcePlate', '测力台局部旋转矩阵（行主序 9 元素）'],
  ['Output_Result', 'api-lowlevel.html#outputs', '底层返回值基类，Error()/ResultString()'],

  /* ---- viconnexusutils ---- */
  ['NexusObject', 'api-viconnexusutils.html#NexusObject', '可读写 Nexus 对象的抽象基类'],
  ['NexusTrajectory', 'api-viconnexusutils.html#NexusTrajectory', '三维轨迹对象（numpy 化的点集）'],
  ['NexusAngles', 'api-viconnexusutils.html#NexusAngles', '角度/角轴对象'],
  ['NexusSegment', 'api-viconnexusutils.html#NexusSegment', '骨骼段对象（位置/朝向/缩放）'],
  ['Populate', 'api-viconnexusutils.html#Populate', '由三条轨迹构建骨骼段'],
  ['AngleBetween', 'api-viconnexusutils.html#AngleBetween', '计算两段之间的夹角'],
  ['GlobalisePoint', 'api-viconnexusutils.html#GlobalisePoint', '段内点转全局'],
  ['LocalisePoint', 'api-viconnexusutils.html#LocalisePoint', '全局点转段内'],
  ['TranslatePointInSegment', 'api-viconnexusutils.html#TranslatePointInSegment', '在段坐标系内平移点'],
  ['Position', 'api-viconnexusutils.html#Position', '读取位置（可按帧取）'],
  ['Orientation', 'api-viconnexusutils.html#Orientation', '读取朝向（可按帧取）'],
  ['Scale', 'api-viconnexusutils.html#Scale', '读取缩放'],
  ['Read', 'api-viconnexusutils.html#Read', '从 Nexus 读取对象数据'],
  ['Write', 'api-viconnexusutils.html#Write', '把对象数据写回 Nexus'],
  ['Create', 'api-viconnexusutils.html#Create', '在 Nexus 中创建空输出'],
  ['global_segment', 'api-viconnexusutils.html#global_segment', '构造世界坐标系段（单位阵）'],

  /* ---- 底层 ---- */
  ['ViconNexusClient', 'api-lowlevel.html#ViconNexusClient', 'SWIG 生成的底层客户端，一一对应 C++ 命令'],
  ['ProcessRequest', 'api-lowlevel.html#ProcessRequest', '通用命令通道'],
  ['GetCommandList', 'api-lowlevel.html#GetCommandList', '枚举可用命令'],
  ['GetCommandInfo', 'api-lowlevel.html#GetCommandInfo', '查询单条命令的签名'],
  ['SafeString', 'api-lowlevel.html#containers', '底层字符串封装（AllocString）'],
  ['map_ui_vd', 'api-lowlevel.html#containers', 'uint→vectord 映射容器'],
  ['vectord', 'api-lowlevel.html#containers', '底层 double 向量容器'],
  ['Crash', 'api-lowlevel.html#internals', '仅用于测试宿主崩溃处理']
];
